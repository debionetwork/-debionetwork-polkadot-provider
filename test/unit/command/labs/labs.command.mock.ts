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
  stakeLab() {
    return signAndSend;
  },
  unstakeLab() {
    return signAndSend;
  },
  updateMinimumStakeAmount(params) { // eslint-disable-line
    return signAndSend;
  },
  retrieveUnstakeAmount(params) { // eslint-disable-line
    return signAndSend;
  },
  updateAdminKey(params) { // eslint-disable-line
    return signAndSend;
  },
  sudoUpdateAdminKey(params) { // eslint-disable-line
    return signAndSend;
  }
}