/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-06-24 | @Updated: 2020-06-25
 * @Company: mConnect.biz | @License: MIT
 * @Description: string to boolean converter
 */

export function strToBool(val= "n"): boolean {
    const strVal = val.toLowerCase();
    if (strVal === "true" || strVal === "t" || strVal === "yes" || strVal === "y") {
        return true;
    } else if (Number(strVal) > 0) {
        return true;
    } else {
        return false
    }
}
