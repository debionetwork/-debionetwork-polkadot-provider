import { returnToHumanMockWithParam, toHumanMock } from "../../@polkadot-types.mock";

export const electronicMedicalRecord = {
  electronicMedicalRecordByOwner(param) {
    return returnToHumanMockWithParam(param);
  },
  electronicMedicalRecordById(param) {
    return returnToHumanMockWithParam(param);
  },
  electronicMedicalRecordFileById(param) {
    return returnToHumanMockWithParam(param);
  },
  electronicMedicalRecordCountByOwner(param) {
    return returnToHumanMockWithParam(param);
  },
  electronicMedicalRecordCount() {
    return toHumanMock;
  }
}