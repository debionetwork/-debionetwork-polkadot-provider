import { returnToHumanMockWithParam, toHumanMock } from "../../../@polkadot-types.mock";
import { mockFunction } from "../../../mock";

export const geneticAnalysisOrders = {
  geneticAnalysisOrder(param) {
    return returnToHumanMockWithParam(param);
  },
  geneticAnalysisOrdersByCustomer(param) {
    return returnToHumanMockWithParam(param);
  },
  geneticAnalysisOrdersBySeller(param) {
    return returnToHumanMockWithParam(param);
  },
  pendingGeneticAnalysisOrdersBySeller(param) {
    return returnToHumanMockWithParam(param);
  },
  lastGeneticAnalysisOrderByCustomer(param) {
    return returnToHumanMockWithParam(param);
  },
  totalEscrowAmount() {
    return toHumanMock;
  },
  escrowKey() {
    return mockFunction();
  },
  palletAccount() {
    return mockFunction();
  }
}