import {
    assertEquals, assertNotEquals, mcTest, postTestResult,
} from "../test_deps.ts";
import {
    ArrayOfNumber, filterGen, mapGen, takeVer2, takeGenVer2, takeGen, take, ArrayOfString,
} from "../src/index.ts";
import {
    arrayOfNumber, arrayOfString, filterEvenNumFunc, filterEvenNumFuncResult, filterOddNumFunc, filterOddNumFuncResult,
    filterStringIncludeABC, filterStringIncludeABCResult,
    mapDoubleNumFunc, mapDoubleNumFuncResult, take7CountResult, take7NumResult, take7StringResult,
} from "./data/testData.ts";

(async () => {
    const startTime = Date.now();
    await mcTest({
        name    : "Successfully generates and computes map values",
        testFunc: () => {
            const mapValues: ArrayOfNumber = [];
            for (const it of mapGen(arrayOfNumber, mapDoubleNumFunc)) {
                mapValues.push(it);
            }
            console.log("mapped-values: ", mapValues);
            assertEquals(mapValues.length, mapDoubleNumFuncResult.length, `Expected outcome: ${mapDoubleNumFuncResult.length}`);
            assertEquals(mapValues[0], mapDoubleNumFuncResult[0], `Expected outcome: ${mapDoubleNumFuncResult[0]}`);
            assertEquals(mapValues[mapValues.length - 1], mapDoubleNumFuncResult[arrayOfNumber.length - 1], `Expected outcome: ${mapDoubleNumFuncResult[mapDoubleNumFuncResult.length - 1]}`);
            assertNotEquals(mapValues.length, 5, `Expected outcome: ${mapDoubleNumFuncResult.length}`);
            assertNotEquals(mapValues[0], 1, `Expected outcome: ${mapDoubleNumFuncResult[0]}`);
            assertNotEquals(mapValues[mapValues.length - 1], 10, `Expected outcome: ${mapDoubleNumFuncResult[mapDoubleNumFuncResult.length - 1]}`);
        },
    });

    await mcTest({
        name    : "Successfully generates and computes filter even values",
        testFunc: () => {
            const filterEvenValues: ArrayOfNumber = [];
            for (const it of filterGen(arrayOfNumber, filterEvenNumFunc)) {
                filterEvenValues.push(it);
            }
            console.log("filter-even-values: ", filterEvenValues);
            assertEquals(filterEvenValues.length, filterEvenNumFuncResult.length, `Expected outcome: ${filterEvenNumFuncResult.length}`);
            assertEquals(filterEvenValues[0], filterEvenNumFuncResult[0], `Expected outcome: ${filterEvenNumFuncResult[0]}`);
            assertEquals(filterEvenValues[filterEvenValues.length - 1], filterEvenNumFuncResult[filterEvenNumFuncResult.length - 1], `Expected outcome: ${filterEvenNumFuncResult[filterEvenNumFuncResult.length - 1]}`);
            assertNotEquals(filterEvenValues.length, 3, `Expected outcome: ${filterEvenNumFuncResult.length}`);
            assertNotEquals(filterEvenValues[0], 1, `Expected outcome: ${filterEvenNumFuncResult[0]}`);
            assertNotEquals(filterEvenValues[filterEvenValues.length - 1], 6, `Expected outcome: ${filterEvenNumFuncResult[filterEvenNumFuncResult.length - 1]}`);
        },
    });

    await mcTest({
        name    : "Successfully generates and computes filter odd values",
        testFunc: () => {
            const filterOddValues: ArrayOfNumber = [];
            for (const it of filterGen(arrayOfNumber, filterOddNumFunc)) {
                filterOddValues.push(it);
            }
            console.log("filter-odd-values: ", filterOddValues);
            assertEquals(filterOddValues.length, filterOddNumFuncResult.length, `Expected outcome: ${filterOddNumFuncResult.length}`);
            assertEquals(filterOddValues[0], filterOddNumFuncResult[0], `Expected outcome: ${filterOddNumFuncResult[0]}`);
            assertEquals(filterOddValues[filterOddValues.length - 1], filterOddNumFuncResult[filterOddNumFuncResult.length - 1], `Expected outcome: ${filterOddNumFuncResult[filterOddNumFuncResult.length - 1]}`);
            assertNotEquals(filterOddValues.length, 3, `Expected outcome: ${filterOddNumFuncResult.length}`);
            assertNotEquals(filterOddValues[0], 2, `Expected outcome: ${filterOddNumFuncResult[0]}`);
            assertNotEquals(filterOddValues[filterOddValues.length - 1], 6, `Expected outcome: ${filterOddNumFuncResult[filterOddNumFuncResult.length - 1]}`);
        },
    });

    await mcTest({
        name    : "Successfully generate and take 4 out of 10 Array of numbers",
        testFunc: () => {
            const take4: ArrayOfNumber = [];
            for (const it of takeGen(arrayOfNumber, 4)) {
                take4.push(it);
            }
            console.log("tak4-values: ", take4);
            assertEquals(take4.length, 4, `Expected outcome: ${4}`);
            assertEquals(take4[0], arrayOfNumber[0], `Expected outcome: ${arrayOfNumber[0]}`);
            assertEquals(take4[take4.length - 1], arrayOfNumber[3], `Expected outcome: ${arrayOfNumber[3]}`);
            assertNotEquals(take4.length, 3, `Expected outcome: ${4}`);
        },
    });

    await mcTest({
        name    : "Successfully generates and computes filterStringIncludeABC values",
        testFunc: () => {
            const filterValues: ArrayOfString = [];
            for (const it of filterGen(arrayOfString, filterStringIncludeABC)) {
                filterValues.push(it);
            }
            console.log("filter-include-values: ", filterValues);
            assertEquals(filterValues.length, filterStringIncludeABCResult.length, `Expected outcome: ${filterStringIncludeABCResult.length}`);
            assertEquals(filterValues[0], filterStringIncludeABCResult[0], `Expected outcome: ${filterStringIncludeABCResult[0]}`);
            assertEquals(filterValues[filterValues.length - 1], filterStringIncludeABCResult[filterStringIncludeABCResult.length - 1], `Expected outcome: ${filterStringIncludeABCResult[filterStringIncludeABCResult.length - 1]}`);
            assertNotEquals(filterValues.length, 3, `Expected outcome: ${filterStringIncludeABCResult.length}`);
            assertNotEquals(filterValues[0], 2, `Expected outcome: ${filterStringIncludeABCResult[0]}`);
            assertNotEquals(filterValues[filterValues.length - 1], 6, `Expected outcome: ${filterStringIncludeABCResult[filterStringIncludeABCResult.length - 1]}`);
        },
    });

    await mcTest({
        name    : "Successfully take 4 out of 10 Array of numbers",
        testFunc: () => {
            const take4: ArrayOfNumber = take(arrayOfNumber, 4);
            console.log("tak4-values: ", take4);
            assertEquals(take4.length, 4, `Expected outcome: ${4}`);
            assertEquals(take4[0], arrayOfNumber[0], `Expected outcome: ${arrayOfNumber[0]}`);
            assertEquals(take4[take4.length - 1], arrayOfNumber[3], `Expected outcome: ${arrayOfNumber[3]}`);
            assertNotEquals(take4.length, 3, `Expected outcome: ${4}`);
        },
    });

    await mcTest({
        name    : "Successfully generate and take 4 out of 10 Array of numbers [version2]",
        testFunc: () => {
            const take4: ArrayOfNumber = [];
            for (const it of takeGenVer2(arrayOfNumber, 4)) {
                take4.push(it);
            }
            console.log("tak4-values [version-2]: ", take4);
            assertEquals(take4.length, 4, `Expected outcome: ${4}`);
            assertEquals(take4[0], arrayOfNumber[0], `Expected outcome: ${arrayOfNumber[0]}`);
            assertEquals(take4[take4.length - 1], arrayOfNumber[3], `Expected outcome: ${arrayOfNumber[3]}`);
            assertNotEquals(take4.length, 3, `Expected outcome: ${4}`);
        },
    });

    await mcTest({
        name    : "Successfully take 4 out of 10 Array of numbers[version 2]",
        testFunc: () => {
            const take4: ArrayOfNumber = takeVer2(arrayOfNumber, 4);
            console.log("tak4-values [version-2]: ", take4);
            assertEquals(take4.length, 4, `Expected outcome: ${4}`);
            assertEquals(take4[0], arrayOfNumber[0], `Expected outcome: ${arrayOfNumber[0]}`);
            assertEquals(take4[take4.length - 1], arrayOfNumber[3], `Expected outcome: ${arrayOfNumber[3]}`);
            assertNotEquals(take4.length, 3, `Expected outcome: ${4}`);
        },
    });

    await mcTest({
        name    : "Successfully take 7 out of 10 Array of numbers",
        testFunc: () => {
            const take7: ArrayOfNumber = take(arrayOfNumber, take7CountResult);
            console.log("take7-values: ", take7);
            assertEquals(take7.length, take7CountResult, `Expected outcome: ${take7CountResult}`);
            assertEquals(take7[0], take7NumResult[0], `Expected outcome: ${take7NumResult[0]}`);
            assertEquals(take7[take7.length - 1], take7NumResult[take7NumResult.length - 1], `Expected outcome: ${arrayOfNumber[take7NumResult.length - 1]}`);
            assertNotEquals(take7.length, 3, `Expected outcome: ${4}`);
        },
    });

    await mcTest({
        name    : "Successfully generate and take 7 out of 10 Array of string [version2]",
        testFunc: () => {
            const take7: ArrayOfString = [];
            for (const it of takeGenVer2(arrayOfString, take7CountResult)) {
                take7.push(it);
            }
            console.log("tak7-values [version-2]: ", take7);
            assertEquals(take7.length, take7CountResult, `Expected outcome: ${take7CountResult}`);
            assertEquals(take7[0], take7StringResult[0], `Expected outcome: ${take7StringResult[0]}`);
            assertEquals(take7[take7.length - 1], take7StringResult[take7StringResult.length - 1], `Expected outcome: ${take7StringResult[take7StringResult.length - 1]}`);
            assertNotEquals(take7.length, 3, `Expected outcome: ${4}`);
        },
    });

    postTestResult();

    console.log(`\nTest Completed in ${Date.now() - startTime}ms\n`);
})();
