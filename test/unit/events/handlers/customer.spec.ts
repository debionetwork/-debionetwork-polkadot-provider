import { customerHandler } from "../../../../src/events/handlers/customer"
import { sampleRole, sampleState, sampleEvent, sampleEvent2 } from "../dataSample"

describe("Customer Events Handler", () => {
  it("Default customer handler", async () => {
    const dataEvent = JSON.parse(JSON.stringify(sampleEvent.data))
    const value = sampleState.configEvent["role"][sampleRole.customer][sampleEvent.section][sampleEvent.method].value
    const valueMessage = sampleState.configEvent["role"][sampleRole.customer][sampleEvent.section][sampleEvent.method].value_message

    const handler = await customerHandler.call(
      { dataEvent, value, valueMessage, event: { section: sampleEvent.section, method: sampleEvent.method } }
    )

    expect(handler).toMatchObject({
      data: {
        hash: 'sampleHash',
        requesterAddress: 'sampleAddress',
        labAddress: null,
        country: 'sampleCountry',
        region: 'sampleRegion',
        city: 'sampleCity',
        serviceCategory: 'sampleServiceCategory',
        stakingAmount: 'sampleStakingAmount',
        status: 'Open',
        createdAt: 'now',
        updatedAt: null,
        unstakedAt: null
      },
      id: 'sampleHash',
      params: { id: 'sampleHash' },
      wording: 'Congrats! You successfully submitted your requested service with staking ID (samp...Hash)'
    })
  })

  it("ServiceRequest customer handler", async () => {
    const dataEvent = JSON.parse(JSON.stringify(sampleEvent2.data))
    const value = sampleState.configEvent["role"][sampleRole.customer][sampleEvent2.section][sampleEvent2.method].value
    const valueMessage = sampleState.configEvent["role"][sampleRole.customer][sampleEvent2.section][sampleEvent2.method].value_message

    const handler = await customerHandler.serviceRequest.call(
      null,
      { dataEvent, value, valueMessage, event: { section: sampleEvent2.section, method: sampleEvent2.method } }
    )

    expect(handler).toMatchObject({
      data: [
        'sampleAnotherAddress',
        {
          hash: 'sampleHash',
          requesterAddress: 'sampleAddress',
          labAddress: null,
          country: 'sampleCountry',
          region: 'sampleRegion',
          city: 'sampleCity',
          serviceCategory: 'sampleServiceCategory',
          stakingAmount: 'sampleStakingAmount',
          status: 'Open',
          createdAt: 'now',
          updatedAt: null,
          unstakedAt: null
        }
      ],
      id: 'sampleHash',
      params: { page: 1 },
      wording: 'Your stake amount has been refunded, kindly check your balance.'
    })
  })
})
