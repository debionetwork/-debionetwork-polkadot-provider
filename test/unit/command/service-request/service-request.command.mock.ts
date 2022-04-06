import { signAndSendWithPaymentInfo } from "../../@polkadot-api.mock";

export const serviceRequest = {
  createRequest(param1, param2, param3, param4, param5, param6) { // eslint-disable-line
    return signAndSendWithPaymentInfo;
  },
  unstake(params) { // eslint-disable-line
    return signAndSendWithPaymentInfo;
  },
  retrieveUnstakedAmount(params) { // eslint-disable-line
    return signAndSendWithPaymentInfo;
  },
  generateRequestid(params) { // eslit-disable-line
    return signAndSendWithPaymentInfo;
  },
  claimRequest(params) { // eslit-disable-line
    return signAndSendWithPaymentInfo;
  },
  processRequest(params) { // eslit-disable-line
    return signAndSendWithPaymentInfo;
  },
  finalizeRequest(params) { // eslit-disable-line
    return signAndSendWithPaymentInfo;
  }
}