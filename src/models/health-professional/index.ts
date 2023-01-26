import { AvailabilityStatus, StakeStatus, VerificationStatus } from '../../primitives';
import { HealthProfessionalInfo } from './info';

export class HealthProfessional {
  constructor(data: any) {
    this.accountId = data.accountId;
    this.qualifications = data.qualifications;
    this.info = new HealthProfessionalInfo(data.info);
    this.stakeAmount = data.stakeAmount;
    this.stakeStatus = data.stakeStatus;
    this.verificationStatus = data.verificationStatus;
    this.availabilityStatus = data.availabilityStatus;
    this.unstakedAt = data.unstakedAt ? Number((data.unstakedAt as string).split(',').join('')) : null;
  }

  accountId: string;
  qualifications: string[];
  info: HealthProfessionalInfo;
  stakeAmount: string;
  stakeStatus: StakeStatus;
  verificationStatus: VerificationStatus;
  availabilityStatus: AvailabilityStatus;
  unstakedAt: number;
}
