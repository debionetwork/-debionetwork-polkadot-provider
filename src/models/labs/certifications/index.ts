import { CertificationInfo } from './certification-info';

export class Certification {
  constructor(anyJson: any) {
    this.id = anyJson.id;
    this.ownerId = anyJson.ownerId;
    this.info = anyJson.info;
  }
  id: string;
  ownerId: string;
  info: CertificationInfo;
}

export * from './certification-info';
