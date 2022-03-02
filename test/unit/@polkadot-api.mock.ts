import { mockFunction } from './mock';

export class WsProvider {
  constructor(params) {
    mockFunction(params);
  }
}
export class ApiPromise {
  query: any;
  tx: any;
  
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
  signAndSend(pair: any, nonce: any, callback?: ({ events, status }) => void) {
    callback(eventAndStatusMock);
    return mockFunction;
  }
}