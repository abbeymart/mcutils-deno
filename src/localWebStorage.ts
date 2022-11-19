/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-06-25 | @Updated: 2020-06-26
 * @Company: mConnect.biz | @License: MIT
 * @Description: local web storage functions
 */

import localforage from "localforage";

export const setCookie = (cname: string, cvalue: string, exdays: number) => {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    // const dt = Date.now()
    // const exMilliseconds = dt + (exdays * 24 * 60 * 60 * 1000);
    const expires = "expires=" + d.toUTCString();
    // @ts-ignore
    document.cookie = `${cname}=${cvalue}; ${expires}; path=/`;
};

export const getCookie = (cname: string): string => {
    const name = `${cname}=`;
    // @ts-ignore
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        // trip white/empty spaces
        while (c.charAt(0) === " ") {
            c = c.substring(1);
        }
        // if cookie exist, return the value
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

export const checkCookie = () => {
    let username = getCookie("username");
    if (username !== "") {
        //TODO: perform action with set value;
    } else {
        // @ts-ignore
        username = prompt("Please enter your name:", "");
        if (username !== "" && username !== null) {
            setCookie("username", username, 365);
        }
    }
};

export const mcStore = async (options = {storageName: ""}) => {
    // localforage instance for client/UI only
    const storageName = options && options.storageName? options.storageName : "mconnectStore";
    // @ts-ignore
    return await localforage.createInstance({name: storageName,});
};

export const mcStoreTest = async (options = {storageName: ""}) => {
    // NOTE: *****this method is strictly for testing only*****
    // localforage instance for client/UI only
    return (options && options.storageName && typeof options.storageName ?
        options.storageName : "mconnectStore");
};

export const setItemState = async (itemKey: string, itemValue: any, expire: number) => {
    try {
        const mStore = await mcStore();
        await mStore.setItem(itemKey, itemValue);
        await mStore.setItem(`${itemKey}Expire`, expire);
    } catch (e) {
        console.error("error setting/saving localforage item: ", e.stack);
    }
};

export const removeItemState = async (itemKey: string) => {
    try {
        const mStore = await mcStore();
        await mStore.removeItem(itemKey);
        await mStore.removeItem(`${itemKey}Expire`);
    } catch (e) {
        console.error("error removing localforage item: ", e.stack);
    }
}

export const getItemState = async (itemKey: string) => {
    try {
        const mStore = await mcStore();
        const item = await mStore.getItem(itemKey),
            expire = await mStore.getItem(`${itemKey}Expire`);
        if (!item || !expire) {
            return "";
        }
        if (Date.now() > Number(expire)) {
            await removeItemState(itemKey);
            return "";
        }
        return item;
    } catch (e) {
        console.error("error getting localforage data: ", e.stack);
        return ""
    }
};

export const setToken = async (token: string, expire: number) => {
    try {
        const mStore = await mcStore();
        await mStore.setItem("authToken", token);
        await mStore.setItem("authTokenExpire", expire);
    } catch (e) {
        console.error("error setting/saving localStorage item (setToken):", e.message);
    }
};

export const removeToken = async () => {
    try {
        const mStore = await mcStore();
        await mStore.removeItem("authToken");
        await mStore.removeItem("authTokenExpire");
    } catch (e) {
        console.error("error removing localStorage item(removeToken): ", e.message);
    }
};

export const getToken = async() => {
    try {
        const mStore = await mcStore();
        const item = await mStore.getItem("authToken"),
            expire = await mStore.getItem("authTokenExpire");
        if (!item || !expire) {
            return "";
        }
        if (Date.now() > Number(expire)) {
            // await removeItemState(itemKey);
            await removeToken();
            await removeCurrentUser();
            return "";
        }
        return item;
    } catch (e) {
        console.error("error getting localStorage item (getToken): ", e.message);
        return "";
    }
};

export const loggedIn = async () => {
    try {
        return !!(await getToken());
    } catch (e) {
        console.error("error getting localStorage item (loggedIn): ", e.message);
    }
};

export const setLoginName = async(name: string, expire: number) => {
    try {
        const mStore = await mcStore();
        await mStore.setItem("loginName", name);
        await mStore.setItem("loginNameExpire", expire);
    } catch (e) {
        console.error("error setting/saving localStorage item (setLoginName):", e.message);
    }
};

export const removeLoginName = async () => {
    try {
        const mStore = await mcStore();
        await mStore.removeItem("loginName");
        await mStore.removeItem("loginNameExpire");
    } catch (e) {
        console.error("error removing localStorage item(removeLoginName): ", e.message);
    }
};

export const getLoginName = async () => {
    try {
        const mStore = await mcStore();
        const item = await mStore.getItem("loginName"),
            expire = await mStore.getItem("loginNameExpire");
        if (!item || !expire) {
            return "";
        }
        if (Date.now() > Number(expire)) {
            await removeLoginName();
            return "";
        }
        return item;
    } catch (e) {
        console.error("error retrieving localStorage item(getLoginName): ", e.message);
        return "";
    }
};

export const setCurrentUser = async (userInfo: object) => {
    try {
        const mStore = await mcStore();
        await mStore.setItem("currentUser", userInfo);
    } catch (e) {
        console.error("error setting localStorage item(setCurrentUser): ", e.message);
    }
};

export const removeCurrentUser = async () => {
    try {
        const mStore = await mcStore();
        await mStore.removeItem("currentUser");
    } catch (e) {
        console.error("error removing localStorage item(removeCurrentUser): ", e.message);
    }
};

export const getCurrentUser = async () => {
    try {
        const mStore = await mcStore();
        const item = await mStore.getItem("currentUser");
        return item? item : "";
    } catch (e) {
        console.error("error retrieving localStorage item(getCurrentUser): ", e.message);
        return "";
    }
};

export const setApiToken = async (token: string) => {
    try {
        const mStore = await mcStore();
        await mStore.setItem("apiToken", token);
    } catch (e) {
        console.error("error setting localStorage item(setApiToken): ", e.message);
    }
};

export const removeApiToken = async () => {
    try {
        const mStore = await mcStore();
        await mStore.removeItem("apiToken");
    } catch (e) {
        console.error("error removing localStorage item(removeApiToken): ", e.message);
    }
};

export const getApiToken = async () => {
    try {
        const mStore = await mcStore();
        const item = await mStore.getItem("apiToken");
        return item? item : "";
    } catch (e) {
        console.error("error retrieving localStorage item(getApiToken): ", e.message);
        return "";
    }
};
