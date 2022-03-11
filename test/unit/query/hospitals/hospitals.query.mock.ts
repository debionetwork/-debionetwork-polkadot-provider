import { returnToHumanMockWithParam, toHumanMock } from "../../@polkadot-types.mock";
import { mockFunction } from "../../mock";

export const hospitals = {
  hospitals(param) {
    return returnToHumanMockWithParam(param);
  },
  hospitalsByCountryRegionCity(COUNTRY_ID, REGION_ID) {
    return returnToHumanMockWithParam({COUNTRY_ID, REGION_ID});
  },
  hospitalCount() {
    return toHumanMock;
  },
  hospitalCountByCountryRegionCity(COUNTRY_ID, REGION_ID) {
    return returnToHumanMockWithParam({COUNTRY_ID, REGION_ID});
  },
  adminKey() {
    return mockFunction();
  },
}