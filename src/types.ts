type ValueType =
    Record<string, unknown>
    | Array<Record<string, unknown>>
    | string
    | number
    | Array<string>
    | Array<number>
    | boolean
    | Array<boolean>;

export type LocaleValueType = string | number | boolean

export interface ObjectType {
    [key: string]: ValueType;
}

export interface Options {
    type?: string;
    language?: string;
}

export interface MessageObject {
    [key: string]: string;
}
