import { ApiPromise } from '@polkadot/api';
import { EventRecord } from '@polkadot/types/interfaces/system';
import { extrinsicCallback, ExtrinsicCallbackParameters, getCommandNonceAndSigner } from '../../index';
import { DoctorInfo } from '../../models/doctors';

export async function registerDoctor(
  api: ApiPromise,
  pair: any,
  data: DoctorInfo,
  callback?: () => void,
): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.doctors.registerDoctor(data).signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
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

export async function updateDoctor(
  api: ApiPromise,
  pair: any,
  data: DoctorInfo,
  callback?: () => void,
): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.doctors.updateDoctor(data).signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
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

export async function deregisterDoctor(api: ApiPromise, pair: any, callback?: () => void): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.doctors.deregisterDoctor().signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
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

export function registerDoctorFee(api: ApiPromise, pair: any, data: DoctorInfo): Promise<any> {
  return api.tx.doctors.registerDoctor(data).paymentInfo(pair);
}

export function updateDoctorFee(api: ApiPromise, pair: any, data: DoctorInfo): Promise<any> {
  return api.tx.doctors.updateDoctor(data).paymentInfo(pair);
}
