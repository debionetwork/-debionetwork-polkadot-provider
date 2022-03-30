import { ApiPromise } from '@polkadot/api';
import { successCallback } from '../..';
import { GeneticAnalystServiceInfo } from '../../models';

export async function bulkCreateGeneticAnalystService(
  api: ApiPromise,
  pair: any,
  geneticAnalystServiceInfo: GeneticAnalystServiceInfo,
  callback?: () => void,
): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.geneticAnalystServices
    .bulkCreateGeneticAnalystService(geneticAnalystServiceInfo)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function createGeneticAnalystService(
  api: ApiPromise,
  pair: any,
  geneticAnalystServiceInfo: GeneticAnalystServiceInfo,
  callback?: () => void,
): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.geneticAnalystServices
    .createGeneticAnalystService(geneticAnalystServiceInfo)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function updateGeneticAnalystService(
  api: ApiPromise,
  pair: any,
  geneticAnalystServiceId: string,
  geneticAnalystServiceInfo: GeneticAnalystServiceInfo,
  callback?: () => void,
): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.geneticAnalystServices
    .updateGeneticAnalystService(geneticAnalystServiceId, geneticAnalystServiceInfo)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function deleteGeneticAnalystService(
  api: ApiPromise,
  pair: any,
  geneticAnalystServiceId: string,
  callback?: () => void,
): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.geneticAnalystServices
    .deleteGeneticAnalystService(geneticAnalystServiceId)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function bulkCreateGeneticAnalystServiceFee(
  api: ApiPromise,
  pair: any,
  geneticAnalystServiceInfo: GeneticAnalystServiceInfo,
): Promise<any> {
  return api.tx.geneticAnalystServices.bulkCreateGeneticAnalystService(geneticAnalystServiceInfo).paymentInfo(pair);
}

export async function createGeneticAnalystServiceFee(
  api: ApiPromise,
  pair: any,
  geneticAnalystServiceInfo: GeneticAnalystServiceInfo,
): Promise<any> {
  return api.tx.geneticAnalystServices.createGeneticAnalystService(geneticAnalystServiceInfo).paymentInfo(pair);
}

export async function updateGeneticAnalystServiceFee(
  api: ApiPromise,
  pair: any,
  geneticAnalystServiceId: string,
  geneticAnalystServiceInfo: GeneticAnalystServiceInfo,
): Promise<any> {
  return api.tx.geneticAnalystServices
    .updateGeneticAnalystService(geneticAnalystServiceId, geneticAnalystServiceInfo)
    .paymentInfo(pair);
}

export async function deleteGeneticAnalystServiceFee(
  api: ApiPromise,
  pair: any,
  geneticAnalystServiceId: string,
): Promise<any> {
  return api.tx.geneticAnalystServices.deleteGeneticAnalystService(geneticAnalystServiceId).paymentInfo(pair);
}
