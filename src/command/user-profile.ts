import { ApiPromise } from '@polkadot/api';
import { successCallback } from '..';

export async function setEthAddress(
  api: ApiPromise,
  pair: any,
  substrateAddress: string,
  ethAddress: string,
  callback?: () => void,
): Promise<void> {
  var unsub = await api.tx.userProfile
    .adminSetEthAddress(substrateAddress, ethAddress)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) =>
      successCallback(api, { events, status, callback, unsub }),
    );
}
