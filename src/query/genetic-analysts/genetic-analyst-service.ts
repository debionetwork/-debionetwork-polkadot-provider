import { ApiPromise } from '@polkadot/api';
import { GeneticAnalystService } from '../../models';

export async function queryGeneticAnalystServicesByHashId(
  api: ApiPromise,
  hashId: string,
): Promise<GeneticAnalystService> {
  const res = (await api.query.geneticAnalystServices.geneticAnalystServices(hashId)).toHuman();
  return new GeneticAnalystService(res);
}

export async function queryGetAllGeneticAnalystServices(api: ApiPromise): Promise<GeneticAnalystService[]> {
  const res = await api.query.geneticAnalystServices.geneticAnalystServices.entries();
  const serviceArray: GeneticAnalystService[] = [];
  res.forEach((element, i) => {    
    serviceArray.push(new GeneticAnalystService(element[i][1]));
  });
  return serviceArray;
}

export async function queryGeneticAnalystServicesCount(api: ApiPromise): Promise<number> {
  const res: any = (await api.query.geneticAnalystServices.geneticAnalystServicesCount()).toHuman();
  return parseInt(res, 0);
}

export async function queryGeneticAnalystServicesCountByOwner(api: ApiPromise, ownerId: string): Promise<number> {
  const res: any = (await api.query.geneticAnalystServices.geneticAnalystServicesCountByOwner(ownerId)).toHuman();
  return parseInt(res, 0);
}
