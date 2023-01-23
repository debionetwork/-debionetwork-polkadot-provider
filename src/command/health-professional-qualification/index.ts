import { ApiPromise } from "@polkadot/api";
import { Certification, Experience } from "../../models/health-professional-qualification";
import { EventRecord } from '@polkadot/types/interfaces/system';
import { extrinsicCallback, ExtrinsicCallbackParameters, getCommandNonceAndSigner } from "..";

export async function createHealthProfessionalQualification(
  api: ApiPromise,
  pair: any,
  experiences: Array<Experience>,
  certifications: Array<Certification>,
  callback?: () => void,
): Promise<EventRecord[]> {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.healthProfessionalQualification
      .create(experiences, certifications)
      .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
        extrinsicCallback(api, {
          events,
          status,
          callback,
          resolve,
          reject,
          unsub,
        } as ExtrinsicCallbackParameters);
      });
  });
}

export async function deleteHealthProfessionalQualification(
  api: ApiPromise,
  pair: any,
  qualificationId: string,
  callback?: () => void,
): Promise<EventRecord[]>  {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.healthProfessionalQualification
    .delete(qualificationId)
      .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
        extrinsicCallback(api, {
          events,
          status,
          callback,
          resolve,
          reject,
          unsub,
        } as ExtrinsicCallbackParameters);
      });
  });
}

export async function updateHealthProfessionalQualification(
  api: ApiPromise,
  pair: any,
  qualificationId: string,
  experiences: Array<Experience>,
  certifications: Array<Certification>,
  callback?: () => void,
): Promise<EventRecord[]>  {
  let unsub;
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line
    unsub = api.tx.healthProfessionalQualification
    .update(qualificationId, experiences, certifications)
      .signAndSend(pair, getCommandNonceAndSigner(pair), ({ events, status }) => {
        extrinsicCallback(api, {
          events,
          status,
          callback,
          resolve,
          reject,
          unsub,
        } as ExtrinsicCallbackParameters);
      });
  });
}