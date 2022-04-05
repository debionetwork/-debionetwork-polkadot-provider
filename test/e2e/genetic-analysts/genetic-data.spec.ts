import 'regenerator-runtime/runtime';
import { ApiPromise } from '@polkadot/api';
import { addGeneticData, GeneticData, queryGeneticDataByOwnerId, removeGeneticData, updateGeneticData } from '../../../src';
import { geneticDataMock } from '../../unit/models/genetic-analysts/genetic-data.mock';
import { initializeApi } from '../polkadot-init';

describe('Genetic Data Pallet Integration Tests', () => {
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

  it('addGeneticData should return', async () => {
    const geneticDataPromise: Promise<GeneticData> = new Promise((resolve, reject) => { // eslint-disable-line
      addGeneticData(api, pair, geneticDataMock.title, geneticDataMock.description, geneticDataMock.reportLink, () => {
        queryGeneticDataByOwnerId(api, pair.address)
          .then((res) => {
            resolve(res[0]);
          })
      });
    });

    expect((await geneticDataPromise).title).toEqual(geneticDataMock.title);
    expect((await geneticDataPromise).description).toEqual(geneticDataMock.description);
    expect((await geneticDataPromise).reportLink).toEqual(geneticDataMock.reportLink);
  }, 25000);

  it('updateGeneticData should return', async () => {
    const title = "title update";
    const description = "description update";
    const reportLink = "report link update";

    const geneticData = (await queryGeneticDataByOwnerId(api, pair.address))[0];
    
    const geneticDataPromise: Promise<GeneticData> = new Promise((resolve, reject) => { // eslint-disable-line
      updateGeneticData(api, pair, geneticData.id, title, description, reportLink, () => {
        queryGeneticDataByOwnerId(api, pair.address)
          .then((res) => {
            resolve(res[0]);
          })
      });
    });

    expect((await geneticDataPromise).title).toEqual(title);
    expect((await geneticDataPromise).description).toEqual(description);
    expect((await geneticDataPromise).reportLink).toEqual(reportLink);
  }, 25000);

  it('removeGeneticData should return', async () => {
    const geneticData = (await queryGeneticDataByOwnerId(api, pair.address))[0];

    const geneticDataPromise: Promise<number> = new Promise((resolve, reject) => { // eslint-disable-line
      removeGeneticData(api, pair, geneticData.id, () => {
        queryGeneticDataByOwnerId(api, pair.address)
          .then((res) => {
            resolve(res.length);
          })
      });
    });

    expect(await geneticDataPromise).toEqual(0);
  }, 25000);
});