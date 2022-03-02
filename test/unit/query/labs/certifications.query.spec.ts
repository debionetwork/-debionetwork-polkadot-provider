import { queryCertificationById, queryCertificationsByMultipleIds } from "../../../../src/query/labs/certifications";
import { ApiPromise } from "../../@polkadot-api.mock.ts";
import { mockFunction } from "../../mock";
import { certifications } from "./certifications.query.mock";
import * as certification from "../../../../src/models/certifications";

jest.mock('../../mock', () => ({
  mockFunction: jest.fn(),
}));

jest.mock('../../../../src/models/certifications');

describe('Certifications Unit Tests', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.query = {
    certifications: certifications
  };
  
  const certificationClassSpy = jest.spyOn(certification, 'Certification');
  const certificationsSpy = jest.spyOn(certifications, 'certifications');
  
  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    certificationsSpy.mockClear();
    certificationClassSpy.mockClear();
  });

  it('certifications should return', async () => {
    // Arrange
    const CERTIFICATION_ID = "CERTIFICATION_ID";
    const RETURN_QUERY = {
        toHuman: jest.fn()
    };
    const EXPECTED_VALUE = {};
    (mockFunction as jest.Mock).mockReturnValue(RETURN_QUERY);

    // Assert
    expect(await queryCertificationById(API_PROMISE_MOCK as any, CERTIFICATION_ID))
      .toEqual(EXPECTED_VALUE);
    expect(mockFunction).toBeCalledTimes(1);
    expect(mockFunction).toBeCalledWith(CERTIFICATION_ID);
    expect(certificationsSpy).toBeCalledTimes(1);
    expect(certificationsSpy).toBeCalledWith(CERTIFICATION_ID);
    expect(RETURN_QUERY.toHuman).toBeCalledTimes(1);
    expect(certificationClassSpy).toBeCalledTimes(1);
    expect(certificationClassSpy).toBeCalledWith(RETURN_QUERY.toHuman());
    certificationClassSpy.mockClear();
  });

  it('certifications called multiple', async () => {
    // Arrange
    const CERTIFICATION_ID_ONE = "CERTIFICATION_ID_ONE";
    const CERTIFICATION_ID_TWO = "CERTIFICATION_ID_ONE";
    const ARRAY_CERTIFICATION = [CERTIFICATION_ID_ONE, CERTIFICATION_ID_TWO];
    const RETURN_QUERY = {
        toHuman: jest.fn()
    };
    const EXPECTED_VALUE = [{}, {}];
    (mockFunction as jest.Mock).mockReturnValue(RETURN_QUERY);

    // Assert
    expect(await queryCertificationsByMultipleIds(API_PROMISE_MOCK as any, ARRAY_CERTIFICATION))
      .toEqual(EXPECTED_VALUE);
    expect(mockFunction).toBeCalledTimes(2);
    expect(mockFunction).toBeCalledWith(CERTIFICATION_ID_ONE);
    expect(mockFunction).toBeCalledWith(CERTIFICATION_ID_TWO);
    expect(certificationsSpy).toBeCalledTimes(2);
    expect(certificationsSpy).toBeCalledWith(CERTIFICATION_ID_ONE);
    expect(certificationsSpy).toBeCalledWith(CERTIFICATION_ID_TWO);
    expect(RETURN_QUERY.toHuman).toBeCalledTimes(2);
    expect(certificationClassSpy).toBeCalledTimes(2);
    expect(certificationClassSpy).toBeCalledWith(RETURN_QUERY.toHuman());
  });
});