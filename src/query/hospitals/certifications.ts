import { ApiPromise } from '@polkadot/api';
import { HospitalCertification } from '../../models/hospitals/certifications';

export async function queryHospitalCertificationById(api: ApiPromise, certificationId: string): Promise<HospitalCertification> {
  const res = (await api.query.hospitalCertifications.hospitalCertifications(certificationId)).toHuman();
  return new HospitalCertification(res);
}

export async function queryHospitalCertificationCount(api: ApiPromise): Promise<number> {
  const res: any = (await api.query.hospitalCertifications.hospitalCertificationsCount()).toHuman();
  return parseInt(res, 0);
}

export async function queryHospitalCertificationCountByOwner(api: ApiPromise): Promise<number> {
  const res: any = (await api.query.hospitalCertifications.hospitalCertificationsCountByOwner()).toHuman();
  return parseInt(res, 0);
}

export async function queryHospitalCertificationsByMultipleIds(
  api: ApiPromise,
  certificationIds: string[],
): Promise<HospitalCertification[]> {
  const hospitalCertifications: HospitalCertification[] = new Array<HospitalCertification>();
  for (const certificationId of certificationIds) {
    hospitalCertifications.push(await queryHospitalCertificationById(api, certificationId));
  }
  return hospitalCertifications;
}
