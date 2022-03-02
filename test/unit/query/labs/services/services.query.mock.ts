import { toHumanMock } from "../../../@polkadot-types.mock";

export const services = {
  services(param) { // eslint-disable-line
    return toHumanMock;
  },
  servicesCountByOwner(param) { // eslint-disable-line
    return toHumanMock;
  },
  servicesCount() {
    return toHumanMock;
  }
}

export const serviceDataMock = {
  id: "ID",
  ownerId: "OWNER_ID",
  serviceFlow: "RequestTest",
  info: {
    pricesByCurrency: [
      {
        priceComponents: [
          {
            value: "VALUE",
          }
        ],
        additionalPrices: [
          {
            value: "VALUE",
          }
        ],
        currency: "CURRENCY"
      }
    ]
  },
}