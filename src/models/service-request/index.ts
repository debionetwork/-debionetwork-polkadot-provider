import { convertSubstrateBalanceToNumber, convertSubstrateNumberToNumber } from '../..';
import { RequestStatus } from './request-status';

export class ServiceRequest {
  constructor(anyJson: any) {
    this.hash = anyJson.hash_;
    this.requesterAddress = anyJson.requesterAddress;
    this.labAddress = anyJson.labAddress;
    this.country = anyJson.country;
    this.region = anyJson.region;
    this.city = anyJson.city;
    this.serviceCategory = anyJson.serviceCategory;
    this.stakingAmount = anyJson.stakingAmount;
    this.status = anyJson.status;
    this.createdAt = anyJson.createdAt;
    this.updatedAt = anyJson.updatedAt;
    this.unstakedAt = anyJson.unstakedAt;
  }

  hash: string;
  requesterAddress: string;
  labAddress: string;
  country: string;
  region: string;
  city: string;
  serviceCategory: string;
  stakingAmount: number;
  status: RequestStatus;
  createdAt: Date;
  updatedAt: Date;
  unstakedAt: Date;

  normalize() {
    const serviceRequest: ServiceRequest = this; // eslint-disable-line

    serviceRequest.stakingAmount = convertSubstrateBalanceToNumber(serviceRequest.stakingAmount);

    serviceRequest.createdAt = new Date(convertSubstrateNumberToNumber(serviceRequest.createdAt));

    if (serviceRequest.unstakedAt) {
      serviceRequest.unstakedAt = new Date(convertSubstrateNumberToNumber(serviceRequest.unstakedAt));
    }

    if (serviceRequest.updatedAt) {
      serviceRequest.updatedAt = new Date(convertSubstrateNumberToNumber(serviceRequest.updatedAt));
    }

    return serviceRequest;
  }
}

export * from './request-status';
export * from './service-invoice';
