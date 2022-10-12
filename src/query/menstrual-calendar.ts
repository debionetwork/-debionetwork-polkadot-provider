import { ApiPromise } from '@polkadot/api';
import { MenstrualCalendar, MenstrualCycleLog } from '../models/menstrual-calendar';

export async function queryMenstrualCalendarById(api: ApiPromise, menstrualId: string): Promise<MenstrualCalendar> {
  const res = (await api.query.menstrualCalendar.menstrualCalendarById(menstrualId)).toHuman();
  return new MenstrualCalendar(res);
}

export async function queryMenstrualCalendarByOwner(api: ApiPromise, accountId: string): Promise<MenstrualCalendar[]> {
  const menstrualCalendarList: MenstrualCalendar[] = new Array<MenstrualCalendar>();
  const res: any = (await api.query.menstrualCalendar.menstrualCalendarByOwner(accountId)).toHuman();

  for (const menstrualCalendarId of res) {
    menstrualCalendarList.push(await queryMenstrualCalendarById(api, menstrualCalendarId));
  }
  return menstrualCalendarList;
}

export async function queryMenstrualCalendarCount(api: ApiPromise): Promise<number> {
  const res: any = (await api.query.menstrualCalendar.menstrualCalendarCount()).toHuman();
  return parseInt(res, 0);
}

export async function queryMenstrualCalendarCountByOwner(api: ApiPromise, accountId: string): Promise<number> {
  const res: any = (await api.query.menstrualCalendar.menstrualCalendarCountByOwner(accountId)).toHuman();
  return parseInt(res, 0);
}

export async function queryMenstrualCycleLogById(
  api: ApiPromise,
  menstrualcycleLogId: string,
): Promise<MenstrualCycleLog> {
  const res = (await api.query.menstrualCalendar.menstrualCycleLogById(menstrualcycleLogId)).toHuman();
  return new MenstrualCycleLog(res);
}

export async function queryMenstrualCycleLogByOwner(api: ApiPromise, accountId: string): Promise<MenstrualCycleLog[]> {
  const menstrualCycleLogList: MenstrualCycleLog[] = new Array<MenstrualCycleLog>();
  const res: any = (await api.query.menstrualCalendar.menstrualCycleLogByOwner(accountId)).toHuman();

  for (const menstrualCycleLogId of res) {
    menstrualCycleLogList.push(await queryMenstrualCycleLogById(api, menstrualCycleLogId));
  }
  return menstrualCycleLogList;
}

export async function queryMenstrualCycleLogCount(api: ApiPromise): Promise<number> {
  const res: any = (await api.query.menstrualCalendar.menstrualCycleLogCount()).toHuman();
  return parseInt(res, 0);
}

export async function queryMenstrualCycleLogCountByOwner(api: ApiPromise, accountId: string): Promise<number> {
  const res: any = (await api.query.menstrualCalendar.menstrualCycleLogCountByOwner(accountId)).toHuman();
  return parseInt(res, 0);
}
