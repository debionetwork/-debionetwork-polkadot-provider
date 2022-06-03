import { ApiPromise } from '@polkadot/api';
import { EventRecord } from '@polkadot/types/interfaces/system';
import { extrinsicCallback, ExtrinsicCallbackParameters } from '../../index';
import { HospitalInfo } from '../../models/hospitals';

export async function registerHospital(
  api: ApiPromise,
  pair: any,
  data: HospitalInfo,
  callback?: () => void,
): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.hospitals.registerHospital(data).signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
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

export async function updateHospital(
  api: ApiPromise,
  pair: any,
  data: HospitalInfo,
  callback?: () => void,
): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.hospitals.updateHospital(data).signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
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

export async function deregisterHospital(api: ApiPromise, pair: any, callback?: () => void): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.hospitals.deregisterHospital().signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
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

export function registerHospitalFee(api: ApiPromise, pair: any, data: HospitalInfo): Promise<any> {
  return api.tx.hospitals.registerHospital(data).paymentInfo(pair);
}

export function updateHospitalFee(api: ApiPromise, pair: any, data: HospitalInfo): Promise<any> {
  return api.tx.hospitals.updateHospital(data).paymentInfo(pair);
}
