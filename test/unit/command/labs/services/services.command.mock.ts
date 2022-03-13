import { signAndSendWithPaymentInfo } from "../../../@polkadot-api.mock";

export const services = {
  createService(params) {
    return signAndSendWithPaymentInfo;
  },
  updateService(params) {
    return signAndSendWithPaymentInfo;
  },
  deleteService(params) {
    return signAndSendWithPaymentInfo;
  }
}