export type ValueType =
    Record<string, unknown>
    | Array<Record<string, unknown>>
    | string
    | number
    | symbol
    | Array<string>
    | Array<number>
    | Date
    | Array<Date>
    | boolean
    | Array<boolean>;


export type LocaleFunc = () => string | number | boolean;

export type LocaleValueType = ValueType | LocaleFunc;

export interface ObjectType {
    [key: string]: LocaleValueType;
}

export interface LocaleOptions {
    type?: string;
    language?: string;
}

export interface Locale {
    [key: string]: LocaleValueType;
}

export interface LocaleFilesType {
    [key: string]: Locale;      // key => language ("en-US", "en-CA", "yoruba", "fr-CA", "fr-FR" etc.)
}

export interface MessageObject {
    [key: string]: string;
}

export interface ComputationResponse {
    code: string;
    value: ValueType;
    message?: string;
}

export const PERMITTED_SEPARATORS = [" ", "_", "__", ".", "|", "-"];

// function types

type TestFuncType = <T extends number>(val: T) => boolean

type IntPredicate = (val: number) => boolean;
type FloatPredicate = (val: number) => boolean;
type StringPredicate = (val: string) => boolean;
type NumberPredicate = <T extends number>(val: T) => boolean;
type Predicate = <T extends ValueType>(val: T) => boolean;
type BinaryPredicate = <T extends ValueType, U extends ValueType> (val1: T, val2: U) => boolean
type UnaryOperator = <T extends ValueType>(val1: T) => T;
type BinaryOperator = <T extends ValueType>(val1: T, val2: T) => T;

type Function = <T extends ValueType, R extends ValueType>(val: T) => R;
type BiFunction = <T extends ValueType, U extends ValueType, R extends ValueType> (val1: T, val2: U) => R;
type Consumer = <T extends ValueType>(val: T) => void;
type BiConsumer = <T extends ValueType, U extends ValueType>(val1: T, val2: U) => void;
type Supplier = <R extends ValueType>() => R;
type Comparator = <T extends ValueType>(val1: T, val2: T) => number;

// Use extends keyword to constrain the type parameter to a specific type.
// Use extends keyof to constrain a type that is the property of another object.

export interface StringType {
    value: string;
}

export interface FloatType {
    value: number;
}

export interface BoolType {
    value: boolean;
}

export interface IntType {
    value: number;
}

export interface GenericType<T> {
    value: T;
}

export interface StringArrayType {
    value: Array<string>;
}

export interface FloatArrayType {
    value: Array<number>;
}

export interface BoolArrayType {
    value: ArrayValue<boolean>;
}

//type BoolArrayType []bool

export interface IntArrayType {
    value: Array<number>;
}

export interface GenericArrayType<T> {
    value: Array<T>;
}

export interface FrequencyValue {
    label?: string;
    frequency: number;
    value?: number;
}

export interface FrequencyResult {
    result: Array<FrequencyValue>;
    interval: number;
}

export interface StatFrequencyValue {
    label: string;
    value: number;
    frequency: number;
    relativeFrequency: number;
    cumulativeFrequency: number;
    cumulativeRelativeFrequency: number;
}

export interface StatFrequencyResult {
    result: Array<StatFrequencyValue>;
    interval: number;
}


export interface QuartilesType {
    minimum: number; // Lowest value
    Q1: number;
    Q2: number;   // Median
    Q3: number;
    Q4: number; // Highest value, Max
    IQR: number;
    maximum: number;   // Highest value, Q4
    range: number; // Q3 - Q1
}

// counters

export interface CounterValue<T extends ValueType> {
    count: number;
    value: T;
}

export interface CounterObjectValue<T extends ObjectType> {
    count: number;
    value: T
}

// counters
export type ArrayValue<T extends ValueType> = Array<T>
export type ArrayOfString = Array<string>;
export type ArrayOfNumber = Array<number>;
export type ArrayOfSymbol = Array<symbol>;
export type ArrayOfInt = Array<number>
export type ArrayOfFloat = Array<number>

export type CounterValueType = string | number | symbol;

export interface CounterType {
    [key: CounterValueType]: number;
}


export interface DataCount {
    [key: string]: number;
}

export type SliceObjectType<T extends ObjectType> = Array<T>

export interface CounterResult<T extends ValueType> {
    [key: string]: CounterValue<T>;
}

export interface ObjectCounterResult<T extends ObjectType> {
    [key: string]: CounterObjectValue<T>;
}

export interface MatrixResult {
    code: string;
    message: string;
    result: Array<Array<number>> | Array<number>;
}

// export interface MatrixArrayResult {
//     code: string;
//     message: string;
//     result: Array<number>;
// }

