import { ApiPromise } from '@polkadot/api';
import { Certification } from '../../models/labs/certifications';

export async function queryCertificationById(api: ApiPromise, certificationId: string): Promise<Certification> {
  const res = (await api.query.certifications.certifications(certificationId)).toHuman();
  return new Certification(res);
}

export async function queryCertificationsByMultipleIds(
  api: ApiPromise,
  certificationIds: string[],
): Promise<Certification[]> {
  const certifications: Certification[] = new Array<Certification>();
  for (const certificationId of certificationIds) {
    certifications.push(await queryCertificationById(api, certificationId));
  }
  return certifications;
}
