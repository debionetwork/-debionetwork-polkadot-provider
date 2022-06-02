import { ApiPromise } from '@polkadot/api';
import { EventRecord } from '@polkadot/types/interfaces/system';
import { extrinsicCallback, ExtrinsicCallbackParameters } from '../../index';
import { HospitalCertificationInfo } from '../../models';

export async function createHospitalCertification(
  api: ApiPromise,
  pair: any,
  hospitalCertificationInfo: HospitalCertificationInfo,
  callback?: () => void,
): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.hospitalCertifications
      .createHospitalCertification(hospitalCertificationInfo)
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

export function createHospitalCertificationFee(api: ApiPromise, pair: any, hospitalCertificationInfo: HospitalCertificationInfo): Promise<any> {
  return api.tx.hospitalCertifications.createHospitalCertification(hospitalCertificationInfo).paymentInfo(pair);
}

export async function deleteHospitalCertification(
  api: ApiPromise,
  pair: any,
  hospitalCertificationId: string,
  callback?: () => void,
): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.hospitalCertifications
      .deleteHospitalCertification(hospitalCertificationId)
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

export function deleteHospitalCertificationFee(api: ApiPromise, pair: any, hospitalCertificationId: string): Promise<any> {
  return api.tx.hospitalCertifications.deleteHospitalCertification(hospitalCertificationId).paymentInfo(pair);
}

export async function updateHospitalCertification(
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
      .updateHospitalCertification(hospitalCertificationId, hospitalCertificationInfo)
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

export function updateHospitalCertificationFee(
  api: ApiPromise,
  pair: any,
  hospitalCertificationId: string,
  hospitalCertificationInfo: HospitalCertificationInfo,
): Promise<any> {
  return api.tx.hospitalCertifications.updateHospitalCertification(hospitalCertificationId, hospitalCertificationInfo).paymentInfo(pair);
}
