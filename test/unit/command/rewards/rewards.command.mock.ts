import { signAndSend } from "../../@polkadot-api.mock";

export const rewards = {
  rewardFunds(params) {
    return signAndSend;
  },
  updateAdminKey(params) {
    return signAndSend;
  },
  sudoUpdateAdminKey(params) {
    return signAndSend;
  }
}