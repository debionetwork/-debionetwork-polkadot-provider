import { processEvent } from "../../../src/events/index"
import { sampleAddress, sampleRole, sampleEvent, sampleEvent2, sampleEvent3 } from "./dataSample"

describe("Polkadot Events Test", () => {
  it(
    "Should receive Polkadot event if an address match",
    async () => {
      const response = await processEvent(
        sampleAddress,
        sampleEvent,
        sampleRole.customer,
        {
          store: {
            getters: {
              getWeb3: jest.fn()
            }
          }
        }
      )

      expect(response?.statusAdd).toBe(true)
    }
  )

  it(
    "Should not receive Polkadot event if an address does not match",
    async () => {
      const response = await processEvent(
        "foo",
        sampleEvent,
        sampleRole.customer,
        {
          store: {
            getters: {
              getWeb3: jest.fn()
            }
          }
        }
      )

      expect(response?.statusAdd).toBe(false)
    }
  )

  it(
    "Should receive Polkadot event if an address match even with a different event object structure",
    async () => {
      const response = await processEvent(
        sampleAddress,
        sampleEvent2,
        sampleRole.customer,
        {
          store: {
            getters: {
              getWeb3: jest.fn()
            }
          }
        }
      )

      expect(response?.statusAdd).toBe(true)
    }
  )

  it(
    "Should not receive Polkadot event if an address does not match even with a different event object structure",
    async () => {
      const response = await processEvent(
        "foo",
        sampleEvent2,
        sampleRole.customer,
        {
          store: {
            getters: {
              getWeb3: jest.fn()
            }
          }
        }
      )

      expect(response?.statusAdd).toBe(false)
    }
  )

  it(
    "Should not receive Polkadot event if an address does not match, undefined or null",
    async () => {
      const response = await processEvent(
        sampleAddress,
        sampleEvent3,
        sampleRole.customer,
        {
          store: {
            getters: {
              getWeb3: jest.fn()
            }
          }
        }
      )

      expect(response?.statusAdd).toBe(false)
    }
  )

  it(
    "Should not receive Polkadot event if role not match with current event",
    async () => {
      const response = await processEvent(
        sampleAddress,
        sampleEvent3,
        sampleRole.lab,
        {
          store: {
            getters: {
              getWeb3: jest.fn()
            }
          }
        }
      )

      expect(response?.statusAdd).toBe(false)
    }
  )
})
