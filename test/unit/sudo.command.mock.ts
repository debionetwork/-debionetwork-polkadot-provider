import { signAndSend } from "./@polkadot-api.mock";

export const sudo = {
  sudo(params) {
    return signAndSend;
  }
}