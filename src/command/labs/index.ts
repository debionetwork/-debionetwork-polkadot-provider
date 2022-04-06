import { ApiPromise } from '@polkadot/api';
import { LabInfo, successCallback } from '../../index';
import { VerificationStatus } from '../../primitives/verification-status';

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
  labVerificationStatus: VerificationStatus,
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

export async function stakeLab(api: ApiPromise, pair: any, callback?: () => void) {
  // tslint:disable-next-line
  var unsub = await api.tx.labs.stakeLab().signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
    successCallback(api, { events, status, callback, unsub });
  });
}

export async function unstakeLab(api: ApiPromise, pair: any, callback?: () => void) {
  // tslint:disable-next-line
  var unsub = await api.tx.labs.unstakeLab().signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
    successCallback(api, { events, status, callback, unsub });
  });
}

export async function retrieveLabUnstakeAmount(api: ApiPromise, pair: any, accountId: string, callback?: () => void) {
  // tslint:disable-next-line
  var unsub = await api.tx.labs
    .retrieveUnstakeAmount(accountId)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function updateLabMinimumStakeAmount(api: ApiPromise, pair: any, minimum: number, callback?: () => void) {
  // tslint:disable-next-line
  var unsub = await api.tx.labs
    .updateMinimumStakeAmount(minimum)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function updateLabUnstakeTime(api: ApiPromise, pair: any, unstakeTime: number, callback?: () => void) {
  // tslint:disable-next-line
  var unsub = await api.tx.labs
    .updateUnstakeTime(unstakeTime)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function updateLabAdminKey(api: ApiPromise, pair: any, accountId: string, callback?: () => void) {
  // tslint:disable-next-line
  var unsub = await api.tx.labs.updateAdminKey(accountId).signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
    successCallback(api, { events, status, callback, unsub });
  });
}

export async function sudoUpdateLabAdminKey(api: ApiPromise, pair: any, accountId: string, callback?: () => void) {
  // tslint:disable-next-line
  var unsub = await api.tx.labs.sudoUpdateAdminKey(accountId).signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
    successCallback(api, { events, status, callback, unsub });
  });
}

export * from './certifications';
export * from './genetic-testing';
export * from './orders';
export * from './services';
