import { queryServiceById, queryServicesByMultipleIds, queryServicesCount, queryServicesCountByOwnerId } from "../../../../src/query/labs/services";
import { ApiPromise } from "../../@polkadot-api.mock.ts";
import { mockFunction } from "../../mock";
import { services } from "./services.query.mock";
import * as service from "../../../../src/models/services";

jest.mock('../../mock', () => ({
  mockFunction: jest.fn(),
}));

jest.mock('../../../../src/models/services');

describe('Certifications Unit Tests', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.query = {
    services: services
  };
  
  const serviceClassSpy = jest.spyOn(service, 'Service');
  const servicesSpy = jest.spyOn(services, 'services');
  const servicesCountSpy = jest.spyOn(services, 'servicesCount');
  const servicesCountByOwnerSpy = jest.spyOn(services, 'servicesCountByOwner');
  const parseIntSpy = jest.spyOn(global, 'parseInt');

  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    serviceClassSpy.mockClear();
    servicesSpy.mockClear();
    servicesCountSpy.mockClear();
    servicesCountByOwnerSpy.mockClear();
  });

  it('services should return', async () => {
    // Arrange
    const SERVICE_ID = "SERVICE_ID";
    const RETURN_QUERY = {
        toHuman: jest.fn()
    };
    const EXPECTED_VALUE = {};
    (mockFunction as jest.Mock).mockReturnValue(RETURN_QUERY);

    // Assert
    expect(await queryServiceById(API_PROMISE_MOCK as any, SERVICE_ID))
      .toEqual(EXPECTED_VALUE);
    expect(mockFunction).toBeCalledTimes(1);
    expect(mockFunction).toBeCalledWith(SERVICE_ID);
    expect(servicesSpy).toBeCalledTimes(1);
    expect(servicesSpy).toBeCalledWith(SERVICE_ID);
    expect(RETURN_QUERY.toHuman).toBeCalledTimes(1);
    expect(serviceClassSpy).toBeCalledTimes(1);
    expect(serviceClassSpy).toBeCalledWith(RETURN_QUERY.toHuman());
    serviceClassSpy.mockClear();
  });

  it('services called multiple', async () => {
    // Arrange
    const SERVICE_ID_ONE = "SERVICE_ID_ONE";
    const SERVICE_ID_TWO = "SERVICE_ID_ONE";
    const ARRAY_SERVICE = [SERVICE_ID_ONE, SERVICE_ID_TWO];
    const RETURN_QUERY = {
        toHuman: jest.fn()
    };
    const EXPECTED_VALUE = [{}, {}];
    (mockFunction as jest.Mock).mockReturnValue(RETURN_QUERY);

    // Assert
    expect(await queryServicesByMultipleIds(API_PROMISE_MOCK as any, ARRAY_SERVICE))
      .toEqual(EXPECTED_VALUE);
    expect(mockFunction).toBeCalledTimes(2);
    expect(mockFunction).toBeCalledWith(SERVICE_ID_ONE);
    expect(mockFunction).toBeCalledWith(SERVICE_ID_TWO);
    expect(servicesSpy).toBeCalledTimes(2);
    expect(servicesSpy).toBeCalledWith(SERVICE_ID_ONE);
    expect(servicesSpy).toBeCalledWith(SERVICE_ID_TWO);
    expect(RETURN_QUERY.toHuman).toBeCalledTimes(2);
    expect(serviceClassSpy).toBeCalledTimes(2);
    expect(serviceClassSpy).toBeCalledWith(RETURN_QUERY.toHuman());
    serviceClassSpy.mockClear();
  });

  it('serviceCount should return', async () => {
    parseIntSpy.mockClear();
    // Arrange
    const RETURN_QUERY = {
      toHuman: jest.fn().mockReturnValue('1')
    };
    const EXPECTED_VALUE = 1;
    (mockFunction as jest.Mock).mockReturnValue(RETURN_QUERY);

    // Assert
    expect(await queryServicesCount(API_PROMISE_MOCK as any))
      .toEqual(EXPECTED_VALUE);
    expect(mockFunction).toBeCalledTimes(1);
    expect(servicesCountSpy).toBeCalledTimes(1);
    expect(RETURN_QUERY.toHuman).toBeCalledTimes(1);
    expect(parseIntSpy).toBeCalledTimes(1);
    expect(parseIntSpy).toBeCalledWith(RETURN_QUERY.toHuman(), 0);
  });

  it('servicesCountByOwner should return', async () => {
    parseIntSpy.mockClear();
    // Arrange
    const ACCOUNT_ID = "ACCOUNT_ID";
    const RETURN_QUERY = {
        toHuman: jest.fn().mockReturnValue('1')
    };
    const EXPECTED_VALUE = 1;
    (mockFunction as jest.Mock).mockReturnValue(RETURN_QUERY);

    // Assert
    expect(await queryServicesCountByOwnerId(API_PROMISE_MOCK as any, ACCOUNT_ID))
      .toEqual(EXPECTED_VALUE);
    expect(mockFunction).toBeCalledTimes(1);
    expect(mockFunction).toBeCalledWith(ACCOUNT_ID);
    expect(servicesCountByOwnerSpy).toBeCalledTimes(1);
    expect(servicesCountByOwnerSpy).toBeCalledWith(ACCOUNT_ID);
    expect(RETURN_QUERY.toHuman).toBeCalledTimes(1);
    expect(parseIntSpy).toBeCalledTimes(1);
    expect(parseIntSpy).toBeCalledWith(RETURN_QUERY.toHuman(), 0);
  });
});