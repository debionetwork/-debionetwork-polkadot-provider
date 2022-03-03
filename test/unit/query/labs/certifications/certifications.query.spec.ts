import { Certification } from "../../../../../src/models/labs/certifications";
import { queryCertificationById, queryCertificationsByMultipleIds } from "../../../../../src/query/labs/certifications";
import { ApiPromise } from "../../../@polkadot-api.mock";
import { mockFunction } from "../../../mock";
import { certificationDataMock } from "../../../models/labs/certifications.mock";
import { certifications } from "./certifications.query.mock";

jest.mock('../../../mock', () => ({
  mockFunction: jest.fn(),
}));

describe('Certifications Unit Tests', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.query = {
    certifications: certifications
  };
  
  const certificationsSpy = jest.spyOn(certifications, 'certifications');
  
  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    certificationsSpy.mockClear();
  });

  it('certifications should return', async () => {
    // Arrange
    const CERTIFICATION_ID = "CERTIFICATION_ID";
    const EXPECTED_VALUE = new Certification(certificationDataMock);
    (mockFunction as jest.Mock).mockReturnValue(certificationDataMock);

    // Assert
    expect(await queryCertificationById(API_PROMISE_MOCK as any, CERTIFICATION_ID))
      .toEqual(EXPECTED_VALUE);
    expect(mockFunction).toBeCalledTimes(1);
    expect(mockFunction).toBeCalledWith(CERTIFICATION_ID);
    expect(certificationsSpy).toBeCalledTimes(1);
    expect(certificationsSpy).toBeCalledWith(CERTIFICATION_ID);
  });

  it('certifications called multiple', async () => {
    // Arrange
    const CERTIFICATION_ID_ONE = "CERTIFICATION_ID_ONE";
    const CERTIFICATION_ID_TWO = "CERTIFICATION_ID_TWO";
    const EXPECTED_VALUE = new Certification(certificationDataMock);
    (mockFunction as jest.Mock).mockReturnValue(certificationDataMock);

    // Assert
    expect(await queryCertificationsByMultipleIds(API_PROMISE_MOCK as any, [CERTIFICATION_ID_ONE, CERTIFICATION_ID_TWO]))
      .toEqual([EXPECTED_VALUE, EXPECTED_VALUE]);
    expect(mockFunction).toBeCalledTimes(2);
    expect(mockFunction).toBeCalledWith(CERTIFICATION_ID_ONE);
    expect(mockFunction).toBeCalledWith(CERTIFICATION_ID_TWO);
    expect(certificationsSpy).toBeCalledTimes(2);
    expect(certificationsSpy).toBeCalledWith(CERTIFICATION_ID_ONE);
    expect(certificationsSpy).toBeCalledWith(CERTIFICATION_ID_TWO);
  });
});