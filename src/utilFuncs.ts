import { ComputationResponse, MessageObject, ObjectType, PERMITTED_SEPARATORS, ValueType } from "./types.ts";
import { getResMessage, ResponseMessage } from "../deps.ts";

export const isEmptyObject = (val: ObjectType): boolean => {
    return !(Object.keys(val).length > 0 && Object.values(val).length > 0);
}

export function shortString(str: string, maxLength = 20): string {
    return str.toString().length > maxLength ? str.toString().substr(0, maxLength) + "..." : str.toString();
}

export function getParamsMessage(msgObject: MessageObject): ResponseMessage {
    if (typeof msgObject !== "object") {
        return getResMessage("validateError", {
            message: "Cannot process non-object-value",
        });
    }
    let messages = "";
    Object.entries(msgObject).forEach(([key, msg]) => {
        messages = messages ? `${messages} | ${key} : ${msg}` : `${key} : ${msg}`;
    });
    return getResMessage("validateError", {
        message: messages,
    });
}

export function strToBool(val = "n"): boolean {
    const strVal = val.toLowerCase();
    if (strVal === "true" || strVal === "t" || strVal === "yes" || strVal === "y") {
        return true;
    } else return Number(strVal) > 0;
}

// userIpInfo retrieves client-ip information from the specified ipUrl (ip-service).
export const userIpInfo = async (ipUrl = "https://ipinfo.io", options = {}): Promise<ObjectType> => {
    // Get the current user IP address Information
    // TODO: use other method besides ipinfo.io, due to query limit (i.e. 429 error)
    try {
        // const reqH = options && options.headers? options. headers : {};
        const reqHeaders = {"Content-Type": "application/json"};
        options = Object.assign({}, options, {
            method : "GET",
            mode   : "cors",
            headers: reqHeaders,
        });
        const response = await fetch(ipUrl, options);
        let result = await response.json();
        result = result ? JSON.parse(result) : null;
        if (response.ok) {
            return result;
        }
        throw new Error("Error fetching ip-address information: ");
    } catch (error) {
        console.log("Error fetching ip-address information: ", error);
        throw new Error("Error fetching ip-address information: " + error);
    }
};

export const userBrowser = () => {
    // push each browser property, as key/value pair, into userBrowser array variable
    return navigator.userAgent;
};

export const currentUrlInfo = (pathLoc: string): { parts: string[], lastIndex: number } => {
    // this function returns the parts (array) and lastIndex of a URL/pathLocation
    let parts: string[] = [];
    let lastIndex = -1;
    if (pathLoc) {
        parts = pathLoc.toString().split("://")[1].split("/");
        // get the last index
        lastIndex = parts.lastIndexOf("new") || parts.lastIndexOf("detail") || parts.lastIndexOf("list");
        return {
            parts,
            lastIndex,
        };
    }
    return {
        parts,
        lastIndex,
    };
};

export const getPath = (req: Request): string => {
    let itemPath = req.url || "/mc";
    itemPath = itemPath.split("/")[1];
    return itemPath ? itemPath : "mc";
};

export const getFullName = (firstname: string, lastname: string, middlename = ""): string => {
    if (firstname && middlename && lastname) {
        return (firstname + " " + middlename + " " + lastname);
    }
    return (firstname + " " + lastname);
};

export interface GetNames {
    firstname?: string;
    middlename?: string;
    lastname?: string;
}

export const getNames = (fullName: string): GetNames => {
    const nameParts = fullName.split("");
    let firstname, lastname, middlename;
    if (nameParts.length > 2) {
        firstname = nameParts[0];
        lastname = nameParts[2];
        middlename = nameParts[1];
        return {
            firstname,
            middlename,
            lastname,
        };
    } else {
        firstname = nameParts[0];
        lastname = nameParts[1];
        return {
            firstname,
            lastname,
        };
    }
    // Return firstname, middlename and lastname based on fullName components ([0],[1],[2])
};

