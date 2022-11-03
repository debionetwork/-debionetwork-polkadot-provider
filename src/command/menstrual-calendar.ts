import { ApiPromise } from '@polkadot/api';
import { successCallback, getCommandNonceAndSigner } from '../index';
import { MenstrualCycleLogModel } from '../models/menstrual-calendar';

export async function addMenstrualCalendar(api: ApiPromise, pair: any, averageCycle: number, callback?: () => void) {
  // tslint:disable-next-line
  var unsub = await api.tx.menstrualCalendar
    .addMenstrualCalendar(averageCycle)
    .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function updateMenstrualCalendar(
  api: ApiPromise,
  pair: any,
  menstrualCalendarId: string,
  averageCycle: number,
  callback?: () => void,
) {
  // tslint:disable-next-line
  var unsub = await api.tx.menstrualCalendar
    .updateMenstrualCalendar(averageCycle)
    .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function addMenstrualCycleLog(
  api: ApiPromise,
  pair: any,
  menstrualCalendarId: string,
  menstrualCycleLog: MenstrualCycleLogModel,
  callback?: () => void,
) {
  // tslint:disable-next-line
  var unsub = await api.tx.menstrualCalendar
    .addMenstrualCycleLog(menstrualCalendarId, menstrualCycleLog)
    .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function updateMenstrualCycleLog(
  api: ApiPromise,
  pair: any,
  menstrualCalendarId: string,
  menstrualCycleLogId: string,
  menstrualCycleLog: MenstrualCycleLogModel,
  callback?: () => void,
) {
  // tslint:disable-next-line
  var unsub = await api.tx.menstrualCalendar
    .updateMenstrualCycleLog(menstrualCalendarId, menstrualCycleLogId, menstrualCycleLog)
    .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function removeMenstrualCycleLog(
  api: ApiPromise,
  pair: any,
  menstrualCalendarId: string,
  menstrualCycleLogId: string,
  callback?: () => void,
) {
  // tslint:disable-next-line
  var unsub = await api.tx.menstrualCalendar
    .removeMenstrualCycleLog(menstrualCalendarId, menstrualCycleLogId)
    .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}
