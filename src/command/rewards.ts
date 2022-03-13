import { ApiPromise } from '@polkadot/api';
import { successCallback } from '..';

export async function sendRewards(
  api: ApiPromise,
  pair: any,
  substrateAddress: string,
  rewardAmount: string,
  callback?: () => void,
) {
  // tslint:disable-next-line
  var unsub = await api.tx.rewards
    .rewardFunds(substrateAddress, rewardAmount)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}
