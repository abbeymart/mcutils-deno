import {
    assertEquals, assertNotEquals, mcTest, postTestResult, assertNotStrictEquals, assertStrictEquals
} from "../test_deps.ts";
import {
    camelCaseValue, dotSepParam, emptyObjectValue, firstname, fullnameThree, fullnameTwo, lastname, middlename,
    nonEmptyObjectValue, paramObjectMsgData, paramObjectMsgResult,
    pascalCaseValue,
    pipeSepParam, short20StringResult, short21StringResult, shortStringParam,
    spaceSepParam,
    underscoreValue
} from "./data/utilFuncs.ts";
import {
    camelCaseToUnderscore, pascalCase, camelCase, getFullName, getNames, isEmptyObject, shortString,
    getParamsMessage, stringToBool,
} from "../src/index.ts";

(async () => {
    const startTime = Date.now();

    await mcTest({
        name    : "Transform camelCase field to underscore",
        testFunc: () => {
            const result = camelCaseToUnderscore(camelCaseValue);
            console.log("camelCaseToUnderscore-Res: ", result);
            assertEquals(result, underscoreValue, `Expected outcome: ${underscoreValue}`);
            assertNotEquals(result, camelCaseValue, `Expected outcome: ${underscoreValue}`);
        },
    });

    await mcTest({
        name    : "Transform underscore field to camelCase",
        testFunc: () => {
            const result = camelCase(underscoreValue);
            console.log("camelCase-Res: ", result);
            assertEquals(result.code, "success", `Expected outcome: success`);
            assertEquals(result.value as string, camelCaseValue, `Expected outcome: ${camelCaseValue}`);
            assertNotEquals(result.value as string, underscoreValue, `Expected outcome: ${camelCaseValue}`);
        },
    });

    await mcTest({
        name    : "Transform underscore field to camelCase - invalid separator[/]",
        testFunc: () => {
            const result = camelCase(underscoreValue, "/");
            console.log("camelCase-Res: ", result);
            assertEquals(result.code, "separatorError", `Expected outcome: separatorError`);
            assertNotEquals(result.value as string, camelCaseValue, `Expected outcome: ${camelCaseValue}`);
        },
    });

    await mcTest({
        name    : "Transform underscore field to camelCase, dot separator",
        testFunc: () => {
            const result = camelCase(dotSepParam, ".");
            console.log("camelCase-Res: ", result);
            assertEquals(result.code, "success", `Expected outcome: success`);
            assertEquals(result.value as string, camelCaseValue, `Expected outcome: ${camelCaseValue}`);
            assertNotEquals(result.value as string, underscoreValue, `Expected outcome: ${camelCaseValue}`);
        },
    });

    await mcTest({
        name    : "Transform underscore field to camelCase, pipe separator",
        testFunc: () => {
            const result = camelCase(pipeSepParam, "|");
            console.log("camelCase-Res: ", result);
            assertEquals(result.code, "success", `Expected outcome: success`);
            assertEquals(result.value as string, camelCaseValue, `Expected outcome: ${camelCaseValue}`);
            assertNotEquals(result.value as string, underscoreValue, `Expected outcome: ${camelCaseValue}`);
        },
    });

    await mcTest({
        name    : "Transform underscore field to camelCase, space separator",
        testFunc: () => {
            const result = camelCase(spaceSepParam, " ");
            console.log("camelCase-Res: ", result);
            assertEquals(result.code, "success", `Expected outcome: success`);
            assertEquals(result.value as string, camelCaseValue, `Expected outcome: ${camelCaseValue}`);
            assertNotEquals(result.value as string, underscoreValue, `Expected outcome: ${camelCaseValue}`);
        },
    });

    await mcTest({
        name    : "Transform underscore field to PascalCase",
        testFunc: () => {
            const result = pascalCase(underscoreValue);
            console.log("PascalCase-Res: ", result);
            assertEquals(result.code, "success", `Expected outcome: success`);
            assertEquals(result.value as string, pascalCaseValue, `Expected outcome: ${pascalCaseValue}`);
            assertNotEquals(result.value as string, underscoreValue, `Expected outcome: ${pascalCaseValue}`);
        },
    });

    await mcTest({
        name    : "Transform underscore field to PascalCase - invalid separator[/]",
        testFunc: () => {
            const result = pascalCase(underscoreValue, "/");
            console.log("PascalCase-Res: ", result);
            assertEquals(result.code, "separatorError", `Expected outcome: separatorError`);
            assertNotEquals(result.value as string, pascalCaseValue, `Expected outcome: ${pascalCaseValue}`);
        },
    });

    await mcTest({
        name    : "Transform underscore field to PascalCase, dot separator",
        testFunc: () => {
            const result = pascalCase(dotSepParam, ".");
            console.log("PascalCase-Res: ", result);
            assertEquals(result.code, "success", `Expected outcome: success`);
            assertEquals(result.value as string, pascalCaseValue, `Expected outcome: ${pascalCaseValue}`);
            assertNotEquals(result.value as string, underscoreValue, `Expected outcome: ${pascalCaseValue}`);
        },
    });

    await mcTest({
        name    : "Transform underscore field to PascalCase, pipe separator",
        testFunc: () => {
            const result = pascalCase(pipeSepParam, "|");
            console.log("PascalCase-Res: ", result);
            assertEquals(result.code, "success", `Expected outcome: success`);
            assertEquals(result.value as string, pascalCaseValue, `Expected outcome: ${pascalCaseValue}`);
            assertNotEquals(result.value as string, underscoreValue, `Expected outcome: ${pascalCaseValue}`);
        },
    });

    await mcTest({
        name    : "Transform underscore field to PascalCase, space separator",
        testFunc: () => {
            const result = pascalCase(spaceSepParam, " ");
            console.log("PascalCase-Res: ", result);
            assertEquals(result.code, "success", `Expected outcome: success`);
            assertEquals(result.value as string, pascalCaseValue, `Expected outcome: ${pascalCaseValue}`);
            assertNotEquals(result.value as string, underscoreValue, `Expected outcome: ${pascalCaseValue}`);
        },
    });

    await mcTest({
        name    : "Get full name - first/lastname",
        testFunc: () => {
            const result = getFullName(firstname, lastname);
            console.log("fullname[2]-Res: ", result);
            assertEquals(result, fullnameTwo, `Expected outcome: ${fullnameTwo}`);
            assertStrictEquals(result, fullnameTwo, `Expected outcome: ${fullnameTwo}`);
            assertNotEquals(result, fullnameThree, `Expected outcome: ${fullnameTwo}`);
            assertNotStrictEquals(result, fullnameThree, `Expected outcome: ${fullnameTwo}`);
        },
    });

    await mcTest({
        name    : "Get full name - first/middle/lastname",
        testFunc: () => {
            const result = getFullName(firstname, lastname, middlename);
            console.log("fullname[3]-Res: ", result);
            assertEquals(result, fullnameThree, `Expected outcome: ${fullnameThree}`);
            assertStrictEquals(result, fullnameThree, `Expected outcome: ${fullnameThree}`);
            assertNotEquals(result, fullnameTwo, `Expected outcome: ${fullnameThree}`);
            assertNotStrictEquals(result, fullnameTwo, `Expected outcome: ${fullnameThree}`);
        },
    });

    await mcTest({
        name    : "Get firstname and lastname",
        testFunc: () => {
            const result = getNames(fullnameTwo);
            console.log("first-last-names-Res: ", result);
            assertEquals(result.firstname || "", firstname, `Expected outcome: ${firstname}`);
            assertEquals(result.lastname || "", lastname, `Expected outcome: ${lastname}`);
        },
    });

    await mcTest({
        name    : "Get firstname, middlename and lastname",
        testFunc: () => {
            const result = getNames(fullnameThree);
            console.log("first-middle-last-names-Res: ", result);
            assertEquals(result.firstname || "", firstname, `Expected outcome: ${firstname}`);
            assertEquals(result.middlename || "", middlename, `Expected outcome: ${middlename}`);
            assertEquals(result.lastname || "", lastname, `Expected outcome: ${lastname}`);
        },
    });

    await mcTest({
        name    : "Validate non-empty object-value",
        testFunc: () => {
            const result = isEmptyObject(nonEmptyObjectValue);
            console.log("non-empty-object-Res: ", result);
            assertEquals(result, false, `Expected outcome: ${false}`);
            assertNotEquals(result, true, `Expected outcome: ${false}`);
        },
    });

    await mcTest({
        name    : "Validate empty object-value",
        testFunc: () => {
            const result = isEmptyObject(emptyObjectValue);
            console.log("empty-object-Res: ", result);
            assertEquals(result, true, `Expected outcome: ${true}`);
            assertNotEquals(result, false, `Expected outcome: ${true}`);
        },
    });

    await mcTest({
        name    : "Compute short string based on the specified maximum-length",
        testFunc: () => {
            const result = shortString(shortStringParam, 21);
            console.log("short-string-Res: ", result);
            assertEquals(result, short21StringResult, `Expected outcome: ${short21StringResult}`);
            assertNotEquals(result, short20StringResult, `Expected outcome: ${short21StringResult}`);
        },
    });

    await mcTest({
        name    : "Compute message from message-object",
        testFunc: () => {
            const result = getParamsMessage(paramObjectMsgData);
            console.log("object-msg-Res: ", result);
            assertEquals(result.code, "success", `Expected outcome: success`);
            assertEquals(result.message, paramObjectMsgResult, `Expected outcome: ${paramObjectMsgResult}`);
            assertNotEquals(result.code, "validateError", `Expected outcome: success`);
        },
    });

    await mcTest({
        name    : "Transform string-true to boolean",
        testFunc: () => {
            const result = stringToBool("truE");
            console.log("string-to-bool-Res: ", result);
            assertEquals(result, true, `Expected outcome: ${true}`);
            assertNotEquals(result, false, `Expected outcome: ${true}`);
        },
    });

    await mcTest({
        name    : "Transform string-t to boolean",
        testFunc: () => {
            const result = stringToBool("t");
            console.log("string-to-bool-Res: ", result);
            assertEquals(result, true, `Expected outcome: ${true}`);
            assertNotEquals(result, false, `Expected outcome: ${true}`);
        },
    });

    await mcTest({
        name    : "Transform string-yes to boolean",
        testFunc: () => {
            const result = stringToBool("yEs");
            console.log("string-to-bool-Res: ", result);
            assertEquals(result, true, `Expected outcome: ${true}`);
            assertNotEquals(result, false, `Expected outcome: ${true}`);
        },
    });

    await mcTest({
        name    : "Transform string-y to boolean",
        testFunc: () => {
            const result = stringToBool("y");
            console.log("string-to-bool-Res: ", result);
            assertEquals(result, true, `Expected outcome: ${true}`);
            assertNotEquals(result, false, `Expected outcome: ${true}`);
        },
    });
    await mcTest({
        name    : "Transform string-1 to boolean",
        testFunc: () => {
            const result = stringToBool("1");
            console.log("string-to-bool-Res: ", result);
            assertEquals(result, true, `Expected outcome: ${true}`);
            assertNotEquals(result, false, `Expected outcome: ${true}`);
        },
    });

    await mcTest({
        name    : "Transform string-false to boolean",
        testFunc: () => {
            const result = stringToBool("falSe");
            console.log("string-to-bool-Res: ", result);
            assertEquals(result, false, `Expected outcome: ${false}`);
            assertNotEquals(result, true, `Expected outcome: ${false}`);
        },
    });

    await mcTest({
        name    : "Transform string-f to boolean",
        testFunc: () => {
            const result = stringToBool("F");
            console.log("string-to-bool-Res: ", result);
            assertEquals(result, false, `Expected outcome: ${false}`);
            assertNotEquals(result, true, `Expected outcome: ${false}`);
        },
    });

    await mcTest({
        name    : "Transform string-no to boolean",
        testFunc: () => {
            const result = stringToBool("no");
            console.log("string-to-bool-Res: ", result);
            assertEquals(result, false, `Expected outcome: ${false}`);
            assertNotEquals(result, true, `Expected outcome: ${false}`);
        },
    });

    await mcTest({
        name    : "Transform string-n to boolean",
        testFunc: () => {
            const result = stringToBool("N");
            console.log("string-to-bool-Res: ", result);
            assertEquals(result, false, `Expected outcome: ${false}`);
            assertNotEquals(result, true, `Expected outcome: ${false}`);
        },
    });

    await mcTest({
        name    : "Transform string-0 to boolean",
        testFunc: () => {
            const result = stringToBool("0");
            console.log("string-to-bool-Res: ", result);
            assertEquals(result, false, `Expected outcome: ${false}`);
            assertNotEquals(result, true, `Expected outcome: ${false}`);
        },
    });

    postTestResult();

    console.log(`\nTest Completed in ${Date.now() - startTime}ms\n`);
})();