import { signAndSend } from "../../@polkadot-api.mock";

export const labs = {
  registerLab(param) {
    return signAndSend;
  },
  updateLab(param) {
    return signAndSend;
  },
  updateLabVerificationStatus(param1, param2) {
    return signAndSend;
  },
  deregisterLab() {
    return signAndSend;
  },
}