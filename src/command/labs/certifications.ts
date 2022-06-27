import { ApiPromise } from '@polkadot/api';
import { EventRecord } from '@polkadot/types/interfaces/system';
import { extrinsicCallback, ExtrinsicCallbackParameters, getCommandNonceAndSigner } from '../../index';
import { CertificationInfo } from '../../models';

export async function createCertification(
  api: ApiPromise,
  pair: any,
  certificationInfo: CertificationInfo,
  callback?: () => void,
): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.certifications
      .createCertification(certificationInfo)
      .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
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

export function createCertificationFee(api: ApiPromise, pair: any, certificationInfo: CertificationInfo): Promise<any> {
  return api.tx.certifications.createCertification(certificationInfo).paymentInfo(pair);
}

export async function deleteCertification(
  api: ApiPromise,
  pair: any,
  certificationId: string,
  callback?: () => void,
): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.certifications
      .deleteCertification(certificationId)
      .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
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

export function deleteCertificationFee(api: ApiPromise, pair: any, certificationId: string): Promise<any> {
  return api.tx.certifications.deleteCertification(certificationId).paymentInfo(pair);
}

export async function updateCertification(
  api: ApiPromise,
  pair: any,
  certificationId: string,
  certificationInfo: CertificationInfo,
  callback?: () => void,
): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.certifications
      .updateCertification(certificationId, certificationInfo)
      .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
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
  certificationId: string,
  certificationInfo: CertificationInfo,
): Promise<any> {
  return api.tx.certifications.updateCertification(certificationId, certificationInfo).paymentInfo(pair);
}
