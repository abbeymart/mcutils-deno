// mean returns the mean value from the array of numbers.
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

// standardDeviation returns the standard deviation value from the array of numbers.
export const standardDeviation = (arr: Array<number>): number => {
    let deltaSquareSum = 0.00;
    const arrLength = arr.length;
    const meanVal = mean(arr);
    for (const val of arr) {
        deltaSquareSum += Math.pow(val - meanVal, 2);
    }
    return Math.sqrt(deltaSquareSum / (arrLength - 1));
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


// TODO: complete the stats-function below

// meanSquareError returns the mean-square-error value from the array of numbers.
export const meanSquareError = () => {

}

// meanSquareRootError returns the mean-square-root-error value from the array of numbers.
export const meanSquareRootError = () => {

}

// variance returns the variance value from the array of numbers.
export const variance = () => {

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
