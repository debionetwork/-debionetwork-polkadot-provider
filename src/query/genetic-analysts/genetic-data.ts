import { ApiPromise } from '@polkadot/api';
import { GeneticData } from '../../models/genetic-analysts/genetic-data';

export async function queryGeneticDataById(api: ApiPromise, dataId: string): Promise<GeneticData> {
  const res = (await api.query.geneticData.geneticDataById(dataId)).toHuman();
  return new GeneticData(res);
}

export async function queryGeneticDataByOwnerId(api: ApiPromise, accountId: string): Promise<GeneticData[]> {
  const geneticDataIds: any = (await api.query.geneticData.geneticDataByOwner(accountId)).toHuman();

  const geneticDataList: GeneticData[] = new Array<GeneticData>();
  for (const geneticDataId of geneticDataIds) {
    geneticDataList.push(await queryGeneticDataById(api, geneticDataId));
  }
  return geneticDataList;
}

export async function queryGeneticDataCount(api: ApiPromise): Promise<number> {
  const res: any = (await api.query.geneticData.geneticDataCount()).toHuman();
  return parseInt(res, 0);
}

export async function queryGeneticDataCountByOwner(api: ApiPromise, ownerId: string): Promise<number> {
  const res: any = (await api.query.geneticData.geneticDataCountByOwner(ownerId)).toHuman();
  return parseInt(res, 0);
}
