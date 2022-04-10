import { returnToHumanMockWithParam } from "../../../@polkadot-types.mock";

export const geneticAnalysis = {
  geneticAnalysisStorage(param) {
    return returnToHumanMockWithParam(param);
  },
  geneticAnalysisByOwner(param) {
    return returnToHumanMockWithParam(param);
  },
  geneticAnalysisByGeneticAnalystId(param) {
    return returnToHumanMockWithParam(param);
  }
}