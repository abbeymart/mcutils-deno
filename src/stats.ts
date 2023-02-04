// mean returns the mean value from the array of numbers.
import { FrequencyResult, FrequencyValue, QuartilesType, StatFrequencyResult, StatFrequencyValue } from "./types.ts";

import { counter } from "./utilFuncs.ts";

export const mean = (arr: Array<number>): number => {
    let sum = 0.00;
    const arrLength = arr.length;
    for (const v of arr) {
        sum += v;
    }
    return sum / arrLength;
}

// median returns the median value from the array of numbers.
export const median = (arr: Array<number>): number => {
    // sort numbers, ascending order
    arr.sort((a, b) => a - b);
    const arrLength = arr.length;
    if (arrLength % 2 != 0) {
        // if count is odd
        const medianIndex = Math.floor(arrLength / 2);
        return arr[medianIndex];
    }
    // if count is even
    const medianIndex1 = (arrLength / 2) - 1;
    const medianIndex2 = arrLength / 2;
    return (arr[medianIndex1] + arr[medianIndex2]) / 2;
}

// variance returns the variance value from the array of numbers.
export const variance = (arr: Array<number>): number => {
    let deltaSquareSum = 0.00;
    const arrLength = arr.length;
    const meanVal = mean(arr);
    for (const val of arr) {
        deltaSquareSum += Math.pow(val - meanVal, 2);
    }
    return deltaSquareSum / arrLength;
}

// sampleStandardDeviation returns the standard deviation value from the array of numbers.
export const sampleStandardDeviation = (arr: Array<number>): number => {
    let deltaSquareSum = 0.00;
    const arrLength = arr.length;
    const meanVal = mean(arr);
    for (const val of arr) {
        deltaSquareSum += Math.pow(val - meanVal, 2);
    }
    return Math.sqrt(deltaSquareSum / (arrLength - 1));
}

// populationStandardDeviation returns the standard deviation value from the array of numbers.
export const populationStandardDeviation = (arr: Array<number>): number => {
    let deltaSquareSum = 0.00;
    const arrLength = arr.length;
    const meanVal = mean(arr);
    for (const val of arr) {
        deltaSquareSum += Math.pow(val - meanVal, 2);
    }
    return Math.sqrt(deltaSquareSum / (arrLength));
}

// min returns the minimum value from the array of numbers.
export const min = (arr: Array<number>): number => {
    // sort numbers, ascending order
    arr.sort((a, b) => a - b);
    // return the minimum value
    return arr[0];
}

// max returns the maximum value from the array of numbers.
export const max = (arr: Array<number>): number => {
    // sort numbers, descending order
    arr.sort((a, b) => b - a);
    // return the minimum value
    return arr[0];
}

// Minimum and maximum values object type.
export interface MinMax {
    minimum: number;
    maximum: number;
}

// max returns the maximum value from the array of numbers.
export const minMax = (arr: Array<number>): MinMax => {
    // sort numbers, ascending order
    arr.sort((a, b) => a - b);
    return {
        minimum: arr[0],
        maximum: arr[arr.length - 1],
    };
}


// interval calculates the width/interval of the sample data size
export const interval = (arr: Array<number>): number => {
    // sort numbers, ascending order
    arr.sort((a, b) => a - b);
    const arrLength = arr.length
    const min = arr[0]
    const max = arr[arrLength - 1]
    const rangeValue = max - min
    return Math.ceil(rangeValue / arrLength)
}

