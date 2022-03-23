import { returnToHumanMockWithParam, toHumanMock } from "../../../@polkadot-types.mock";

export const geneticAnalystQualifications = {
  geneticAnalystQualifications(param) {
    return returnToHumanMockWithParam(param);
  },
  geneticAnalystQualificationsCount() {
    return toHumanMock;
  },
  geneticAnalystQualificationsCountByOwner(param) {
    return returnToHumanMockWithParam(param);
  },
}