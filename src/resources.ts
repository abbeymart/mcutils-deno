/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-06-26 | @Updated: 2020-06-26
 * @Company: mConnect.biz | @License: MIT
 * @Description: resources (browser, disk, path etc,) utility functions
 */

const userIpInfo = async (ipUrl: string = 'https://ipinfo.io', options: object = {}): Promise<object> => {
    // Get the current user IP address Information
    // TODO: use other method besides ipinfo.io, due to query limit (i.e. 429 error)
    try {
        // const reqH = options && options.headers? options. headers : {};
        const reqHeaders =  {'Content-Type': 'application/json'};
        options          = Object.assign({}, options, {
            method : 'GET',
            mode   : 'cors',
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

const userBrowser = () => {
    // push each browser property, as key/value pair, into userBrowser array variable
    // @ts-ignore
    return navigator.userAgent;
};

const currentUrlInfo = (pathLoc: string): { parts: string[], lastIndex: number } => {
    // this function returns the parts (array) and lastIndex of a URL/pathLocation
    let parts: string[] = [];
    let lastIndex: number = -1;
    if (pathLoc) {
        parts = pathLoc.toString().split('://')[1].split('/');
        // get the last index
        lastIndex = parts.lastIndexOf('new') || parts.lastIndexOf('detail') || parts.lastIndexOf('list');
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

const getPath = (req: Request): string => {
    let itemPath = req.url || '/mc';
    itemPath = itemPath.split('/')[1];
    return itemPath ? itemPath : 'mc';
};

const getFullName = (firstName: string, lastName: string, middleName: string = ''): string => {
    if (firstName && middleName && lastName) {
        return (firstName + ' ' + middleName + ' ' + lastName);
    }
    return (firstName + ' ' + lastName);
};

const getNames = (fullName: string): { firstName: string, lastName: string, middleName?: string } => {
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
};

const pluralize = (n: number, itemName: string, itemPlural: string = ''): string => {
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
};

export {
    userIpInfo,
    userBrowser,
    currentUrlInfo,
    getPath,
    getFullName,
    getNames,
    pluralize,
};
