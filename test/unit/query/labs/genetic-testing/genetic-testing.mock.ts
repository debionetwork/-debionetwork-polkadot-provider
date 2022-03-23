import { returnToHumanMockWithParam } from "../../../@polkadot-types.mock";

export const geneticTesting = {
  dnaSamples(param) {
    return returnToHumanMockWithParam(param);
  },
  dnaSamplesByLab(param) {
    return returnToHumanMockWithParam(param);
  },
  dnaSamplesByOwner(param) {
    return returnToHumanMockWithParam(param)
  },
  dnaTestResults(param) {
    return returnToHumanMockWithParam(param)
  },
  dnaTestResultsByLab(param) {
    return returnToHumanMockWithParam(param);
  },
  dnaTestResultsByOwner(param) {
    return returnToHumanMockWithParam(param);
  },
  stakedDataByAccountId(param) {
    return returnToHumanMockWithParam(param)
  },
  stakedDataByOrderId(param) {
    return returnToHumanMockWithParam(param)
  },
}
