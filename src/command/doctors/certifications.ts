import { ApiPromise } from '@polkadot/api';
import { EventRecord } from '@polkadot/types/interfaces/system';
import { extrinsicCallback, ExtrinsicCallbackParameters } from '../../index';
import { DoctorCertificationInfo } from '../../models';

export async function createDoctorCertification(
  api: ApiPromise,
  pair: any,
  doctorCertificationInfo: DoctorCertificationInfo,
  callback?: () => void,
): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.doctorCertifications
      .createDoctorCertification(doctorCertificationInfo)
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

export function createDoctorCertificationFee(
  api: ApiPromise,
  pair: any,
  doctorCertificationInfo: DoctorCertificationInfo,
): Promise<any> {
  return api.tx.doctorCertifications.createDoctorCertification(doctorCertificationInfo).paymentInfo(pair);
}

export async function deleteDoctorCertification(
  api: ApiPromise,
  pair: any,
  doctorCertificationId: string,
  callback?: () => void,
): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.doctorCertifications
      .deleteDoctorCertification(doctorCertificationId)
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

export function deleteDoctorCertificationFee(api: ApiPromise, pair: any, doctorCertificationId: string): Promise<any> {
  return api.tx.doctorCertifications.deleteDoctorCertification(doctorCertificationId).paymentInfo(pair);
}

export async function updateDoctorCertification(
  api: ApiPromise,
  pair: any,
  doctorCertificationId: string,
  doctorCertificationInfo: DoctorCertificationInfo,
  callback?: () => void,
): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.doctorCertifications
      .updateDoctorCertification(doctorCertificationId, doctorCertificationInfo)
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

export function updateDoctorCertificationFee(
  api: ApiPromise,
  pair: any,
  doctorCertificationId: string,
  doctorCertificationInfo: DoctorCertificationInfo,
): Promise<any> {
  return api.tx.doctorCertifications
    .updateDoctorCertification(doctorCertificationId, doctorCertificationInfo)
    .paymentInfo(pair);
}
