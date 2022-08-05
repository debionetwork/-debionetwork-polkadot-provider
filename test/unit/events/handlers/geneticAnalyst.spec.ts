import { geneticAnalystHandler } from "../../../../src/events/handlers/geneticAnalyst"
import { sampleRole, sampleEvent6 } from "../dataSample"
import { eventTypes } from "../../../../src/events/event-types"

describe("Genetic Analyst Events Handler", () => {
  it("Default Genetic Analyst handler", async () => {
    const dataEvent = JSON.parse(JSON.stringify(sampleEvent6.data))
    const value = eventTypes["role"][sampleRole.analyst][sampleEvent6.section][sampleEvent6.method].value
    const valueMessage = eventTypes["role"][sampleRole.analyst][sampleEvent6.section][sampleEvent6.method].value_message

    const handler = await geneticAnalystHandler.call(
      { dataEvent, value, valueMessage, event: { section: sampleEvent6.section, method: sampleEvent6.method } }
    )

    expect(handler).toMatchObject({
      data: {
        id: 'sampleIdHash',
        ownerId: 'sampleAddress',
        info: {
          name: 'Test Service',
          pricesByCurrency: [
            {
              currency: "DBIO",
              totalPrice: "1,000,000,000,000,000,000",
              priceComponents: [
                {
                  component: "Main Price",
                  value: "1,000,000,000,000,000,000"
                }
              ],
              additionalPrices: []
            }
          ],
          expectedDuration: {
            duration: 1,
            durationType: "Days"
          },
          description: 'test service',
          testResultSample: 'link'
        }
      },
      id: 'sampleIdHash',
      params: { id: 'sampleIdHash' },
      wording: "You've successfully added your new service - (samp...Hash)"
    })
  })

  it("geneticAnalystServices handler", async () => {
    const dataEvent = JSON.parse(JSON.stringify(sampleEvent6.data))
    const value = eventTypes["role"][sampleRole.analyst][sampleEvent6.section][sampleEvent6.method].value
    const valueMessage = eventTypes["role"][sampleRole.analyst][sampleEvent6.section][sampleEvent6.method].value_message

    const handler = await geneticAnalystHandler.geneticAnalystServices.call(
      null,
      { dataEvent, value, valueMessage, event: { section: sampleEvent6.section, method: sampleEvent6.method } }
    )

    expect(handler).toMatchObject({
      data: {
        id: 'sampleIdHash',
        ownerId: 'sampleAddress',
        info: {
          name: 'Test Service',
          pricesByCurrency: [
            {
              currency: "DBIO",
              totalPrice: "1,000,000,000,000,000,000",
              priceComponents: [
                {
                  component: "Main Price",
                  value: "1,000,000,000,000,000,000"
                }
              ],
              additionalPrices: []
            }
          ],
          expectedDuration: {
            duration: 1,
            durationType: "Days"
          },
          description: 'test service',
          testResultSample: 'link'
        }
      },
      id: 'sampleIdHash',
      params: { id: 'sampleIdHash' },
      wording: "You've successfully added your new service - <Test Service>"
    })
  })
})