import { ApiPromise } from '@polkadot/api';
import 'regenerator-runtime/runtime';
import { queryServiceById, queryServicesByMultipleIds, queryServicesCount, queryServicesCountByOwnerId } from '../../../src/query/labs/services';
import { createService, updateService, deleteService } from "../../../src/command/labs/services";
import { initializeApi } from '../polkadot-init';
import { queryLabById } from '../../../src/query/labs';
import { Lab } from '../../../src/models/labs';
import { deregisterLab, registerLab } from "../../../src/command/labs";
import { labDataMock } from '../../unit/models/labs/labs.mock';
import { Service } from '../../../src/models/labs/services';
import { serviceDataMock } from '../../unit/models/labs/services.mock';

describe('Services Pallet Integration Tests', () => {
  let api: ApiPromise;
  let pair: any;

  beforeAll(async () => {
    const { api: _api, pair: _pair } = await initializeApi();
    api = _api;
    pair = _pair;
  });

  afterAll(() => {
    api.disconnect();
  });

  it('createService should return', async () => {
    const labPromise: Promise<Lab> = new Promise((resolve, reject) => { // eslint-disable-line
      registerLab(api, pair, labDataMock.info, () => {
        queryLabById(api, pair.address)
          .then((res) => {
            resolve(res)
          });
      });
    });

    expect((await labPromise).info).toEqual(labDataMock.info);

    const promise: Promise<Service[]> = new Promise((resolve, reject) => { // eslint-disable-line
      createService(api, pair, serviceDataMock.info, serviceDataMock.serviceFlow, () => {
        queryLabById(api, pair.address)
          .then((lab) => {
            queryServicesByMultipleIds(api, lab.services)
              .then((res) => {
                resolve(res)
              });
          });
      });
    });

    expect((await promise)[0].info).toEqual(serviceDataMock.info);
  });

  it('queryServicesCountByOwnerId should return', async () => {
    expect(await queryServicesCountByOwnerId(api, pair.address)).toEqual(1);
  });

  it('updateService should return', async () => {
    const lab = await queryLabById(api, pair.address);

    const promise: Promise<Service> = new Promise((resolve, reject) => { // eslint-disable-line
      updateService(api, pair, lab.services[0], serviceDataMock.info, () => {
        queryServiceById(api, lab.services[0])
          .then((res) => {
            resolve(res)
          });
      });
    });

    expect((await promise).info).toEqual(serviceDataMock.info);
  });

  it('deleteService should return', async () => {
    const lab = await queryLabById(api, pair.address);

    const promise: Promise<number> = new Promise((resolve, reject) => { // eslint-disable-line
      deleteService(api, pair, lab.services[0], () => {
        queryServicesCount(api)
          .then((res) => {
            deregisterLab(api, pair, () => {
              resolve(res);
            });
          });
      });
    });

    expect(await promise).toEqual(0);
  });
});
