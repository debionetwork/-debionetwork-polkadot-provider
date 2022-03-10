import { toHumanMock } from './@polkadot-types.mock';
import { mockFunction } from './mock';

export class WsProvider {
  constructor(params) {
    mockFunction(params);
  }
}
export class ApiPromise {
  query: any;
  tx: any;
  registry: any;
  
  static create(provider) { // eslint-disable-line
    return new ApiPromise();
  }
  on(ev, func) { // eslint-disable-line
    mockFunction(ev);
  }
}
export class Keyring {
  constructor(params) {
    mockFunction(params);
  }
  addFromUri(provider) {} // eslint-disable-line
}

export const eventAndStatusMock = {
  events: "EVENTS",
  status: "STATUS"
};

export const signAndSend = {
  signAndSend(pair: any, nonce: any, callback?: ({ events, status }) => void) { // eslint-disable-line
    callback(eventAndStatusMock);
    return mockFunction;
  }
}

export const signAndSendWithPaymentInfo = {
  signAndSend(pair: any, nonce: any, callback?: ({ events, status }) => void) { // eslint-disable-line
    callback(eventAndStatusMock);
    return mockFunction;
  },
  paymentInfo(pair: any) { // eslint-disable-line
    return mockFunction();
  }
}

export const signAndSendReturnToHuman = {
  signAndSend(pair: any, nonce: any) {
    return toHumanMock;
  }
}