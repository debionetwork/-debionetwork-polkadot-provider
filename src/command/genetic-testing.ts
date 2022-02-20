import { ApiPromise } from '@polkadot/api';
import { successCallback } from '..';
import { DnaTestResultSubmission } from '../models';

export async function processDnaSample(
  api: ApiPromise,
  pair: any,
  trackingId: string,
  processStatus: any,
  callback?: () => void,
) {
  var unsub = await api.tx.geneticTesting
    .processDnaSample(trackingId, processStatus)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) =>
      successCallback(api, { events, status, callback, unsub }),
    );
}

export async function receiveDnaSample(api: ApiPromise, pair: any, trackingId: string, callback?: () => void) {
  var unsub = await api.tx.geneticTesting
    .receiveDnaSample(trackingId)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) =>
      successCallback(api, { events, status, callback, unsub }),
    );
}

export async function rejectDnaSample(
  api: ApiPromise,
  pair: any,
  trackingId: string,
  rejectedTitle: string,
  rejectedDescription: string,
  callback?: () => void,
) {
  var unsub = await api.tx.geneticTesting
    .rejectDnaSample(trackingId, rejectedTitle, rejectedDescription)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) =>
      successCallback(api, { events, status, callback, unsub }),
    );
}

export async function submitIndependentTestResult(
  api: ApiPromise,
  pair: any,
  submission: DnaTestResultSubmission,
  callback?: () => void,
) {
  var unsub = await api.tx.geneticTesting
    .submitIndependentTestResult(submission)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) =>
      successCallback(api, { events, status, callback, unsub }),
    );
}

export async function submitTestResult(
  api: ApiPromise,
  pair: any,
  trackingId: string,
  submission: DnaTestResultSubmission,
  callback?: () => void,
) {
  var unsub = await api.tx.geneticTesting
    .submitTestResult(trackingId, submission)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) =>
      successCallback(api, { events, status, callback, unsub }),
    );
}
