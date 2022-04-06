import { StakeStatus } from '../../primitives/stake-status';
import { LabInfo } from './lab-info';
import { VerificationStatus } from '../../primitives/verification-status';
import { convertSubstrateBalanceToNumber, convertSubstrateNumberToNumber } from '../../index';

export class Lab {
  constructor(anyJson: any) {
    this.accountId = anyJson.accountId;
    this.services = anyJson.services;
    this.certifications = anyJson.certifications;
    this.verificationStatus = anyJson.verificationStatus;
    this.stakeAmount = anyJson.stakeAmount;
    this.stakeStatus = anyJson.stakeStatus;
    this.unstakeAt = anyJson.unstakeAt;
    this.retrieveUnstakeAt = anyJson.retrieveUnstakeAt;
    this.info = anyJson.info;
  }
  accountId: string;
  services: string[];
  certifications: string[];
  verificationStatus: VerificationStatus;
  stakeAmount: number;
  stakeStatus: StakeStatus;
  unstakeAt: Date;
  retrieveUnstakeAt: Date;
  info: LabInfo;

  normalize() {
    const lab: Lab = this; // eslint-disable-line

    lab.stakeAmount = convertSubstrateBalanceToNumber(lab.stakeAmount);

    if (lab.unstakeAt) {
      lab.unstakeAt = new Date(convertSubstrateNumberToNumber(lab.unstakeAt));
    }

    if (lab.retrieveUnstakeAt) {
      lab.retrieveUnstakeAt = new Date(convertSubstrateNumberToNumber(lab.retrieveUnstakeAt));
    }

    return lab;
  }
}

export * from './services';
export * from './orders';
export * from './certifications';
export * from './genetic-testing';
export * from './lab-info';
