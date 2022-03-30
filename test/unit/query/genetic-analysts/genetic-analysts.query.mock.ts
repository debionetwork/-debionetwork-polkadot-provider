import { returnToHumanMockWithParam, toHumanMock } from "../../@polkadot-types.mock";
import { mockFunction } from "../../mock";

export const geneticAnalysts = {
  geneticAnalystByAccountId(param) {
    return returnToHumanMockWithParam(param);
  },
  geneticAnalystCount() {
    return toHumanMock;
  },
  adminKey() {
    return mockFunction();
  },
  palletId() {
    return mockFunction();
  },
  totalStakedAmount() {
    return toHumanMock;
  },
  minimumStakeAmount() {
    return toHumanMock;
  }
}