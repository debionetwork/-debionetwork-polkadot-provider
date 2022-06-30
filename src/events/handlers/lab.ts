import { toFormatDebioCoin } from "../helpers"
import { defaultHandler } from "./defaultHandler"

const handler = {
  labs: async ({ dataEvent, value, valueMessage, store }) => {
    const data = dataEvent;
    const id = data[value];
    const params = { number: id };
    let wording = valueMessage

    if (data[2] == "LabUpdateVerificationStatus") {
      store.dispatch("substrate/getLabAccount")
      if (data[0].verificationStatus == "Verified") {
        wording = `Congrats! ${wording}`
      }
      wording = `${wording} ${data[0].verificationStatus.toLowerCase()}`
    }

    return { data, id, params, wording }
  },

  balances: async ({ dataEvent, value, valueMessage, store }) => {
    const web3 = store.getters["metamask/getWeb3"]
    const data = dataEvent;
    const id = data[value];
    const params = { number: id };
    const finalText = await toFormatDebioCoin(data[valueMessage], store)
    const wording = web3.utils.fromWei(finalText, "ether") + " DBIO!"
    return { data, id, params, wording }
  },

  orders: async ({ dataEvent, value, valueMessage }) => {
    const data = dataEvent[0];
    const id = data[value];
    const params = { orderId: id }
    const formatedHash = `${id.substr(0, 4)}...${id.substr(id.length - 4)}`
    const wording = `${valueMessage} ${formatedHash} is awaiting process.`
    return { data, id, params, wording }
  },

  rewards: async ({ dataEvent, value, valueMessage, store }) => {
    const web3 = store.getters["metamask/getWeb3"]
    const data = dataEvent;
    const id = data[value];
    const params = null;
    const finalText = await toFormatDebioCoin(data[valueMessage], store)
    const coin = web3.utils.fromWei(finalText, "ether")
    const wording = `${coin} DBIO from ${coin === 2 ? "account verification" : "wallet binding"}`;
    return { data, id, params, wording }
  },

  geneticTesting: async ({ dataEvent, value, valueMessage, event }) => {
    const data = dataEvent[0];
    const id = data[value];
    const params = { orderId: id };
    const formatedHash = `${id.substr(0, 4)}...${id.substr(id.length - 4)}`

    const wording = `${valueMessage} DAI ${event.method === "DnaSampleResultReady" ? "for completeing the requested test" : "as quality control fees"} for ${formatedHash}.`;
    return { data, id, params, wording }
  },

  services: async ({ dataEvent, value, valueMessage }) => {
    const data = dataEvent[0];
    const id = data[value];
    const params = { id: id };
    const formatedHash = `${id.substr(0, 4)}...${id.substr(id.length - 4)}`
    const wording = `${valueMessage} ${formatedHash}`;

    const notifications = JSON.parse(localStorage.getLocalStorageByName(
      `LOCAL_NOTIFICATION_BY_ADDRESS_${localStorage.getAddress()}_lab`
    ))
    const isExist = notifications?.find(notif => notif.params.id === id)

    if (isExist) return

    return { data, id, params, wording }
  }
}

// If property not found, return defaultHandler
export const labHandler = new Proxy(handler, defaultHandler)
