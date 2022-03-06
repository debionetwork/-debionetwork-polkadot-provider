import { ApiPromise } from '@polkadot/api';
import { GeneticAnalysis } from '../../models/genetic-analysts/genetic-analysis';

export async function queryGeneticAnalysisById(api: ApiPromise, geneticAnalysisId: string): Promise<GeneticAnalysis> {
  const res = (await api.query.geneticAnalysis.geneticAnalysisById(geneticAnalysisId)).toHuman();
  return new GeneticAnalysis(res);
}

export async function queryGeneticAnalysisByOwnerId(api: ApiPromise, accountId: string): Promise<GeneticAnalysis[]> {
  const geneticAnalysisIds: any = (await api.query.geneticAnalysis.geneticAnalysisByOwnerId(accountId)).toHuman();
  const geneticAnalysisList: GeneticAnalysis[] = new Array<GeneticAnalysis>();
  for (const geneticAnalysisId of geneticAnalysisIds) {
    geneticAnalysisList.push(await queryGeneticAnalysisById(api, geneticAnalysisId));
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
    geneticAnalysisList.push(await queryGeneticAnalysisById(api, geneticAnalysisId));
  }
  return geneticAnalysisList;
}
