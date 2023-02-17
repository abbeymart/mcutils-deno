import {
    ArrayOfNumber, ArrayOfString, Locale, LocaleFilesType, MinMax, LocaleOptions, StatFrequencyResult, QuartilesType
} from "../../src/types.ts";

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
export const localeLabelOptions: LocaleOptions = {
    type    : "mcLabels",
    language: "en-CA",
};
export const localeConstantOptions: LocaleOptions = {
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

// populationStandardDeviation
export const arrayOfNumber2: ArrayOfNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5,
    9.5];
export const stdDeviationResultEst2 = 2.74;

// export const arrayOfNumber: ArrayOfNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,];

// geometric mean
export const geoMeanPrecision2Result = 4.53    // precision 5
export const geoMeanPrecision5Result = 4.52872    // precision 5

// variance
export const variancePrecision2Result = 9.17 // precision of 2
export const variancePrecision5Result = 9.16667 // precision of 2

// interval
export const interval = 1

// frequency
export const arrayOfNumberFreq: ArrayOfNumber = [1, 2, 2, 2, 1, 4, 4, 3, 5, 10,];

// frequencyStat
export const frequencyStatResult: StatFrequencyResult = {
        result  : [
            {
                label                      : "",
                value                      : 1,
                frequency                  : 2,
                relativeFrequency          : 1.00,
                cumulativeFrequency        : 1,
                cumulativeRelativeFrequency: 1.00,
            },
            {
                label                      : "",
                value                      : 2,
                frequency                  : 3,
                relativeFrequency          : 1.00,
                cumulativeFrequency        : 1,
                cumulativeRelativeFrequency: 1.00,
            },
            {
                label                      : "",
                value                      : 3,
                frequency                  : 1,
                relativeFrequency          : 1.00,
                cumulativeFrequency        : 1,
                cumulativeRelativeFrequency: 1.00,
            },
            {
                label                      : "",
                value                      : 4,
                frequency                  : 2,
                relativeFrequency          : 1.00,
                cumulativeFrequency        : 1,
                cumulativeRelativeFrequency: 1.00,
            },
            {
                label                      : "",
                value                      : 5,
                frequency                  : 1,
                relativeFrequency          : 1.00,
                cumulativeFrequency        : 1,
                cumulativeRelativeFrequency: 1.00,
            },
            {
                label                      : "",
                value                      : 10,
                frequency                  : 1,
                relativeFrequency          : 1.00,
                cumulativeFrequency        : 1,
                cumulativeRelativeFrequency: 1.00,
            },
        ],
        interval: 1,
    }
export const frequencyStatResult2: StatFrequencyResult = {
    result  : [
        {
            label                      : "1<=value<3",
            value                      : 1,
            frequency                  : 2,
            relativeFrequency          : 1.00,
            cumulativeFrequency        : 1,
            cumulativeRelativeFrequency: 1.00,
        },
        {
            label                      : "",
            value                      : 2,
            frequency                  : 3,
            relativeFrequency          : 1.00,
            cumulativeFrequency        : 1,
            cumulativeRelativeFrequency: 1.00,
        },
        {
            label                      : "",
            value                      : 3,
            frequency                  : 1,
            relativeFrequency          : 1.00,
            cumulativeFrequency        : 1,
            cumulativeRelativeFrequency: 1.00,
        },
        {
            label                      : "",
            value                      : 4,
            frequency                  : 2,
            relativeFrequency          : 1.00,
            cumulativeFrequency        : 1,
            cumulativeRelativeFrequency: 1.00,
        },
        {
            label                      : "",
            value                      : 5,
            frequency                  : 1,
            relativeFrequency          : 1.00,
            cumulativeFrequency        : 1,
            cumulativeRelativeFrequency: 1.00,
        },
        {
            label                      : "",
            value                      : 10,
            frequency                  : 1,
            relativeFrequency          : 1.00,
            cumulativeFrequency        : 1,
            cumulativeRelativeFrequency: 1.00,
        },
    ],
    interval: 2,
}

// IQRange

export const iqRange: QuartilesType = {
    minimum: 1,
    maximum: 10, // Q4
    range  : 9,
    Q1     : 2.5,
    Q2     : 5.5, // Median
    Q3     : 7.7,
    Q4     : 10,
    IQR    : 1,
}
