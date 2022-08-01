import { customerHandler } from './handlers/customer';
import { labHandler } from './handlers/lab';
import { geneticAnalystHandler } from './handlers/geneticAnalyst';
import { eventTypes } from './event-types';

/* tslint:disable:no-string-literal */
/* tslint:disable:no-console */
export async function processEvent(address: string, event: any, role: string, store: any) {
  let statusAdd = false;
  let message = '';

  const handlers = {
    customer: customerHandler,
    lab: labHandler,
    analyst: geneticAnalystHandler,
  };

  const dataEvent = JSON.parse(JSON.stringify(event.data));
  const handler = handlers[role][event.section];

  // Re-validate before proceeding to the next step
  if (
    !handler ||
    !dataEvent.length ||
    !eventTypes['role'][role][event.section] ||
    !eventTypes['role'][role][event.section][event.method]
  ) {
    return { statusAdd, message, data: null, params: null };
  }

  const getConfigEvent = eventTypes['role'][role][event.section][event.method];
  // Get event configuration data

  const value = getConfigEvent?.value;
  const valueMessage = getConfigEvent?.value_message;
  const identity = getConfigEvent?.identity;

  const { data, params, wording } = await handler({
    dataEvent,
    value,
    valueMessage,
    event: { section: event.section, method: event.method },
    store,
  });

  if (data[identity] === address || data[1][identity] === address) {
    statusAdd = true;
    message = `${getConfigEvent?.message} ${wording}`;
  }

  return { statusAdd, message, data, params };
}

export * from './event-types';
