import { ArrayOfNumber, ArrayOfString } from "../../src/index.ts";

export const emptyObjectValue = {};
export const nonEmptyObjectValue = {name: "Abi", location: "Toronto"};

export const shortStringParam = "This is a great title for testing";
export const short21StringResult = "This is a great title...";

export const paramObjectMsgData = {name: "required", location: "optional"};
export const paramObjectMsgResult = `name: required | location: optional`;

export const strToBoolTrue = "true";
export const strToBoolYes = "yes";
export const strToBoolY = "Y";
export const strToBoolFalse = "false";
export const strToBoolNo = "no";
export const strToBoolN = "N";
export const strToBool1 = 1;
export const strToBool0 = 0;
export const strToBoolEmpty = "";

export const firstname = "Abi";
export const middlename = "John";
export const lastname = "Owo";
export const fullnameTwo = "Abi Owo";
export const fullnameThree = "Abi John Owo";

export const camelCaseValue = "countryCode";
export const underscoreValue = "country_code";
export const pascalCaseValue = "CountryCode";
export const dotSepParam = "country.code";
export const pipeSepParam = "country|code";
export const SpaceSepParam = "country code";

export const leapYear = 2000;
export const notLeapYear = 2022;

export const factorialParam = 4;
export const factorialValue = 24;

export const fibSeriesParam = 6;
export const fibSeriesResult = [1, 1, 2, 3, 5, 8];

export const primeNumParam = 10;
export const primeNums = [3, 5, 7, 9];

export const pythagorasParam = 10;
export const pythagorasResult =[[2, 3, 5], [4, 5, 9],];     // TODO: review result

export const numParams: ArrayOfNumber = [2, 5, 3, 5, 3, 5, 2, 3, 5,];
export const stringParams: ArrayOfString = ["a", "b", "a", "a", "a", "a"];
export const countNumResult = {2: 2, 3: 3, 5: 5,};
export const countStringResult = {"a": 5, "b": 1,};
export const  setNumResult = ["a", "b"];

