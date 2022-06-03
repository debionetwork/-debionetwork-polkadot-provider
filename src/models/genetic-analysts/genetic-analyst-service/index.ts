import { GeneticAnalystServiceInfo } from './genetic-analyst-service-info';

export class GeneticAnalystService {
  constructor(anyJson: any) {
    this.id = anyJson.id;
    this.ownerId = anyJson.ownerId;
    this.info = anyJson.info;
  }
  id: string;
  ownerId: string;
  info: GeneticAnalystServiceInfo;
}

export * from './genetic-analyst-service-info';
