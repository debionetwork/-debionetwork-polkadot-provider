import { ApiPromise } from '@polkadot/api';

export async function queryRewarderKey(api: ApiPromise): Promise<string> {
  return (await api.query.rewards.rewarderKey()).toString();
}

export async function queryPalletAccount(api: ApiPromise): Promise<string> {
  return (await api.query.rewards.palletAccount()).toString();
}

export async function queryTotalRewardAmount(api: ApiPromise): Promise<string> {
  return (await api.query.rewards.totalRewardAmount()).toString();
}
