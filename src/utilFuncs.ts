import {ObjectType} from "./types.ts";

export const isEmptyObject = (val: ObjectType): boolean => {
    return !(Object.keys(val).length > 0 && Object.values(val).length > 0);
}

export function shortString(str: string, maxLength = 20): string {
    return str.toString().length > maxLength ? str.toString().substr(0, maxLength) + "..." : str.toString();
}

export function strToBool(val= "n"): boolean {
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
        const reqHeaders =  {"Content-Type": "application/json"};
        options          = Object.assign({}, options, {
            method : "GET",
            mode   : "cors",
            headers: reqHeaders,
        });
        const response   = await fetch(ipUrl, options);
        let result       = await response.json();
        result           = result ? JSON.parse(result) : null;
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

export const getFullName = (firstName: string, lastName: string, middleName = ""): string => {
    if (firstName && middleName && lastName) {
        return (firstName + " " + middleName + " " + lastName);
    }
    return (firstName + " " + lastName);
};

export const getNames = (fullName: string): { firstName: string, lastName: string, middleName?: string } => {
    const nameParts = fullName.split("");
    let firstName, lastName, middleName;
    if (nameParts.length > 2) {
        firstName = nameParts[0];
        lastName = nameParts[2];
        middleName = nameParts[1];
        return {
            firstName,
            middleName,
            lastName,
        };
    } else {
        firstName = nameParts[0];
        lastName = nameParts[1];
        return {
            firstName,
            lastName,
        };
    }
    // Return firstName, middleName and lastName based on fullName components ([0],[1],[2])
};

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

export const  camelToUnderscore = (key: string): string => {
    return key.replace(/([A-Z])/g, "_$1").toLowerCase();
}

export const getLanguage = (userLang = 'en-US'): string => {
    // Define/set default language variable
    let defaultLang = 'en-US';
    // Set defaultLang to current userLang, set from the UI
    if (userLang) {
        defaultLang = userLang;
    }
    return defaultLang;
}
