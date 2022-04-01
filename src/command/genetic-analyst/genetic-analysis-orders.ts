import { ApiPromise } from '@polkadot/api';
import { successCallback } from '../..';

export async function cancelGeneticAnalysisOrder(
  api: ApiPromise,
  pair: any,
  geneticAnalysisOrderId,
  callback?: () => void,
): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.geneticAnalysisOrders
    .cancelGeneticAnalysisOrder(geneticAnalysisOrderId)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function createGeneticAnalysisOrder(
  api: ApiPromise,
  pair: any,
  geneticDataId: string,
  serviceId: string,
  priceIndex: number,
  geneticLink: string,
  customerBoxPublicKey: string,
  callback?: () => void,
): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.geneticAnalysisOrders
    .createGeneticAnalysisOrder(geneticDataId, serviceId, priceIndex, customerBoxPublicKey, geneticLink)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function setGeneticAnalysisOrderPaid(
  api: ApiPromise,
  pair: any,
  geneticAnalysisOrderId,
  callback?: () => void,
): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.geneticAnalysisOrders
    .setGeneticAnalysisOrderPaid(geneticAnalysisOrderId)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function setGeneticAnalysisOrderRefunded(
  api: ApiPromise,
  pair: any,
  geneticAnalysisOrderId,
  callback?: () => void,
): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.geneticAnalysisOrders
    .setGeneticAnalysisOrderRefunded(geneticAnalysisOrderId)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function setGeneticAnalysisOrderFulfilled(
  api: ApiPromise,
  pair: any,
  geneticAnalysisOrderId,
  callback?: () => void,
): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.geneticAnalysisOrders
    .fulfillGeneticAnalysisOrder(geneticAnalysisOrderId)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function sudoUpdateEscrowKey(api: ApiPromise, pair: any, accountId, callback?: () => void): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.geneticAnalysisOrders
    .sudoUpdateEscrowKey(accountId)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function updateEscrowKey(api: ApiPromise, pair: any, accountId, callback?: () => void): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.geneticAnalysisOrders
    .updateEscrowKey(accountId)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function cancelGeneticAnalysisOrderFee(
  api: ApiPromise,
  pair: any,
  geneticAnalysisOrderId
): Promise<any> {
  // tslint:disable-next-line
  return api.tx.geneticAnalysisOrders
    .cancelGeneticAnalysisOrder(geneticAnalysisOrderId)
    .paymentInfo(pair);
}

export async function createGeneticAnalysisOrderFee(
  api: ApiPromise,
  pair: any,
  geneticDataId: string,
  serviceId: string,
  priceIndex: number,
  geneticLink: string,
  customerBoxPublicKey: string
): Promise<any> {
  // tslint:disable-next-line
  return api.tx.geneticAnalysisOrders
    .createGeneticAnalysisOrder(geneticDataId, serviceId, priceIndex, customerBoxPublicKey, geneticLink)
    .paymentInfo(pair);
}