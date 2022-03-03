import { signAndSend } from "../../../@polkadot-api.mock";

export const geneticAnalysisOrders = {
  setGeneticAnalysisOrderPaid(params) {
    return signAndSend;
  },
  setGeneticAnalysisOrderRefunded(params) {
    return signAndSend;
  },
  fulfillGeneticAnalysisOrder(params) {
    return signAndSend;
  }
}