import { DoctorInfo } from './doctor-info';

export class Doctor {
  constructor(anyJson: any) {
    this.accountId = anyJson.accountId;
    this.certifications = anyJson.certifications;
    this.info = anyJson.info;
  }
  accountId: string;
  certifications: string[];
  info: DoctorInfo;
}

export * from './doctor-info';
