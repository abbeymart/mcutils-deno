import {
    assertEquals, assertNotEquals, mcTest, postTestResult,
} from "https://deno.land/x/mctest@v0.1.4/src/mcTest.ts";
import { counterGeneric, } from "../src/index.ts";
import {
    countNumResult, countNumResultKeys, countStringResult, countStringResultKeys, numParams,
    stringParams,
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


    postTestResult();

    console.log(`\nTest Completed in ${Date.now() - startTime}ms\n`);
})();
