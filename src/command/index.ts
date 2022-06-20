import { ApiPromise } from '@polkadot/api';
import { EventRecord } from '@polkadot/types/interfaces/system';
import { ExtrinsicStatus } from '@polkadot/types/interfaces/author';

export * from './genetic-analyst';
export * from './labs';
export * from './doctors';
export * from './electronic-medical-record';
export * from './hospitals';
export * from './rewards';
export * from './service-request';
export * from './user-profile';

export class ExtrinsicCallbackParameters {
  events: EventRecord[];
  status: ExtrinsicStatus;
  callback: () => void;
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
  unsub: any;
}

export function successCallback(api: ApiPromise, { events, status, callback, unsub }) {
  if (status.isFinalized) {
    // Filter for success events
    const eventList = events.filter(({ event }) => api.events.system.ExtrinsicSuccess.is(event));
    if (eventList.length > 0) {
      if (callback) callback(); // If callback not undefined
      unsub();
    }
  }
}

export function extrinsicCallback(api: ApiPromise, callbackParam: ExtrinsicCallbackParameters) {
  const { events, status, callback, resolve, reject, unsub } = callbackParam;
  if (status.isFinalized) {
    // Filter for success events
    const successEventList = events.filter(({ event }) => api.events.system.ExtrinsicSuccess.is(event));
    if (successEventList.length > 0) {
      if (callback) callback(); // If callback not undefined
      unsub.then((_unsub) => {
        _unsub();
        resolve(successEventList);
      });
    }

    // Filter for failed events
    const failedEventList = events.filter(({ event }) => api.events.system.ExtrinsicFailed.is(event));
    if (failedEventList.length > 0) {
      let errorMessage = '';

      const {
        event: {
          data: [error, _],
        },
      } = failedEventList[0];
      if ((error as any).isModule) {
        const decoded = api.registry.findMetaError((error as any).asModule);
        const { docs, method, section } = decoded;

        errorMessage = `${section}.${method}: ${docs.join(' ')}`;
      } else {
        errorMessage = error.toString();
      }

      unsub.then((_unsub) => {
        _unsub();
        reject(errorMessage);
      });
    }
  }
}

export async function getWeb3FromSource(): Promise<any> {
  return (await import('@polkadot/extension-dapp')).web3FromSource;
}

export function getCommandNonceAndSigner(account: any) {
  if (typeof window !== 'undefined') {

    const source = account?.meta?.source;
    getWeb3FromSource()
      .then(web3FromSource => {

        if (source !== undefined && web3FromSource !== undefined) {
          web3FromSource(source)
            .then((src) => {

              const signer = src?.signer;
              if (signer !== undefined) {
                return {
                  ...account,
                  signer,
                };
              }
              else return { nonce: -1 };

            })
            .catch((e) => {
              throw e;
            });
        }
        else return { nonce: -1 };

      })
      .catch((e) => {
        throw e;
      });
      
  }
  else return { nonce: -1 };
}
