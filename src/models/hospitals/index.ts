import { HospitalInfo } from './hospital-info';

export class Hospital {
  constructor(anyJson: any) {
    this.accountId = anyJson.accountId;
    this.certifications = anyJson.certifications;
    this.info = anyJson.info;
  }
  accountId: string;
  certifications: string[];
  info: HospitalInfo;
}

export * from './hospital-info';
export * from './certifications';
