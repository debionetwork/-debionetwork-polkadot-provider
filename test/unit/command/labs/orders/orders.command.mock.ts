import { signAndSendWithPaymentInfo } from "../../../@polkadot-api.mock";

export const orders = {
  createOrder(param) {
    return signAndSendWithPaymentInfo;
  },
  fulfillOrder(param) {
    return signAndSendWithPaymentInfo;
  },
  setOrderRefunded(param) {
    return signAndSendWithPaymentInfo;
  },
  setOrderPaid(param) {
    return signAndSendWithPaymentInfo;
  },
  cancelOrder(param) {
    return signAndSendWithPaymentInfo;
  },
  sudoUpdateEscrowKey(param) {
    return signAndSendWithPaymentInfo;
  },
  updateEscrowKey(param) {
    return signAndSendWithPaymentInfo;
  }
}