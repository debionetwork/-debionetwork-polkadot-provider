import { ApiPromise } from '@polkadot/api';
import { LabInfo, LabVerificationStatus, successCallback } from '../../index';

export async function registerLab(api: ApiPromise, pair: any, data: LabInfo, callback?: () => void): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.labs.registerLab(data).signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
    successCallback(api, { events, status, callback, unsub });
  });
}

export async function updateLab(api: ApiPromise, pair: any, data: LabInfo, callback?: () => void): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.labs.updateLab(data).signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
    successCallback(api, { events, status, callback, unsub });
  });
}

export async function updateLabVerificationStatus(
  api: ApiPromise,
  pair: any,
  substrateAddress: string,
  labVerificationStatus: LabVerificationStatus,
  callback?: () => void,
): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.labs
    .updateLabVerificationStatus(substrateAddress, labVerificationStatus.toString())
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function deregisterLab(api: ApiPromise, pair: any, callback?: () => void): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.labs.deregisterLab().signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
    successCallback(api, { events, status, callback, unsub });
  });
}

export * from './genetic-testing';
export * from './orders';
export * from './certifications';
