import { LocaleOptions, Locale, LocaleFilesType, } from "./types.ts";
import { isEmptyObject } from "./utilFuncs.ts";

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
