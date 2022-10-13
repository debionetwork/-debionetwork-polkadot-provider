export const eventTypes = {
  role: {
    customer: {
      orders: {
        OrderPaid: {
          message: '',
          value: 'id',
          value_message: "You've successfully submitted your requested test for ",
          route: 'customer-payment-details',
          params: 'id',
          identity: 'customerId',
        },
        OrderFulfilled: {
          message: '',
          value: 'id',
          value_message: 'Your test results for ',
          route: 'order-history-detail',
          params: 'id',
          identity: 'customerId',
        },
        OrderRefunded: {
          message: '',
          value: 'id',
          value_message: 'Your service fee from ',
          route: 'order-history-detail',
          params: 'id',
          identity: 'customerId',
        },
      },
      geneticTesting: {
        DnaSampleProcessed: {
          message: 'Dna Sample Processed',
          value: 'tracking_id',
          value_message: 'tracking_id',
          route: 'result-test',
          params: 'number',
          identity: 'owner_id',
        },
        DnaSampleReceived: {
          message: 'Dna Sample Received',
          value: 'tracking_id',
          value_message: 'tracking_id',
          route: 'result-test',
          params: 'number',
          identity: 'owner_id',
        },
        DnaSampleProcessing: {
          message: 'Dna Sample Processing',
          value: 'tracking_id',
          value_message: 'tracking_id',
          route: 'result-test',
          params: 'number',
          identity: 'owner_id',
        },
        DnaSampleCreated: {
          message: 'Dna Sample Created',
          value: 'tracking_id',
          value_message: 'tracking_id',
          route: 'result-test',
          params: 'number',
          identity: 'owner_id',
        },
        DnaSampleRejected: {
          message: '',
          value: 'orderId',
          value_message: 'Your sample from ',
          route: 'order-history-detail',
          params: 'orderId',
          identity: 'ownerId',
        },
      },
      rewards: {
        RewardFunds: {
          message: 'Congrats! You’ve got ',
          value: 0,
          value_message: 1,
          route: '',
          params: '',
          identity: 0,
        },
      },
      electronicMedicalRecord: null,
      serviceRequest: {
        ServiceRequestFinalized: {
          message: '',
          value: 0,
          value_message: (coin: string | number) => {
            return `Congrats! You’ve got ${coin} DBIO as a reward for completing the request test from the service requested.`;
          },
          route: '',
          params: '',
          identity: 0,
        },
        ServiceRequestCreated: {
          message: '',
          value: 'hash',
          value_message: 'Congrats! You successfully submitted your requested service with staking ID ',
          route: '',
          params: '',
          identity: 0,
        },
        ServiceRequestUnstaked: {
          message: '',
          value: 1,
          value_message: 'Your stake amount has been refunded, kindly check your balance.',
          route: '',
          params: '',
          identity: 'requesterAddress',
        },
        StakingAmountExcessRefunded: {
          message: '',
          value: 2,
          value_message: (coin: string | number) => {
            return `You’ve got ${coin} DBIO from an overpayment, kindly check your balance.`;
          },
          route: '',
          params: '',
          identity: 0,
        },
        ServiceRequestClaimed: {
          message: '',
          value: 'serviceId',
          value_message: 'Congrats! Your requested service is available now. See your stake service.',
          route: 'my-test',
          params: '1',
          identity: 0,
        },
      },
      geneticAnalysisOrders: {
        GeneticAnalysisOrderPaid: {
          message: '',
          value: 'id',
          value_message: 'Congrats! You successfully submitted your requested test for ',
          route: 'customer-payment-details',
          params: 'id',
          identity: 'customerId',
        },
        GeneticAnalysisOrderRefunded: {
          message: '',
          value: 'id',
          value_message: 'Your service analysis fee from ',
          route: 'customer-payment-details',
          params: 'geneticAnalysisOrderId',
          identity: 'customerId',
        },
      },
      geneticAnalysis: {
        GeneticAnalysisRejected: {
          message: '',
          value: 'geneticAnalysisOrderId',
          value_message: 'Your sample from ',
          route: 'customer-genetic-analysis-detail',
          params: 'geneticAnalysisOrderId',
          identity: 'ownerId',
        },
        GeneticAnalysisResultReady: {
          message: '',
          value: 'geneticAnalysisOrderId',
          value_message: 'Congrats! Your DNA results for ',
          route: 'customer-genetic-analysis-result',
          params: 'geneticAnalysisOrderId',
          identity: 'ownerId',
        },
      },
    },
    lab: {
      labs: {
        LabUpdateVerificationStatus: {
          message: '',
          value: 'accountId',
          value_message: 'Your account has been',
          route: '',
          params: '',
          identity: 'accountId',
        },
      },
      orders: {
        OrderPaid: {
          message: '',
          value: 'id',
          value_message: 'A new order',
          route: 'lab-dashboard-process-order',
          params: 'orderId',
          identity: 'sellerId',
        },
      },
      serviceRequest: {
        ServiceRequestClaimed: {
          message: 'Congrats! Your requested service is available now. See your stake service.',
          value: 'serviceId',
          value_message: '',
          route: 'my-test',
          params: '1',
          identity: 0,
        },
      },
      geneticTesting: {
        DnaSampleQualityControlled: {
          message: '',
          value: 'orderId',
          value_message: 'You’ve received ',
          route: 'lab-dashboard-process-order',
          params: 'orderId',
          identity: 'labId',
        },
        DnaSampleResultReady: {
          message: '',
          value: 'orderId',
          value_message: 'You’ve received ',
          route: 'lab-dashboard-process-order',
          params: 'orderId',
          identity: 'labId',
        },
      },
      rewards: {
        RewardFunds: {
          message: 'Congrats! You’ve received ',
          value: 0,
          value_message: 1,
          route: '',
          params: '',
          identity: 0,
        },
      },
      services: {
        ServiceCreated: {
          message: '',
          value: 'id',
          value_message: "You've successfully added your new service -",
          route: 'lab-dashboard-services-detail',
          params: 'id',
          identity: 'ownerId',
        },
      },
    },
    analyst: {
      geneticAnalystServices: {
        GeneticAnalystServiceCreated: {
          message: '',
          value: 'id',
          value_message: "You've successfully added your new service -",
          route: 'ga-edit-service',
          params: 'id',
          identity: 'ownerId',
        },
      },

      geneticAnalysts: {
        GeneticAnalystUpdateVerificationStatus: {
          message: '',
          value: '',
          value_message: 'Your account',
          route: '',
          params: '',
          identity: 'accountId',
        },
        GeneticAnalystStakeSuccessful: {
          message: '',
          value: '',
          value_message: "You've successfully submitted your account verification.",
          route: '',
          params: '',
          identity: 'ownerId',
        },
      },

      geneticAnalysisOrders: {
        GeneticAnalysisOrderPaid: {
          message: '',
          value: 'id',
          value_message: 'A new order',
          route: 'ga-order-details',
          params: 'id',
          identity: 'accountId',
        },
        GeneticAnalysisOrderFulfilled: {
          message: '',
          value: 'id',
          value_message: (coin: string | number, currency: string, id: string | number) => {
            return `You've received ${coin} ${currency} for completing the requested analysis for <${id}>.`;
          },
          route: 'ga-order-details',
          params: 'id',
          identity: 'sellerId',
        },
      },
    },
  },
};
