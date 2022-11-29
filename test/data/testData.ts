import {
    ArrayOfNumber, ArrayOfString, ArrayOfSymbol, Locale, LocaleFilesType, MinMax, Options
} from "../../src/index.ts";

// collection
export const arrayOfNumber: ArrayOfNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,];
export const arrayOfString: ArrayOfString = ["abc", "ab2", "abc3", "ab4", "abc5", "ab6", "abc7", "ab8", "abc9",
    "ab10",];
export const arrayOfSymbol: ArrayOfSymbol = [Symbol("abc"), Symbol("ab2"), Symbol("ab3"), Symbol("ab4"), Symbol("ab5"),
    Symbol("ab6"), Symbol("ab7"), Symbol("ab8"), Symbol("ab9"), Symbol("ab10"),];

export const filterEvenNumFunc = (val: number): boolean => val % 2 === 0;
export const filterEvenNumFuncResult = [2, 4, 6, 8, 10,];
export const filterOddNumFunc = (val: number): boolean => val % 2 !== 0;
export const filterOddNumFuncResult = [1, 3, 5, 7, 9,];
export const filterStringIncludeABC = (val: string): boolean => val.includes("abc");
export const filterStringIncludeABCResult = ["abc", "abc3", "abc5", "abc7", "abc9",];

export const mapDoubleNumFunc = (val: number) => val * 2;
export const mapDoubleNumFuncResult = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20,];

export const take7NumResult = [1, 2, 3, 4, 5, 6, 7];
export const take7CountResult = 7;
export const take7StringResult = ["abc", "ab2", "abc3", "ab4", "abc5", "ab6", "abc7",];

// getLocale
export const localeLabelOptions: Options = {
    type    : "mcLabels",
    language: "en-CA",
};
export const localeConstantOptions: Options = {
    type    : "mcConstants",
    language: "en-CA",
};
export const localLabelObject: Locale = {
    code      : "Code",
    name      : "Name",
    desc      : "Description",
    postalCode: "Postal Code",
};

export const localConstantObject: Locale = {
    SHORT_DESC  : 20,
    DEFAULT_LANG: "en-US",
};

export const localLabelFiles: LocaleFilesType = {
    "en-US": localLabelObject,
    "en-CA": localLabelObject,
};

export const localConstantFiles: LocaleFilesType = {
    "en-US": localConstantObject,
    "en-CA": localConstantObject,
};

// stats

export const meanValue = 5.5;
export const medianValue = 5.5;
export const minValue = 1;
export const maxValue = 10;
export const minMax: MinMax = {
    minimum: 1,
    maximum: 10,
};

export const stdDeviation = 0.25;   // TODO: update with the computed/actual value
