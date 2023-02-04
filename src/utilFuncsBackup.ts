import {
    ArrayValue,
    ComputationResponse, CounterResult, Locale, LocaleFilesType, LocaleOptions, MessageObject, ObjectType,
    PERMITTED_SEPARATORS,
    ValueType
} from "./types.ts";
import { getResMessage, ResponseMessage } from "../deps.ts";

export const getFullName = (firstname: string, lastname: string, middlename = ""): string => {
    if (firstname && middlename && lastname) {
        return `${firstname} ${middlename} ${lastname}`;
    }
    return `${firstname} ${lastname}`;
};

export interface GetNames {
    firstname?: string;
    middlename?: string;
    lastname?: string;
}

// Counter method returns the unique counts of the specified array/slice values[object, int, float, string and bool]
export const counter = <T extends ValueType>(val: ArrayValue<T>): CounterResult<T> => {
    const count: CounterResult<T> = {}
    for (const it of val) {
        // stringify it=>key
        const itStr = JSON.stringify(it)
        const countVal = count[itStr] || {}
        if (countVal && countVal.count > 0) {
            count[itStr] = {
                count: countVal.count + 1,
                value: it,
            }
        } else {
            count[itStr] = {
                count: 1,
                value: it,
            }
        }
    }
    return count
}

// getNames computes/returns firstname, middlename and lastname based on fullName components ([0],[1],[2]).
export const getNames = (fullName: string): GetNames => {
    const names = fullName.split(" ");
    if (names.length > 2) {
        return {
            firstname : names[0],
            middlename: names[1],
            lastname  : names[2],

        };
    } else {
        return {
            firstname: names[0],
            lastname : names[1],
        };
    }
};

// camelToUnderscore computes and returns the underscore field name for the database table.
export function camelCaseToUnderscore(key: string): string {
    return key.replace(/([A-Z])/g, "_$1").toLowerCase();
}

// caseFieldToUnderscore transforms camelCase or PascalCase name to underscore name, in lowercase
export const caseFieldToUnderscore = (caseString: string): string => {
    // Create slice of words from the cased-Value, separate at Uppercase-character
    // Looks for sequences of an uppercase letter(non-consecutive) followed by one or more lowercase letters.
    const re = /^([A-Z][a-z]+)$/g
    // transform first character to Uppercase
    const caseValue = (caseString[0]).toUpperCase() + caseString.slice(1,)
    // compose separate/matched words as slice
    const textArray = caseValue.match(re) || []
    const wordsArray: Array<string> = []
    for (const txt of textArray) {
        wordsArray.push(txt.toLowerCase())
    }
    if (wordsArray.length < 1) {
        return ""
    }
    if (wordsArray.length === 1) {
        return wordsArray[0]
    }
    return wordsArray.join("_")
}

// separatorFieldToCamelCase computes and returns the camelCase field name from a sep (default to _) fieldName.
export const separatorFieldToCamelCase = (text: string, sep = "_"): ComputationResponse => {
    // accepts word/text and separator[" ", "_", "__", ".", "|", "-"]
    const permittedSeparators = PERMITTED_SEPARATORS || [" ", "_", "__", ".", "|", "-"];
    if (!permittedSeparators.includes(sep)) {
        return {
            code   : "separatorError",
            value  : "",
            message: `Provided separator(${sep}) is not in the permitted separators(${permittedSeparators.join(", ")})`,
        }
    }
    const textArray = text.split(sep);
    // convert the first word to lowercase
    const firstWord = textArray[0].toLowerCase();
    // convert other words: first letter to upper case and other letters to lowercase
    let otherWords = "";
    for (const word of textArray.slice(1,)) {
        otherWords += `${(word[0]).toUpperCase()}${word.slice(1,).toLowerCase()}`
    }
    return {
        code : "success",
        value: `${firstWord}${otherWords}`,
    };
};

