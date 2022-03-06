import { ApiPromise } from '@polkadot/api';
import { successCallback } from '..';
import { ElectronicMedicalRecord } from '../models';

export async function registerElectronicMedicalRecord(api: ApiPromise, pair: any, data: ElectronicMedicalRecord, callback?: () => void): Promise<void> {
    const unsub = await api.tx.electronicMedicalRecord
    .addElectronicMedicalRecord(data.title, data.category, data.files)
      .signAndSend(pair, { nonce: -1 }, ({ events, status }) => successCallback(api, { events, status, callback }));
    unsub();
}
  
export async function updateElectronicMedicalRecord(api: ApiPromise, pair: any, data: ElectronicMedicalRecord, callback?: () => void): Promise<void> {
    const unsub = await api.tx.electronicMedicalRecord
    .updateElectronicMedicalRecord(data.id, data.title, data.category, data.files)
      .signAndSend(pair, { nonce: -1 }, ({ events, status }) => successCallback(api, { events, status, callback }));
    unsub();
}
  
export async function deregisterElectronicMedicalRecord(api: ApiPromise, pair: any, emrId: string, callback?: () => void): Promise<void> {
    const unsub = await api.tx.electronicMedicalRecord
    .removeElectronicMedicalRecord(emrId)
      .signAndSend(pair, { nonce: -1 }, ({ events, status }) => successCallback(api, { events, status, callback }));
    unsub();
}
  
export function getAddElectronicMedicalRecordFee(api: ApiPromise, pair: any, data: ElectronicMedicalRecord): Promise<any> {
    return api.tx.electronicMedicalRecord
      .addElectronicMedicalRecord(data.title, data.category, data.files)
      .paymentInfo(pair)
}
  
export function getRemoveElectronicMedicalRecordFee(api: ApiPromise, pair: any, emrId: string): Promise<any> {
    return api.tx.electronicMedicalRecord
      .removeElectronicMedicalRecord(emrId)
      .paymentInfo(pair)
}