// frequency function returns the frequency / occurrence of a slice of type float.
export const frequency = (arr: Array<number>, interval: number, valueLabel: string): FrequencyResult => {
    // sort numbers, ascending order
    arr.sort((a, b) => a - b);
    const arrLength = arr.length
    const min = arr[0]
    const max = arr[arrLength - 1]
    // TODO: compose range and counts/frequency/occurrence
    if (valueLabel == "") {
        valueLabel = "value"
    }
    if (interval < 1) {
        interval = 1
    }
    const freqValue: Array<FrequencyValue> = []
    if (interval == 1) {
        // Obtain the counter values for the arr items
        const arrCounters = counter(arr)
        // compute the frequency/occurrence
        for(const [_, cVal] of Object.entries(arrCounters)) {
            freqValue.push({
                value:     cVal.value,
                frequency: cVal.count,
            })
        }
    } else {
        let start = min
        while (start <= max) {
            const end = start + interval
            const rangeValue = `${start}<=${valueLabel}<${end}`
            // compute counts of arr values that fall within the rangeValue(start-end)
            let count = 0
            for (const arrVal  of arr) {
                if (arrVal >= start || arrVal < end) {
                    count += 1
                }
            }
            freqValue.push({
                label: rangeValue,
                frequency: count,
            })
            // next range start
            start += interval
        }
    }
    return {
        result: freqValue,
        interval: interval,
    }
}

// statFrequency function returns the frequency / relative / cumulative / relative-cumulative frequencies of a slice of type float.
export const statFrequency = (arr: Array<number>, interval: number, valueLabel: string): StatFrequencyResult => {
    // Compute frequency values
    const freqRes = frequency(arr, interval, valueLabel)
    const freqResult = freqRes.result
    //freqResultLength := len(freqResult)
    const result:  Array<StatFrequencyValue> = []
    // compute relative / cumulative / relative-cumulative frequencies
    // frequency/occurrence summation
    let freqSum = 0
    for (const fVal of freqResult) {
        freqSum += fVal.frequency
    }
    let cumFreq = 0
    for (const val of freqResult) {
        cumFreq += val.frequency
        result.push({
            label:                       val.label as string,
            value:                       val.value as number,
            frequency:                   val.frequency,
            relativeFrequency:           val.frequency / freqSum,
            cumulativeFrequency:         cumFreq,
            cumulativeRelativeFrequency: cumFreq / freqSum,
        })
    }
    return {
        result:   result,
        interval: freqRes.interval,
    }
}

// IQRange InterQuartileRange returns the difference between the first and third quartiles (Q1 and Q3),
// including quartile-values[Q0/min, Q1/25%, Q2/50%(median), Q3/75% & Q4/max].
export const IQRange = (arr: Array<number>): QuartilesType => {
    // sort numbers, ascending order
    arr.sort((a, b) => a - b);
    const arrLength = arr.length
    const min = arr[0]
    const max = arr[arrLength - 1]
    // Determine the Q1, Q2, Q3 and Q4 values from arr
    const Q2 = median(arr)
    let Q1 = 0.00
    let Q3 = 0.00
    // Determine if the arr is even or odd
    let isEven = false
    if (arrLength % 2 == 0) {
        isEven = true
    }
    // IQR = Q3 - Q1
    let IQR = 0.00
    if (isEven) {
        Q1 = median(arr.slice(0, arrLength / 2))
        Q3 = median(arr.slice(arrLength / 2,))
        IQR = Q3 - Q1
    } else {
        const halfDataLength = arrLength / 2 // the ceiling value, i.e.  11, 5
        // compute medians (Q1 and Q3) to be inclusive of Q2(arr-median)
        Q1 = median(arr.slice(0, halfDataLength + 1))
        Q3 = median(arr.slice(halfDataLength,))
        IQR = Q3 - Q1
    }
    return {
        minimum:   min,
        maximum:max, // Q4
        range  : max - min,
        Q1     : Q1,
        Q2     : Q2, // Median
        Q3     : Q3,
        Q4     : max,
        IQR    : IQR,
    }
}

// TODO: complete the stats-function below

// meanSquareError returns the mean-square-error value from the array of numbers.
export const meanSquareError = () => {

}

// meanSquareRootError returns the mean-square-root-error value from the array of numbers.
export const meanSquareRootError = () => {

}

// knn computes and returns the knn value from the array of numbers.
export const knn = () => {

}

// nBayes computes and returns the variance value from the array of numbers.
export const nBayes = () => {

}

// classify computes and returns the classification value from the array/group of numbers.
export const classify = () => {

}
