import { ApiPromise } from '@polkadot/api';

export * from './genetic-analyst';
export * from './labs';
export * from './doctors';
export * from './electronic-medical-record';
export * from './hospitals';
export * from './rewards';
export * from './service-request';
export * from './user-profile';

export function successCallback(api: ApiPromise, { events, status, callback, unsub }) {
  if (status.isFinalized) {
    // find/filter for success events
    const eventList = events.filter(({ event }) => api.events.system.ExtrinsicSuccess.is(event));
    if (eventList.length > 0) {
      if (callback) callback(); // If callback not undefined
      unsub();
    }
  }
}
