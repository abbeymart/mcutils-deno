import {
    assertEquals, assertNotEquals, mcTest, postTestResult,
} from "../test_deps.ts";
import { max, mean, median, min, minMax, populationStandardDeviation, sampleStandardDeviation } from "../src/index.ts";
import {
    arrayOfNumber, arrayOfNumber2, maxResult, meanResult, medianResult, minMaxResult, minResult, stdDeviationResult,
    stdDeviationResultEst, stdDeviationResultEst2,
} from "./data/testData.ts";

(async () => {
    const startTime = Date.now();
    await mcTest({
        name    : "Successfully returns minimum result",
        testFunc: () => {
            const result = min(arrayOfNumber);
            console.log("min-Res: ", result);
            assertEquals(result, minResult, `Expected outcome: ${minResult}`);
            assertNotEquals(result, 100, `Expected outcome: ${minResult}`);
        },
    });

    await mcTest({
        name    : "Successfully returns maximum result",
        testFunc: () => {
            const result = max(arrayOfNumber);
            console.log("max-Res: ", result);
            assertEquals(result, maxResult, `Expected outcome: ${maxResult}`);
            assertNotEquals(result, 1, `Expected outcome: ${maxResult}`);
        },
    });

    await mcTest({
        name    : "Successfully returns minimum and maximum results",
        testFunc: () => {
            const result = minMax(arrayOfNumber);
            console.log("min-max-Res: ", result);
            assertEquals(result.minimum, minMaxResult.minimum, `Expected outcome: ${minMaxResult.minimum}`);
            assertNotEquals(result.minimum, 10, `Expected outcome: ${minMaxResult.minimum}`);
            assertEquals(result.maximum, minMaxResult.maximum, `Expected outcome: ${minMaxResult.maximum}`);
            assertNotEquals(result.maximum, 1, `Expected outcome: ${minMaxResult.maximum}`);
        },
    });

    await mcTest({
        name    : "Successfully returns mean result",
        testFunc: () => {
            const result = mean(arrayOfNumber, 2);
            console.log("mean-Res: ", result);
            assertEquals(result, meanResult, `Expected outcome: ${meanResult}`);
            assertNotEquals(result, 1, `Expected outcome: ${meanResult}`);
        },
    });

    await mcTest({
        name    : "Successfully returns median result",
        testFunc: () => {
            const result = median(arrayOfNumber, 2);
            console.log("median-Res: ", result);
            assertEquals(result, medianResult, `Expected outcome: ${medianResult}`);
            assertNotEquals(result, 1, `Expected outcome: ${medianResult}`);
        },
    });

    await mcTest({
        name    : "Successfully returns standard-deviation, rounded to 16 decimal places, result",
        testFunc: () => {
            const result = sampleStandardDeviation(arrayOfNumber, 16);
            console.log("standardDeviation-Res: ", result);
            assertEquals(result, stdDeviationResult, `Expected outcome: ${stdDeviationResult}`);
            assertNotEquals(result, 1, `Expected outcome: ${stdDeviationResult}`);
        },
    });

    await mcTest({
        name    : "Successfully returns standard-deviation, rounded to 5 decimal places, result",
        testFunc: () => {
            const result = sampleStandardDeviation(arrayOfNumber, 5);
            // const resultEst = Number(result.toFixed(5));
            console.log("standardDeviation-Res: ", result);
            assertEquals(result, stdDeviationResultEst, `Expected outcome: ${stdDeviationResultEst}`);
            assertNotEquals(result, 1, `Expected outcome: ${stdDeviationResultEst}`);
        },
    });

    await mcTest({
        name    : "Successfully returns population-standard-deviation, rounded to 2 decimal places, result",
        testFunc: () => {
            const result = populationStandardDeviation(arrayOfNumber2, 2);
            // const resultEst = Number(result.toFixed(5));
            console.log("standardDeviation-Res: ", result);
            assertEquals(result, stdDeviationResultEst2, `Expected outcome: ${stdDeviationResultEst}`);
            assertNotEquals(result, 1, `Expected outcome: ${stdDeviationResultEst}`);
        },
    });

    // variance

    // interval

    // frequency

    // frequencyStat

    // IQRange

    postTestResult();

    console.log(`\nTest Completed in ${Date.now() - startTime}ms\n`);
})();
