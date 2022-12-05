import { ApiPromise } from '@polkadot/api';
import { successCallback, getCommandNonceAndSigner } from '../index';
import { MenstrualInfo } from '../models/menstrual-calendar';

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
  menstrualInfos: MenstrualInfo[],
  callback?: () => void,
) {
  // tslint:disable-next-line
  var unsub = await api.tx.menstrualCalendar
    .addMenstrualCycleLog(menstrualCalendarId, menstrualInfos)
    .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function updateMenstrualCycleLog(
  api: ApiPromise,
  pair: any,
  menstrualCalendarId: string,
  menstrualCycleLogId: string,
  menstrualInfo: MenstrualInfo,
  callback?: () => void,
) {
  // tslint:disable-next-line
  var unsub = await api.tx.menstrualCalendar
    .updateMenstrualCycleLog(
      menstrualCalendarId,
      menstrualCycleLogId,
      menstrualInfo.date,
      menstrualInfo.symptoms,
      menstrualInfo.menstruation,
    )
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
