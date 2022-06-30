import { labHandler } from "../../../../src/events/handlers/lab"
import { sampleRole, sampleState, sampleEvent4, sampleEvent5 } from "../dataSample"

describe("Lab Events Handler Test", () => {
  it("Default lab handler", async () => {
    const dataEvent = JSON.parse(JSON.stringify(sampleEvent4.data))
    const value = sampleState.configEvent["role"][sampleRole.lab][sampleEvent4.section][sampleEvent4.method].value
    const valueMessage = sampleState.configEvent["role"][sampleRole.lab][sampleEvent4.section][sampleEvent4.method].value_message

    const handler = await labHandler.call(
      { dataEvent, value, valueMessage, event: { section: sampleEvent4.section, method: sampleEvent4.method } }
    )

    expect(handler).toMatchObject({
      data: {
        id: 'sampleIdHash',
        serviceId: 'sampleServiceIdHash',
        customerId: 'sampleCustId',
        customerBoxPublicKey: 'sampleCustomerPublicKey',
        sellerId: 'sampleAddress',
        dnaSampleTrackingId: 'SampleDNA',
        currency: 'DAI',
        prices: [
          {
            component: "0x74657374696e675f7072696365",
            value: "0x00000000000000000de0b6b3a7640000"
          }
        ],
        additionalPrices: [
          {
            component: "0x71635f7072696365",
            value: "0x00000000000000000de0b6b3a7640000"
          }
        ],
        status: 'Paid',
        orderFlow: 'RequestTest',
        createdAt: 1656564228000,
        updatedAt: 1656564408000
      },
      id: 'sampleIdHash',
      params: { id: 'sampleIdHash' },
      wording: 'A new order (samp...Hash)'
    })
  })

  it("Orders lab handler", async () => {
    const dataEvent = JSON.parse(JSON.stringify(sampleEvent4.data))
    const value = sampleState.configEvent["role"][sampleRole.lab][sampleEvent4.section][sampleEvent4.method].value
    const valueMessage = sampleState.configEvent["role"][sampleRole.lab][sampleEvent4.section][sampleEvent4.method].value_message

    const handler = await labHandler.orders.call(
      null,
      { dataEvent, value, valueMessage, event: { section: sampleEvent4.section, method: sampleEvent4.method } }
    )

    expect(handler).toMatchObject({
      data: {
        id: 'sampleIdHash',
        serviceId: 'sampleServiceIdHash',
        customerId: 'sampleCustId',
        customerBoxPublicKey: 'sampleCustomerPublicKey',
        sellerId: 'sampleAddress',
        dnaSampleTrackingId: 'SampleDNA',
        currency: 'DAI',
        prices: [
          {
            component: "0x74657374696e675f7072696365",
            value: "0x00000000000000000de0b6b3a7640000"
          }
        ],
        additionalPrices: [
          {
            component: "0x71635f7072696365",
            value: "0x00000000000000000de0b6b3a7640000"
          }
        ],
        status: 'Paid',
        orderFlow: 'RequestTest',
        createdAt: 1656564228000,
        updatedAt: 1656564408000
      },
      id: 'sampleIdHash',
      params: { orderId: 'sampleIdHash' },
      wording: 'A new order samp...Hash is awaiting process.'
    })
  })

  it("ServiceRequest lab handler", async () => {
    const dataEvent = JSON.parse(JSON.stringify(sampleEvent5.data))
    const value = sampleState.configEvent["role"][sampleRole.lab][sampleEvent5.section][sampleEvent5.method].value
    const valueMessage = sampleState.configEvent["role"][sampleRole.lab][sampleEvent5.section][sampleEvent5.method].value_message

    const handler = await labHandler.ServiceRequest.call(
      null,
      { dataEvent, value, valueMessage, event: { section: sampleEvent5.section, method: sampleEvent5.method } }
    )

    expect(handler).toMatchObject({
      data: {
        id: 'sampleIdHash',
        ownerId: 'sampleAddress',
        info: {
          name: 'ServiceName',
          pricesByCurrency: [
            {
              currency: "DAI",
              totalPrice: "0x00000000000000001bc16d674ec80000",
              priceComponents: [
                {
                  component: "0x74657374696e675f7072696365",
                  value: "0x00000000000000000de0b6b3a7640000"
                }
              ],
              additionalPrices: [
                {
                  component: "0x71635f7072696365",
                  value: "0x00000000000000000de0b6b3a7640000"
                }
              ]
            }
          ],
          expectedDuration: {
            duration: 1,
            durationType: "Days"
          },
          category: 'sampleCategory',
          description: 'sampleDesc',
          dnaCollectionProcess: 'sampleDNA',
          testResultSample: 'sampleResult',
          longDescription: 'sampleDesc',
          image: 'sampleImage'
        },
        serviceFlow: 'RequestTest'
      },
      id: 'sampleIdHash',
      params: { id: 'sampleIdHash' },
      wording: "You've successfully added your new service (samp...Hash)"
    })
  })
})
