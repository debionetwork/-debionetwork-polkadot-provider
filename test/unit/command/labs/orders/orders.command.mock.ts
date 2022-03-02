import { signAndSend } from "../../../@polkadot-api.mock";

export const orders = {
  createOrder(param) {
    return signAndSend;
  },
  fulfillOrder(param) {
    return signAndSend;
  },
  setOrderRefunded(param) {
    return signAndSend;
  },
  setOrderPaid(param) {
    return signAndSend;
  },
  cancelOrder(param) {
    return signAndSend;
  }
}