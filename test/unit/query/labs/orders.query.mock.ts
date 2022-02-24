import { mockFunction } from "../../mock";

export const orders = {
  lastOrderByCustomer(param) {
    return mockFunction(param);
  },
  orders(param) {
    return mockFunction(param);
  }
}