import { ApiPromise } from '@polkadot/api';
import { EventRecord } from '@polkadot/types/interfaces/system';
import { LabInfo, extrinsicCallback, ExtrinsicCallbackParameters } from '../../index';
import { VerificationStatus } from '../../primitives/verification-status';

export async function registerLab(
  api: ApiPromise,
  pair: any,
  data: LabInfo,
  callback?: () => void,
): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.labs.registerLab(data).signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      extrinsicCallback(api, {
        events,
        status,
        callback,
        resolve,
        reject,
        unsub,
      } as ExtrinsicCallbackParameters);
    });
  });
}

export function registerLabFee(api: ApiPromise, pair: any, data: LabInfo): Promise<any> {
  return api.tx.labs.registerLab(data).paymentInfo(pair);
}

export async function updateLab(
  api: ApiPromise,
  pair: any,
  data: LabInfo,
  callback?: () => void,
): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.labs.updateLab(data).signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      extrinsicCallback(api, {
        events,
        status,
        callback,
        resolve,
        reject,
        unsub,
      } as ExtrinsicCallbackParameters);
    });
  });
}

export function updateLabFee(api: ApiPromise, pair: any, data: LabInfo): Promise<any> {
  return api.tx.labs.updateLab(data).paymentInfo(pair);
}

export async function updateLabVerificationStatus(
  api: ApiPromise,
  pair: any,
  substrateAddress: string,
  labVerificationStatus: VerificationStatus,
  callback?: () => void,
): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.labs
      .updateLabVerificationStatus(substrateAddress, labVerificationStatus.toString())
      .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
        extrinsicCallback(api, {
          events,
          status,
          callback,
          resolve,
          reject,
          unsub,
        } as ExtrinsicCallbackParameters);
      });
  });
}

export async function deregisterLab(api: ApiPromise, pair: any, callback?: () => void): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.labs.deregisterLab().signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      extrinsicCallback(api, {
        events,
        status,
        callback,
        resolve,
        reject,
        unsub,
      } as ExtrinsicCallbackParameters);
    });
  });
}

export async function stakeLab(api: ApiPromise, pair: any, callback?: () => void): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.labs.stakeLab().signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      extrinsicCallback(api, {
        events,
        status,
        callback,
        resolve,
        reject,
        unsub,
      } as ExtrinsicCallbackParameters);
    });
  });
}

export async function unstakeLab(api: ApiPromise, pair: any, callback?: () => void): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.labs.unstakeLab().signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      extrinsicCallback(api, {
        events,
        status,
        callback,
        resolve,
        reject,
        unsub,
      } as ExtrinsicCallbackParameters);
    });
  });
}

export async function retrieveLabUnstakeAmount(
  api: ApiPromise,
  pair: any,
  accountId: string,
  callback?: () => void,
): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.labs.retrieveUnstakeAmount(accountId).signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      extrinsicCallback(api, {
        events,
        status,
        callback,
        resolve,
        reject,
        unsub,
      } as ExtrinsicCallbackParameters);
    });
  });
}

export async function updateLabMinimumStakeAmount(
  api: ApiPromise,
  pair: any,
  minimum: number,
  callback?: () => void,
): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.labs.updateMinimumStakeAmount(minimum).signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      extrinsicCallback(api, {
        events,
        status,
        callback,
        resolve,
        reject,
        unsub,
      } as ExtrinsicCallbackParameters);
    });
  });
}

export async function updateLabUnstakeTime(
  api: ApiPromise,
  pair: any,
  unstakeTime: number,
  callback?: () => void,
): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.labs.updateUnstakeTime(unstakeTime).signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      extrinsicCallback(api, {
        events,
        status,
        callback,
        resolve,
        reject,
        unsub,
      } as ExtrinsicCallbackParameters);
    });
  });
}

export async function updateLabAdminKey(
  api: ApiPromise,
  pair: any,
  accountId: string,
  callback?: () => void,
): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.labs.updateAdminKey(accountId).signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      extrinsicCallback(api, {
        events,
        status,
        callback,
        resolve,
        reject,
        unsub,
      } as ExtrinsicCallbackParameters);
    });
  });
}

export async function sudoUpdateLabAdminKey(
  api: ApiPromise,
  pair: any,
  accountId: string,
  callback?: () => void,
): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.labs.sudoUpdateAdminKey(accountId).signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      extrinsicCallback(api, {
        events,
        status,
        callback,
        resolve,
        reject,
        unsub,
      } as ExtrinsicCallbackParameters);
    });
  });
}

export * from './certifications';
export * from './genetic-testing';
export * from './orders';
export * from './services';
