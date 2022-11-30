import { ValueType } from "./types.ts";

// leapYear determines if the given year is a leap year, i.e. February day === 29.
export const leapYear = (year: number): boolean => {
    // by setting the day to the 29th and checking if the day remains
    const febDate = new Date(year, 1, 29, 23, 0, 0, 0);
    return year % 400 == 0 || (year % 4 == 0 && year % 100 != 0) || febDate.getDate() === 29;
}

// factorialTail function generates factorial value,using tail call optimization
export const factorialTail = (num: number, acc = 1): number => {
    if (num <= 1) {
        return acc
    }
    // using the tail call optimization
    return factorialTail(num - 1, num * acc)
}

// factorialSeries function generates factorial value, using number-series, no recursion.
export const factorialSeries = (num: number): number => {
    let result = 1;
    for (let val = 1; val < num + 1; val++) {
        result *= val;
    }
    return result;
}

export function* factNumGen(num: number) {
    let x: number;
    for (x = 1; x <= num; x++) {
        yield x;
    }
}

export function factorialFromNumGen(num: number) {
    // using the factorial numbers generator function, via channel, no recursion
    let result = 1;
    for (const val of factNumGen(num)) {
        result *= val;
    }
    return result;
}

export function fibos(num: number): Array<number> {
    const fiboArray: Array<number> = [1, 1];
    let i = 0
    while (i < num) {
        const prev = fiboArray[fiboArray.length - 1];
        const prev2 = fiboArray[fiboArray.length - 2];
        fiboArray.push(prev + prev2)
        i++
    }
    return fiboArray
}

// naturalNumbers generator-function yields/generates natural numbers up to the count value.
export function* naturalNumbers(count: number) {
    for (let cnt = 0; cnt < count; cnt++) {
        yield cnt;
    }
}

export const fiboTail = (n: number, current: number, next: number): number => {
    if (n == 0) {
        return current;
    }
    // using the tail call optimization
    return fiboTail(n - 1, current, current + next);
}

export const fiboArray = (num: number): Array<Array<number>> => {
    // no recursion, memoization using array
    let c = 0, d = 1;
    const result: Array<Array<number>> = [];
    let fibRes = 0; // track current fibo-value
    for (let i = 0; i < num; i++) {
        const dVal = d;
        d = c + d;
        c = dVal;
        result.push([c, d]);
        fibRes = c;
    }
    console.log("fib-result: %v", fibRes);
    return result;
}

export function* fiboSeriesGen(num: number) {
    // initial pairs / values
    let a = 0, b = 1;
    let i = 0;
    while (i < num) {
        yield b;
        const bVal = b;
        b = a + b;
        a = bVal;
        i++
    }
}

// primeNumbers returns the prime numbers from 2 up to num.
export const primeNumbers = (num: number): Array<number> => {
    const pNums: Array<number> = [];
    next:
        for (let outer = 2; outer < num; outer++) {
            for (let inner = 2; inner < outer; inner++) {
                if (outer % inner == 0) {
                    continue next;
                }
                pNums.push(outer);
            }
        }
    return pNums;
}

export const isPrime = (n: number): boolean => {
    // prime number count algorithm condition
    const s = Math.floor(Math.sqrt(n));
    //Perform remainder of n for all numbers from 2 to s(short-algorithm-value)/n-1
    for (let x = 2; x <= s; x++) {
        if (n % x == 0) {
            return false;
        }
    }
    return n > 1;
}

export const reverseArray = (arr: Array<ValueType>): Array<ValueType> => {
    // arr and arrChan must be of the same type: int, float
    const revArray: Array<ValueType> = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        revArray.push(arr[i]);
    }
    return revArray;
}

export const reverseArrayNum = (arr: Array<number>): Array<number> => {
    const revArray: Array<number> = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        revArray.push(arr[i]);
    }
    return revArray;
}

export function* reverseArrayGen(arr: Array<ValueType>) {
    for (let i = arr.length - 1; i >= 0; i--) {
        yield arr[i];
    }
}

export function* reverseArrayIntGen(arr: Array<number>) {
    for (let i = arr.length - 1; i >= 0; i--) {
        yield arr[i];
    }
}

// pythagoras function returns all the arrays(Array<Array>) of a regular pythagoras [base, adjacent, hypothenus].
export const pythagoras = (limit: number): Array<Array<number>> => {
    const pResult: Array<Array<number>> = [];
    let a: number, b: number;
    for (a = 1; a <= limit; a++) {
        for (b = a; b <= limit; b++) {
            const itemSqrt = Math.sqrt(a * a + b * b);
            if (itemSqrt % 1.00 == 0 || itemSqrt % 1.00 == 0.00) {
                pResult.push([a, b, itemSqrt]);
            }
        }
    }
    return pResult;
}

// pythagorasGen generator function returns series of the array value (<Array> of a regular pythagoras [base, adjacent, hypothenus].
export function* pythagorasGen(limit: number) {
    let a: number, b: number;
    for (a = 1; a <= limit; a++) {
        for (b = a; b <= limit; b++) {
            const itemSqrt = Math.sqrt(a * a + b * b);
            if (itemSqrt % 1.00 == 0 || itemSqrt % 1.00 == 0.00) {
                yield [a, b, itemSqrt];
            }
        }
    }
}

// counters
export type ArrayValue<T> = Array<T>;
export type ArrayOfString = Array<string>;
export type ArrayOfNumber = Array<number>;
export type ArrayOfSymbol = Array<symbol>;
export type DataCount = Record<string, number>;

export type CounterValueType = string | number | symbol;

export interface CounterType {
    [key: CounterValueType]: number;
}

// counterGeneric supports types - number, string and symbol only.
export const counterGeneric = (values: ArrayValue<CounterValueType>): CounterType => {
    const counterObject: CounterType = {};
    for (const val of values) {
        // val = (typeof val !== "object"? JSON.stringify(val) : val) as T;
        if (counterObject[val]) {
            counterObject[val] += +1
        } else {
            counterObject[val] = 1
        }
    }
    return counterObject;
}

export interface CounterObjectType {
    [key: string]: number;
}

export type SetValueType = string | number | boolean | symbol;

// set
export const set = <T extends SetValueType>(values: ArrayValue<T>): Array<T> => {
    const setValue: Array<T> = [];
    for (const it of values) {
        const itExist = setValue.indexOf(it);
        if (itExist === -1) {
            setValue.push(it);
        }
    }
    // console.log("set-values: ", setValue);
    return setValue
}

export const setOfString = (values: ArrayOfString): ArrayOfString => {
    const setValue = [];
    for (const it of values) {
        const itExist = setValue.indexOf(it);
        if (itExist === -1) {
            setValue.push(it);
        }
    }
    return setValue
}

export const setOfNumber = (values: ArrayOfNumber): ArrayOfNumber => {
    const setValue = [];
    for (const it of values) {
        const itExist = setValue.indexOf(it);
        if (itExist === -1) {
            setValue.push(it);
        }
    }
    return setValue
}

export const setOfSymbol = (values: ArrayOfSymbol): ArrayOfSymbol => {
    const setValue = [];
    for (const it of values) {
        const itExist = setValue.indexOf(it);
        if (itExist === -1) {
            setValue.push(it);
        }
    }
    return setValue
}
