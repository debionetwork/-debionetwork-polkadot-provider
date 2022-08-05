import { ApiPromise } from '@polkadot/api';
import 'regenerator-runtime/runtime';
import { sendRewards, updateRewardsAdminKey, sudoRewardsUpdateAdminKey } from "../../src/command/rewards";
import { queryRewarderKey } from "../../src/query/rewards";
import { initializeApi } from './polkadot-init';


describe('Rewards Pallet Integration Tests', () => {
  let api: ApiPromise;
  let pair: any;

  const REWARDS_MOCK = '100000000000000000000';

  beforeAll(async () => {
    const { api: _api, pair: _pair } = await initializeApi();
    api = _api;
    pair = _pair;
  });

  afterAll(() => {
    api.disconnect();
  });

  it('sendRewards should return', async () => {
    await sendRewards(api, pair, pair.address, REWARDS_MOCK);
  });

  it('updateRewardsAdminKey should return', async () => {
    await updateRewardsAdminKey(api, pair, pair.address);
    expect(await queryRewarderKey(api)).toEqual(pair.address);
  });

  it('sudoRewardsUpdateAdminKey should return', async () => {
    await sudoRewardsUpdateAdminKey(api, pair, pair.address);
    expect(await queryRewarderKey(api)).toEqual(pair.address);
  });
});
