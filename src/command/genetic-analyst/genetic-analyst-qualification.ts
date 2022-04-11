import { ApiPromise } from '@polkadot/api';
import { successCallback } from '../..';
import { GeneticAnalystQualificationInfo } from '../../models';

export async function bulkCreateQualification(
  api: ApiPromise,
  pair: any,
  geneticAnalystQualificationInfos: GeneticAnalystQualificationInfo[],
  callback?: () => void,
): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.geneticAnalystQualifications
    .bulkCreateQualification(geneticAnalystQualificationInfos)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function createQualification(
  api: ApiPromise,
  pair: any,
  geneticAnalystQualificationInfo: GeneticAnalystQualificationInfo,
  callback?: () => void,
): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.geneticAnalystQualifications
    .createQualification(geneticAnalystQualificationInfo)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function deleteQualification(
  api: ApiPromise,
  pair: any,
  qualificationId: string,
  callback?: () => void,
): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.geneticAnalystQualifications
    .deleteQualification(qualificationId)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function updateQualification(
  api: ApiPromise,
  pair: any,
  qualificationId: string,
  geneticAnalystQualificationInfo: GeneticAnalystQualificationInfo,
  callback?: () => void,
): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.geneticAnalystQualifications
    .updateQualification(qualificationId, geneticAnalystQualificationInfo)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}
