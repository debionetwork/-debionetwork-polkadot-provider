import { ApiPromise } from '@polkadot/api';
import { EventRecord } from '@polkadot/types/interfaces/system';
// import { successCallback } from '../../index';
import { extrinsicCallback, ExtrinsicCallbackParameters } from '../../index';
import { GeneticAnalystInfo } from '../../models/genetic-analysts';
import { AvailabilityStatus } from '../../primitives/availability-status';
import { VerificationStatus } from '../../primitives/verification-status';

export async function registerGeneticAnalyst(
  api: ApiPromise,
  pair: any,
  geneticAnalystInfo: GeneticAnalystInfo,
  callback?: () => void,
): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.geneticAnalysts.registerGeneticAnalyst(geneticAnalystInfo).signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      extrinsicCallback(api, {
        events,
        status,
        callback,
        resolve,
        reject,
        unsub,
      } as ExtrinsicCallbackParameters);
    });
  });
  // tslint:disable-next-line
  // var unsub = await api.tx.geneticAnalysts
  //   .registerGeneticAnalyst(geneticAnalystInfo)
  //   .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
  //     successCallback(api, { events, status, callback, unsub });
  //   });
}

export async function updateGeneticAnalyst(
  api: ApiPromise,
  pair: any,
  geneticAnalystInfo: GeneticAnalystInfo,
  callback?: () => void,
): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.geneticAnalysts.updateGeneticAnalyst(geneticAnalystInfo).signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      extrinsicCallback(api, {
        events,
        status,
        callback,
        resolve,
        reject,
        unsub,
      } as ExtrinsicCallbackParameters);
    });
  });
  // tslint:disable-next-line
  // var unsub = await api.tx.geneticAnalysts
  //   .updateGeneticAnalyst(geneticAnalystInfo)
  //   .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
  //     successCallback(api, { events, status, callback, unsub });
  //   });
}

export async function deregisterGeneticAnalyst(api: ApiPromise, pair: any, callback?: () => void): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.geneticAnalysts.deregisterGeneticAnalyst().signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      extrinsicCallback(api, {
        events,
        status,
        callback,
        resolve,
        reject,
        unsub,
      } as ExtrinsicCallbackParameters);
    });
  });
  // tslint:disable-next-line
  // var unsub = await api.tx.geneticAnalysts
  //   .deregisterGeneticAnalyst()
  //   .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
  //     successCallback(api, { events, status, callback, unsub });
  //   });
}

export async function updateGeneticAnalystVerificationStatus(
  api: ApiPromise,
  pair: any,
  accountId: string,
  geneticAnalystVerificationStatus: VerificationStatus,
  callback?: () => void,
): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.geneticAnalysts.updateGeneticAnalystVerificationStatus(accountId, geneticAnalystVerificationStatus.toString()).signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      extrinsicCallback(api, {
        events,
        status,
        callback,
        resolve,
        reject,
        unsub,
      } as ExtrinsicCallbackParameters);
    });
  });
  // tslint:disable-next-line
  // var unsub = await api.tx.geneticAnalysts
  //   .updateGeneticAnalystVerificationStatus(accountId, geneticAnalystVerificationStatus.toString())
  //   .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
  //     successCallback(api, { events, status, callback, unsub });
  //   });
}

export async function updateGeneticAnalystAvailabilityStatus(
  api: ApiPromise,
  pair: any,
  geneticAnalystAvailabilityStatus: AvailabilityStatus,
  callback?: () => void,
): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.geneticAnalysts.updateGeneticAnalystAvailabilityStatus(geneticAnalystAvailabilityStatus.toString()).signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      extrinsicCallback(api, {
        events,
        status,
        callback,
        resolve,
        reject,
        unsub,
      } as ExtrinsicCallbackParameters);
    });
  });
  // tslint:disable-next-line
  // var unsub = await api.tx.geneticAnalysts
  //   .updateGeneticAnalystAvailabilityStatus(geneticAnalystAvailabilityStatus.toString())
  //   .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
  //     successCallback(api, { events, status, callback, unsub });
  //   });
}

