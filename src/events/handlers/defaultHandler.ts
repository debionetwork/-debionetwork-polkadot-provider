export const defaultHandler = {
  get: (target: any, name: string) => {
    return Object.prototype.hasOwnProperty.call(target, name) ? target[name] : ({ dataEvent, value, valueMessage }) => {
      const data = dataEvent[0]
      const id = data[value]
      const params = { number: id }
      const wording = "for (" + data[valueMessage].substr(0, 4) + "..." + data[valueMessage].substr(data[valueMessage].length - 4) + ")"
      return { data, id, params, wording }
    }
  }
}
