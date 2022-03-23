import { ApiPromise } from '@polkadot/api';
import { successCallback } from '../..';

export async function createOrder(
  api: ApiPromise,
  pair: any,
  serviceId: string,
  priceIndex: number,
  customerBoxPublicKey: string,
  orderFlow: string,
  callback?: () => void,
): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.orders
    .createOrder(serviceId, priceIndex, customerBoxPublicKey, orderFlow)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function fulfillOrder(api: ApiPromise, pair: any, orderId: string, callback?: () => void): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.orders.fulfillOrder(orderId).signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
    successCallback(api, { events, status, callback, unsub });
  });
}

export async function setOrderRefunded(api: ApiPromise, pair: any, orderId, callback?: () => void): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.orders.setOrderRefunded(orderId).signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
    successCallback(api, { events, status, callback, unsub });
  });
}

export async function setOrderPaid(api: ApiPromise, pair: any, orderId, callback?: () => void): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.orders.setOrderPaid(orderId).signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
    successCallback(api, { events, status, callback, unsub });
  });
}

export async function cancelOrder(api: ApiPromise, pair: any, orderId, callback?: () => void): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.orders.cancelOrder(orderId).signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
    successCallback(api, { events, status, callback, unsub });
  });
}

export function getCreateOrderFee(
  api: ApiPromise,
  pair: any,
  serviceId: string,
  priceIndex: number,
  customerBoxPublicKey: string,
  orderFlow: string,
): any {
  return api.tx.orders.createOrder(serviceId, priceIndex, customerBoxPublicKey, orderFlow).paymentInfo(pair);
}

export async function sudoUpdateLabOrderEscrowKey(api: ApiPromise, pair: any, orderId: string, callback?: () => void): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.orders.sudoUpdateEscrowKey(orderId).signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
    successCallback(api, { events, status, callback, unsub });
  });
}

export async function updateLabOrderEscrowKey(api: ApiPromise, pair: any, orderId: string, callback?: () => void): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.orders.updateEscrowKey(orderId).signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
    successCallback(api, { events, status, callback, unsub });
  });
}