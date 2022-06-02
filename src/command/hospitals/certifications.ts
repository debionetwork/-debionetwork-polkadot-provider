import { ApiPromise } from '@polkadot/api';
import { successCallback } from '../../index';
import { HospitalCertificationInfo } from '../../models';

export async function createHospitalCertification(
  api: ApiPromise,
  pair: any,
  hospitalCertificationInfo: HospitalCertificationInfo,
  callback?: () => void,
) {
  // tslint:disable-next-line
  var unsub = await api.tx.hospitalCertifications
    .createHospitalCertification(hospitalCertificationInfo)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export function createHospitalCertificationFee(api: ApiPromise, pair: any, hospitalCertificationInfo: HospitalCertificationInfo): Promise<any> {
  return api.tx.hospitalCertifications.createHospitalCertification(hospitalCertificationInfo).paymentInfo(pair);
}

export async function deleteHospitalCertification(api: ApiPromise, pair: any, hospitalCertificationId: string, callback?: () => void) {
  // tslint:disable-next-line
  var unsub = await api.tx.hospitalCertifications
    .deleteHospitalCertification(hospitalCertificationId)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
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
) {
  // tslint:disable-next-line
  var unsub = await api.tx.hospitalCertifications
    .updateHospitalCertification(hospitalCertificationId, hospitalCertificationInfo)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
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
