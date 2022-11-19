/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-06-24 | @Updated: 2020-06-25
 * @Company: mConnect.biz | @License: MIT
 * @Description: shorten long text/string
 */

export function shortString(str: string, maxLength = 20): string {
    return str.toString().length > maxLength ? str.toString().substr(0, maxLength) + '...' : str.toString();
}
