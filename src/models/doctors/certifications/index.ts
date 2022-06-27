import { DoctorCertificationInfo } from './doctor-certification-info';

export class DoctorCertification {
  constructor(anyJson: any) {
    this.id = anyJson.id;
    this.ownerId = anyJson.ownerId;
    this.info = anyJson.info;
  }
  id: string;
  ownerId: string;
  info: DoctorCertificationInfo;
}

export * from './doctor-certification-info';
