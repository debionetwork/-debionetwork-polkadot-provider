import { queryLastOrderHashByCustomer, queryOrderDetailByOrderID } from "../../../../src/query/labs/orders";
import { ApiPromise } from "../../@polkadot-api.mock.ts";
import { mockFunction } from "../../mock";
import { orders } from "./orders.query.mock";
import * as order from "../../../../src/models/orders";

jest.mock('../../mock', () => ({
  mockFunction: jest.fn(),
}));

jest.mock('../../../../src/models/orders');

describe('Certifications Unit Tests', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.query = {
    orders: orders
  };
  
  const orderClassSpy = jest.spyOn(order, 'Order');
  const lastOrderByCustomerSpy = jest.spyOn(orders, 'lastOrderByCustomer');
  const ordersSpy = jest.spyOn(orders, 'orders');
  
  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    lastOrderByCustomerSpy.mockClear();
    ordersSpy.mockClear();
    orderClassSpy.mockClear();
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

  it('orders called multiple', async () => {
    // Arrange
    const ORDER_ID = "CERTIFICATION_ID";
    const RETURN_QUERY = {
        toHuman: jest.fn()
    };
    const EXPECTED_VALUE = {};
    (mockFunction as jest.Mock).mockReturnValue(RETURN_QUERY);

    // Assert
    expect(await queryOrderDetailByOrderID(API_PROMISE_MOCK as any, ORDER_ID))
      .toEqual(EXPECTED_VALUE);
    expect(mockFunction).toBeCalledTimes(1);
    expect(mockFunction).toBeCalledWith(ORDER_ID);
    expect(ordersSpy).toBeCalledTimes(1);
    expect(ordersSpy).toBeCalledWith(ORDER_ID);
    expect(RETURN_QUERY.toHuman).toBeCalledTimes(1);
    expect(orderClassSpy).toBeCalledTimes(1);
    expect(orderClassSpy).toBeCalledWith(RETURN_QUERY.toHuman());
  });
});