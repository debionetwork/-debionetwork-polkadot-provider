import { ApiPromise } from '@polkadot/api';
import { successCallback } from '../..';
import { GeneticAnalystInfo } from '../../models';

export async function bulkCreateGeneticAnalystService(
	api: ApiPromise,
	pair: any,
	geneticAnalystInfo: GeneticAnalystInfo,
	callback?: () => void,
): Promise<void> {
	const unsub = await api.tx.geneticAnalystServices
		.bulkCreateGeneticAnalystService(geneticAnalystInfo)
		.signAndSend(pair, { nonce: -1 }, ({ events, status }) => successCallback(api, { events, status, callback }));
	unsub();
}

export async function createGeneticAnalystService(
	api: ApiPromise,
	pair: any,
	geneticAnalystInfo: GeneticAnalystInfo,
	callback?: () => void,
): Promise<void> {
	const unsub = await api.tx.geneticAnalystServices
		.createGeneticAnalystService(geneticAnalystInfo)
		.signAndSend(pair, { nonce: -1 }, ({ events, status }) => successCallback(api, { events, status, callback }));
	unsub();
}

export async function deleteGeneticAnalystService(
	api: ApiPromise,
	pair: any,
	geneticAnalystServiceId: string,
	callback?: () => void,
): Promise<void> {
	const unsub = await api.tx.geneticAnalystServices
		.deleteGeneticAnalystService(geneticAnalystServiceId)
		.signAndSend(pair, { nonce: -1 }, ({ events, status }) => successCallback(api, { events, status, callback }));
	unsub();
}

export async function updateGeneticAnalystService(
	api: ApiPromise,
	pair: any,
	geneticAnalystServiceId: string,
	geneticAnalystInfo: GeneticAnalystInfo,
	callback?: () => void,
): Promise<void> {
	const unsub = await api.tx.geneticAnalystServices
		.updateGeneticAnalystService(geneticAnalystServiceId, geneticAnalystInfo)
		.signAndSend(pair, { nonce: -1 }, ({ events, status }) => successCallback(api, { events, status, callback }));
	unsub();
}