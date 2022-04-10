import { returnToHumanMockWithParam, toHumanMock } from "../../../@polkadot-types.mock";
import { mockFunction } from "../../../mock";

export const geneticAnalysisOrders = {
  geneticAnalysisOrderById(param) {
    return returnToHumanMockWithParam(param);
  },
  geneticAnalysisOrdersByCustomerId(param) {
    return returnToHumanMockWithParam(param);
  },
  geneticAnalysisOrdersByGeneticAnalystId(param) {
    return returnToHumanMockWithParam(param);
  },
  pendingGeneticAnalysisOrdersByGeneticAnalystId(param) {
    return returnToHumanMockWithParam(param);
  },
  lastGeneticAnalysisOrderByCustomerId(param) {
    return returnToHumanMockWithParam(param);
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