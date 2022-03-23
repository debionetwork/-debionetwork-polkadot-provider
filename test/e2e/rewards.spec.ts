import { ApiPromise } from '@polkadot/api';
import 'regenerator-runtime/runtime';
import { sendRewards } from "../../src/command/rewards";
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
  }, 25000); // Set timeout for 25 seconds
});
