import { ApiPromise } from '@polkadot/api';
import { GeneticAnalyst } from '../../models/genetic-analysts/index';

export async function queryGeneticAnalystByAccountId(api: ApiPromise, accountId: string): Promise<GeneticAnalyst> {
  const res = (await api.query.geneticAnalysts.geneticAnalysts(accountId)).toHuman();
  return new GeneticAnalyst(res);
}

export async function queryGeneticAnalystCount(api: ApiPromise): Promise<number> {
  const res: any = (await api.query.geneticAnalysts.geneticAnalystCount()).toHuman();
  return parseInt(res, 0);
}

export async function queryGeneticAnalystAdminKey(api: ApiPromise): Promise<string> {
  return (await api.query.geneticAnalysts.adminKey()).toString();
}

export async function queryGeneticAnalystPalletId(api: ApiPromise): Promise<string> {
  return (await api.query.geneticAnalysts.palletId()).toString();
}

export async function queryGeneticAnalystTotalStakedAmount(api: ApiPromise): Promise<number> {
  const res: any = (await api.query.geneticAnalysts.totalStakedAmount()).toHuman();
  return parseInt(res, 0);
}

export async function queryGeneticAnalystMinimumStakeAmount(api: ApiPromise): Promise<number> {
  const res: any = (await api.query.geneticAnalysts.minimumStakeAmount()).toHuman();
  return parseInt(res, 0);
}

export async function queryGeneticAnalystVerifierKey(api: ApiPromise): Promise<any> {
  const res = (await api.query.geneticAnalysts.geneticAnalystVerifierKey()).toHuman();
  return res;
}

export * from './genetic-analysis-orders';
export * from './genetic-analysis';
export * from './genetic-analyst-qualification';
export * from './genetic-analyst-service';
export * from './genetic-data';
