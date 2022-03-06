import { queryAccountBalance } from "../../../../src/query/account";
import { ApiPromise } from "../../@polkadot-api.mock";
import { mockFunction } from "../../mock";
import { system } from "./account.query.mock";

jest.mock('../../mock', () => ({
  mockFunction: jest.fn(),
}));

describe('User Profile Queries Unit Tests', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.query = {
      system: system
  };
  API_PROMISE_MOCK.registry = {
    chainDecimals: [0]
  };

  const accountSpy = jest.spyOn(system, 'account');
  
  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    accountSpy.mockClear();
  });

  it('queryAccountBalance should return', async () => {
      // Arrange
      const PARAM = "PARAM";
      const EXPECTED_VALUE = 0;
      const MOCK = {
        data: {
          free: {
            toBigInt: () => EXPECTED_VALUE
          }
        }
      };
      (mockFunction as jest.Mock).mockReturnValue(MOCK);

      // Assert
      expect(await queryAccountBalance(API_PROMISE_MOCK as any, PARAM))
        .toEqual(EXPECTED_VALUE);
      expect(mockFunction).toBeCalledTimes(1);
      expect(mockFunction).toBeCalledWith(PARAM);
      expect(accountSpy).toBeCalledTimes(1);
      expect(accountSpy).toBeCalledWith(PARAM);
  });
});
