export const sampleAddress = "sampleAddress"
export const sampleRole = { customer: "customer", lab: "lab", analyst: "analyst" }
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
    "sampleAnotherAddress",
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
  "method": "ServiceRequestUnstaked"
}

export const sampleEvent3 = {
  "index": "sampleIndex",
  "data": [
    "sampleAnotherAddress",
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
  ],
  "section": "serviceRequest",
  "method": "ServiceRequestUnstaked"
}

export const sampleEvent4 = {
  "index": "0x1801",
  "data": [
    {
      "id": "sampleIdHash",
      "serviceId": "sampleServiceIdHash",
      "customerId": "sampleCustId",
      "customerBoxPublicKey": "sampleCustomerPublicKey",
      "sellerId": "sampleAddress",
      "dnaSampleTrackingId": "SampleDNA",
      "currency": "DAI",
      "prices": [
        {
          "component": "0x74657374696e675f7072696365",
          "value": "1,000,000,000,000,000,000"
        }
      ],
      "additionalPrices": [
        {
          "component": "0x71635f7072696365",
          "value": "1,000,000,000,000,000,000"
        }
      ],
      "status": "Paid",
      "orderFlow": "RequestTest",
      "createdAt": 1656564228000,
      "updatedAt": 1656564408000
    }
  ],
  "section": "orders",
  "method": "OrderPaid"
}

export const sampleEvent5 = {
  "index": "0x1500",
  "data": [
    {
      "id": "sampleIdHash",
      "ownerId": "sampleAddress",
      "info": {
        "name": "ServiceName",
        "pricesByCurrency": [
          {
            "currency": "DAI",
            "totalPrice": "0x00000000000000001bc16d674ec80000",
            "priceComponents": [
              {
                "component": "0x74657374696e675f7072696365",
                "value": "1,000,000,000,000,000,000"
              }
            ],
            "additionalPrices": [
              {
                "component": "0x71635f7072696365",
                "value": "1,000,000,000,000,000,000"
              }
            ]
          }
        ],
        "expectedDuration": {
          "duration": 1,
          "durationType": "Days"
        },
        "category": "sampleCategory",
        "description": "sampleDesc",
        "dnaCollectionProcess": "sampleDNA",
        "testResultSample": "sampleResult",
        "longDescription": "sampleDesc",
        "image": "sampleImage"
      },
      "serviceFlow": "RequestTest"
    },
    "sampleAddress"
  ],
  "section": "services",
  "method": "ServiceCreated"
}

export const sampleEvent6 = {
  "index": "0x2300",
  "data": [
    {
      "id": "sampleIdHash",
      "ownerId": "sampleAddress",
      "info": {
        "name": "Test Service",
        "pricesByCurrency": [
          {
            "currency": "DBIO",
            "totalPrice": "1,000,000,000,000,000,000",
            "priceComponents": [
              {
                "component": "Main Price",
                "value": "1,000,000,000,000,000,000"
              }
            ],
            "additionalPrices": []
          }
        ],
        "expectedDuration": {
          "duration": 1,
          "durationType": "Days"
        },
        "description": "test service",
        "testResultSample": "link"
      }
    },
    "sampleAddress"
  ],
  "section": "geneticAnalystServices",
  "method": "GeneticAnalystServiceCreated"
}
