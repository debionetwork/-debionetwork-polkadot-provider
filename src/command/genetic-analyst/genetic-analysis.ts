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
  // tslint:disable-next-line
  var unsub = await api.tx.geneticAnalysis
    .rejectGeneticAnalysis(geneticAnalysisTrackingId, rejectedTitle, rejectedDescription)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function processGeneticAnalysis(
  api: ApiPromise,
  pair: any,
  geneticAnalysisTrackingId: string,
  geneticAnalysisStatus: string,
  callback?: () => void,
): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.geneticAnalysis
    .processGeneticAnalysis(geneticAnalysisTrackingId, geneticAnalysisStatus)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function submitGeneticAnalysis(
  api: ApiPromise,
  pair: any,
  geneticAnalysisTrackingId: string,
  reportLink: string,
  comment: string,
  callback?: () => void,
): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.geneticAnalysis
    .submitGeneticAnalysis(geneticAnalysisTrackingId, reportLink, comment)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function rejectGeneticAnalysisFee(
  api: ApiPromise,
  pair: any,
  geneticAnalysisTrackingId: string,
  rejectedTitle: string,
  rejectedDescription: string,
): Promise<any> {
  // tslint:disable-next-line
  return api.tx.geneticAnalysis
    .rejectGeneticAnalysis(geneticAnalysisTrackingId, rejectedTitle, rejectedDescription)
    .paymentInfo(pair);
}

export async function processGeneticAnalysisFee(
  api: ApiPromise,
  pair: any,
  geneticAnalysisTrackingId: string,
  geneticAnalysisStatus: string,
): Promise<any> {
  // tslint:disable-next-line
  return api.tx.geneticAnalysis
    .processGeneticAnalysis(geneticAnalysisTrackingId, geneticAnalysisStatus)
    .paymentInfo(pair);
}

export async function submitGeneticAnalysisFee(
  api: ApiPromise,
  pair: any,
  geneticAnalysisTrackingId: string,
  reportLink: string,
  comment: string,
): Promise<any> {
  // tslint:disable-next-line
  return api.tx.geneticAnalysis
    .submitGeneticAnalysis(geneticAnalysisTrackingId, reportLink, comment)
    .paymentInfo(pair);
}
