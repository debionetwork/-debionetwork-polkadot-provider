import { ApiPromise } from '@polkadot/api';
import { successCallback } from '../index';
import { HospitalInfo } from '../models/hospitals';

export async function registerHospital(
  api: ApiPromise,
  pair: any,
  data: HospitalInfo,
  callback?: () => void,
): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.hospitals.registerHospital(data).signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
    successCallback(api, { events, status, callback, unsub });
  });
}

export async function updateHospital(
  api: ApiPromise,
  pair: any,
  data: HospitalInfo,
  callback?: () => void,
): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.hospitals.updateHospital(data).signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
    successCallback(api, { events, status, callback, unsub });
  });
}

export async function deregisterHospital(api: ApiPromise, pair: any, callback?: () => void): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.hospitals.deregisterHospital().signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
    successCallback(api, { events, status, callback, unsub });
  });
}
