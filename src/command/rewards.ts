import { ApiPromise } from '@polkadot/api';

export const dbioUnit: number = 10 ** 18;

export function convertToDbioUnit(_number: number): number {
  return _number * dbioUnit;
}

export function convertToDbioUnitString(_number: number): string {
  return (_number * dbioUnit).toString();
}

export async function sendRewards(api: ApiPromise, pair: any, substrateAddress: string, rewardAmount: string) {
  await api.tx.rewards.rewardFunds(substrateAddress, rewardAmount).signAndSend(pair, { nonce: -1 });
}
