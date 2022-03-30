import { ApiPromise } from '@polkadot/api';
import { successCallback } from '../../index';
import { GeneticAnalystInfo, GeneticAnalystsVerificationStatus } from '../../models/genetic-analysts';
import { GeneticAnalystsAvailabilityStatus } from '../../models/genetic-analysts/genetic-analyst-availability-status';

export async function registerGeneticAnalyst(
  api: ApiPromise,
  pair: any,
  geneticAnalystInfo: GeneticAnalystInfo,
  callback?: () => void,
) {
  // tslint:disable-next-line
  var unsub = await api.tx.geneticAnalysts
    .registerGeneticAnalyst(geneticAnalystInfo)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function updateGeneticAnalyst(
  api: ApiPromise,
  pair: any,
  geneticAnalystInfo: GeneticAnalystInfo,
  callback?: () => void,
) {
  // tslint:disable-next-line
  var unsub = await api.tx.geneticAnalysts
    .updateGeneticAnalyst(geneticAnalystInfo)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function deregisterGeneticAnalyst(api: ApiPromise, pair: any, callback?: () => void) {
  // tslint:disable-next-line
  var unsub = await api.tx.geneticAnalysts
    .deregisterGeneticAnalyst()
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function retrieveUnstakeAmount(api: ApiPromise, pair: any, accountId: string, callback?: () => void) {
  // tslint:disable-next-line
  var unsub = await api.tx.geneticAnalysts
    .retrieveUnstakeAmount(accountId)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function updateGeneticAnalystVerificationStatus(
  api: ApiPromise,
  pair: any,
  accountId: string,
  geneticAnalystVerificationStatus: GeneticAnalystsVerificationStatus,
  callback?: () => void,
) {
  // tslint:disable-next-line
  var unsub = await api.tx.geneticAnalysts
    .updateGeneticAnalystVerificationStatus(accountId, geneticAnalystVerificationStatus.toString())
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function updateGeneticAnalystAvailabilityStatus(
  api: ApiPromise,
  pair: any,
  accountId: string,
  geneticAnalystAvailabilityStatus: GeneticAnalystsAvailabilityStatus,
  callback?: () => void,
) {
  // tslint:disable-next-line
  var unsub = await api.tx.geneticAnalysts
    .updateGeneticAnalystAvailabilityStatus(accountId, geneticAnalystAvailabilityStatus.toString())
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function stakeGeneticAnalyst(api: ApiPromise, pair: any, callback?: () => void) {
  // tslint:disable-next-line
  var unsub = await api.tx.geneticAnalysts
    .stakeGeneticAnalyst()
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function unstakeGeneticAnalyst(api: ApiPromise, pair: any, callback?: () => void) {
  // tslint:disable-next-line
  var unsub = await api.tx.geneticAnalysts
    .unstakeGeneticAnalyst()
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function updateMinimumStakeAmount(api: ApiPromise, pair: any, minimum: number, callback?: () => void) {
  // tslint:disable-next-line
  var unsub = await api.tx.geneticAnalysts
    .updateMinimumStakeAmount(minimum)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function updateAdminKey(api: ApiPromise, pair: any, accountId: string, callback?: () => void) {
  // tslint:disable-next-line
  var unsub = await api.tx.geneticAnalysts
    .updateAdminKey(accountId)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function sudoUpdateAdminKey(api: ApiPromise, pair: any, accountId: string, callback?: () => void) {
  // tslint:disable-next-line
  var unsub = await api.tx.geneticAnalysts
    .sudoUpdateAdminKey(accountId)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export * from './genetic-analysis-orders';
export * from './genetic-analysis';
export * from './genetic-analyst-qualification';
export * from './genetic-analyst-services';
export * from './genetic-data';
