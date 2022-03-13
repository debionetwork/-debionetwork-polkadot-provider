import { signAndSend } from "../../../@polkadot-api.mock";

export const geneticAnalysisOrders = {
  cancelGeneticAnalysisOrder(params) {
    return signAndSend;
  },
  createGeneticAnalysisOrder(params) {
    return signAndSend;
  },
  setGeneticAnalysisOrderPaid(params) {
    return signAndSend;
  },
  setGeneticAnalysisOrderRefunded(params) {
    return signAndSend;
  },
  fulfillGeneticAnalysisOrder(params) {
    return signAndSend;
  },
  sudoUpdateEscrowKey(params) {
    return signAndSend;
  },
  updateEscrowKey(params) {
    return signAndSend;
  }
}