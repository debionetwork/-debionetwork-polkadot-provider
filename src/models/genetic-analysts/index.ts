import { convertSubstrateBalanceToNumber, convertSubstrateNumberToNumber } from '../..';
import { AvailabilityStatus } from '../../primitives/availability-status';
import { GeneticAnalystInfo } from './genetic-analyst-info';
import { VerificationStatus } from '../../primitives/verification-status';
import { StakeStatus } from '../../primitives/stake-status';

export class GeneticAnalyst {
  constructor(anyJson: any) {
    this.accountId = anyJson.accountId;
    this.services = anyJson.services;
    this.qualifications = anyJson.qualifications;
    this.info = anyJson.info;
    this.stakeAmount = anyJson.stakeAmount;
    this.verificationStatus = anyJson.verificationStatus;
    this.availabilityStatus = anyJson.availabilityStatus;
    this.unstakeAt = anyJson.unstakeAt;
    this.stakeStatus = anyJson.stakeStatus;
    this.retrieveUnstakeAt = anyJson.retrieveUnstakeAt;
  }
  accountId: string;
  services: string[];
  qualifications: string[];
  info: GeneticAnalystInfo;
  stakeAmount: number;
  stakeStatus: StakeStatus;
  verificationStatus: VerificationStatus;
  availabilityStatus: AvailabilityStatus;
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

    geneticAnalyst.info.dateOfBirth = convertSubstrateNumberToNumber(geneticAnalyst.info.dateOfBirth);

    return geneticAnalyst;
  }
}

export * from './genetic-analyst-info';
export * from './genetic-analysis-orders';
export * from './genetic-analysis';
export * from './genetic-data';
export * from './genetic-analyst-service';
export * from './genetic-analyst-qualification';
