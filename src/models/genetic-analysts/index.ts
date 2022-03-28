import { convertSubstrateBalanceToNumber, convertSubstrateNumberToNumber } from '../..';
import { GeneticAnalystsAvailabilityStatus } from './genetic-analyst-availability-status';
import { GeneticAnalystInfo } from './genetic-analyst-info';
import { GeneticAnalystsVerificationStatus } from './genetic-analyst-verification-status';
import { StakeStatus } from './stake-status';

export class GeneticAnalyst {
  constructor(anyJson: any) {
    this.accountId = anyJson.accountId;
    this.services = anyJson.services;
    this.qualifications = anyJson.qualifications;
    this.info = anyJson.info;
    this.stakeAmount = anyJson.stakeAmount;
    this.verificationStatus = anyJson.verificationStatus;
    this.unstakeAt = anyJson.unstakeAt;
    this.retrieveUnstakeAt = anyJson.retrieveUnstakeAt;
  }
  accountId: string;
  services: string[];
  qualifications: string[];
  info: GeneticAnalystInfo;
  stakeAmount: number;
  stakeStatus: StakeStatus;
  verificationStatus: GeneticAnalystsVerificationStatus;
  availabilityStatus: GeneticAnalystsAvailabilityStatus;
  unstakeAt: Date;
  retrieveUnstakeAt: Date;

  normalize() {
    const geneticAnalyst: GeneticAnalyst = this; // eslint-disable-line

    geneticAnalyst.stakeAmount = convertSubstrateBalanceToNumber(geneticAnalyst.stakeAmount);

    
    if (geneticAnalyst.unstakeAt) {
      geneticAnalyst.unstakeAt = new Date(convertSubstrateNumberToNumber(geneticAnalyst.unstakeAt));
    }

    if (geneticAnalyst.retrieveUnstakeAt) {
      geneticAnalyst.retrieveUnstakeAt = new Date(convertSubstrateNumberToNumber(geneticAnalyst.retrieveUnstakeAt));
    }

    return geneticAnalyst;
  }
}

export * from './genetic-analyst-info';
export * from './genetic-analyst-verification-status';
export * from './genetic-analyst-availability-status';
export * from './genetic-analysis-orders';
export * from './genetic-analysis';
export * from './genetic-data';
export * from './genetic-analyst-service';
export * from './genetic-analyst-qualification';