// separatorFieldToPascalCase computes and returns the PascalCase field name from a sep (default to _) fieldName.
export const separatorFieldToPascalCase = (text: string, sep = "_"): ComputationResponse => {
    // accepts word/text and separator(" ", "_", "__", ".", "|")
    const permittedSeparators = PERMITTED_SEPARATORS || [" ", "_", "__", ".", "|", "-"];
    if (!permittedSeparators.includes(sep)) {
        return {
            code   : "separatorError",
            value  : "",
            message: `Provided separator(${sep}) is not in the permitted separators(${permittedSeparators.join(", ")})`,
        }
    }
    const textArray = text.split(sep);
    // convert all words: first letter to upper case and other letters to lowercase
    let allWords = "";
    for (const word of textArray) {
        allWords += `${(word[0]).toUpperCase()}${word.slice(1,).toLowerCase()}`
    }
    return {
        code   : "success",
        message: "success",
        value  : allWords,
    };
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
        messages = messages ? `${messages} | ${key}: ${msg}` : `${key}: ${msg}`;
    });
    return getResMessage("success", {
        message: messages,
    });
}

export function stringToBool(val = "n"): boolean {
    const strVal = val.toLowerCase();
    if (strVal === "true" || strVal === "t" || strVal === "yes" || strVal === "y") {
        return true;
    } else return Number(strVal) > 0;
}

// TODO: OPTIONAL - work in progress functions

