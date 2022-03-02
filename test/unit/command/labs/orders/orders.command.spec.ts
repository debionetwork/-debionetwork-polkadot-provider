import { createOrder, fulfillOrder, setOrderRefunded, setOrderPaid, cancelOrder } from "../../../../../src/command/labs/orders";
import { ApiPromise, signAndSend, eventAndStatusMock } from "../../../@polkadot-api.mock";
import { mockFunction } from "../../../mock";
import { successCallback } from "../../../../../src/index";
import { orders } from "./orders.command.mock";

jest.mock('../../../mock', () => ({
  mockFunction: jest.fn(),
}));

jest.mock('../../../../../src/index', () => ({
  successCallback: jest.fn(() => mockFunction()),
}));

describe('Orders Unit Tests', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.tx = {
      orders: orders
  };
  
  const signAndSendSpy = jest.spyOn(signAndSend, 'signAndSend');
  const createOrderSpy = jest.spyOn(orders, 'createOrder');
  const fulfillOrderSpy = jest.spyOn(orders, 'fulfillOrder');
  const setOrderRefundedSpy = jest.spyOn(orders, 'setOrderRefunded');
  const setOrderPaidSpy = jest.spyOn(orders, 'setOrderPaid');
  const cancelOrderSpy = jest.spyOn(orders, 'cancelOrder');
  
  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    (successCallback as jest.Mock).mockClear();
    signAndSendSpy.mockClear();
    createOrderSpy.mockClear();
    fulfillOrderSpy.mockClear();
    setOrderRefundedSpy.mockClear();
    setOrderPaidSpy.mockClear();
    cancelOrderSpy.mockClear();
  });

  it('createOrder should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const SERVICE_ID = "SERVICE_ID";
      const BOX_PUBLIC_KEY = "BOX_PUBLIC_KEY";
      const PRICE_INDEX = 0;

      // Act
      await createOrder(
        API_PROMISE_MOCK as any, 
        PAIR,
        SERVICE_ID,
        BOX_PUBLIC_KEY,
        PRICE_INDEX,
        mockFunction
      );
        
      // Assert
      expect(createOrderSpy).toBeCalledTimes(1);
      expect(createOrderSpy).toBeCalledWith(SERVICE_ID, PRICE_INDEX, BOX_PUBLIC_KEY);
      expect(signAndSendSpy).toBeCalledTimes(1);
      expect(signAndSendSpy).toBeCalledWith(PAIR, { nonce: -1 }, expect.any(Function));
      expect(successCallback).toBeCalledTimes(1);
      expect(successCallback).toBeCalledWith(API_PROMISE_MOCK, {
          events: eventAndStatusMock.events,
          status: eventAndStatusMock.status,
          callback: mockFunction,
          unsub: undefined
      });
      expect(mockFunction).toBeCalledTimes(1);
  });

  it('fulfillOrder should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const ORDER_ID = "ORDER_ID";

      // Act
      await fulfillOrder(
        API_PROMISE_MOCK as any, 
        PAIR,
        ORDER_ID,
        mockFunction
      );
        
      // Assert
      expect(fulfillOrderSpy).toBeCalledTimes(1);
      expect(fulfillOrderSpy).toBeCalledWith(ORDER_ID);
      expect(signAndSendSpy).toBeCalledTimes(1);
      expect(signAndSendSpy).toBeCalledWith(PAIR, { nonce: -1 }, expect.any(Function));
      expect(successCallback).toBeCalledTimes(1);
      expect(successCallback).toBeCalledWith(API_PROMISE_MOCK, {
          events: eventAndStatusMock.events,
          status: eventAndStatusMock.status,
          callback: mockFunction,
          unsub: undefined
      });
      expect(mockFunction).toBeCalledTimes(1);
  });

  it('setOrderRefunded should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const ORDER_ID = "ORDER_ID";

      // Act
      await setOrderRefunded(
        API_PROMISE_MOCK as any, 
        PAIR,
        ORDER_ID,
        mockFunction
      );
        
      // Assert
      expect(setOrderRefundedSpy).toBeCalledTimes(1);
      expect(setOrderRefundedSpy).toBeCalledWith(ORDER_ID);
      expect(signAndSendSpy).toBeCalledTimes(1);
      expect(signAndSendSpy).toBeCalledWith(PAIR, { nonce: -1 }, expect.any(Function));
      expect(successCallback).toBeCalledTimes(1);
      expect(successCallback).toBeCalledWith(API_PROMISE_MOCK, {
          events: eventAndStatusMock.events,
          status: eventAndStatusMock.status,
          callback: mockFunction,
          unsub: undefined
      });
      expect(mockFunction).toBeCalledTimes(1);
  });

  it('setOrderPaid should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const ORDER_ID = "ORDER_ID";

      // Act
      await setOrderPaid(
        API_PROMISE_MOCK as any, 
        PAIR,
        ORDER_ID,
        mockFunction
      );
        
      // Assert
      expect(setOrderPaidSpy).toBeCalledTimes(1);
      expect(setOrderPaidSpy).toBeCalledWith(ORDER_ID);
      expect(signAndSendSpy).toBeCalledTimes(1);
      expect(signAndSendSpy).toBeCalledWith(PAIR, { nonce: -1 }, expect.any(Function));
      expect(successCallback).toBeCalledTimes(1);
      expect(successCallback).toBeCalledWith(API_PROMISE_MOCK, {
          events: eventAndStatusMock.events,
          status: eventAndStatusMock.status,
          callback: mockFunction,
          unsub: undefined
      });
      expect(mockFunction).toBeCalledTimes(1);
  });

  it('cancelOrder should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const ORDER_ID = "ORDER_ID";

      // Act
      await cancelOrder(
        API_PROMISE_MOCK as any, 
        PAIR,
        ORDER_ID,
        mockFunction
      );
        
      // Assert
      expect(cancelOrderSpy).toBeCalledTimes(1);
      expect(cancelOrderSpy).toBeCalledWith(ORDER_ID);
      expect(signAndSendSpy).toBeCalledTimes(1);
      expect(signAndSendSpy).toBeCalledWith(PAIR, { nonce: -1 }, expect.any(Function));
      expect(successCallback).toBeCalledTimes(1);
      expect(successCallback).toBeCalledWith(API_PROMISE_MOCK, {
          events: eventAndStatusMock.events,
          status: eventAndStatusMock.status,
          callback: mockFunction,
          unsub: undefined
      });
      expect(mockFunction).toBeCalledTimes(1);
  });
});
