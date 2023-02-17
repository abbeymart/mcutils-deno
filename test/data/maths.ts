import { ArrayOfInt, ArrayOfNumber, ArrayOfString, ArrayOfSymbol, CounterType } from "../../src/types.ts";

export const aLeapYear = 2000;
export const notLeapYear = 2022;

export const factorialParam = 4;
export const factorialValue = 24;

export const fibSeriesParam = 8;
export const fibSeriesResult = [1, 1, 2, 3, 5, 8, 13, 21];
export const primeNumParam = 10;
export const primeNums = [2, 3, 5, 7];

export const pythagorasParam = 10;
export const pythagorasResult = [[ 3, 4, 5 ], [ 6, 8, 10 ] ];

export const pythagorasParam100 = 100;
export const pythagorasResult100: Array<ArrayOfInt> = [
    [ 3, 4, 5 ],     [ 5, 12, 13 ],    [ 6, 8, 10 ],
    [ 7, 24, 25 ],   [ 8, 15, 17 ],    [ 9, 12, 15 ],
    [ 9, 40, 41 ],   [ 10, 24, 26 ],   [ 11, 60, 61 ],
    [ 12, 16, 20 ],  [ 12, 35, 37 ],   [ 13, 84, 85 ],
    [ 14, 48, 50 ],  [ 15, 20, 25 ],   [ 15, 36, 39 ],
    [ 16, 30, 34 ],  [ 16, 63, 65 ],   [ 18, 24, 30 ],
    [ 18, 80, 82 ],  [ 20, 21, 29 ],   [ 20, 48, 52 ],
    [ 20, 99, 101 ], [ 21, 28, 35 ],   [ 21, 72, 75 ],
    [ 24, 32, 40 ],  [ 24, 45, 51 ],   [ 24, 70, 74 ],
    [ 25, 60, 65 ],  [ 27, 36, 45 ],   [ 28, 45, 53 ],
    [ 28, 96, 100 ], [ 30, 40, 50 ],   [ 30, 72, 78 ],
    [ 32, 60, 68 ],  [ 33, 44, 55 ],   [ 33, 56, 65 ],
    [ 35, 84, 91 ],  [ 36, 48, 60 ],   [ 36, 77, 85 ],
    [ 39, 52, 65 ],  [ 39, 80, 89 ],   [ 40, 42, 58 ],
    [ 40, 75, 85 ],  [ 40, 96, 104 ],  [ 42, 56, 70 ],
    [ 45, 60, 75 ],  [ 48, 55, 73 ],   [ 48, 64, 80 ],
    [ 48, 90, 102 ], [ 51, 68, 85 ],   [ 54, 72, 90 ],
    [ 56, 90, 106 ], [ 57, 76, 95 ],   [ 60, 63, 87 ],
    [ 60, 80, 100 ], [ 60, 91, 109 ],  [ 63, 84, 105 ],
    [ 65, 72, 97 ],  [ 66, 88, 110 ],  [ 69, 92, 115 ],
    [ 72, 96, 120 ], [ 75, 100, 125 ], [ 80, 84, 116 ]
];


export const numParams: ArrayOfNumber = [2, 5, 3, 5, 3, 5, 2, 3, 5,];
export const stringParams: ArrayOfString = ["a", "b", "a", "a", "a", "a"];
export const booleanParams: Array<boolean> = [true, false, true, true, true, false, true, true];
export const symbolParams: ArrayOfSymbol = [Symbol("abc"), Symbol("bcd"), Symbol("abc"), Symbol("bcd"), Symbol("abc")];
export const countNumResult: CounterType = {2: 2, 3: 3, 5: 4,};
export const countNumResultKeys = Object.keys(countNumResult);
export const countStringResult: CounterType = {"a": 5, "b": 1,};
export const countStringResultKeys = Object.keys(countStringResult);

export const setNumResult = [2, 5, 3];
export const setStingResult = ["a", "b"];
export const setBooleanResult = [true, false];
export const setSymbolResult = [Symbol("abc"), Symbol("bcd"), Symbol("abc"), Symbol("bcd"), Symbol("abc")];

// symbol key:value counter value will always be 1, since symbol-key is globally unique.
// export const countSymbolResult: CounterType = {
//     [Symbol("abc")]: 1,
//     [Symbol("bcd")]: 1,
//     [Symbol("abc")]: 1,
//     [Symbol("bcd")]: 1,
//     [Symbol("abc")]: 1,
// };
// export const countSymbolResultKeys = Reflect.ownKeys(countSymbolResult);
// export const countSymbolResultValues = Reflect.ownKeys(countSymbolResult).map(s => countSymbolResult[s]);
// export const countSymbolResultKeys = Object.getOwnPropertySymbols(countSymbolResult);
// export const countSymbolResultValues = Object.getOwnPropertySymbols(countSymbolResult).map(s => countSymbolResult[s]);
