import {
    ArrayOfNumber, ArrayOfString, Locale, LocaleFilesType, MinMax, Options
} from "../../src/index.ts";

// collection
export const arrayOfNumber: ArrayOfNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,];
export const arrayOfString: ArrayOfString = ["abc", "ab2", "abc3", "ab4", "abc5", "ab6", "abc7", "ab8", "abc9",
    "ab10",];
// export const arrayOfSymbol: ArrayOfSymbol = [Symbol("abc"), Symbol("ab2"), Symbol("ab3"), Symbol("ab4"), Symbol("ab5"),
//     Symbol("ab6"), Symbol("ab7"), Symbol("ab8"), Symbol("ab9"), Symbol("ab10"),];

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
export const localeLabelObject: Locale = {
    code      : "Code",
    name      : "Name",
    desc      : "Description",
    postalCode: "Postal Code",
};

export const localeConstantObject: Locale = {
    SHORT_DESC  : 20,
    DEFAULT_LANG: "en-US",
};

export const localeLabelFiles: LocaleFilesType = {
    "en-US": localeLabelObject,
    "en-CA": localeLabelObject,
};

export const localeConstantFiles: LocaleFilesType = {
    "en-US": localeConstantObject,
    "en-CA": localeConstantObject,
};

// stats

export const meanResult = 5.5;
export const medianResult = 5.5;
export const minResult = 1;
export const maxResult = 10;
export const minMaxResult: MinMax = {
    minimum: 1,
    maximum: 10,
};

export const stdDeviationResult = 3.0276503540974917;   // 16 decimal places
export const stdDeviationResultEst = 3.02765;
