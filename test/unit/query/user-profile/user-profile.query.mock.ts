import { mockFunction } from "../../mock";

export const userProfile = {
  accountIdByEthAddress(param) {
    return mockFunction(param);
  },
  ethAddressByAccountId(param) {
    return mockFunction(param);
  }
}