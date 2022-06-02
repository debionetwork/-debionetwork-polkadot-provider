import { ApiPromise } from '@polkadot/api';
import { successCallback } from '../../index';
import { DoctorCertificationInfo } from '../../models';

export async function createDoctorCertification(
  api: ApiPromise,
  pair: any,
  doctorCertificationInfo: DoctorCertificationInfo,
  callback?: () => void,
) {
  // tslint:disable-next-line
  var unsub = await api.tx.doctorCertifications
    .createDoctorCertification(doctorCertificationInfo)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export function createDoctorCertificationFee(api: ApiPromise, pair: any, doctorCertificationInfo: DoctorCertificationInfo): Promise<any> {
  return api.tx.doctorCertifications.createDoctorCertification(doctorCertificationInfo).paymentInfo(pair);
}

export async function deleteDoctorCertification(api: ApiPromise, pair: any, doctorCertificationId: string, callback?: () => void) {
  // tslint:disable-next-line
  var unsub = await api.tx.doctorCertifications
    .deleteDoctorCertification(doctorCertificationId)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
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
) {
  // tslint:disable-next-line
  var unsub = await api.tx.doctorCertifications
    .updateDoctorCertification(doctorCertificationId, doctorCertificationInfo)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export function updateDoctorCertificationFee(
  api: ApiPromise,
  pair: any,
  doctorCertificationId: string,
  doctorCertificationInfo: DoctorCertificationInfo,
): Promise<any> {
  return api.tx.doctorCertifications.updateDoctorCertification(doctorCertificationId, doctorCertificationInfo).paymentInfo(pair);
}
