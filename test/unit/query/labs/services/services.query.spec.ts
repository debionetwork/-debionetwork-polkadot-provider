import { queryServiceById, queryServicesByMultipleIds, queryServicesCount, queryServicesCountByOwnerId } from "../../../../../src/query/labs/services";
import { ApiPromise } from "../../../@polkadot-api.mock";
import { mockFunction } from "../../../mock";
import { services, serviceDataMock } from "./services.query.mock";
import { Service } from "../../../../../src/models/services";

jest.mock('../../../mock', () => ({
  mockFunction: jest.fn(),
}));

describe('User Profile Unit Tests', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.query = {
      services: services
  };

  const servicesSpy = jest.spyOn(services, 'services');
  const servicesCountByOwnerSpy = jest.spyOn(services, 'servicesCountByOwner');
  const servicesCountSpy = jest.spyOn(services, 'servicesCount');
  
  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    servicesSpy.mockClear();
    servicesCountByOwnerSpy.mockClear();
    servicesCountSpy.mockClear();
  });

  it('queryServiceById should return', async () => {
      // Arrange
      const PARAM = "PARAM";
      const EXPECTED_VALUE = new Service(serviceDataMock);
      (mockFunction as jest.Mock).mockReturnValue(serviceDataMock);

      // Assert
      expect(await queryServiceById(API_PROMISE_MOCK as any, PARAM))
        .toEqual(EXPECTED_VALUE);
      expect(mockFunction).toBeCalledTimes(1);
      expect(mockFunction).toBeCalledWith(PARAM);
      expect(servicesSpy).toBeCalledTimes(1);
      expect(servicesSpy).toBeCalledWith(PARAM);
  });

  it('queryServicesByMultipleIds should return', async () => {
      // Arrange
      const PARAM = "PARAM";
      const EXPECTED_VALUE = new Service(serviceDataMock);
      (mockFunction as jest.Mock).mockReturnValue(serviceDataMock);

      // Assert
      expect(await queryServicesByMultipleIds(API_PROMISE_MOCK as any, [PARAM]))
        .toEqual([EXPECTED_VALUE]);
      expect(mockFunction).toBeCalledTimes(1);
      expect(mockFunction).toBeCalledWith(PARAM);
      expect(servicesSpy).toBeCalledTimes(1);
      expect(servicesSpy).toBeCalledWith(PARAM);
  });

  it('queryServicesCount should return', async () => {
      // Arrange
      const EXPECTED_VALUE = 0;
      (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);

      // Assert
      expect(await queryServicesCount(API_PROMISE_MOCK as any))
        .toEqual(EXPECTED_VALUE);
      expect(mockFunction).toBeCalledTimes(1);
      expect(servicesCountSpy).toBeCalledTimes(1);
  });

  it('queryServicesCountByOwnerId should return', async () => {
      // Arrange
      const PARAM = "PARAM";
      const EXPECTED_VALUE = 0;
      (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);

      // Assert
      expect(await queryServicesCountByOwnerId(API_PROMISE_MOCK as any, PARAM))
        .toEqual(EXPECTED_VALUE);
      expect(mockFunction).toBeCalledTimes(1);
      expect(servicesCountByOwnerSpy).toBeCalledTimes(1);
      expect(servicesCountByOwnerSpy).toBeCalledWith(PARAM);
  });
});
