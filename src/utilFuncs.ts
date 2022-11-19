import {ObjectType} from "./types.ts";

export const isEmptyObject = (val: ObjectType): boolean => {
    return !(Object.keys(val).length > 0 && Object.values(val).length > 0);
}