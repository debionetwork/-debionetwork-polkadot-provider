import { ApiPromise } from '@polkadot/api';
import { ElectronicMedicalRecord, ElectronicMedicalRecordFile } from '../models/electronic-medical-record';

export async function queryElectronicMedicalRecordByOwnerId(
  api: ApiPromise,
  ownerId: string,
): Promise<ElectronicMedicalRecord[]> {
  const emrIds: any = (await api.query.electronicMedicalRecord.electronicMedicalRecordByOwnerId(ownerId)).toHuman();

  const emrs: ElectronicMedicalRecord[] = new Array<ElectronicMedicalRecord>();
  for (const emrId of emrIds) {
    emrs.push(await queryElectronicMedicalRecordById(api, emrId));
  }
  return emrs;
}

export async function queryElectronicMedicalRecordById(
  api: ApiPromise,
  emrId: string,
): Promise<ElectronicMedicalRecord> {
  const res = (await api.query.electronicMedicalRecord.electronicMedicalRecordById(emrId)).toHuman();
  return new ElectronicMedicalRecord(res);
}

export async function queryElectronicMedicalRecordFileById(
  api: ApiPromise,
  fileId: string,
): Promise<ElectronicMedicalRecordFile> {
  const res = (await api.query.electronicMedicalRecord.electronicMedicalRecordFileById(fileId)).toHuman();
  return new ElectronicMedicalRecordFile(res);
}

export async function queryElectronicMedicalRecordCountByOwner(api: ApiPromise, ownerId: string): Promise<number> {
  const res: any = (await api.query.electronicMedicalRecord.electronicMedicalRecordCountByOwner(ownerId)).toHuman();
  return parseInt(res, 0);
}

export async function queryElectronicMedicalRecordCount(api: ApiPromise): Promise<number> {
  const res: any = (await api.query.electronicMedicalRecord.electronicMedicalRecordCount()).toHuman();
  return parseInt(res, 0);
}