export async function stakeGeneticAnalyst(api: ApiPromise, pair: any, callback?: () => void): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.geneticAnalysts.stakeGeneticAnalyst().signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      extrinsicCallback(api, {
        events,
        status,
        callback,
        resolve,
        reject,
        unsub,
      } as ExtrinsicCallbackParameters);
    });
  });
  // tslint:disable-next-line
  // var unsub = await api.tx.geneticAnalysts
  //   .stakeGeneticAnalyst()
  //   .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
  //     successCallback(api, { events, status, callback, unsub });
  //   });
}

export async function unstakeGeneticAnalyst(api: ApiPromise, pair: any, callback?: () => void): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.geneticAnalysts.unstakeGeneticAnalyst().signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      extrinsicCallback(api, {
        events,
        status,
        callback,
        resolve,
        reject,
        unsub,
      } as ExtrinsicCallbackParameters);
    });
  });
  // tslint:disable-next-line
  // var unsub = await api.tx.geneticAnalysts
  //   .unstakeGeneticAnalyst()
  //   .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
  //     successCallback(api, { events, status, callback, unsub });
  //   });
}

export async function retrieveGeneticAnalystUnstakeAmount(
  api: ApiPromise,
  pair: any,
  accountId: string,
  callback?: () => void,
): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.geneticAnalysts.retrieveUnstakeAmount(accountId).signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      extrinsicCallback(api, {
        events,
        status,
        callback,
        resolve,
        reject,
        unsub,
      } as ExtrinsicCallbackParameters);
    });
  });
  // tslint:disable-next-line
  // var unsub = await api.tx.geneticAnalysts
  //   .retrieveUnstakeAmount(accountId)
  //   .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
  //     successCallback(api, { events, status, callback, unsub });
  //   });
}

export async function updateGeneticAnalystMinimumStakeAmount(
  api: ApiPromise,
  pair: any,
  minimum: number,
  callback?: () => void,
): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.geneticAnalysts.updateMinimumStakeAmount(minimum).signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      extrinsicCallback(api, {
        events,
        status,
        callback,
        resolve,
        reject,
        unsub,
      } as ExtrinsicCallbackParameters);
    });
  });
  // tslint:disable-next-line
  // var unsub = await api.tx.geneticAnalysts
  //   .updateMinimumStakeAmount(minimum)
  //   .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
  //     successCallback(api, { events, status, callback, unsub });
  //   });
}

export async function updateGeneticAnalystAdminKey(
  api: ApiPromise,
  pair: any,
  accountId: string,
  callback?: () => void,
): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.geneticAnalysts.updateAdminKey(accountId).signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      extrinsicCallback(api, {
        events,
        status,
        callback,
        resolve,
        reject,
        unsub,
      } as ExtrinsicCallbackParameters);
    });
  });
  // tslint:disable-next-line
  // var unsub = await api.tx.geneticAnalysts
  //   .updateAdminKey(accountId)
  //   .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
  //     successCallback(api, { events, status, callback, unsub });
  //   });
}

export async function sudoUpdateGeneticAnalystAdminKey(
  api: ApiPromise,
  pair: any,
  accountId: string,
  callback?: () => void,
): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.geneticAnalysts.sudoUpdateAdminKey(accountId).signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      extrinsicCallback(api, {
        events,
        status,
        callback,
        resolve,
        reject,
        unsub,
      } as ExtrinsicCallbackParameters);
    });
  });
  // tslint:disable-next-line
  // var unsub = await api.tx.geneticAnalysts
  //   .sudoUpdateAdminKey(accountId)
  //   .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
  //     successCallback(api, { events, status, callback, unsub });
  //   });
}

export * from './genetic-analysis-orders';
export * from './genetic-analysis';
export * from './genetic-analyst-qualification';
export * from './genetic-analyst-services';
export * from './genetic-data';
