import { ApiPromise } from "@polkadot/api";
import { GeneticAnalystQualification } from "../../models";

export async function queryGeneticAnalystQualificationsByHashId(api: ApiPromise, hashId: string): Promise<GeneticAnalystQualification> {
  const res = (await api.query.geneticAnalystQualifications.geneticAnalystQualifications(hashId)).toHuman();
  return new GeneticAnalystQualification(res);
}

export async function queryGeneticAnalystQualificationsCount(api: ApiPromise): Promise<number> {
  const res: any = (await api.query.geneticAnalystQualifications.geneticAnalystQualificationsCount()).toHuman();
  return parseInt(res, 0);
}

export async function queryGeneticAnalystQualificationsCountByOwner(api: ApiPromise, ownerId: string): Promise<number> {
  const res: any = (await api.query.geneticAnalystQualifications.geneticAnalystQualificationsCountByOwner(ownerId)).toHuman();
  return parseInt(res, 0);
}
