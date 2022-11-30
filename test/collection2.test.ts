import {
    assertEquals, assertNotEquals, mcTest, postTestResult,
} from "../test_deps.ts";
import { counterGeneric, set, setOfNumber, setOfString, setOfSymbol, } from "../src/index.ts";
import {
    booleanParams,
    countNumResult, countNumResultKeys, countStringResult, countStringResultKeys, numParams, setBooleanResult,
    setNumResult,
    setStingResult, setSymbolResult,
    stringParams, symbolParams
} from "./data/maths.ts";

(async () => {
    const startTime = Date.now();
    await mcTest({
        name    : "Successfully returns counter object value for array of numbers",
        testFunc: () => {
            const result = counterGeneric(numParams);
            console.log("counter-num-Res: ", result);
            for (const key of countNumResultKeys) {
                assertEquals(result[key], countNumResult[key], `Expected outcome: ${countNumResult[key]}`);
                assertNotEquals(result[key], 100, `Expected outcome: ${countNumResult[key]}`);
            }
        },
    });

    await mcTest({
        name    : "Successfully returns counter object value for array of string",
        testFunc: () => {
            const result = counterGeneric(stringParams);
            console.log("counter-string-Res: ", result);
            for (const key of countStringResultKeys) {
                assertEquals(result[key], countStringResult[key], `Expected outcome: ${countStringResult[key]}`);
                assertNotEquals(result[key], 100, `Expected outcome: ${countStringResult[key]}`);
            }
        },
    });

    await mcTest({
        name    : "Successfully returns counter object value for array of symbols",
        testFunc: () => {
            const result = counterGeneric(symbolParams);
            const resultKeys = Reflect.ownKeys(result);
            const resultValues = Reflect.ownKeys(result).map(s => result[s]);
            console.log("counter-symbol-Res: ", result);
            console.log("result-keys: ", resultKeys);
            console.log("result-values: ", resultValues);
            for (const key of resultKeys) {
                console.log("key, result[key]: ", key, result[key]);
                assertEquals(result[key], 1, `Expected outcome: ${1}`);
                assertNotEquals(result[key], 100, `Expected outcome: ${1}`);
            }
        },
    });

    await mcTest({
        name    : "Successfully returns unique array of numbers [set-generic]",
        testFunc: () => {
            const result = set(numParams);
            console.log("set-num-Res: ", result);
            for (let i = 0; i < result.length; i++) {
                assertEquals(result[i], setNumResult[i], `Expected outcome: ${setNumResult[i]}`);
                assertNotEquals(result[i], setNumResult[i + 1], `Expected outcome: ${setNumResult[i]}`);
            }
        },
    });

    await mcTest({
        name    : "Successfully returns unique array of string [set-generic]",
        testFunc: () => {
            const result = set(stringParams);
            console.log("set-string-Res: ", result);
            for (let i = 0; i < result.length; i++) {
                assertEquals(result[i], setStingResult[i], `Expected outcome: ${setStingResult[i]}`);
                assertNotEquals(result[i], setStingResult[i + 1], `Expected outcome: ${setStingResult[i]}`);
            }
        },
    });

    await mcTest({
        name    : "Successfully returns unique array of symbol [set-generic]",
        testFunc: () => {
            const result = set(symbolParams);
            console.log("set-symbol-Res: ", result);
            assertEquals(result.length, setSymbolResult.length, `Expected outcome: ${setSymbolResult.length}`);
            assertNotEquals(result.length, setSymbolResult.length + 1, `Expected outcome: ${setSymbolResult.length}`);
        },
    });

    await mcTest({
        name    : "Successfully returns unique array of numbers [set-of-numbers]",
        testFunc: () => {
            const result = setOfNumber(numParams);
            console.log("set-num-Res: ", result);
            for (let i = 0; i < result.length; i++) {
                assertEquals(result[i], setNumResult[i], `Expected outcome: ${setNumResult[i]}`);
                assertNotEquals(result[i], setNumResult[i + 1], `Expected outcome: ${setNumResult[i]}`);
            }
        },
    });

    await mcTest({
        name    : "Successfully returns unique array of string [set-of-strings]",
        testFunc: () => {
            const result = setOfString(stringParams);
            console.log("set-string-Res: ", result);
            for (let i = 0; i < result.length; i++) {
                assertEquals(result[i], setStingResult[i], `Expected outcome: ${setStingResult[i]}`);
                assertNotEquals(result[i], setStingResult[i + 1], `Expected outcome: ${setStingResult[i]}`);
            }
        },
    });

    await mcTest({
        name    : "Successfully returns unique array of symbol [set-of-symbols]",
        testFunc: () => {
            const result = setOfSymbol(symbolParams);
            console.log("set-symbol-Res: ", result);
            assertEquals(result.length, setSymbolResult.length, `Expected outcome: ${setSymbolResult.length}`);
            assertNotEquals(result.length, setSymbolResult.length + 1, `Expected outcome: ${setSymbolResult.length}`);
        },
    });

    await mcTest({
        name    : "Successfully returns unique array of boolean [set-of-booleans]",
        testFunc: () => {
            const result = set(booleanParams);
            console.log("set-boolean-Res: ", result);
            for (let i = 0; i < result.length; i++) {
                assertEquals(result[i], setBooleanResult[i], `Expected outcome: ${setBooleanResult[i]}`);
                assertNotEquals(result[i], setBooleanResult[i + 1], `Expected outcome: ${setBooleanResult[i]}`);
            }
        },
    });


    postTestResult();

    console.log(`\nTest Completed in ${Date.now() - startTime}ms\n`);
})();
