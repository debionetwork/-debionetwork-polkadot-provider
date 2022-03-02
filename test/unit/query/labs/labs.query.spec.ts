import { queryLabById } from "../../../../src/query/labs";
import { ApiPromise } from "../../@polkadot-api.mock.ts";
import { mockFunction } from "../../mock";
import { labs } from "./labs.query.mock";
import * as lab from "../../../../src/models/labs";

jest.mock('../../mock', () => ({
  mockFunction: jest.fn(),
}));

jest.mock('../../../../src/models/labs');

describe('User Profile Unit Tests', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.query = {
    labs: labs
  };
  
  const labClassSpy = jest.spyOn(lab, 'Lab');
  const labsSpy = jest.spyOn(labs, 'labs');
  
  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    labsSpy.mockClear();
    labClassSpy.mockClear();
  });

  it('labs should return', async () => {
    // Arrange
    const LAB_ID = "LAB_ID";
    const RETURN_QUERY = {
        toHuman: jest.fn()
    };
    const EXPECTED_VALUE = {};
    (mockFunction as jest.Mock).mockReturnValue(RETURN_QUERY);

    // Assert
    expect(await queryLabById(API_PROMISE_MOCK as any, LAB_ID))
      .toEqual(EXPECTED_VALUE);
    expect(mockFunction).toBeCalledTimes(1);
    expect(mockFunction).toBeCalledWith(LAB_ID);
    expect(labsSpy).toBeCalledTimes(1);
    expect(labsSpy).toBeCalledWith(LAB_ID);
    expect(RETURN_QUERY.toHuman).toBeCalledTimes(1);
    expect(labClassSpy).toBeCalledTimes(1);
    expect(labClassSpy).toBeCalledWith(RETURN_QUERY.toHuman());
  });
});