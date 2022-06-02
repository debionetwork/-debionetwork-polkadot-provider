import { ApiPromise } from '@polkadot/api';
import { DoctorCertification } from '../../models/doctors/certifications';

export async function queryDoctorCertificationById(api: ApiPromise, certificationId: string): Promise<DoctorCertification> {
  const res = (await api.query.doctorCertifications.doctorCertifications(certificationId)).toHuman();
  return new DoctorCertification(res);
}

export async function queryDoctorCertificationCount(api: ApiPromise): Promise<number> {
  const res: any = (await api.query.doctorCertifications.doctorCertificationsCount()).toHuman();
  return parseInt(res, 0);
}

export async function queryDoctorCertificationCountByOwner(api: ApiPromise): Promise<number> {
  const res: any = (await api.query.doctorCertifications.doctorCertificationsCountByOwner()).toHuman();
  return parseInt(res, 0);
}

export async function queryDoctorCertificationsByMultipleIds(
  api: ApiPromise,
  certificationIds: string[],
): Promise<DoctorCertification[]> {
  const doctorCertifications: DoctorCertification[] = new Array<DoctorCertification>();
  for (const certificationId of certificationIds) {
    doctorCertifications.push(await queryDoctorCertificationById(api, certificationId));
  }
  return doctorCertifications;
}
