import { ApiPromise } from '@polkadot/api';
import { successCallback } from '..';
import { ElectronicMedicalRecordInput } from '../models';

export async function registerElectronicMedicalRecord(
  api: ApiPromise,
  pair: any,
  data: ElectronicMedicalRecordInput,
  callback?: () => void,
): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.electronicMedicalRecord
    .addElectronicMedicalRecord(data.title, data.category, data.files)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function updateElectronicMedicalRecord(
  api: ApiPromise,
  pair: any,
  data: ElectronicMedicalRecordInput,
  callback?: () => void,
): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.electronicMedicalRecord
    .updateElectronicMedicalRecord(data.id, data.title, data.category, data.files)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function deregisterElectronicMedicalRecord(
  api: ApiPromise,
  pair: any,
  emrId: string,
  callback?: () => void,
): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.electronicMedicalRecord
    .removeElectronicMedicalRecord(emrId)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function getAddElectronicMedicalRecordFee(
  api: ApiPromise,
  pair: any,
  data: ElectronicMedicalRecordInput,
): Promise<any> {
  return await api.tx.electronicMedicalRecord
    .addElectronicMedicalRecord(data.title, data.category, data.files)
    .paymentInfo(pair);
}

export async function getRemoveElectronicMedicalRecordFee(api: ApiPromise, pair: any, emrId: string): Promise<any> {
  return await api.tx.electronicMedicalRecord.removeElectronicMedicalRecord(emrId).paymentInfo(pair);
}
