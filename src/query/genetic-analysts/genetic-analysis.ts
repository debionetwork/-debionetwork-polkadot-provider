import { ApiPromise } from '@polkadot/api';
import { GeneticAnalysis } from '../../models/genetic-analysts/genetic-analysis';

export async function queryGeneticAnalysiByGeneticAnalysisTrackingId(
  api: ApiPromise,
  trackingId: string,
): Promise<GeneticAnalysis> {
  const res = (await api.query.geneticAnalysis.geneticAnalysisStorage(trackingId)).toHuman();
  return new GeneticAnalysis(res);
}

export async function queryGeneticAnalysisByOwnerId(api: ApiPromise, accountId: string): Promise<GeneticAnalysis[]> {
  const geneticAnalysisIds: any = (await api.query.geneticAnalysis.geneticAnalysisByOwner(accountId)).toHuman();
  const geneticAnalysisList: GeneticAnalysis[] = new Array<GeneticAnalysis>();
  for (const geneticAnalysisId of geneticAnalysisIds) {
    geneticAnalysisList.push(await queryGeneticAnalysiByGeneticAnalysisTrackingId(api, geneticAnalysisId));
  }
  return geneticAnalysisList;
}

export async function queryGeneticAnalysisByGeneticAnalystId(
  api: ApiPromise,
  accountId: string,
): Promise<GeneticAnalysis[]> {
  const geneticAnalysisIds: any = (
    await api.query.geneticAnalysis.geneticAnalysisByGeneticAnalystId(accountId)
  ).toHuman();
  const geneticAnalysisList: GeneticAnalysis[] = new Array<GeneticAnalysis>();
  for (const geneticAnalysisId of geneticAnalysisIds) {
    geneticAnalysisList.push(await queryGeneticAnalysiByGeneticAnalysisTrackingId(api, geneticAnalysisId));
  }
  return geneticAnalysisList;
}