// pluralize returns the plural value for the given item-name.
export const pluralize = (n: number, itemName: string, itemPlural = ""): string => {
    // @TODO: retrieve plural for itemName from language dictionary {name: plural}
    let itemNamePlural = "";
    if (!itemPlural) {
        itemNamePlural = "tbd"
        // itemNamePlural = mcPlurals[ itemName ];
    } else {
        itemNamePlural = itemPlural;
    }
    let result = `${n} ${itemName}`;
    if (n > 1) {
        result = `${n} ${itemName}${itemNamePlural}`;
    }
    return result;
};

// camelToUnderscore computes and returns the underscore field name for the database table.
export function camelToUnderscore(key: string): string {
    return key.replace(/([A-Z])/g, "_$1").toLowerCase();
}

// camelCase computes and returns the camelCase field name from a sep (default to _) fieldName.
export const toCamelCase = (text: string, sep = "_"): ComputationResponse => {
    // accepts word/text and separator(" ", "_", "__", ".")
    const permittedSeparators = PERMITTED_SEPARATORS || [" ", "_", "__", ".", "|"];
    if (!permittedSeparators.includes(sep)) {
        return {
            code: "separatorError",
            value: "",
            message: `Provided separator(${sep}) is not in the permitted separators(${permittedSeparators.join(", ")})`,
        }
    }
    const textArray = text.split(sep);
    // convert the first word to lowercase
    const firstWord = textArray[0].toLowerCase();
    // convert other words: first letter to upper case and other letters to lowercase
    const otherWords = textArray.slice(1).map((item) => {
        // convert first letter to upper case
        const item0 = item[0].toUpperCase();
        // convert other letters to lowercase
        const item1N = item.slice(1).toLowerCase();
        return `${item0}${item1N}`;
    });
    return {
        code: "success",
        value: `${firstWord}${otherWords.join("")}`,
    };
};

// pascalCase computes and returns the PascalCase field name from a sep (default to _) fieldName.
export const pascalCase = (text: string, sep = "_"): ComputationResponse => {
    // accepts word/text and separator(" ", "_", "__", ".", "|")
    const permittedSeparators = PERMITTED_SEPARATORS || [" ", "_", "__", ".", "|"];
    if (!permittedSeparators.includes(sep)) {
        return {
            code: "separatorError",
            value: "",
            message: `Provided separator(${sep}) is not in the permitted separators(${permittedSeparators.join(", ")})`,
        }
    }
    const textArray = text.split(sep);
    // convert all words: first letter to upper case and other letters to lowercase
    let allWords = "";
    for (const word of textArray) {
        const firstLetterUpper = (word[0]).toUpperCase();
        const remainLetterLower = word.slice(1,).toLowerCase();
        allWords += firstLetterUpper + remainLetterLower
    }

    return {
        code   : "success",
        message: "success",
        value  : allWords,
    };
}

export const getLanguage = (userLang = "en-US"): string => {
    // Define/set default language variable
    let defaultLang = "en-US";
    // Set defaultLang to current userLang, set from the UI
    if (userLang) {
        defaultLang = userLang;
    }
    return defaultLang;
}

// leapYear determines if the given year is a leap year, i.e. February day === 29.
export const leapYear = (year: number): boolean => {
    // by setting the day to the 29th and checking if the day remains
    const febDate = new Date(year, 1, 29, 23, 0, 0, 0);
    return year%400 == 0 || (year%4 == 0 && year%100 != 0) || febDate.getDate() === 29;
}

//

// factorialTail function generates factorial value,using tail call optimization
export const factorialTail = (num: number, acc = 1): number => {
    if (num <= 1 ){
        return acc
    }
    // using the tail call optimization
    return factorialTail(num-1, num*acc)
}

