import { LabInfo } from './lab-info';
import { LabVerificationStatus } from './lab-verification-status';

export class Lab {
  constructor(anyJson: any) {
    this.accountId = anyJson.accountId;
    this.services = anyJson.services;
    this.certifications = anyJson.certifications;
    this.verificationStatus = anyJson.verificationStatus;
    this.info = anyJson.info;
  }
  accountId: string;
  services: string[];
  certifications: string[];
  verificationStatus: LabVerificationStatus;
  info: LabInfo;
}

export * from './services';
export * from './orders';
export * from './certifications';
export * from './genetic-testing';
export * from './lab-info';
export * from './lab-verification-status';
