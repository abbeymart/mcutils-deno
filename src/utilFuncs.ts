import { ComputationResponse, MessageObject, ObjectType, PERMITTED_SEPARATORS } from "./types.ts";
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
            firstname : names[0],
            lastname  : names[1],
        };
    }
};
// camelToUnderscore computes and returns the underscore field name for the database table.
export function camelCaseToUnderscore(key: string): string {
    return key.replace(/([A-Z])/g, "_$1").toLowerCase();
}

// camelCase computes and returns the camelCase field name from a sep (default to _) fieldName.
export const camelCase = (text: string, sep = "_"): ComputationResponse => {
    // accepts word/text and separator(" ", "_", "__", ".")
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
    const otherWords = textArray.slice(1).map((item) => {
        // convert first letter to upper case
        const item0 = item[0].toUpperCase();
        // convert other letters to lowercase
        const item1N = item.slice(1).toLowerCase();
        return `${item0}${item1N}`;
    });
    return {
        code : "success",
        value: `${firstWord}${otherWords.join("")}`,
    };
};

// pascalCase computes and returns the PascalCase field name from a sep (default to _) fieldName.
export const pascalCase = (text: string, sep = "_"): ComputationResponse => {
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

