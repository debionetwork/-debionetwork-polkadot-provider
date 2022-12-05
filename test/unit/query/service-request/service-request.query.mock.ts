import { returnToHumanMockWithParam, returnToString, toHumanMock } from "../../@polkadot-types.mock";

export const serviceRequest = {
  requestById(param) {
    return returnToHumanMockWithParam(param);
  },
  requestByOrderId(param) {
    return returnToString(param);
  }
}