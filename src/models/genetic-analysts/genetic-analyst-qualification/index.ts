import { GeneticAnalystQualificationInfo } from './genetic-analyst-qualification-info';

export class GeneticAnalystQualification {
  constructor(anyJson: any) {
    this.id = anyJson.id;
    this.ownerId = anyJson.ownerId;
    this.info = anyJson.info;
  }
  id: string;
  ownerId: string;
  info: GeneticAnalystQualificationInfo;
}

export * from './genetic-analyst-qualification-info';
