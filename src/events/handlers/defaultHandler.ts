export const defaultHandler = {
  get: (target: any, name: string) => {
    return Object.prototype.hasOwnProperty.call(target, name)
      ? target[name]
      : ({ dataEvent, value, valueMessage }) => {
          const data = dataEvent && typeof dataEvent[0] === 'object' ? dataEvent[0] : dataEvent[1];

          const id = data[value];
          const params = { id };
          const computeMessage = data[valueMessage] || data[value];
          const wording = `${valueMessage?.trim()} (${computeMessage?.substr(0, 4)}...${computeMessage?.substr(
            computeMessage?.length - 4,
          )})`;

          return { data, id, params, wording };
        };
  },
};
