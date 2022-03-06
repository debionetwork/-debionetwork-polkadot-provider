import { signAndSendWithPaymentInfo } from "../../@polkadot-api.mock";

export const serviceRequest = {
  createRequest(param1, param2, param3, param4, param5) { // eslint-disable-line
    return signAndSendWithPaymentInfo;
  },
  unstake(params) { // eslint-disable-line
    return signAndSendWithPaymentInfo;
  },
  retrieveUnstakedAmount(params) { // eslint-disable-line
    return signAndSendWithPaymentInfo;
  }
}