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

export function returnToString(param) {
    return {
        toString() {
            return mockFunction(param);
        }
    }
}