// pluralize returns the plural value for the given item-name.
export const pluralize = (n: number, itemName: string, itemPlural = ""): string => {
    // @TODO: retrieve plural for itemName from language dictionary {name: plural}
    let itemNamePlural: string;
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

export const getLanguage = (userLang = "en-US"): string => {
    // Define/set default language variable
    let defaultLang = "en-US";
    // Set defaultLang to current userLang, set from the UI
    if (userLang) {
        defaultLang = userLang;
    }
    return defaultLang;
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

// Validation functions

export const getLocale = (localeFiles: LocaleFilesType, options: LocaleOptions = {}): Locale => {
    // validate localeFiles as an object
    if (isEmptyObject(localeFiles)) {
        return {
            code   : "paramsError",
            message: "Locale files should be an object and not empty",
        };
    }

    const localeType = options && options.type ? options.type : "";
    const language = options && options.language ? options.language : "en-US";

    // set the locale file contents
    const myLocale = localeFiles[language];

    if (localeType === "mcConstants") {
        return {
            getShortDesc: () => {
                return myLocale.SHORT_DESC? myLocale.SHORT_DESC : 20;
            },
            getDefaultLanguage: () => {
                return myLocale.DEFAULT_LANG? myLocale.DEFAULT_LANG : "en-US";
            },
            getDefaultCurrency: () => {
                return myLocale.DEFAULT_CURRENCY? myLocale.DEFAULT_CURRENCY : "USD";
            },
            getDDPLimit: () => {
                return myLocale.DDP_LIMIT? myLocale.DDP_LIMIT : 20;
            },
            getCreateLogType: () => {
                return myLocale.CREATE_LOG_TYPE? myLocale.CREATE_LOG_TYPE : "create";
            },
            getUpdateLogType: () => {
                return myLocale.UPDATE_LOG_TYPE? myLocale.UPDATE_LOG_TYPE : "update";
            },
            getRemoveLogType: () => {
                return myLocale.REMOVE_LOG_TYPE? myLocale.REMOVE_LOG_TYPE : "remove";
            },
            getSearchLogType: () => {
                return myLocale.SEARCH_LOG_TYPE? myLocale.SEARCH_LOG_TYPE : "read";
            },
            getLoginType: () => {
                return myLocale.LOGIN_LOG_TYPE? myLocale.LOGIN_LOG_TYPE : "login";
            },
            getLogoutType: () => {
                return myLocale.LOGOUT_LOG_TYPE? myLocale.LOGOUT_LOG_TYPE : "logout";
            },
            getLoginTimeout: () => {
                return myLocale.LOGIN_TIMEOUT? myLocale.LOGIN_TIMEOUT : 24 * 60 * 60;
            },
            getStateTimeout: () => {
                return myLocale.STATE_TIMEOUT? myLocale.STATE_TIMEOUT : 60 * 60;
            },
            getRememberMeTimeout: () => {
                return myLocale.REMEMBER_TIMEOUT? myLocale.REMEMBER_TIMEOUT : 30 * 24 * 60 * 60;
            },
            getLogCreate: () => {
                return myLocale.LOG_CREATE? myLocale.LOG_CREATE : false;
            },
            getLogRead: () => {
                return myLocale.LOG_READ? myLocale.LOG_READ : false;
            },
            getLogUpdate: () => {
                return myLocale.LOG_UPDATE? myLocale.LOG_UPDATE : false;
            },
            getLogDelete: () => {
                return myLocale.LOG_DELETE? myLocale.LOG_DELETE : false;
            },
            getLogLogin: () => {
                return myLocale.LOG_LOGIN? myLocale.LOG_LOGIN : false;
            },
            getLogLogout: () => {
                return myLocale.LOG_LOGOUT? myLocale.LOG_LOGOUT : false;
            },
            getMaxFileCount: () => {
                return myLocale.MAX_FILE_COUNT? myLocale.MAX_FILE_COUNT : 10;
            },
            getMaxFileSize: () => {
                return myLocale.MAX_FILE_SIZE? myLocale.MAX_FILE_SIZE : 10_000_000;
            },
            getMaxProductQuantity: () => {
                return myLocale.MAX_PRODUCT_QTY? myLocale.MAX_PRODUCT_QTY: 1000;
            },
            getQueryLimit: () => {
                return myLocale.QUERY_REC_LIMIT? myLocale.QUERY_REC_LIMIT : 100;
            },
            getDefaultCart: () => {
                return myLocale.DEFAULT_CART? myLocale.DEFAULT_CART : "cart";
            },
            getDefaultWish: () => {
                return myLocale.DEFAULT_WISH? myLocale.DEFAULT_WISH : "wishes";
            },
            getPasswordMinLength: () => {
                return myLocale.PASSWORD_MIN_LENGTH? myLocale.PASSWORD_MIN_LENGTH : 10;
            },
            getLoginNameMinLength: () => {
                return myLocale.LOGIN_NAME_MIN_LENGTH? myLocale.LOGIN_NAME_MIN_LENGTH : 6;
            },
            getLoginMaxRetry: () => {
                return myLocale.LOGIN_MAX_RETRY? myLocale.LOGIN_MAX_RETRY : 3;
            },
            getLoginLockoutTime: () => {
                return myLocale.LOGIN_LOCKOUT_TIME? myLocale.LOGIN_LOCKOUT_TIME : 15 * 60;
            },
            getFileUploadRoot: () => {
                return myLocale.FILE_UPLOAD_ROOT? myLocale.FILE_UPLOAD_ROOT : "upload";
            },
            getAllowedDocTypes: () => {
                return myLocale.ALLOWED_DOC_TYPES? myLocale.ALLOWED_DOC_TYPES : ["doc", "xls", "pdf", "png", "mpeg", "mpg"];
            },
        } as Locale;
    } else {
        return myLocale;
    }
}

export function getLocale2(localeFiles: LocaleFilesType, options: LocaleOptions = {}): Locale {
    // validate localeFiles as an object
    if (typeof localeFiles !== "object" || isEmptyObject(localeFiles as ObjectType)) {
        throw new Error("Locale files should be an object and not empty")
    }

    // const localeType = options && options.type ? options.type : "";
    const language = options && options.language ? options.language : "en-US";

    // set the locale file contents
    return localeFiles[language];

}

export function isEmptyObject(val: ObjectType): boolean {
    return typeof val === "object" ? !(Object.keys(val).length > 0 && Object.values(val).length > 0) : false;
}

export function strToBool(val: string | number = "n"): boolean {
    const strVal = val.toString().toLowerCase();
    if (strVal === "true" || strVal === "t" || strVal === "yes" || strVal === "y") {
        return true;
    } else {
        return Number(strVal) > 0;
    }
}

// Validation functions
export function isProvided(param: string | number | ObjectType): boolean {
    // Verify the Required status
    // Validate that the item is not empty / null / undefined
    return !(param === "" || param === null || param === undefined || typeof param === "object" && isEmptyObject(param));
}

export function isEven(num: number): boolean {
    return Number.isFinite(num) && (num % 2 === 0);
}

export function isOdd(num: number): boolean {
    return Number.isFinite(num) && (num % 2 !== 0);
}

export function isNumberDigit(num: number): boolean {
    // Validate that param is a number (digit): 100 | 99 | 33 | 44 | 200
    const numberPattern = /^\d+$/;
    return numberPattern.test(num.toString());
}

export function isNumberFloat(num: number): boolean {
    // Validate that param is a number (float): 0.90 | 99.9 | 33.3 | 44.40
    const numberPattern = /^(\d)+([.])?(\d)*$/;
    return numberPattern.test(num.toString());
}

export function isObjectType(param: ObjectType): boolean {
    // Validate param is an object, {}
    return (typeof param === "object" && !Array.isArray(param));
}

export function isArrayType(param: []): boolean {
    // Validate param is an object, []
    return Array.isArray(param);
}

export function isStringChar(param: string): boolean {
    // Validate that param is a string (characters only) -- use regEx
    const charRegEx = /^[a-zA-Z&$_-]+$/;
    return charRegEx.test(param);
}

export function isStringAlpha(param: string): boolean {
    // Validate that param is a string (alphanumeric, chars/numbers only)
    const alphaNumericPattern = /^[a-zA-Z\d-_]+$/;
    return alphaNumericPattern.test(param);
}

export function isUsername(param: string): boolean {
    const usernamePattern = /^([a-zA-Z\d_])+$/; // alphanumeric, underscore, no space
    return usernamePattern.test(param);
}

export function isNull(infoItem: null): boolean {
    return infoItem === null;
}

export function isEmail(param: string): boolean {
    const testPattern = /^[\da-zA-Z]+([\da-zA-Z]*[-._+])*[\da-zA-Z]+@[\da-zA-Z]+([-.][\da-zA-Z]+)*([\da-zA-Z]*[.])[a-zA-Z]{2,6}$/;
    // const testPattern = /^[\da-zA-Z]+([\-._][\da-zA-Z]+)*@[\da-zA-Z]+([\-.][\da-zA-Z]+)*([.])[a-zA-Z]{2,6}$/;
    return testPattern.test(param);
}

export function isPassword(param: string): boolean {
    const testPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*)(?=.*\W.*)[a-zA-Z\d\S]{6,15}$/;
    return testPattern.test(param);
}

export function isNumberOnRange(num: number, min: number, max: number): boolean {
    if ((isNumberDigit(num) || isNumberFloat(num)) && (min < max)) {
        return (num >= min && num <= max)
    }
    return false;
}

export function isPhone(param: string): boolean {
    const phonePattern = /^([1-9]{1,3})?[-. ]?(\(\d{3}\)?[-. ]?|\d{3}?[-. ]?)?\d{3}?[-. ]?\d{4}$/;
    return phonePattern.test(param);
}

export function isPostalCode(param: string): boolean {
    const postCodePattern = /^[a-zA-Z\d]+(\s)?[a-zA-Z\d]*/;
    return postCodePattern.test(param);
}

export function isPostalCodeUS(param: string): boolean {
    const postCodePattern = /^[a-zA-Z\d]+(\s)?[a-zA-Z\d]*/;
    return postCodePattern.test(param);
}

export function isPostalCodeCanada(param: string): boolean {
    const postCodePattern = /^[a-zA-Z\d]+(\s)?[a-zA-Z\d]*/;
    return postCodePattern.test(param);
}

export function isPostalCodeUK(param: string): boolean {
    const postCodePattern = /^[a-zA-Z\d]+(\s)?[a-zA-Z\d]*/;
    return postCodePattern.test(param);
}

export function isName(param: string): boolean {
    const namePattern = /^[a-zA-Z"-]+(\s[a-zA-Z"-])*[a-zA-Z"-]*/;   // Abi Charles Africa America
    return namePattern.test(param);
}

export function isURL(param: string): boolean {
    // Abi Charles Africa America
    // const namePattern = /^[a-zA-Z\d\-\\/_.:]+$/;
    const namePattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&\/=]*)$/
    return namePattern.test(param);

}

