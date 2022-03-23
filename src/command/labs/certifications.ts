import { ApiPromise } from '@polkadot/api';
import { successCallback } from '../../index';
import { CertificationInfo } from '../../models';

export async function createCertification(
  api: ApiPromise,
  pair: any,
  certificationInfo: CertificationInfo,
  callback?: () => void,
) {
  // tslint:disable-next-line
  var unsub = await api.tx.certifications
    .createCertification(certificationInfo)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function deleteCertification(api: ApiPromise, pair: any, certificationId: string, callback?: () => void) {
  // tslint:disable-next-line
  var unsub = await api.tx.certifications
    .deleteCertification(certificationId)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function updateCertification(
  api: ApiPromise,
  pair: any,
  certificationId: string,
  certificationInfo: CertificationInfo,
  callback?: () => void,
) {
  // tslint:disable-next-line
  var unsub = await api.tx.certifications
    .updateCertification(certificationId, certificationInfo)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}
