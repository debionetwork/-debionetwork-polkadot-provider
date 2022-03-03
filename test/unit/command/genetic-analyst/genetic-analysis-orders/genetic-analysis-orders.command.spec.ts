import { setGeneticAnalysisOrderPaid, setGeneticAnalysisOrderRefunded, setGeneticAnalysisOrderFulfilled } from "../../../../../src/command/genetic-analyst";
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

describe('Genetic Analysis Orders Unit Testing', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.tx = {
    geneticAnalysisOrders: geneticAnalysisOrders
  };

  const signAndSendSpy = jest.spyOn(signAndSend, 'signAndSend');
  const setGeneticAnalysisOrderPaidSpy = jest.spyOn(geneticAnalysisOrders, 'setGeneticAnalysisOrderPaid');
  const setGeneticAnalysisOrderRefundedSpy = jest.spyOn(geneticAnalysisOrders, 'setGeneticAnalysisOrderRefunded');
  const fulfillGeneticAnalysisOrderSpy = jest.spyOn(geneticAnalysisOrders, 'fulfillGeneticAnalysisOrder');

  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    (successCallback as jest.Mock).mockClear();
    signAndSendSpy.mockClear();
    setGeneticAnalysisOrderPaidSpy.mockClear();
    setGeneticAnalysisOrderRefundedSpy.mockClear();
    fulfillGeneticAnalysisOrderSpy.mockClear();
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
        unsub: undefined,
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
        unsub: undefined,
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
        unsub: undefined,
      });
      expect(mockFunction).toBeCalledTimes(1);
  });
})