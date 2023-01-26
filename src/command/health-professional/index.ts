import { ApiPromise } from '@polkadot/api';
import { EventRecord } from '@polkadot/types/interfaces/system';
import { extrinsicCallback, ExtrinsicCallbackParameters, getCommandNonceAndSigner, successCallback } from '..';
import { HealthProfessionalInfo } from '../../models/health-professional/info';
import { AvailabilityStatus, VerificationStatus } from '../../primitives';

export async function registerHealthProfessional(
  api: ApiPromise,
  pair: any,
  healthProfessionalInfo: HealthProfessionalInfo,
  callback?: () => void,
): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.healthProfessional
      .register(healthProfessionalInfo)
      .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
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

export async function deregisterHealthProfessional(
  api: ApiPromise,
  pair: any,
  callback?: () => void,
): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.healthProfessional
      .deregister()
      .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
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

export async function updateHealthProfessional(
  api: ApiPromise,
  pair: any,
  healthProfessionalInfo: HealthProfessionalInfo,
  callback?: () => void,
): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.healthProfessional
      .updateInfo(healthProfessionalInfo)
      .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
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

export async function updateVerificationStatusHealthProfessional(
  api: ApiPromise,
  pair: any,
  accountId: string,
  verificationStatus: VerificationStatus,
  callback?: () => void,
): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.healthProfessional
      .updateVerificationStatus(accountId, verificationStatus)
      .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
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

export async function updateAvailabilityStatusHealthProfessional(
  api: ApiPromise,
  pair: any,
  accountId: string,
  availability: AvailabilityStatus,
  callback?: () => void,
): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.healthProfessional
      .updateAvailabilityStatus(accountId, availability)
      .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
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

export async function stakeHealthProfessional(
  api: ApiPromise,
  pair: any,
  callback?: () => void,
): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.healthProfessional
      .stake()
      .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
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

export async function unstakeHealthProfessional(
  api: ApiPromise,
  pair: any,
  callback?: () => void,
): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.healthProfessional
      .unstake()
      .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
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

export async function retrieveUnstakedAmountHealtProfessional(
  api: ApiPromise,
  pair: any,
  requestId: string,
  callback?: () => void,
): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.healthProfessional
    .retrieveUnstakedAmount()
    .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}
