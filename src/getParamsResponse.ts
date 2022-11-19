/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-06-24 | @Updated: 2020-06-24
 * @Company: mConnect.biz | @License: MIT
 * @Description: get Parameters response
 */

import {getResMessage, ResponseMessage} from "@mconnect/mcresponse";

interface MessageObject {
    [key: string]: string;

}

export function getParamsMessage(msgObject: MessageObject, msgType = "unknown"): ResponseMessage {
    let messages = "";
    Object.entries(msgObject).forEach(([key, msg]) => {
        messages = messages ? `${messages} | ${key} : ${msg}` : `${key} : ${msg}`;
    });
    return getResMessage(msgType, {
        message: messages,
    });
}
