import {
    ArrayOfString,
    ArrayValue,
    ComputationResponse, CounterResult, CsvToJsonParams, Locale, LocaleFilesType, LocaleOptions, MessageObject,
    ObjectType,
    PERMITTED_SEPARATORS,
    ValueType, XmlToJsonParams
} from "./types.ts";
import { getResMessage, parse, readCSV, ResponseMessage, xml2js } from "../deps.ts";

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
            getShortDesc         : () => {
                return myLocale.SHORT_DESC ? myLocale.SHORT_DESC : 20;
            },
            getDefaultLanguage   : () => {
                return myLocale.DEFAULT_LANG ? myLocale.DEFAULT_LANG : "en-US";
            },
            getDefaultCurrency   : () => {
                return myLocale.DEFAULT_CURRENCY ? myLocale.DEFAULT_CURRENCY : "USD";
            },
            getDDPLimit          : () => {
                return myLocale.DDP_LIMIT ? myLocale.DDP_LIMIT : 20;
            },
            getCreateLogType     : () => {
                return myLocale.CREATE_LOG_TYPE ? myLocale.CREATE_LOG_TYPE : "create";
            },
            getUpdateLogType     : () => {
                return myLocale.UPDATE_LOG_TYPE ? myLocale.UPDATE_LOG_TYPE : "update";
            },
            getRemoveLogType     : () => {
                return myLocale.REMOVE_LOG_TYPE ? myLocale.REMOVE_LOG_TYPE : "remove";
            },
            getSearchLogType     : () => {
                return myLocale.SEARCH_LOG_TYPE ? myLocale.SEARCH_LOG_TYPE : "read";
            },
            getLoginType         : () => {
                return myLocale.LOGIN_LOG_TYPE ? myLocale.LOGIN_LOG_TYPE : "login";
            },
            getLogoutType        : () => {
                return myLocale.LOGOUT_LOG_TYPE ? myLocale.LOGOUT_LOG_TYPE : "logout";
            },
            getLoginTimeout      : () => {
                return myLocale.LOGIN_TIMEOUT ? myLocale.LOGIN_TIMEOUT : 24 * 60 * 60;
            },
            getStateTimeout      : () => {
                return myLocale.STATE_TIMEOUT ? myLocale.STATE_TIMEOUT : 60 * 60;
            },
            getRememberMeTimeout : () => {
                return myLocale.REMEMBER_TIMEOUT ? myLocale.REMEMBER_TIMEOUT : 30 * 24 * 60 * 60;
            },
            getLogCreate         : () => {
                return myLocale.LOG_CREATE ? myLocale.LOG_CREATE : false;
            },
            getLogRead           : () => {
                return myLocale.LOG_READ ? myLocale.LOG_READ : false;
            },
            getLogUpdate         : () => {
                return myLocale.LOG_UPDATE ? myLocale.LOG_UPDATE : false;
            },
            getLogDelete         : () => {
                return myLocale.LOG_DELETE ? myLocale.LOG_DELETE : false;
            },
            getLogLogin          : () => {
                return myLocale.LOG_LOGIN ? myLocale.LOG_LOGIN : false;
            },
            getLogLogout         : () => {
                return myLocale.LOG_LOGOUT ? myLocale.LOG_LOGOUT : false;
            },
            getMaxFileCount      : () => {
                return myLocale.MAX_FILE_COUNT ? myLocale.MAX_FILE_COUNT : 10;
            },
            getMaxFileSize       : () => {
                return myLocale.MAX_FILE_SIZE ? myLocale.MAX_FILE_SIZE : 10_000_000;
            },
            getMaxProductQuantity: () => {
                return myLocale.MAX_PRODUCT_QTY ? myLocale.MAX_PRODUCT_QTY : 1000;
            },
            getQueryLimit        : () => {
                return myLocale.QUERY_REC_LIMIT ? myLocale.QUERY_REC_LIMIT : 100;
            },
            getDefaultCart       : () => {
                return myLocale.DEFAULT_CART ? myLocale.DEFAULT_CART : "cart";
            },
            getDefaultWish       : () => {
                return myLocale.DEFAULT_WISH ? myLocale.DEFAULT_WISH : "wishes";
            },
            getPasswordMinLength : () => {
                return myLocale.PASSWORD_MIN_LENGTH ? myLocale.PASSWORD_MIN_LENGTH : 10;
            },
            getLoginNameMinLength: () => {
                return myLocale.LOGIN_NAME_MIN_LENGTH ? myLocale.LOGIN_NAME_MIN_LENGTH : 6;
            },
            getLoginMaxRetry     : () => {
                return myLocale.LOGIN_MAX_RETRY ? myLocale.LOGIN_MAX_RETRY : 3;
            },
            getLoginLockoutTime  : () => {
                return myLocale.LOGIN_LOCKOUT_TIME ? myLocale.LOGIN_LOCKOUT_TIME : 15 * 60;
            },
            getFileUploadRoot    : () => {
                return myLocale.FILE_UPLOAD_ROOT ? myLocale.FILE_UPLOAD_ROOT : "upload";
            },
            getAllowedDocTypes   : () => {
                return myLocale.ALLOWED_DOC_TYPES ? myLocale.ALLOWED_DOC_TYPES :
                    ["doc", "xls", "pdf", "png", "mpeg", "mpg"];
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

// sleep functions await the step/action for the specified milliseconds(ms), defaults to 1000ms(1 second).
export function sleep(ms = 1000) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function csvToObjects(params: CsvToJsonParams): Promise<ResponseMessage> {
    try {
        const csvFile = await Deno.open(params.csvPath);
        const options = {
            columnSeparator: params.options.columnSeparator || ",",
            lineSeparator  : params.options.lineSeparator || "\r\n",
            // quote: "$",
        };
        // read the first-line as header
        let count = 0
        const headers: ArrayOfString = []
        const jsonRecords: Array<ObjectType> = []
        for await (const row of readCSV(csvFile, options)) {
            // computer header/column/field-names
            if (count === 0) {
                for await (const cell of row) {
                    headers.push(cell)
                }
            } else {
                // compute json-content and write to jsonFile
                const jsonRecord: ObjectType = {}
                let cellCount = 0
                for await (const cell of row) {
                    // compute non-string-values: number, boolean, object
                    if (Number(cell)) {
                        jsonRecord[headers[cellCount]] = Number(cell)
                    } else if (cell === "true" || cell === "false") {
                        jsonRecord[headers[cellCount]] = stringToBool(cell)
                    } else if (new Date(cell)) {
                        jsonRecord[headers[cellCount]] = new Date(cell)
                    } else if (JSON.parse(cell)) {
                        jsonRecord[headers[cellCount]] = JSON.parse(cell)
                    } else {
                        jsonRecord[headers[cellCount]] = cell
                    }
                    cellCount += 1
                }
                // update jsonRecords
                jsonRecords.push(jsonRecord)
            }
            count += 1
        }
        // close files
        csvFile.close();
        // return success response
        return getResMessage("success", {
            message: "success",
            value  : jsonRecords,
        })
    } catch (e) {
        return getResMessage("conversionError", {
            message: `${e.message}`,
            value  : [],
        })
    }
}

export async function csvToJson(params: CsvToJsonParams): Promise<ResponseMessage> {
    try {
        const csvFile = await Deno.open(params.csvPath);
        const options = {
            columnSeparator: params.options.columnSeparator || ",",
            lineSeparator  : params.options.lineSeparator || "\r\n",
            // quote: "$",
        };
        // read the first-line as header
        let count = 0
        const headers: ArrayOfString = []
        for await (const row of readCSV(csvFile, options)) {
            // computer header/column/field-names
            if (count === 0) {
                for await (const cell of row) {
                    headers.push(cell)
                }
            } else {
                // compute json-content and write to jsonFile
                const jsonRecord: ObjectType = {}
                let cellCount = 0
                for await (const cell of row) {
                    // compute non-string-value
                    // compute non-string-values: number, boolean, object
                    if (Number(cell)) {
                        jsonRecord[headers[cellCount]] = Number(cell)
                    } else if (cell === "true" || cell === "false") {
                        jsonRecord[headers[cellCount]] = stringToBool(cell)
                    } else if (new Date(cell)) {
                        jsonRecord[headers[cellCount]] = new Date(cell)
                    } else if (JSON.parse(cell)) {
                        jsonRecord[headers[cellCount]] = JSON.parse(cell)
                    } else {
                        jsonRecord[headers[cellCount]] = cell
                    }
                    cellCount += 1
                }
                // write to the json-file, once record at a time (more-efficient)
                Deno.writeTextFileSync(params.jsonPath, JSON.stringify(jsonRecord), {
                    append: true,
                })
            }
            count += 1
        }
        // close files
        csvFile.close();
        // return success response
        return getResMessage("success", {
            message: "success",
            value  : {},
        })
    } catch (e) {
        return getResMessage("conversionError", {
            message: `${e.message}`,
            value  : {},
        })
    }
}

export function xmlToJsonObject(params: XmlToJsonParams): ResponseMessage {
    try {
        // read xmlFile content
        const xmlFileContent = Deno.readTextFileSync(params.xmlPath)
        // convert xmlFileContent to object/record
        const record = parse(xmlFileContent);
        // return success response
        return getResMessage("success", {
            message: "success",
            value  : {
                record: record,
                json  : JSON.stringify(record, null, 4)
            },
        })
    } catch (e) {
        return getResMessage("conversionError", {
            message: `${e.message}`,
            value  : {},
        })
    }
}

export function xmlToJsonObject2(params: XmlToJsonParams): ResponseMessage {
    try {
        // read xmlFile content
        const xmlFileContent = Deno.readTextFileSync(params.xmlPath)
        // convert xmlFileContent to object/record
        const record = xml2js(xmlFileContent, {
            compact: true,
        });
        // return success response
        return getResMessage("success", {
            message: "success",
            value  : {
                record: record,
                json  : JSON.stringify(record, null, 4)
            },
        })
    } catch (e) {
        return getResMessage("conversionError", {
            message: `${e.message}`,
            value  : {},
        })
    }
}

