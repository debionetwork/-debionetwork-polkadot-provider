import { ApiPromise } from '@polkadot/api';
import { EventRecord } from '@polkadot/types/interfaces/system';
import { extrinsicCallback, ExtrinsicCallbackParameters } from '../../index';
import { HospitalCertificationInfo } from '../../models';

export async function createCertification(
  api: ApiPromise,
  pair: any,
  hospitalCertificationInfo: HospitalCertificationInfo,
  callback?: () => void,
): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.hospitalCertifications
      .createCertification(hospitalCertificationInfo)
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
  hospitalCertificationInfo: HospitalCertificationInfo,
): Promise<any> {
  return api.tx.hospitalCertifications.createCertification(hospitalCertificationInfo).paymentInfo(pair);
}

export async function deleteCertification(
  api: ApiPromise,
  pair: any,
  hospitalCertificationId: string,
  callback?: () => void,
): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.hospitalCertifications
      .deleteCertification(hospitalCertificationId)
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

export function deleteCertificationFee(api: ApiPromise, pair: any, hospitalCertificationId: string): Promise<any> {
  return api.tx.hospitalCertifications.deleteCertification(hospitalCertificationId).paymentInfo(pair);
}

export async function updateCertification(
  api: ApiPromise,
  pair: any,
  hospitalCertificationId: string,
  hospitalCertificationInfo: HospitalCertificationInfo,
  callback?: () => void,
): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.hospitalCertifications
      .updateCertification(hospitalCertificationId, hospitalCertificationInfo)
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
  hospitalCertificationId: string,
  hospitalCertificationInfo: HospitalCertificationInfo,
): Promise<any> {
  return api.tx.hospitalCertifications
    .updateCertification(hospitalCertificationId, hospitalCertificationInfo)
    .paymentInfo(pair);
}
