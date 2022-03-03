import { ApiPromise } from '@polkadot/api';
import { successCallback } from '../..';
import { GeneticAnalystsVerificationStatus } from '../../models/genetic-analysts';

export async function updateGeneticAnalystVerificationStatus(
  api: ApiPromise,
  pair: any,
  accountId: string,
  geneticAnalystVerificationStatus: GeneticAnalystsVerificationStatus,
  callback?: () => void,
) {
  var unsub = await api.tx.geneticAnalysts
    .updateGeneticAnalystVerificationStatus(accountId, geneticAnalystVerificationStatus.toString())
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) =>
      successCallback(api, { events, status, callback, unsub }),
    );
}

export * from "./genetic-analysis-orders";