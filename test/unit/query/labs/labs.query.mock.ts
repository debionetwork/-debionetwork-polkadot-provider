import { returnToHumanMockWithParam, toHumanMock } from "../../@polkadot-types.mock";
import { mockFunction } from "../../mock";

export const labs = {
  labs(param) {
    return returnToHumanMockWithParam(param);
  },
  labsByCountryRegionCity(COUNTRY_ID, REGION_ID) {
    return returnToHumanMockWithParam({COUNTRY_ID, REGION_ID});
  },
  labCount() {
    return toHumanMock;
  },
  labCountByCountryRegionCity(COUNTRY_ID, REGION_ID) {
    return returnToHumanMockWithParam({COUNTRY_ID, REGION_ID});
  },
  labVerifierKey() {
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