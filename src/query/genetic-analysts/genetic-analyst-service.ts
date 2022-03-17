import { ApiPromise } from "@polkadot/api";
import { GeneticAnalystQualification } from "../../models";

export async function queryGeneticAnalystServicesByHashId(api: ApiPromise, hashId: string): Promise<GeneticAnalystQualification> {
  const res = (await api.query.geneticAnalystServices.geneticAnalystServices(hashId)).toHuman();
  return new GeneticAnalystQualification(res);
}

export async function queryGeneticAnalystServicesCount(api: ApiPromise): Promise<number> {
  const res: any = (await api.query.geneticAnalystServices.geneticAnalystServicesCount()).toHuman();
  return parseInt(res, 0);
}

export async function queryGeneticAnalystServicesCountByOwner(api: ApiPromise, ownerId: string): Promise<number> {
  const res: any = (await api.query.geneticAnalystServices.geneticAnalystServicesCountByOwner(ownerId)).toHuman();
  return parseInt(res, 0);
}
