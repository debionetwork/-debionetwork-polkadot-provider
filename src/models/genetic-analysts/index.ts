import { GeneticAnalystInfo } from './genetic-analyst-info';
import { GeneticAnalystsVerificationStatus } from './genetic-analyst-verification-status';

export class GeneticAnalyst {
  constructor(anyJson: any) {
    this.accountId = anyJson.accountId;
    this.services = anyJson.services;
    this.qualifications = anyJson.qualifications;
    this.info = anyJson.info;
  }
  accountId: string;
  services: string[];
  qualifications: string[];
  verificationStatus: GeneticAnalystsVerificationStatus;
  info: GeneticAnalystInfo;
}

export * from './genetic-analyst-info';
export * from './genetic-analyst-verification-status';
export * from './genetic-analysis-orders';
export * from './genetic-analysis';
