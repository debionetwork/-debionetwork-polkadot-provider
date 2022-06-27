export const sampleAddress = "sampleAddress"
export const sampleRole = "customer"
export const sampleState = {
  configEvent: {
    "role": {
      "customer": {
        "serviceRequest": {
          "ServiceRequestCreated": {
            "message": "",
            "value": "hash",
            "value_message": "Congrats! You successfully submitted your requested service with staking ID ",
            "route": "",
            "params": "",
            "identity": 0
          },
          "ServiceRequestUnstaked": {
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
  "section": "serviceRequest",
  "method": "ServiceRequestCreated"
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
  "section": "serviceRequest",
  "method": "ServiceRequestCreated"
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
  "section": "serviceRequest",
  "method": "ServiceRequestUnstaked"
}
