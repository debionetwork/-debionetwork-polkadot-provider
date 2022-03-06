import { queryAccountIdByEthAddress, queryEthAdressByAccountId } from "../../../../src/query/user-profile";
import { ApiPromise } from "../../@polkadot-api.mock";
import { mockFunction } from "../../mock";
import { userProfile } from "./user-profile.query.mock";

jest.mock('../../mock', () => ({
  mockFunction: jest.fn(),
}));

describe('User Profile Queries Unit Tests', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.query = {
      userProfile: userProfile
  };

  const accountIdByEthAddressSpy = jest.spyOn(userProfile, 'accountIdByEthAddress');
  const ethAddressByAccountIdSpy = jest.spyOn(userProfile, 'ethAddressByAccountId');
  
  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    accountIdByEthAddressSpy.mockClear();
    ethAddressByAccountIdSpy.mockClear();
  });

  it('queryAccountIdByEthAddress should return', async () => {
      // Arrange
      const PARAM = "PARAM";
      const EXPECTED_VALUE = "VALUE";
      (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);

      // Assert
      expect(await queryAccountIdByEthAddress(API_PROMISE_MOCK as any, PARAM))
        .toEqual(EXPECTED_VALUE);
      expect(mockFunction).toBeCalledTimes(1);
      expect(mockFunction).toBeCalledWith(PARAM);
      expect(accountIdByEthAddressSpy).toBeCalledTimes(1);
      expect(accountIdByEthAddressSpy).toBeCalledWith(PARAM);
  });

  it('queryEthAdressByAccountId should return', async () => {
      // Arrange
      const PARAM = "PARAM";
      const EXPECTED_VALUE = "VALUE";
      (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);

      // Assert
      expect(await queryEthAdressByAccountId(API_PROMISE_MOCK as any, PARAM))
        .toEqual(EXPECTED_VALUE);
      expect(mockFunction).toBeCalledTimes(1);
      expect(mockFunction).toBeCalledWith(PARAM);
      expect(ethAddressByAccountIdSpy).toBeCalledTimes(1);
      expect(ethAddressByAccountIdSpy).toBeCalledWith(PARAM);
  });
});
