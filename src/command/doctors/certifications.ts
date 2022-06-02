import { ApiPromise } from '@polkadot/api';
import { EventRecord } from '@polkadot/types/interfaces/system';
import { extrinsicCallback, ExtrinsicCallbackParameters } from '../../index';
import { DoctorCertificationInfo } from '../../models';

export async function createCertification(
  api: ApiPromise,
  pair: any,
  doctorCertificationInfo: DoctorCertificationInfo,
  callback?: () => void,
): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.doctorCertifications
      .createCertification(doctorCertificationInfo)
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

export function createCertificationFee(
  api: ApiPromise,
  pair: any,
  doctorCertificationInfo: DoctorCertificationInfo,
): Promise<any> {
  return api.tx.doctorCertifications.createCertification(doctorCertificationInfo).paymentInfo(pair);
}

export async function deleteCertification(
  api: ApiPromise,
  pair: any,
  doctorCertificationId: string,
  callback?: () => void,
): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.doctorCertifications
      .deleteCertification(doctorCertificationId)
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

export function deleteCertificationFee(api: ApiPromise, pair: any, doctorCertificationId: string): Promise<any> {
  return api.tx.doctorCertifications.deleteCertification(doctorCertificationId).paymentInfo(pair);
}

export async function updateCertification(
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
      .updateCertification(doctorCertificationId, doctorCertificationInfo)
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

export function updateCertificationFee(
  api: ApiPromise,
  pair: any,
  doctorCertificationId: string,
  doctorCertificationInfo: DoctorCertificationInfo,
): Promise<any> {
  return api.tx.doctorCertifications
    .updateCertification(doctorCertificationId, doctorCertificationInfo)
    .paymentInfo(pair);
}
