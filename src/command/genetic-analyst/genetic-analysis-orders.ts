import { ApiPromise } from '@polkadot/api';
import { successCallback } from '../..';

export async function setGeneticAnalysisOrderPaid(
  api: ApiPromise,
  pair: any,
  geneticAnalysisOrderId,
  callback?: () => void,
): Promise<void> {
  var unsub = await api.tx.geneticAnalysisOrders
    .setGeneticAnalysisOrderPaid(geneticAnalysisOrderId)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) =>
      successCallback(api, { events, status, callback, unsub }),
    );
}

export async function setGeneticAnalysisOrderRefunded(
  api: ApiPromise,
  pair: any,
  geneticAnalysisOrderId,
  callback?: () => void,
): Promise<void> {
  var unsub = await api.tx.geneticAnalysisOrders
    .setGeneticAnalysisOrderRefunded(geneticAnalysisOrderId)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) =>
      successCallback(api, { events, status, callback, unsub }),
    );
}

export async function setGeneticAnalysisOrderFulfilled(
  api: ApiPromise,
  pair: any,
  geneticAnalysisOrderId,
  callback?: () => void,
): Promise<void> {
  var unsub = await api.tx.geneticAnalysisOrders
    .fulfillGeneticAnalysisOrder(geneticAnalysisOrderId)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) =>
      successCallback(api, { events, status, callback, unsub }),
    );
}