import { mockFunction } from "./mock";

export const toHumanMock = {
    toHuman() {
        return mockFunction();
    }
}


export function returnToHumanMockWithParam(param) {
    return {
        toHuman() {
            return mockFunction(param);
        }
    }
}