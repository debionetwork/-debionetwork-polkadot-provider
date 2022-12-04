import { defaultHandler } from './defaultHandler';

const handler = {
  geneticAnalystServices: async ({ dataEvent, value, valueMessage }) => {
    const data = dataEvent[0];
    const id = data[value];
    const params = { id };
    const wording = `${valueMessage} <${data.info.name}>`;

    return { data, id, params, wording };
  },

  geneticAnalysts: async ({ dataEvent, valueMessage, event }) => {
    let wording: string = '';
    const data = dataEvent[0];
    const { verificationStatus } = data;

    if (verificationStatus === 'Verified') wording = 'Congrats! Your account has been verified.';
    else
      wording = `${valueMessage} ${
        verificationStatus === 'Revoked' ? 'has been' : 'verification has been'
      } ${verificationStatus}.`;

    if (event.method === 'GeneticAnalystStakeSuccessful' && verificationStatus === 'Unverified') wording = valueMessage;

    return { data, id: null, params: null, wording };
  },

  geneticAnalysisOrders: async ({ dataEvent, value, valueMessage, event, store }) => {
    let wording: string;
    const data = dataEvent[0];
    const id = data[value];
    const params = { id };
    const web3 = store.getters['metamask/getWeb3'];

    const formatedId = `${id.slice(0, 4)}...${id.slice(-4)}`;

    if (event.method === 'GeneticAnalysisOrderFulfilled') {
      const currency = data.currency;
      const unit = data.currency === 'USDT' ? 'mwei' : 'ether';
      const coin = Number(web3.utils.fromWei(String(data.totalPrice.replace(/,/g, '')), unit)) - 5;
      wording = valueMessage(coin, currency, formatedId);
    } else wording = `${valueMessage} <${formatedId}> is awaiting process.`;

    return { data, id, params, wording };
  },
};

// If property not found, return defaultHandler
export const geneticAnalystHandler = new Proxy(handler, defaultHandler);
