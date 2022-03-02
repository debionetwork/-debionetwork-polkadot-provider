import { toHumanMock, returnToHumanMockWithParam } from "../../../@polkadot-types.mock";

export const services = {
  services(param) { // eslint-disable-line
    return returnToHumanMockWithParam(param);
  },
  servicesCountByOwner(param) { // eslint-disable-line
    return returnToHumanMockWithParam(param);
  },
  servicesCount() {
    return toHumanMock;
  }
}
