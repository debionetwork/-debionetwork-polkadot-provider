import { ApiPromise } from '@polkadot/api';
import { successCallback, getCommandNonceAndSigner } from '../../index';

export async function addGeneticData(
  api: ApiPromise,
  pair: any,
  title: string,
  description: string,
  link: string,
  callback?: () => void,
): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.geneticData
    .addGeneticData(title, description, link)
    .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function updateGeneticData(
  api: ApiPromise,
  pair: any,
  id: string,
  title: string,
  description: string,
  link: string,
  callback?: () => void,
): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.geneticData
    .updateGeneticData(id, title, description, link)
    .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function removeGeneticData(api: ApiPromise, pair: any, id: string, callback?: () => void): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.geneticData
    .removeGeneticData(id)
    .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export function addGeneticDataFee(api: ApiPromise, pair: any, title: string, description: string, link: string): any {
  return api.tx.geneticData.addGeneticData(title, description, link).paymentInfo(pair);
}

export function updateGeneticDataFee(
  api: ApiPromise,
  pair: any,
  id: string,
  title: string,
  description: string,
  link: string,
): any {
  return api.tx.geneticData.updateGeneticData(id, title, description, link).paymentInfo(pair);
}

export function removeGeneticDataFee(api: ApiPromise, pair: any, id: string): any {
  return api.tx.geneticData.removeGeneticData(id).paymentInfo(pair);
}
