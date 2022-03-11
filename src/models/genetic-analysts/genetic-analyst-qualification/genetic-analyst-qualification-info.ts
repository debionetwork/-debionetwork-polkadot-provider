import { Experience } from './experiece';
import { GeneticAnalystQualificationCertification } from './genetic-analyst-qualification-certification';

export class GeneticAnalystQualificationInfo {
  experience : string;
  pricesByCurrency: Experience[];
  expectedDuration: GeneticAnalystQualificationCertification[];
  description: string;
  testResultSample?: string;
}