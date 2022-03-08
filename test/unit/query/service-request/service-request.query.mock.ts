import { returnToHumanMockWithParam, toHumanMock } from "../../@polkadot-types.mock";

export const serviceRequest = {
  requestById(param) {
    return returnToHumanMockWithParam(param);
  },
  serviceInvoiceById(param) {
    return returnToHumanMockWithParam(param);
  },
  serviceInvoiceByOrderId(param) {
    return returnToHumanMockWithParam(param);
  }
}