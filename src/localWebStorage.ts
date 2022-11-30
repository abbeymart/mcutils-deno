/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-06-25 | @Updated: 2020-06-26
 * @Company: mConnect.biz | @License: MIT
 * @Description: local web storage functions - for client/UI
 */
import { ObjectType, ValueType } from "./types.ts";

export const setItemState = (itemKey: string, itemValue: ValueType, expire: number) => {
    try {
        localStorage.setItem(itemKey, JSON.stringify(itemValue));
        localStorage.setItem(`${itemKey}Expire`, expire.toString());
    } catch (e) {
        console.error("error setting/saving localforage item: ", e.stack);
    }
};

export const removeItemState = (itemKey: string) => {
    try {
        localStorage.removeItem(itemKey);
        localStorage.removeItem(`${itemKey}Expire`);
    } catch (e) {
        console.error("error removing localforage item: ", e.stack);
    }
}

export const getItemState = (itemKey: string): ValueType => {
    try {
        const item = localStorage.getItem(itemKey),
            expire = localStorage.getItem(`${itemKey}Expire`);
        if (!item || !expire) {
            return "";
        }
        if (Date.now() > Number(expire)) {
            removeItemState(itemKey);
            return "";
        }
        return JSON.parse(item);
    } catch (e) {
        console.error("error getting localforage data: ", e.stack);
        return ""
    }
};

export const setToken = (token: string, expire: number) => {
    try {
        localStorage.setItem("authToken", token);
        localStorage.setItem("authTokenExpire", expire.toString());
    } catch (e) {
        console.error("error setting/saving localStorage item (setToken):", e.message);
    }
};

export const removeToken = () => {
    try {
        localStorage.removeItem("authToken");
        localStorage.removeItem("authTokenExpire");
    } catch (e) {
        console.error("error removing localStorage item(removeToken): ", e.message);
    }
};

export const getToken = (): string => {
    try {
        const item = localStorage.getItem("authToken"),
            expire = localStorage.getItem("authTokenExpire");
        if (!item || !expire) {
            return "";
        }
        if (Date.now() > Number(expire)) {
            // await removeItemState(itemKey);
            removeToken();
            removeCurrentUser();
            return "";
        }
        return item;
    } catch (e) {
        console.error("error getting localStorage item (getToken): ", e.message);
        return "";
    }
};

export const loggedIn = () => {
    try {
        return !!(getToken());
    } catch (e) {
        console.error("error getting localStorage item (loggedIn): ", e.message);
    }
};

export const setLoginName = (name: string, expire: number) => {
    try {
        localStorage.setItem("loginName", name);
        localStorage.setItem("loginNameExpire", expire.toString());
    } catch (e) {
        console.error("error setting/saving localStorage item (setLoginName):", e.message);
    }
};

export const removeLoginName = () => {
    try {
        localStorage.removeItem("loginName");
        localStorage.removeItem("loginNameExpire");
    } catch (e) {
        console.error("error removing localStorage item(removeLoginName): ", e.message);
    }
};

export const getLoginName = (): string => {
    try {
        const item = localStorage.getItem("loginName"),
            expire = localStorage.getItem("loginNameExpire");
        if (!item || !expire) {
            return "";
        }
        if (Date.now() > Number(expire)) {
            removeLoginName();
            return "";
        }
        return item;
    } catch (e) {
        console.error("error retrieving localStorage item(getLoginName): ", e.message);
        return "";
    }
};

export const setCurrentUser = (userInfo: ObjectType) => {
    try {
        localStorage.setItem("currentUser", JSON.stringify(userInfo));
    } catch (e) {
        console.error("error setting localStorage item(setCurrentUser): ", e.message);
    }
};

export const removeCurrentUser = () => {
    try {
        localStorage.removeItem("currentUser");
    } catch (e) {
        console.error("error removing localStorage item(removeCurrentUser): ", e.message);
    }
};

export const getCurrentUser = (): ObjectType => {
    try {
        const item = localStorage.getItem("currentUser");
        return item? JSON.parse(item) as ObjectType : {};
    } catch (e) {
        console.error("error retrieving localStorage item(getCurrentUser): ", e.message);
        return {};
    }
};

export const setApiToken = (token: string) => {
    try {
        localStorage.setItem("apiToken", token);
    } catch (e) {
        console.error("error setting localStorage item(setApiToken): ", e.message);
    }
};

export const removeApiToken = () => {
    try {
        localStorage.removeItem("apiToken");
    } catch (e) {
        console.error("error removing localStorage item(removeApiToken): ", e.message);
    }
};

export const getApiToken = (): string => {
    try {
        const item = localStorage.getItem("apiToken");
        return item? item : "";
    } catch (e) {
        console.error("error retrieving localStorage item(getApiToken): ", e.message);
        return "";
    }
};
