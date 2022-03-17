import { ApiPromise } from '@polkadot/api';
import { Order } from '../..';

export async function queryLastOrderHashByCustomer(api: ApiPromise, substrateAddress: string): Promise<string> {
  return (await api.query.orders.lastOrderByCustomer(substrateAddress)).toString();
}

export async function queryOrderDetailByOrderID(api: ApiPromise, orderID: string): Promise<Order> {
  const res = (await api.query.orders.orders(orderID)).toHuman();
  return new Order(res);
}

export async function queryOrdersByCustomer(api: ApiPromise, customerId: string): Promise<Order[]> {
  const ids = (await api.query.orders.ordersByCustomer(customerId)).toHuman() as Array<string>;
  const orders: Array<Order> = new Array<Order>();

  for (let i = 0; i < ids.length; i++) {
    const order = await queryOrderDetailByOrderID(api, ids[i]);
    orders.push(order);
  }

  return orders;
}

export async function queryOrdersBySeller(api: ApiPromise, sellerId: string): Promise<Order[]> {
  const ids = (await api.query.orders.ordersBySeller(sellerId)).toHuman() as Array<string>;
  const orders: Array<Order> = new Array<Order>();

  for (let i = 0; i < ids.length; i++) {
    const order = await queryOrderDetailByOrderID(api, ids[i]);
    orders.push(order);
  }

  return orders;
}