// factorialSeries function generates factorial value, using number-series, no recursion.
export const factorialSeries = (num: number): number  => {
    let result = 1;
    for (let val = 1; val < num+1; val++) {
        result *= val;
    }
    return result;
}

export function *factNumGen(num: number) {
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
        const prev2 = fiboArray[fiboArray.length -2];
        fiboArray.push(prev+prev2)
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
    return fiboTail(n-1, current, current+next);
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

export function *fiboSeriesGen(num: number) {
    // initial pairs / values
    let a = 0, b = 1;
    let i  = 0;
    while( i < num) {
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
                if (outer%inner == 0) {
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
        if (n%x == 0) {
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

export function *reverseArrayGen(arr: Array<ValueType>) {
    for (let i = arr.length - 1; i >= 0; i--) {
        yield arr[i];
    }
}

export function *reverseArrayIntGen(arr: Array<number>) {
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
            const itemSqrt = Math.sqrt(a*a + b*b);
            if (itemSqrt%1.00 == 0 || itemSqrt%1.00 == 0.00) {
                pResult.push([a, b, itemSqrt]);
            }
        }
    }
    return pResult;
}

// pythagorasGen generator function returns series of the array value (<Array> of a regular pythagoras [base, adjacent, hypothenus].
export function *pythagorasGen(limit: number) {
    let a: number, b: number;
    for (a = 1; a <= limit; a++) {
        for (b = a; b <= limit; b++) {
            const itemSqrt = Math.sqrt(a*a + b*b);
            if (itemSqrt%1.00 == 0 || itemSqrt%1.00 == 0.00) {
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
export const counterGeneric = <T extends CounterValueType>(values: ArrayValue<T>): CounterType => {
    const counterObject: CounterType = {};
    for (const val of values) {
        // val = (typeof val !== "object"? JSON.stringify(val) : val) as T;
        if (counterObject[val]) {
            counterObject[val] += + 1
        } else {
            counterObject[val] = 1
        }
    }
    return counterObject;
}

export interface CounterObjectType {
    [key: string]: number;
}

// export type SetValueType = string | number | boolean;

export const set = <T extends CounterValueType>(values: ArrayValue<T>): ArrayValue<T> => {
    // compute counterObject
    const counterObject = counterGeneric(values);
    // compute set values
    const setValue: ArrayValue<T> = [];
    for (let keyValue of Object.keys(counterObject)) {
        keyValue = typeof keyValue === "string"? JSON.parse(keyValue) : keyValue;
        setValue.push(keyValue as T);
    }
    return setValue
}

export const setOfString = (values: ArrayOfString): ArrayOfString => {
    const counterObject: {[key: string]: number}  = {};
    for (const it of values) {
        if(counterObject[it]) {
            counterObject[it] += 1;
        } else {
            counterObject[it] = 1;
        }
    }
    // compute set values
    const setValue: ArrayOfString = [];
    for (const keyValue of Object.keys(counterObject)) {
        setValue.push(keyValue);
    }
    return setValue;
}

export const setOfNumber = (values: ArrayOfNumber): ArrayOfNumber => {
    const counterObject: {[key: number]: number}  = {};
    for (const it of values) {
        if(counterObject[it]) {
            counterObject[it] += 1;
        } else {
            counterObject[it] = 1;
        }
    }
    // compute set values
    const setValue: ArrayOfNumber = [];
    for (const keyValue of Object.keys(counterObject)) {
        setValue.push(Number(keyValue));
    }
    return setValue;
}

export const setOfSymbol = (values: ArrayOfSymbol): ArrayOfSymbol => {
    const counterObject: {[key: symbol]: number}  = {};
    for (const it of values) {
        if(counterObject[it]) {
            counterObject[it] += 1;
        } else {
            counterObject[it] = 1;
        }
    }
    // compute set values
    const setValue: ArrayOfSymbol = [];
    for (const keyValue of Object.keys(counterObject)) {
        setValue.push(Symbol(keyValue));
    }
    return setValue;
}
