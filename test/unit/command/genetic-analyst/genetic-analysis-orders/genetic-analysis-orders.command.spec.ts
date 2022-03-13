import {
  cancelGeneticAnalysisOrder,
  createGeneticAnalysisOrder,
  setGeneticAnalysisOrderPaid,
  setGeneticAnalysisOrderRefunded,
  setGeneticAnalysisOrderFulfilled,
  sudoUpdateEscrowKey,
  updateEscrowKey
} from "../../../../../src/command/genetic-analyst";
import { successCallback } from "../../../../../src/index";
import { ApiPromise, eventAndStatusMock, signAndSend } from "../../../@polkadot-api.mock";
import { mockFunction } from "../../../mock";
import { geneticAnalysisOrders } from "./genetic-analysis-orders.command.mock";

jest.mock('../../../mock', () => ({
  mockFunction: jest.fn(),
}));

jest.mock('../../../../../src/index', () => ({
  successCallback: jest.fn(() => mockFunction()),
}));

describe('Genetic Analysis Orders Commands Unit Testing', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.tx = {
    geneticAnalysisOrders: geneticAnalysisOrders
  };

  const signAndSendSpy = jest.spyOn(signAndSend, 'signAndSend');
  const cancelGeneticAnalysisOrderSpy = jest.spyOn(geneticAnalysisOrders, 'cancelGeneticAnalysisOrder');
  const createGeneticAnalysisOrderSpy = jest.spyOn(geneticAnalysisOrders, 'createGeneticAnalysisOrder');
  const setGeneticAnalysisOrderPaidSpy = jest.spyOn(geneticAnalysisOrders, 'setGeneticAnalysisOrderPaid');
  const setGeneticAnalysisOrderRefundedSpy = jest.spyOn(geneticAnalysisOrders, 'setGeneticAnalysisOrderRefunded');
  const fulfillGeneticAnalysisOrderSpy = jest.spyOn(geneticAnalysisOrders, 'fulfillGeneticAnalysisOrder');
  const sudoUpdateEscrowKeySpy = jest.spyOn(geneticAnalysisOrders, 'sudoUpdateEscrowKey');
  const updateEscrowKeySpy = jest.spyOn(geneticAnalysisOrders, 'updateEscrowKey');

  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    (successCallback as jest.Mock).mockClear();
    signAndSendSpy.mockClear();
    cancelGeneticAnalysisOrderSpy.mockClear();
    createGeneticAnalysisOrderSpy.mockClear();
    setGeneticAnalysisOrderPaidSpy.mockClear();
    setGeneticAnalysisOrderRefundedSpy.mockClear();
    fulfillGeneticAnalysisOrderSpy.mockClear();
    sudoUpdateEscrowKeySpy.mockClear();
    updateEscrowKeySpy.mockClear();
  });
  
  it('cancelGeneticAnalysisOrder should return', async () => {
    // Arrange
    const PAIR = "PAIR";
    const ORDER_ID = "ORDER_ID";

    // Act
    await cancelGeneticAnalysisOrder(
      API_PROMISE_MOCK as any, 
      PAIR,
      ORDER_ID,
      mockFunction
    );

    expect(cancelGeneticAnalysisOrderSpy).toBeCalledTimes(1);
    expect(cancelGeneticAnalysisOrderSpy).toBeCalledWith(ORDER_ID);
    expect(signAndSendSpy).toBeCalledTimes(1);
    expect(signAndSendSpy).toBeCalledWith(PAIR, { nonce: -1 }, expect.any(Function));
    expect(successCallback).toBeCalledTimes(1);
    expect(successCallback).toBeCalledWith(API_PROMISE_MOCK, { 
      events: eventAndStatusMock.events, 
      status: eventAndStatusMock.status, 
      callback: mockFunction,
    });
    expect(mockFunction).toBeCalledTimes(1);
  });

  it('createGeneticAnalysisOrder should return', async () => {
    // Arrange
    const PAIR = "PAIR";
    const GENETIC_DATA_ID = "GENETIC_DATA_ID";
    const SERVICE_ID = "SERVICE_ID";
    const PRICE_INDEX = 0;
    const GENETIC_LINK = "GENETIC_LINK";
    const CUSTOMER_BOX_PUBLIC_KEY = "CUSTOMER_BOX_PUBLIC_KEY";

    // Act
    await createGeneticAnalysisOrder(
      API_PROMISE_MOCK as any, 
      PAIR,
      GENETIC_DATA_ID,
      SERVICE_ID,
      PRICE_INDEX,
      GENETIC_LINK,
      CUSTOMER_BOX_PUBLIC_KEY,
      mockFunction
    );

    expect(createGeneticAnalysisOrderSpy).toBeCalledTimes(1);
    expect(createGeneticAnalysisOrderSpy).toBeCalledWith(
      GENETIC_DATA_ID,
      SERVICE_ID,
      PRICE_INDEX,
      CUSTOMER_BOX_PUBLIC_KEY,
      GENETIC_LINK,
      );
    expect(signAndSendSpy).toBeCalledTimes(1);
    expect(signAndSendSpy).toBeCalledWith(PAIR, { nonce: -1 }, expect.any(Function));
    expect(successCallback).toBeCalledTimes(1);
    expect(successCallback).toBeCalledWith(API_PROMISE_MOCK, { 
      events: eventAndStatusMock.events, 
      status: eventAndStatusMock.status, 
      callback: mockFunction,
    });
    expect(mockFunction).toBeCalledTimes(1);
  });

  it('setGeneticAnalysisOrderRefunded should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const ORDER_ID = "ORDER_ID";

      // Act
      await setGeneticAnalysisOrderRefunded(
        API_PROMISE_MOCK as any, 
        PAIR,
        ORDER_ID,
        mockFunction
      );

      expect(setGeneticAnalysisOrderRefundedSpy).toBeCalledTimes(1);
      expect(setGeneticAnalysisOrderRefundedSpy).toBeCalledWith(ORDER_ID);
      expect(signAndSendSpy).toBeCalledTimes(1);
      expect(signAndSendSpy).toBeCalledWith(PAIR, { nonce: -1 }, expect.any(Function));
      expect(successCallback).toBeCalledTimes(1);
      expect(successCallback).toBeCalledWith(API_PROMISE_MOCK, { 
        events: eventAndStatusMock.events, 
        status: eventAndStatusMock.status, 
        callback: mockFunction,
      });
      expect(mockFunction).toBeCalledTimes(1);
  });
  
  it('setGeneticAnalysisOrderPaid should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const ORDER_ID = "ORDER_ID";

      // Act
      await setGeneticAnalysisOrderPaid(
        API_PROMISE_MOCK as any, 
        PAIR,
        ORDER_ID,
        mockFunction
      );

      expect(setGeneticAnalysisOrderPaidSpy).toBeCalledTimes(1);
      expect(setGeneticAnalysisOrderPaidSpy).toBeCalledWith(ORDER_ID);
      expect(signAndSendSpy).toBeCalledTimes(1);
      expect(signAndSendSpy).toBeCalledWith(PAIR, { nonce: -1 }, expect.any(Function));
      expect(successCallback).toBeCalledTimes(1);
      expect(successCallback).toBeCalledWith(API_PROMISE_MOCK, { 
        events: eventAndStatusMock.events, 
        status: eventAndStatusMock.status, 
        callback: mockFunction,
      });
      expect(mockFunction).toBeCalledTimes(1);
  });
  
  it('setGeneticAnalysisOrderFulfilled should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const ORDER_ID = "ORDER_ID";

      // Act
      await setGeneticAnalysisOrderFulfilled(
        API_PROMISE_MOCK as any, 
        PAIR,
        ORDER_ID,
        mockFunction
      );

      expect(fulfillGeneticAnalysisOrderSpy).toBeCalledTimes(1);
      expect(fulfillGeneticAnalysisOrderSpy).toBeCalledWith(ORDER_ID);
      expect(signAndSendSpy).toBeCalledTimes(1);
      expect(signAndSendSpy).toBeCalledWith(PAIR, { nonce: -1 }, expect.any(Function));
      expect(successCallback).toBeCalledTimes(1);
      expect(successCallback).toBeCalledWith(API_PROMISE_MOCK, { 
        events: eventAndStatusMock.events, 
        status: eventAndStatusMock.status, 
        callback: mockFunction,
      });
      expect(mockFunction).toBeCalledTimes(1);
  });

  it('sudoUpdateEscrowKey should return', async () => {
    // Arrange
    const PAIR = "PAIR";
    const CUSTOMER_ID = "CUSTOMER_ID";

    // Act
    await sudoUpdateEscrowKey(
      API_PROMISE_MOCK as any, 
      PAIR,
      CUSTOMER_ID,
      mockFunction
    );

    expect(sudoUpdateEscrowKeySpy).toBeCalledTimes(1);
    expect(sudoUpdateEscrowKeySpy).toBeCalledWith(CUSTOMER_ID);
    expect(signAndSendSpy).toBeCalledTimes(1);
    expect(signAndSendSpy).toBeCalledWith(PAIR, { nonce: -1 }, expect.any(Function));
    expect(successCallback).toBeCalledTimes(1);
    expect(successCallback).toBeCalledWith(API_PROMISE_MOCK, { 
      events: eventAndStatusMock.events, 
      status: eventAndStatusMock.status, 
      callback: mockFunction,
    });
    expect(mockFunction).toBeCalledTimes(1);
  });

  it('updateEscrowKey should return', async () => {
    // Arrange
    const PAIR = "PAIR";
    const CUSTOMER_ID = "CUSTOMER_ID";

    // Act
    await updateEscrowKey(
      API_PROMISE_MOCK as any, 
      PAIR,
      CUSTOMER_ID,
      mockFunction
    );

    expect(updateEscrowKeySpy).toBeCalledTimes(1);
    expect(updateEscrowKeySpy).toBeCalledWith(CUSTOMER_ID);
    expect(signAndSendSpy).toBeCalledTimes(1);
    expect(signAndSendSpy).toBeCalledWith(PAIR, { nonce: -1 }, expect.any(Function));
    expect(successCallback).toBeCalledTimes(1);
    expect(successCallback).toBeCalledWith(API_PROMISE_MOCK, { 
      events: eventAndStatusMock.events, 
      status: eventAndStatusMock.status, 
      callback: mockFunction,
    });
    expect(mockFunction).toBeCalledTimes(1);
  });
})