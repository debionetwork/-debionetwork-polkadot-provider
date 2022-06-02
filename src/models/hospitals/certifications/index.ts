import { HospitalCertificationInfo } from './hospital-certification-info';

export class HospitalCertification {
  constructor(anyJson: any) {
    this.id = anyJson.id;
    this.ownerId = anyJson.ownerId;
    this.info = anyJson.info;
  }
  id: string;
  ownerId: string;
  info: HospitalCertificationInfo;
}

export * from './hospital-certification-info';
