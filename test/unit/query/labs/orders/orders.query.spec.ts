import { Order } from "../../../../../src/models/orders";
import { queryLastOrderHashByCustomer, queryOrderDetailByOrderID } from "../../../../../src/query/labs/orders";
import { ApiPromise } from "../../../@polkadot-api.mock";
import { mockFunction } from "../../../mock";
import { orders, orderDataMock } from "./orders.query.mock";

jest.mock('../../../mock', () => ({
  mockFunction: jest.fn(),
}));

describe('Orders Unit Tests', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.query = {
    orders: orders
  };
  
  const lastOrderByCustomerSpy = jest.spyOn(orders, 'lastOrderByCustomer');
  const ordersSpy = jest.spyOn(orders, 'orders');
  
  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    lastOrderByCustomerSpy.mockClear();
    ordersSpy.mockClear();
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
});