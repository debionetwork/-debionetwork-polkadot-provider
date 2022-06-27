import { processEvent } from "../../../src/events/index"
import { sampleAddress, sampleRole, sampleState, sampleEvent, sampleEvent2, sampleEvent3 } from "./dataSample"

describe("Polkadot Events Test", () => {
  it(
    "Should receive Polkadot event if an address match",
    async () => {
      const response = await processEvent(
        sampleState,
        sampleAddress,
        sampleEvent,
        sampleRole,
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
        sampleState,
        "foo",
        sampleEvent,
        sampleRole,
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
        sampleState,
        sampleAddress,
        sampleEvent2,
        sampleRole,
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
        sampleState,
        "foo",
        sampleEvent2,
        sampleRole,
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
        sampleState,
        sampleAddress,
        sampleEvent3,
        sampleRole,
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
