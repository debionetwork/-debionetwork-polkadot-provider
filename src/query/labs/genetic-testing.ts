import { ApiPromise } from '@polkadot/api';
import { DnaSample } from '../../models/labs/genetic-testing/dna-sample';
import { TestResult } from '../../models/labs/genetic-testing/test-result';

export async function queryDnaSamples(api: ApiPromise, trackingId: string): Promise<DnaSample> {
  const res = (await api.query.geneticTesting.dnaSamples(trackingId)).toHuman();
  return new DnaSample(res);
}

export async function queryDnaSamplesByLab(api: ApiPromise, accountId: string): Promise<DnaSample[]> {
  const trackingIds = (await api.query.geneticTesting.dnaSamplesByLab(accountId)).toHuman() as string[];
  const dnaSamples: DnaSample[] = new Array<DnaSample>();

  for (const trackingId of trackingIds) {
    const dnaSample = await queryDnaSamples(api, trackingId);
    dnaSamples.push(dnaSample);
  }

  return dnaSamples;
}

export async function queryDnaSamplesByOwner(api: ApiPromise, accountId: string): Promise<DnaSample[]> {
  const trackingIds = (await api.query.geneticTesting.dnaSamplesByOwner(accountId)).toHuman() as string[];
  const dnaSamples: DnaSample[] = new Array<DnaSample>();

  for (const trackingId of trackingIds) {
    const dnaSample = await queryDnaSamples(api, trackingId);
    dnaSamples.push(dnaSample);
  }

  return dnaSamples;
}

export async function queryDnaTestResults(api: ApiPromise, trackingId: string): Promise<TestResult> {
  const res = (await api.query.geneticTesting.dnaTestResults(trackingId)).toHuman();
  return new TestResult(res);
}

export async function queryDnaTestResultsByLab(api: ApiPromise, accountId: string) {
  const trackingIds = (await api.query.geneticTesting.dnaTestResultsByLab(accountId)).toHuman() as string[];
  const testResults: TestResult[] = new Array<TestResult>();

  for (const trackingId of trackingIds) {
    const testResult = await queryDnaTestResults(api, trackingId);
    testResults.push(testResult);
  }

  return testResults;
}

export async function queryDnaTestResultsByOwner(api: ApiPromise, accountId: string) {
  const trackingIds = (await api.query.geneticTesting.dnaTestResultsByOwner(accountId)).toHuman() as string[];
  const testResults: TestResult[] = new Array<TestResult>();

  for (const trackingId of trackingIds) {
    const testResult = await queryDnaTestResults(api, trackingId);
    testResults.push(testResult);
  }

  return testResults;
}

export async function queryStakedDataByAccountId(api: ApiPromise, accountId: string) {
  const res = (await api.query.geneticTesting.stakedDataByAccountId(accountId)).toHuman() as string[];
  return res;
}

export async function queryStakedDataByOrderId(api: ApiPromise, orderId: string) {
  const res = (await api.query.geneticTesting.stakedDataByOrderId(orderId)).toHuman() as string[];
  return res;
}
