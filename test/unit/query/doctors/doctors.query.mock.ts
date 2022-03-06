import { returnToHumanMockWithParam, toHumanMock } from "../../@polkadot-types.mock";
import { mockFunction } from "../../mock";

export const doctors = {
  doctors(param) {
    return returnToHumanMockWithParam(param);
  },
  doctorsByCountryRegionCity(COUNTRY_ID, REGION_ID) {
    return returnToHumanMockWithParam({COUNTRY_ID, REGION_ID});
  },
  doctorCount() {
    return toHumanMock;
  },
  doctorCountByCountryRegionCity(COUNTRY_ID, REGION_ID) {
    return returnToHumanMockWithParam({COUNTRY_ID, REGION_ID});
  },
  adminKey() {
    return mockFunction();
  },
}