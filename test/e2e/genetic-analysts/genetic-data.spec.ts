import 'regenerator-runtime/runtime';
import { ApiPromise } from '@polkadot/api';
import { addGeneticData, GeneticData, queryGeneticDataByOwnerId, removeGeneticData, updateGeneticData } from '../../../src';
import { geneticDataMock } from '../../unit/models/genetic-analysts/genetic-data.mock';
import { initializeApi } from '../polkadot-init';

describe('Genetic Data Pallet Integration Tests', () => {
  let api: ApiPromise;
  let pair: any;

  let geneticData: GeneticData;

  beforeAll(async () => {
    const { api: _api, pair: _pair } = await initializeApi();
    api = _api;
    pair = _pair;
  });

  afterAll(() => {
    api.disconnect();
  });

  it('addGeneticData should return', async () => {
    const geneticDataPromise: Promise<GeneticData> = new Promise((resolve, reject) => { // eslint-disable-line
      addGeneticData(api, pair, geneticDataMock.title, geneticDataMock.description, geneticDataMock.reportLink, () => {
        queryGeneticDataByOwnerId(api, pair.address)
          .then((res) => {
            resolve(res[0]);
          })
      });
    });

    geneticData = await geneticDataPromise;
    expect(geneticData.title).toEqual(geneticDataMock.title);
    expect(geneticData.description).toEqual(geneticDataMock.description);
    expect(geneticData.reportLink).toEqual(geneticDataMock.reportLink);
  });

  it('updateGeneticData should return', async () => {
    const title = "title update";
    const description = "description update";
    const reportLink = "report link update";
    
    const geneticDataPromise: Promise<GeneticData> = new Promise((resolve, reject) => { // eslint-disable-line
      updateGeneticData(api, pair, geneticData.id, title, description, reportLink, () => {
        queryGeneticDataByOwnerId(api, pair.address)
          .then((res) => {
            resolve(res[0]);
          })
      });
    });

    const geneticDataUpdated = await geneticDataPromise;
    expect(geneticDataUpdated.title).toEqual(title);
    expect(geneticDataUpdated.description).toEqual(description);
    expect(geneticDataUpdated.reportLink).toEqual(reportLink);
  });

  it('removeGeneticData should return', async () => {
    const geneticDataPromise: Promise<number> = new Promise((resolve, reject) => { // eslint-disable-line
      removeGeneticData(api, pair, geneticData.id, () => {
        queryGeneticDataByOwnerId(api, pair.address)
          .then((res) => {
            resolve(res.length);
          })
      });
    });

    const geneticDataRemoved = await geneticDataPromise;
    expect(geneticDataRemoved).toEqual(0);
  });
});