import { ApiPromise } from '@polkadot/api';
import { successCallback, getCommandNonceAndSigner } from '../../index';
import { DnaTestResultSubmission } from '../../models';

export async function processDnaSample(
  api: ApiPromise,
  pair: any,
  trackingId: string,
  processStatus: string,
  callback?: () => void,
) {
  // tslint:disable-next-line
  var unsub = await api.tx.geneticTesting
    .processDnaSample(trackingId, processStatus)
    .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export function processDnaSampleFee(
  api: ApiPromise,
  pair: any,
  trackingId: string,
  processStatus: string,
): Promise<any> {
  return api.tx.geneticTesting.processDnaSample(trackingId, processStatus).paymentInfo(pair);
}

export async function receiveDnaSample(api: ApiPromise, pair: any, trackingId: string, callback?: () => void) {
  // tslint:disable-next-line
  var unsub = await api.tx.geneticTesting
    .receiveDnaSample(trackingId)
    .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function rejectDnaSample(
  api: ApiPromise,
  pair: any,
  trackingId: string,
  rejectedTitle: string,
  rejectedDescription: string,
  callback?: () => void,
) {
  // tslint:disable-next-line
  var unsub = await api.tx.geneticTesting
    .rejectDnaSample(trackingId, rejectedTitle, rejectedDescription)
    .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export function rejectDnaSampleFee(
  api: ApiPromise,
  pair: any,
  trackingId: string,
  rejectedTitle: string,
  rejectedDescription: string,
): Promise<any> {
  return api.tx.geneticTesting.rejectDnaSample(trackingId, rejectedTitle, rejectedDescription).paymentInfo(pair);
}

export async function submitIndependentTestResult(
  api: ApiPromise,
  pair: any,
  submission: DnaTestResultSubmission,
  callback?: () => void,
) {
  // tslint:disable-next-line
  var unsub = await api.tx.geneticTesting
    .submitIndependentTestResult(submission)
    .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function submitTestResult(
  api: ApiPromise,
  pair: any,
  trackingId: string,
  submission: DnaTestResultSubmission,
  callback?: () => void,
) {
  // tslint:disable-next-line
  var unsub = await api.tx.geneticTesting
    .submitTestResult(trackingId, submission)
    .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export function submitTestResultFee(
  api: ApiPromise,
  pair: any,
  trackingId: string,
  submission: DnaTestResultSubmission,
): Promise<any> {
  return api.tx.geneticTesting.submitTestResult(trackingId, submission).paymentInfo(pair);
}
