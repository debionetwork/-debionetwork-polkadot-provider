import { signAndSendReturnToHuman, signAndSendWithPaymentInfo } from "../../@polkadot-api.mock";

export const serviceRequest = {
  createRequest(param1, param2, param3, param4, param5) { // eslint-disable-line
    return signAndSendWithPaymentInfo;
  },
  unstake(params) { // eslint-disable-line
    return signAndSendWithPaymentInfo;
  },
  retrieveUnstakedAmount(params) { // eslint-disable-line
    return signAndSendWithPaymentInfo;
  },
  generateRequestid(params) { // eslit-disable-line
    return signAndSendReturnToHuman;
  },
  claimRequest(params) { // eslit-disable-line
    return signAndSendReturnToHuman;
  },
  processRequest(params) { // eslit-disable-line
    return signAndSendReturnToHuman;
  },
  finalizeRequest(params) { // eslit-disable-line
    return signAndSendReturnToHuman;
  }
}