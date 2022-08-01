import { defaultHandler } from './defaultHandler';

const handler = {
  geneticAnalystServices: async ({ dataEvent, value, valueMessage }) => {
    const data = dataEvent[0];
    const id = data[value];
    const params = { id };
    const wording = `${valueMessage} <${data.info.name}>`

    return { data, id, params, wording }
  },

  geneticAnalysts: async ({ dataEvent, valueMessage }) => {
    let wording: string = ""
    const data = dataEvent[0];
    const { verificationStatus } = data

    if (verificationStatus === "Verified") wording = "Congrats! Your account has been verified."
    else wording = `${valueMessage} ${verificationStatus === "Revoked" ? "has been" : "verification has been" } ${verificationStatus}.`

    return { data, id: null, params: null, wording }
  },

  geneticAnalysisOrders: async ({ dataEvent, value, valueMessage }) => {
    const data = dataEvent[0]
    const id = data[value]
    const params = { id }
    const wording = `${valueMessage} <${id.slice(0, 5)}...${id.slice(-5)}> is awaiting process.`

    return { data, id, params, wording }
  }
};

// If property not found, return defaultHandler
export const geneticAnalystHandler = new Proxy(handler, defaultHandler);
