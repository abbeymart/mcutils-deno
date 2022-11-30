import { ArrayOfNumber, ArrayOfString, ArrayOfSymbol, CounterType } from "../../src/index.ts";

export const leapYear = 2000;
export const notLeapYear = 2022;

export const factorialParam = 4;
export const factorialValue = 24;

export const fibSeriesParam = 6;
export const fibSeriesResult = [1, 1, 2, 3, 5, 8];

export const primeNumParam = 10;
export const primeNums = [3, 5, 7, 9];

export const pythagorasParam = 10;
export const pythagorasResult = [[2, 3, 5], [4, 5, 9],];     // TODO: review result

export const numParams: ArrayOfNumber = [2, 5, 3, 5, 3, 5, 2, 3, 5,];
export const stringParams: ArrayOfString = ["a", "b", "a", "a", "a", "a"];
export const booleanParams: Array<boolean> = [true, false, true, true, true, false, true, true];
export const symbolParams: ArrayOfSymbol = [Symbol("abc"), Symbol("bcd"), Symbol("abc"), Symbol("bcd"), Symbol("abc")];
export const countNumResult: CounterType = {2: 2, 3: 3, 5: 4,};
export const countNumResultKeys = Object.keys(countNumResult);
export const countStringResult: CounterType = {"a": 5, "b": 1,};
export const countStringResultKeys = Object.keys(countStringResult);
// symbol key:value counter value will always be 1, since symbol-key is globally unique.
export const countSymbolResult: CounterType = {
    [Symbol("abc")]: 1,
    [Symbol("bcd")]: 1,
    [Symbol("abc")]: 1,
    [Symbol("bcd")]: 1,
    [Symbol("abc")]: 1,
};
export const countSymbolResultKeys = Reflect.ownKeys(countSymbolResult);
export const countSymbolResultValues = Reflect.ownKeys(countSymbolResult).map(s => countSymbolResult[s]);
// export const countSymbolResultKeys = Object.getOwnPropertySymbols(countSymbolResult);
// export const countSymbolResultValues = Object.getOwnPropertySymbols(countSymbolResult).map(s => countSymbolResult[s]);
export const setNumResult = [2, 5, 3];
export const setStingResult = ["a", "b"];
export const setBooleanResult = [true, false];
export const setSymbolResult = [Symbol("abc"), Symbol("bcd"), Symbol("abc"), Symbol("bcd"), Symbol("abc")];


