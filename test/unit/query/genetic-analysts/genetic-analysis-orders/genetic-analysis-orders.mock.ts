import { returnToHumanMockWithParam, toHumanMock } from "../../../@polkadot-types.mock";
import { mockFunction } from "../../../mock";

export const geneticAnalysisOrders = {
  geneticAnalysisOrders(param) {
    return returnToHumanMockWithParam(param);
  },
  geneticAnalysisOrdersByCustomer(param) {
    return returnToHumanMockWithParam(param);
  },
  geneticAnalysisOrdersBySeller(param) {
    return returnToHumanMockWithParam(param);
  },
  pendingGeneticAnalysisOrdersByGeneticAnalystId(param) {
    return returnToHumanMockWithParam(param);
  },
  lastGeneticAnalysisOrderByCustomer(param) {
    return mockFunction(param);
  },
  totalEscrowAmount() {
    return toHumanMock;
  },
  adminKey() {
    return mockFunction();
  },
  palletId() {
    return mockFunction();
  }
}