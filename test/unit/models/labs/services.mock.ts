export const serviceDataMock = {
  id: "ID",
  ownerId: "OWNER_ID",
  serviceFlow: "RequestTest",
  info: {
    name: 'string',
    category: 'string',
    description: 'string',
    pricesByCurrency: [
      {
        priceComponents: [
          {
            component: 'string',
            value: 1
          }
        ],
        additionalPrices: [
          {
            component: 'string',
            value: 1
          }
        ],
        currency: "CURRENCY",
        totalPrice: 1,
      }
    ],
    expectedDuration: {
      duration: 'string',
      durationType: 'string',
    },
    testResultSample: 'string',
    longDescription: 'string',
    image: 'string',
    dnaCollectionProcess: 'string',
    price: 'string',
  },
}