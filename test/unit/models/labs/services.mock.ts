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
            value: "1000"
          }
        ],
        additionalPrices: [
          {
            component: 'string',
            value: "1000"
          }
        ],
        currency: "USN",
        totalPrice: "2000",
      }
    ],
    expectedDuration: {
      duration: '1',
      durationType: 'Days',
    },
    testResultSample: 'string',
    longDescription: 'string',
    image: 'string',
    dnaCollectionProcess: 'string',
  },
}