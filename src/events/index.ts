
/* tslint:disable:no-string-literal */
/* tslint:disable:no-console */
export async function processEvent(
  state: any,
  address: string,
  event: any,
  role: string,
  handlers: any,
  store: any
) {
  let statusAdd = false
  let message = ""
  let payloadData = null
  let paramsData = null

  const dataEvent = JSON.parse(JSON.stringify(event.data))
  const handler = handlers[role][event.section]

  if (!dataEvent.length) return
  if (!handler) {
    console.log("no role mapping")
    return { statusAdd, message, data: payloadData, params: paramsData }
  }

  // Get event configuration data
  const value = state.configEvent["role"][role][event.section][event.method].value
  const valueMessage = state.configEvent["role"][role][event.section][event.method].value_message
  const identity = state.configEvent["role"][role][event.section][event.method].identity

  const { data, params, wording } = await handler({
    dataEvent,
    value,
    valueMessage,
    event: { section: event.section, method: event.method },
    store
  })

  if (data[identity] === address || data[1][identity] === address) {
    statusAdd = true
    message = `${state.configEvent["role"][role][event.section][event.method].message} ${wording}`
  }

  payloadData = data
  paramsData = params

  return { statusAdd, message, data: payloadData, params: paramsData }
}
