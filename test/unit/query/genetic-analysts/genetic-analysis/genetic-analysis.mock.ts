import { returnToHumanMockWithParam } from "../../../@polkadot-types.mock";

export const geneticAnalysis = {
  geneticAnalysisById(param) {
    return returnToHumanMockWithParam(param);
  },
  geneticAnalysisByOwnerId(param) {
    return returnToHumanMockWithParam(param);
  },
  geneticAnalysisByGeneticAnalystId(param) {
    return returnToHumanMockWithParam(param);
  }
}