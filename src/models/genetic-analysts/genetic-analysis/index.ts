import { convertSubstrateNumberToNumber } from '../../..';
import { GeneticAnalysisStatus } from './genetic-analysis-status';

export class GeneticAnalysis {
  constructor(anyJson: any) {
    this.geneticAnalysisTrackingId = anyJson.geneticAnalysisTrackingId;
    this.geneticAnalystId = anyJson.geneticAnalystId;
    this.ownerId = anyJson.ownerId;
    this.reportLink = anyJson.reportLink;
    this.comment = anyJson.comment;
    this.rejectedTitle = anyJson.rejectedTitle;
    this.rejectedDescription = anyJson.rejectedDescription;
    this.geneticAnalysisOrderId = anyJson.geneticAnalysisOrderId;
    this.createdAt = anyJson.createdAt;
    this.updatedAt = anyJson.updatedAt;
    this.status = anyJson.status;
  }

  geneticAnalysisTrackingId: string;
  geneticAnalystId: string;
  ownerId: string;
  reportLink: string;
  comment: string;
  rejectedTitle: string;
  rejectedDescription: string;
  geneticAnalysisOrderId: string;
  createdAt: Date;
  updatedAt: Date;
  status: GeneticAnalysisStatus;

  normalize() {
    const geneticAnalysis : GeneticAnalysis = this; // eslint-disable-line

    geneticAnalysis.createdAt = new Date(
      convertSubstrateNumberToNumber(geneticAnalysis.createdAt),
    );

    if (geneticAnalysis.updatedAt) {
      geneticAnalysis.updatedAt = new Date(
        convertSubstrateNumberToNumber(geneticAnalysis.updatedAt),
      );
    }

    return geneticAnalysis;
  }
}

export * from './genetic-analysis-status';
