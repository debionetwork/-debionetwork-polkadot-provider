import { returnToHumanMockWithParam, toHumanMock } from "../../../@polkadot-types.mock";

export const geneticAnalystServices = {
  geneticAnalystServices(param) {
    return returnToHumanMockWithParam(param);
  },
  geneticAnalystServicesCount() {
    return toHumanMock;
  },
  geneticAnalystServicesCountByOwner(param) {
    return returnToHumanMockWithParam(param);
  },
}