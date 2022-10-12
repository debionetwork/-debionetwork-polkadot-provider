import { ApiPromise } from "@polkadot/api";
import { MenstrualSubscription } from "../models/menstrual-subscription";

export async function queryMenstrualSubscriptionById(api: ApiPromise, menstrualSubscriptionId: string): Promise<MenstrualSubscription> {
  const res = (await api.query.menstrualSubscription.menstrualSubscriptionById(menstrualSubscriptionId)).toHuman();
  return new MenstrualSubscription(res);
}

export async function queryMenstrualSubscriptionByOwner(api: ApiPromise, accountId: string): Promise<Array<MenstrualSubscription>> {
  const menstrualSubscriptionList: Array<MenstrualSubscription> = new Array<MenstrualSubscription>();
  const res: any = (await api.query.menstrualSubscription.menstrualSubscriptionByOwner(accountId)).toHuman();

  for (const menstrualSubscriptionId of res) {
    menstrualSubscriptionList.push(await queryMenstrualSubscriptionById(api, menstrualSubscriptionId));
  }
  return menstrualSubscriptionList;
}

export async function queryMenstrualSubscriptionCount(api: ApiPromise): Promise<number> {
  const res: any = (await api.query.menstrualSubscription.menstrualSubscriptionCount()).toHuman();
  return parseInt(res, 0);
}

export async function queryMenstrualSubscriptionCountByOwner(api: ApiPromise, accountId: string): Promise<number> {
  const res: any = (await api.query.menstrualSubscription.menstrualSubscriptionCountByOwner(accountId)).toHuman();
  return parseInt(res, 0);
}