export function isBusinessNumber(param: string): boolean {
    // business number format
    const bnPattern = /^[\d-]+$/;
    return bnPattern.test(param);
}

export function isStandardCode(param: string): boolean {
    // Product Group | Body & Soul10
    const standardCodePattern = /^[a-zA-Z\d]+[&\s\-_]*[a-zA-Z\d$#]*$/;
    return standardCodePattern.test(param);
}

export function isCountryCode(param: string): boolean {
    // langCode must be string of format en-US
    const countryCodePattern = /^[a-z]{2}-[A-Z]{2}$/;
    return countryCodePattern.test(param);
}

export function isLanguageCode(param: string): boolean {
    // langCode must be string of format en-US
    const langCodePattern = /^[a-z]{2}-[A-Z]{2}$/;
    return langCodePattern.test(param);
}

export function isWordSpace(param: string): boolean {
    // words with spaces and hyphens, no numbers
    const wordSpacePattern = /^[a-zA-Z\d,()"._&]+[\s\-a-zA-Z\d,()"._&]*[a-zA-Z\d,()"._?]*$/;
    return wordSpacePattern.test(param);
}

export function isLeapYear(year: number): boolean {
    // Any year that is evenly divisible by 400
    // OR
    // Any year that is evenly divisible by 4 but not evenly divisible by 100
    // OR
    // the day of the month February for the specified year is 29
    return year % 400 == 0 || (year % 4 == 0 && year % 100 != 0) || new Date(year, 1, 29).getDate() === 29;
}

export function isLabelCode(param: string): boolean {
    // firstName_middleName_lastName
    const labelCodePattern = /^[a-zA-Z]+[_\-a-zA-Z]*[_a-z\d]*$/;
    return labelCodePattern.test(param);
}

export function isErrorCode(param: string): boolean {
    // error code format (AB10-100, AB900)
    const errorCodePattern = /^[a-zA-Z\d]+-*\d*$/;
    return errorCodePattern.test(param);
}

export function isPathName(param: string): boolean {
    // mysite.new_base.nicelook
    const pathNamePattern = /^[a-zA-Z\d/]+[_a-zA-Z\d./]*[a-zA-Z\d/]*$/;
    return pathNamePattern.test(param);
}

export function isNameNoSpace(param: string): boolean {
    // JohnPaul
    const nameNoSpacePattern = /[a-zA-Z]+/;
    return nameNoSpacePattern.test(param);
}

export function isDescription(param: string): boolean {
    const descPattern = /^[a-zA-Z\d\s\\.,:/()*_|\-!@#$%&]+$/; // Alphanumeric string with spaces, and
    // (.,:/()*_-|!@)
    return descPattern.test(param);
}

export function isMessage(param: string): boolean {
    const descPattern = /^[a-zA-Z\d\s\\.,:/()*_\-!@#$%&]+$/; // Alphanumeric string with spaces, and
    // (.,:/()*_-!@) - exclude |, reserved for message separation
    return descPattern.test(param);
}

export function isCurrency(param: string): boolean {
    const currencyPattern = /^[a-zA-Z#$]+$/;
    return currencyPattern.test(param);
}

export function getAge(dateString: string): number {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && birthDate.getDate() > today.getDate())) {
        age--;
    }
    return age;
}