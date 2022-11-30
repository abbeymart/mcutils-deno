export type ValueType =
    Record<string, unknown>
    | Array<Record<string, unknown>>
    | string
    | number
    | Array<string>
    | Array<number>
    | Date
    | Array<Date>
    | boolean
    | Array<boolean>;


export type LocaleFunc = () => string | number | boolean;

export type LocaleValueType = ValueType | LocaleFunc;

export interface ObjectType {
    [key: string]: ValueType;
}

export interface Options {
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

type TestFuncType= <T extends number>(val: T) => boolean

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
type Supplier= <R extends ValueType>() => R;
type Comparator = <T extends ValueType>(val1: T, val2: T) => number;

// Use extends keyword to constrain the type parameter to a specific type.
// Use extends keyof to constrain a type that is the property of another object.