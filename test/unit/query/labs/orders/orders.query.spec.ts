import { Order } from "../../../../../src/models/labs/orders";
import { queryLastOrderHashByCustomer, queryOrderDetailByOrderID, queryOrdersByCustomer, queryOrdersBySeller } from "../../../../../src/query/labs/orders";
import { ApiPromise } from "../../../@polkadot-api.mock";
import { mockFunction } from "../../../mock";
import { orderDataMock } from "../../../models/labs/orders.mock";
import { orders } from "./orders.query.mock";
import { when } from 'jest-when';

jest.mock('../../../mock', () => ({
  mockFunction: jest.fn(),
}));

describe('Orders Queries Unit Tests', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.query = {
    orders: orders
  };
  
  const lastOrderByCustomerSpy = jest.spyOn(orders, 'lastOrderByCustomer');
  const ordersSpy = jest.spyOn(orders, 'orders');
  const ordersBySellerSpy = jest.spyOn(orders, "ordersBySeller");
  const ordersByCustomerSpy = jest.spyOn(orders, "ordersByCustomer");
  
  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    lastOrderByCustomerSpy.mockClear();
    ordersSpy.mockClear();
    ordersBySellerSpy.mockClear();
    ordersByCustomerSpy.mockClear();
  });

  it('lastOrderByCustomer should return', async () => {
    // Arrange
    const PARAM = "PARAM";
    const EXPECTED_VALUE = "VALUE";
    (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);

    // Assert
    expect(await queryLastOrderHashByCustomer(API_PROMISE_MOCK as any, PARAM))
      .toEqual(EXPECTED_VALUE);
    expect(mockFunction).toBeCalledTimes(1);
    expect(mockFunction).toBeCalledWith(PARAM);
    expect(lastOrderByCustomerSpy).toBeCalledTimes(1);
    expect(lastOrderByCustomerSpy).toBeCalledWith(PARAM);
  });

  it('orders should return', async () => {
    // Arrange
    const ORDER_ID = "ORDER_ID";
    const EXPECTED_VALUE = new Order(orderDataMock);
    (mockFunction as jest.Mock).mockReturnValue(orderDataMock);

    // Assert
    expect(await queryOrderDetailByOrderID(API_PROMISE_MOCK as any, ORDER_ID))
      .toEqual(EXPECTED_VALUE);
    expect(mockFunction).toBeCalledTimes(1);
    expect(mockFunction).toBeCalledWith(ORDER_ID);
    expect(ordersSpy).toBeCalledTimes(1);
    expect(ordersSpy).toBeCalledWith(ORDER_ID);
  });

  it('queryOrdersByCustomer should return', async () => {
    // Arrange
    const CUSTOMER_ID = "CUSTOMER_ID";
    const ORDER_ID = "ORDER_ID";
    const ORDER_IDS = [ ORDER_ID ];
    const EXPECTED_VALUE = new Order(orderDataMock);

    when(mockFunction)
      .calledWith(CUSTOMER_ID)
      .mockReturnValue(ORDER_IDS);
    when(mockFunction)
      .calledWith(ORDER_ID)
      .mockReturnValue(EXPECTED_VALUE);

    // Assert
    expect(await queryOrdersByCustomer(API_PROMISE_MOCK as any, CUSTOMER_ID))
      .toEqual([EXPECTED_VALUE]);
    expect(mockFunction).toBeCalledTimes(2);
    expect(mockFunction).toBeCalledWith(CUSTOMER_ID);
    expect(ordersByCustomerSpy).toBeCalledTimes(1);
    expect(ordersByCustomerSpy).toBeCalledWith(CUSTOMER_ID);
    expect(ordersSpy).toBeCalledTimes(1);
    expect(ordersSpy).toBeCalledWith(ORDER_ID);
  });

  it('queryOrdersBySeller should return', async () => {
    // Arrange
    const SELLER_ID = "SELLER_ID";
    const ORDER_ID = "ORDER_ID";
    const ORDER_IDS = [ ORDER_ID ];
    const EXPECTED_VALUE = new Order(orderDataMock);

    when(mockFunction)
      .calledWith(SELLER_ID)
      .mockReturnValue(ORDER_IDS);
    when(mockFunction)
      .calledWith(ORDER_ID)
      .mockReturnValue(EXPECTED_VALUE);

    // Assert
    expect(await queryOrdersBySeller(API_PROMISE_MOCK as any, SELLER_ID))
      .toEqual([EXPECTED_VALUE]);
    expect(mockFunction).toBeCalledTimes(2);
    expect(mockFunction).toBeCalledWith(SELLER_ID);
    expect(ordersBySellerSpy).toBeCalledTimes(1);
    expect(ordersBySellerSpy).toBeCalledWith(SELLER_ID);
    expect(ordersSpy).toBeCalledTimes(1);
    expect(ordersSpy).toBeCalledWith(ORDER_ID);
  });
});