export const sampleAddress = "sampleAddress"
export const sampleRole = "sampleRole"
export const sampleState = {
  configEvent: {
    "role": {
      "sampleRole": {
        "sampleSection": {
          "sampleMethod1": {
            "message": "",
            "value": "hash",
            "value_message": "Congrats! You successfully submitted your requested service with staking ID ",
            "route": "",
            "params": "",
            "identity": 0
          },
          "sampleMethod2": {
            "message": "Your stake amount has been refunded, kindly check your balance.",
            "value": 1,
            "value_message": "",
            "route": "",
            "params": "",
            "identity": "requesterAddress"
          }
        }
      }
    }
  }
}
export const sampleEvent = {
  "index": "sampleIndex",
  "data": [
    "sampleAddress",
    {
      "hash": "sampleHash",
      "requesterAddress": "sampleAddress",
      "labAddress": null,
      "country": "sampleCountry",
      "region": "sampleRegion",
      "city": "sampleCity",
      "serviceCategory": "sampleServiceCategory",
      "stakingAmount": "sampleStakingAmount",
      "status": "Open",
      "createdAt": "now",
      "updatedAt": null,
      "unstakedAt": null
    }
  ],
  section: "sampleSection",
  method: "sampleMethod1"
}

export const sampleEvent2 = {
  "index": "sampleIndex",
  "data": [
    "sampleAddress",
    [
      {
        "hash": "sampleHash",
        "requesterAddress": "sampleAddress",
        "labAddress": null,
        "country": "sampleCountry",
        "region": "sampleRegion",
        "city": "sampleCity",
        "serviceCategory": "sampleServiceCategory",
        "stakingAmount": "sampleStakingAmount",
        "status": "Open",
        "createdAt": "now",
        "updatedAt": null,
        "unstakedAt": null
      }
    ]
  ],
  section: "sampleSection",
  method: "sampleMethod1"
}

export const sampleEvent3 = {
  "index": "sampleIndex",
  "data": [
    "sampleAddress",
    [
      {
        "hash": "sampleHash",
        "requesterAddress": null,
        "labAddress": null,
        "country": "sampleCountry",
        "region": "sampleRegion",
        "city": "sampleCity",
        "serviceCategory": "sampleServiceCategory",
        "stakingAmount": "sampleStakingAmount",
        "status": "Open",
        "createdAt": "now",
        "updatedAt": null,
        "unstakedAt": null
      }
    ]
  ],
  section: "sampleSection",
  method: "sampleMethod2"
}

const handler = {
  sampleSection: async ({ dataEvent, value, valueMessage, event }) => {
    const data = dataEvent
    const id = isNaN(value) ? data[0][value] : data[value]
    const params = { page: 1 }
    let wording = valueMessage

    if (event.method === "sampleMethod1") {
      const formatedHash = `${data[1]?.hash?.substr(0, 4)}...${data[1]?.hash?.substr(data[1]?.hash?.length - 4)}`
      wording = `${valueMessage} (${formatedHash}).`
    }

    return { data, id, params, wording }
  }
}

export const sampleHandler = new Proxy(handler, {})
