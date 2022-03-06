import { ApiPromise } from "@polkadot/api"
import { successCallback } from "../..";

export async function addGeneticData(api: ApiPromise, pair: any, title: string, description: string, link: string, callback?: () => void): Promise<void> {
  const unsub = await api.tx.geneticData
    .addGeneticData(title, description, link)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => successCallback(api, { events, status, callback }));
  unsub();
}

export async function updateGeneticData(api: ApiPromise, pair: any, id: string, title: string, description: string, link: string, callback?: () => void): Promise<void> {
  const unsub = await api.tx.geneticData
    .updateGeneticData(id, title, description, link)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => successCallback(api, { events, status, callback }));
  unsub();
}

export async function removeGeneticData(api: ApiPromise, pair: any, id: string, callback?: () => void): Promise<void> {
  const unsub = await api.tx.geneticData
    .removeGeneticData(id)
    .signAndSend(pair, { nonce: -1 }, ({ events, status }) => successCallback(api, { events, status, callback }));
  unsub();
}

export function getAddGeneticDataFee(api: ApiPromise, pair: any, title: string, description: string, link: string): any {
  return api.tx.geneticData
    .addGeneticData(title, description, link)
    .paymentInfo(pair)
}

export function getUpdateGeneticDataFee(api: ApiPromise, pair: any, id: string, title: string, description: string, link: string): any {
  return api.tx.geneticData
    .updateGeneticData(id, title, description, link)
    .paymentInfo(pair)
}

export function getRemoveGeneticDataFee(api: ApiPromise, pair: any, id: string): any {
  return api.tx.geneticData
    .removeGeneticData(id)
    .paymentInfo(pair)
}
