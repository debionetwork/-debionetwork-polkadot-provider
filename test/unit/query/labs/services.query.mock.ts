import { mockFunction } from "../../mock";

export const services = {
  services(param) {
    return mockFunction(param);
  },
  servicesCount(param) {
    return mockFunction(param);
  },
  servicesCountByOwner(param) {
    return mockFunction(param);
  },
}