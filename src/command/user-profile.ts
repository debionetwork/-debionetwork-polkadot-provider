import { ApiPromise } from '@polkadot/api';
import { successCallback, getCommandNonceAndSigner } from '../index';

export async function setEthAddress(
  api: ApiPromise,
  pair: any,
  ethAddress: string,
  callback?: () => void,
): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.userProfile
    .setEthAddress(ethAddress)
    .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function adminSetEthAddress(
  api: ApiPromise,
  pair: any,
  substrateAddress: string,
  ethAddress: string,
  callback?: () => void,
): Promise<void> {
  // tslint:disable-next-line
  var unsub = await api.tx.userProfile
    .adminSetEthAddress(substrateAddress, ethAddress)
    .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}
