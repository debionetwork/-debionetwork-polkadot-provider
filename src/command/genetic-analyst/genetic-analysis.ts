import { ApiPromise } from '@polkadot/api';
import { successCallback } from '../..';

export async function rejectGeneticAnalysis(
  api: ApiPromise,
  pair: any,
  geneticAnalysisTrackingId: string,
  rejectedTitle: string,
  rejectedDescription: string,
  callback?: () => void,
): Promise<void> {
  const unsub = await api.tx.geneticAnalysis
    .rejectGeneticAnalysis(geneticAnalysisTrackingId, rejectedTitle, rejectedDescription)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => successCallback(api, { events, status, callback }));
  unsub();
}

export async function processGeneticAnalysis(
  api: ApiPromise,
  pair: any,
  geneticAnalysisTrackingId: string,
  status: string,
  callback?: () => void,
): Promise<void> {
  const unsub = await api.tx.geneticAnalysis
    .processGeneticAnalysis(geneticAnalysisTrackingId, status)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => successCallback(api, { events, status, callback }));
  unsub();
}

export async function submitGeneticAnalysis(api: ApiPromise, pair: any, geneticAnalysisTrackingId: string, reportLink: string, comment: string, callback?: () => void): Promise<void> {
  const unsub = await api.tx.geneticAnalysis
    .submitGeneticAnalysis(geneticAnalysisTrackingId, reportLink, comment)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => successCallback(api, { events, status, callback }));
  unsub();
}