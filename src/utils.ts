import { ObjectType, ValueType } from "./types.ts";
import {
    camelToUnderscore,
    currentUrlInfo, getLanguage, isEmptyObject, shortString, strToBool, userBrowser, userIpInfo
} from "./utilFuncs.ts";

export default {
    isEmptyObject,
    shortString,
    strToBool,
    userIpInfo,
    userBrowser,
    currentUrlInfo,
    camelToUnderscore,
    getLanguage,
    getPath(req: Request): string {
        let itemPath = req.url || '/mc';
        itemPath = itemPath.split('/')[1];
        return itemPath ? itemPath : 'mc';
    },
    getFullName(firstName: string, lastName: string, middleName = ''): string {
        if (firstName && middleName && lastName) {
            return (firstName + ' ' + middleName + ' ' + lastName);
        }
        return (firstName + ' ' + lastName);
    },
    getNames(fullName: string) {
        const nameParts = fullName.split('');
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
    },
    pluralize(n: number, itemName: string, itemPlural = ''): string {
        // @TODO: retrieve plural for itemName from language dictionary {name: plural}
        let itemNamePlural = '';
        if (!itemPlural) {
            itemNamePlural = 'tbd'
            // itemNamePlural = mcPlurals[ itemName ];
        } else {
            itemNamePlural = itemPlural;
        }
        let result = `${n} ${itemName}`;
        if (n > 1) {
            result = `${n} ${itemName}${itemNamePlural}`;
        }
        return result;
    },
    // Validation functions
    isProvided(param: string | number | ObjectType): boolean {
        // Verify the Required status
        // Validate that the item is not empty / null / undefined
        return !(param === '' || param === null || param === undefined || Object.keys(param).length === 0);
    },
    isEven(num: number): boolean {
        return Number.isFinite(num) && (num % 2 === 0);
    },
    isOdd(num: number): boolean {
        return Number.isFinite(num) && (num % 2 !== 0);
    },
    isNumberDigit(num: number): boolean {
        // Validate that param is a number (digit): 100 | 99 | 33 | 44 | 200
        const numberPattern = /^[0-9]+$/;
        return numberPattern.test(num.toString());
    },
    isNumberFloat(num: number): boolean {
        // Validate that param is a number (float): 0.90 | 99.9 | 33.3 | 44.40
        const numberPattern = /^([0-9])+([.])?([0-9])*$/;
        return numberPattern.test(num.toString());
    },
    isObjectType(param: ObjectType): boolean {
        "use strict";
        // Validate param is an object, {}
        return (typeof param === 'object' && !Array.isArray(param));
    },
    isArrayType(param: []): boolean {
        "use strict";
        // Validate param is an object, []
        return Array.isArray(param);
    },
    isStringChar(param: string): boolean {
        // Validate that param is a string (characters only) -- use regEx
        const charRegEx = /^[a-zA-Z&$_-]+$/;
        return charRegEx.test(param);
    },
    isStringAlpha(param: string): boolean {
        // Validate that param is a string (alphanumeric, chars/numbers only)
        const alphaNumericPattern = /^[a-zA-Z0-9-_]+$/;
        return alphaNumericPattern.test(param);
    },
    isUsername(param: string): boolean {
        "use strict";
        const usernamePattern = /^([a-zA-Z0-9_])+$/; // alphanumeric, underscore, no space
        return usernamePattern.test(param);
    },
    isEmpty(param: ValueType): boolean {
        "use strict";
        return (param === '' || param === null || param === undefined ||
            Object.keys(param).length === 0 ||
            (Array.isArray(param) && param.length === 0));
    },
    isNull(infoItem: null): boolean {
        "use strict";
        return infoItem === null;
    },
    isEmail(param: string): boolean {
        const testPattern = /^[0-9a-zA-Z]+([0-9a-zA-Z]*[-._+])*[0-9a-zA-Z]+@[0-9a-zA-Z]+([-.][0-9a-zA-Z]+)*([0-9a-zA-Z]*[.])[a-zA-Z]{2,6}$/;
        // const testPattern = /^[0-9a-zA-Z]+([\-._][0-9a-zA-Z]+)*@[0-9a-zA-Z]+([\-.][0-9a-zA-Z]+)*([.])[a-zA-Z]{2,6}$/;
        return testPattern.test(param);
    },
    isPassword(param: string): boolean {
        const testPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9\S]{6,15}$/;
        return testPattern.test(param);
    },
    isNumberOnRange(num: number, min: number, max: number): boolean {
        if ((this.isNumberDigit(num) || this.isNumberFloat(num)) && (min < max)) {
            return (num >= min && num <= max)
        }
        return false;
    },
    isPhone(param: string): boolean {
        const phonePattern = /^([1-9]{1,3})?[-. ]?(\(\d{3}\)?[-. ]?|\d{3}?[-. ]?)?\d{3}?[-. ]?\d{4}$/;
        return phonePattern.test(param);
    },
    isPostalCode(param: string): boolean {
        const postCodePattern = /^[a-zA-Z0-9]+(\s)?[a-zA-Z0-9]*/;
        return postCodePattern.test(param);
    },
    isPostalCodeUS(param: string): boolean {
        const postCodePattern = /^[a-zA-Z0-9]+(\s)?[a-zA-Z0-9]*/;
        return postCodePattern.test(param);
    },
    isPostalCodeCanada(param: string): boolean {
        const postCodePattern = /^[a-zA-Z0-9]+(\s)?[a-zA-Z0-9]*/;
        return postCodePattern.test(param);
    },
    isPostalCodeUK(param: string): boolean {
        const postCodePattern = /^[a-zA-Z0-9]+(\s)?[a-zA-Z0-9]*/;
        return postCodePattern.test(param);
    },
    isName(param: string): boolean {
        const namePattern = /^[a-zA-Z'-]+(\s[a-zA-Z'-])*[a-zA-Z'-]*/;   // Abi Charles Africa America
        return namePattern.test(param);
    },
    isURL(param: string): boolean {
        // Abi Charles Africa America
        const namePattern = /^[a-zA-Z0-9\-\\_.:]+$/;
        return namePattern.test(param);

    },
    isBusinessNumber(param: string): boolean {
        // business number format
        const bnPattern = /^[0-9-]+$/;
        return bnPattern.test(param);
    },
    isStandardCode(param: string): boolean {
        // Product Group | Body & Soul10
        const standardCodePattern = /^[a-zA-Z0-9]+[&\s\-_]*[a-zA-Z0-9$#]*$/;
        return standardCodePattern.test(param);
    },
    isCountryCode(param: string): boolean {
        // langCode must be string of format en-US
        const countryCodePattern = /^[a-z]{2}-[A-Z]{2}$/;
        return countryCodePattern.test(param);
    },
    isLanguageCode(param: string): boolean {
        // langCode must be string of format en-US
        const langCodePattern = /^[a-z]{2}-[A-Z]{2}$/;
        return langCodePattern.test(param);
    },
    isWordSpace(param: string): boolean {
        // words with spaces and hyphens, no numbers
        const wordSpacePattern = /^[a-zA-Z0-9,()'._&]+[\s\-a-zA-Z0-9,()'._&]*[a-zA-Z0-9,()'._?]*$/;
        return wordSpacePattern.test(param);
    },
    isLabelCode(param: string): boolean {
        // firstName_middleName_lastName
        const labelCodePattern = /^[a-zA-Z]+[_\-a-zA-Z]*[_a-z0-9]*$/;
        return labelCodePattern.test(param);
    },
    isErrorCode(param: string): boolean {
        // error code format (AB10-100, AB900)
        const errorCodePattern = /^[a-zA-Z0-9]+[-]*[0-9]*$/;
        return errorCodePattern.test(param);
    },
    isPathName(param: string) {
        // mysite.new_base.nicelook
        const pathNamePattern = /^[a-zA-Z0-9/]+[_a-zA-Z0-9./]*[a-zA-Z0-9/]*$/;
        return pathNamePattern.test(param);
    },
    isNameNoSpace(param: string): boolean {
        // JohnPaul
        const nameNoSpacePattern = /[a-zA-Z]+/;
        return nameNoSpacePattern.test(param);
    },
    isDescription(param: string): boolean {
        "use strict";
        const descPattern = /^[a-zA-Z0-9\s\\.,:/()*_|\-!@#$%&]+$/; // Alphanumeric string with spaces, and
        // (.,:/()*_-|!@)
        return descPattern.test(param);
    },
    isCurrency(param: string): boolean {
        const currencyPattern = /^[a-zA-Z#$]+$/;
        return currencyPattern.test(param);
    },
    isSafeInteger(n: number): boolean {
        return (Math.round(n) === n &&
            Number.MIN_SAFE_INTEGER <= n &&
            n <= Number.MAX_SAFE_INTEGER);
    },
}
