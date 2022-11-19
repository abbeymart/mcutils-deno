import { LocaleValueType } from "./types.ts";
import { isEmptyObject } from "./utilFuncs.ts";

interface Options {
    type?: string;
    language?: string;
}

export interface Locale {
    [key: string]: LocaleValueType;
}

export interface LocaleFilesType {
    [key: string]: Locale;      // key => language ("enUS", "enCA", "yoruba", "frCA", "frFR" etc.)
}

export const getLocale = (localeFiles: LocaleFilesType, options: Options = {}): Locale => {
    // validate localeFiles as an object
    if (isEmptyObject()) {
        return {
            code: 'paramsError',
            message: 'Locale files should be an object and not empty',
        };
    }

    const localeType = options && options.type ? options.type : '';
    const language = options && options.language ? options.language : 'en-US';

    // set the locale file contents
    const myLocale = localeFiles[language];

    if (localeType === 'mcConstants') {
        return {
            getShortDesc() {
                return myLocale.SHORT_DESC;
            },
            getDefaultLanguage() {
                return myLocale.DEFAULT_LANG;
            },
            getDefaultCurrency() {
                return myLocale.DEFAULT_CURRENCY;
            },
            getDDPLimit() {
                return myLocale.DDP_LIMIT;
            },
            getCreateLogType() {
                return myLocale.CREATE_LOG_TYPE;
            },
            getUpdateLogType() {
                return myLocale.UPDATE_LOG_TYPE;
            },
            getRemoveLogType() {
                return myLocale.REMOVE_LOG_TYPE;
            },
            getSearchLogType() {
                return myLocale.SEARCH_LOG_TYPE;
            },
            getLoginType() {
                return myLocale.LOGIN_LOG_TYPE;
            },
            getLogoutType() {
                return myLocale.LOGOUT_LOG_TYPE;
            },
            getLoginTimeout() {
                return myLocale.LOGIN_TIMEOUT;
            },
            getStateTimeout() {
                return myLocale.STATE_TIMEOUT;
            },
            getRememberMeTimeout() {
                return myLocale.REMEMBER_TIMEOUT;
            },
            getLogCreate() {
                return myLocale.LOG_CREATE;
            },
            getLogRead() {
                return myLocale.LOG_READ;
            },
            getLogUpdate() {
                return myLocale.LOG_UPDATE;
            },
            getLogDelete() {
                return myLocale.LOG_DELETE;
            },
            getLogLogin() {
                return myLocale.LOG_LOGIN;
            },
            getLogLogout() {
                return myLocale.LOG_LOGOUT;
            },
            getMaxFileCount() {
                return myLocale.MAX_FILE_COUNT;
            },
            getMaxFileSize() {
                return myLocale.MAX_FILE_SIZE;
            },
            getMaxProductQuantity() {
                return myLocale.MAX_PRODUCT_QTY;
            },
            getQueryLimit() {
                return myLocale.QUERY_REC_LIMIT;
            },
            getDefaultCart() {
                return myLocale.DEFAULT_CART;
            },
            getDefaultWish() {
                return myLocale.DEFAULT_WISH;
            },
            getPasswordMinLength() {
                return myLocale.PASSWORD_MIN_LENGTH;
            },
            getLoginNameMinLength() {
                return myLocale.LOGIN_NAME_MIN_LENGTH;
            },
            getLoginMaxRetry() {
                return myLocale.LOGIN_MAX_RETRY;
            },
            getLoginLockoutTime() {
                return myLocale.LOGIN_LOCKOUT_TIME;
            },
            getFileUploadRoot() {
                return myLocale.FILE_UPLOAD_ROOT;
            },
            getAllowedDocTypes() {
                return myLocale.ALLOWED_DOC_TYPES;
            },
        };
    } else {
        return myLocale;
    }
}
