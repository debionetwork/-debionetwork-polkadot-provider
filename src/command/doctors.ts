import { ApiPromise } from '@polkadot/api';
import { DoctorInfo } from '../models/doctors';
import { successCallback } from '../index';

export async function registerDoctor(
  api: ApiPromise,
  pair: any,
  data: DoctorInfo,
  callback?: () => void,
): Promise<void> {
  const unsub = await api.tx.doctors.registerDoctor(data).signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
    successCallback(api, { events, status, callback });
  });
  unsub();
}

export async function updateDoctor(api: ApiPromise, pair: any, data: DoctorInfo, callback?: () => void): Promise<void> {
  const unsub = await api.tx.doctors.updateDoctor(data).signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
    successCallback(api, { events, status, callback });
  });
  unsub();
}

export async function deregisterDoctor(api: ApiPromise, pair: any, callback?: () => void): Promise<void> {
  const unsub = await api.tx.doctors.deregisterDoctor().signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
    successCallback(api, { events, status, callback });
  });
  unsub();
}
