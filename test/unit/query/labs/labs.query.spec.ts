import { queryLabById } from "../../../../src/query/labs";
import { ApiPromise } from "../../@polkadot-api.mock";
import { mockFunction } from "../../mock";
import { labs } from "./labs.query.mock";
import { labDataMock } from "../../models/labs/labs.mock";
import { Lab } from "../../../../src/models/labs";

jest.mock('../../mock', () => ({
  mockFunction: jest.fn(),
}));

describe('Lab Queries Unit Tests', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.query = {
    labs: labs
  };
  
  const labsSpy = jest.spyOn(labs, 'labs');
  
  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    labsSpy.mockClear();
  });

  it('labs should return', async () => {
    // Arrange
    const LAB_ID = "LAB_ID";
    const EXPECTED_VALUE = new Lab(labDataMock);
    (mockFunction as jest.Mock).mockReturnValue(labDataMock);

    // Assert
    expect(await queryLabById(API_PROMISE_MOCK as any, LAB_ID))
      .toEqual(EXPECTED_VALUE);
    expect(mockFunction).toBeCalledTimes(1);
    expect(mockFunction).toBeCalledWith(LAB_ID);
    expect(labsSpy).toBeCalledTimes(1);
    expect(labsSpy).toBeCalledWith(LAB_ID);
  });
});