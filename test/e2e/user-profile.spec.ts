import { ApiPromise } from '@polkadot/api';
import 'regenerator-runtime/runtime';
import { queryEthAdressByAccountId, queryAccountIdByEthAddress } from '../../src/query/user-profile';
import { setEthAddress, adminSetEthAddress } from "../../src/command/user-profile";
import { initializeApi } from './polkadot-init';

describe('User Profile Pallet Integration Tests', () => {
  let api: ApiPromise;
  let pair: any;

  const ETH_ADDRESS_MOCK = '0x1abc7154748d1ce5144478cdeb574ae244b939b5';

  beforeAll(async () => {
    const { api: _api, pair: _pair } = await initializeApi();
    api = _api;
    pair = _pair;
  });

  afterAll(() => {
    api.disconnect();
  });

  it('setEthAddress should return', async () => {
    await setEthAddress(api, pair, ETH_ADDRESS_MOCK, async () => {
      expect(await queryEthAdressByAccountId(api, pair.address)).toEqual(ETH_ADDRESS_MOCK);
      expect(await queryAccountIdByEthAddress(api, ETH_ADDRESS_MOCK)).toEqual(pair.address);
    });
  });

  it('adminSetEthAddress should return', async () => {
    await adminSetEthAddress(api, pair, pair.address, ETH_ADDRESS_MOCK, async () => {
      expect(await queryEthAdressByAccountId(api, pair.address)).toEqual(ETH_ADDRESS_MOCK);
      expect(await queryAccountIdByEthAddress(api, ETH_ADDRESS_MOCK)).toEqual(pair.address);
    });
  });
});
