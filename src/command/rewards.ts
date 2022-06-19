import { ApiPromise } from '@polkadot/api';
import { successCallback, getCommandNonceAndSigner } from '../index';

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
    .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}

export async function updateRewardsAdminKey(api: ApiPromise, pair: any, accountId: string, callback?: () => void) {
  // tslint:disable-next-line
  var unsub = await api.tx.rewards.updateAdminKey(accountId).signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
    successCallback(api, { events, status, callback, unsub });
  });
}

export async function sudoRewardsUpdateAdminKey(api: ApiPromise, pair: any, accountId: string, callback?: () => void) {
  // tslint:disable-next-line
  var unsub = await api.tx.sudo
    .sudo(api.tx.rewards.sudoUpdateAdminKey(accountId))
    .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
      successCallback(api, { events, status, callback, unsub });
    });
}
