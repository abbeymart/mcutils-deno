import {
    assertEquals, assertNotEquals, mcTest, postTestResult,
} from "https://deno.land/x/mctest@v0.1.4/src/mcTest.ts";
import {
    ArrayOfNumber, ArrayOfString,
    factNumGen, factorialFromNumGen, factorialSeries, factorialTail, fiboArray, fibos, fiboSeriesGen, fiboTail, isPrime,
    leapYear, naturalNumbers, positiveNumbers, primeNumbers, pythagoras, pythagorasGen, reverseArray, reverseArrayGen
} from "../src/index.ts";
import {
    notLeapYear, aLeapYear, factorialValue, factorialParam, fibSeriesParam, fibSeriesResult, primeNums, primeNumParam,
    pythagorasParam, pythagorasResult, pythagorasParam100, pythagorasResult100,
} from "./data/maths.ts";

(async () => {
    const startTime = Date.now();
    await mcTest({
        name    : "The specified year is a leap year",
        testFunc: () => {
            const result = leapYear(aLeapYear);
            console.log("leapYear-Res: ", result);
            assertEquals(result, true, `Expected outcome: ${true}`);
            assertNotEquals(result, false, `Expected outcome: ${true}`);
        },
    });

    await mcTest({
        name    : "The specified year is NOT a leap year",
        testFunc: () => {
            const result = leapYear(notLeapYear);
            console.log("leapYear-Res: ", result);
            assertEquals(result, false, `Expected outcome: ${false}`);
            assertNotEquals(result, true, `Expected outcome: ${false}`);
        },
    });

    await mcTest({
        name    : "Returns correct factorial value [factorial-generator]",
        testFunc: () => {
            let result = 1;
            for (const it of factNumGen(factorialParam)) {
                result *= it;
            }
            console.log("fact-gen-Res: ", result);
            assertEquals(result, factorialValue, `Expected outcome: ${factorialValue}`);
            assertNotEquals(result, 0, `Expected outcome: ${factorialValue}`);
        },
    });

    await mcTest({
        name    : "Returns correct factorial value [factorial-tail]",
        testFunc: () => {
            const result = factorialTail(factorialParam);
            console.log("fact-tail-Res: ", result);
            assertEquals(result, factorialValue, `Expected outcome: ${factorialValue}`);
            assertNotEquals(result, 0, `Expected outcome: ${factorialValue}`);
        },
    });

    await mcTest({
        name    : "Returns correct factorial value [factorial-from-generator]",
        testFunc: () => {
            const result = factorialFromNumGen(factorialParam);
            console.log("fact-from-gen-Res: ", result);
            assertEquals(result, factorialValue, `Expected outcome: ${factorialValue}`);
            assertNotEquals(result, 0, `Expected outcome: ${factorialValue}`);
        },
    });

    await mcTest({
        name    : "Returns correct factorial value [factorial-series]",
        testFunc: () => {
            const result = factorialSeries(factorialParam);
            console.log("fact-series-Res: ", result);
            assertEquals(result, factorialValue, `Expected outcome: ${factorialValue}`);
            assertNotEquals(result, 0, `Expected outcome: ${factorialValue}`);
        },
    });

    await mcTest({
        name    : "Returns correct fibonacci tail-value [fibo-tail]",
        testFunc: () => {
            const result = fiboTail(fibSeriesParam);
            console.log("fibo-tail-value-Res: ", result);
            assertEquals(result, fibSeriesResult[fibSeriesResult.length - 1], `Expected outcome: ${fibSeriesResult[fibSeriesResult.length - 1]}`);
            assertNotEquals(result, fibSeriesResult[0], `Expected outcome: ${fibSeriesResult[fibSeriesResult.length - 1]}`);
        },
    });

    await mcTest({
        name    : "Returns correct fibonacci series [fibos]",
        testFunc: () => {
            const result = fibos(fibSeriesParam);
            console.log("fibo-series-Res: ", result);
            assertEquals(result.length, fibSeriesResult.length, `Expected outcome: ${fibSeriesResult.length}`);
            assertEquals(result[0], fibSeriesResult[0], `Expected outcome: ${fibSeriesResult[0]}`);
            assertEquals(result[1], fibSeriesResult[1], `Expected outcome: ${fibSeriesResult[1]}`);
            assertEquals(result[2], fibSeriesResult[2], `Expected outcome: ${fibSeriesResult[2]}`);
            assertEquals(result[result.length - 1], fibSeriesResult[fibSeriesResult.length - 1], `Expected outcome: ${fibSeriesResult[fibSeriesResult.length - 1]}`);
            assertNotEquals(result[0], fibSeriesResult[4], `Expected outcome: ${fibSeriesResult[0]}`);
        },
    });

    await mcTest({
        name    : "Returns correct fibonacci series [fiboSeriesGenerator]",
        testFunc: () => {
            const result: ArrayOfNumber = [];
            for (const res of fiboSeriesGen(fibSeriesParam)) {
                result.push(res);
            }
            console.log("fibo-series-generator-Res: ", result);
            assertEquals(result.length, fibSeriesResult.length, `Expected outcome: ${fibSeriesResult.length}`);
            assertEquals(result[0], fibSeriesResult[0], `Expected outcome: ${fibSeriesResult[0]}`);
            assertEquals(result[1], fibSeriesResult[1], `Expected outcome: ${fibSeriesResult[1]}`);
            assertEquals(result[2], fibSeriesResult[2], `Expected outcome: ${fibSeriesResult[2]}`);
            assertEquals(result[result.length - 1], fibSeriesResult[fibSeriesResult.length - 1], `Expected outcome: ${fibSeriesResult[fibSeriesResult.length - 1]}`);
            assertNotEquals(result[0], fibSeriesResult[4], `Expected outcome: ${fibSeriesResult[0]}`);

        },
    });

    await mcTest({
        name    : "Returns correct fibonacci array-values [fibos-array]",
        testFunc: () => {
            const fiboArrayResult = fiboArray(fibSeriesParam);
            console.log("fibo-array-of-array-Res: ", fiboArrayResult);
            // compute the fibo series of the first element of each fiboArray of fiboArrayResult
            const result: ArrayOfNumber = [];
            for (const it of fiboArrayResult) {
                result.push(it[0]);
            }
            console.log("fibo-array-Res: ", result);
            assertEquals(result.length, fibSeriesResult.length, `Expected outcome: ${fibSeriesResult.length}`);
            assertEquals(result[0], fibSeriesResult[0], `Expected outcome: ${fibSeriesResult[0]}`);
            assertEquals(result[1], fibSeriesResult[1], `Expected outcome: ${fibSeriesResult[1]}`);
            assertEquals(result[2], fibSeriesResult[2], `Expected outcome: ${fibSeriesResult[2]}`);
            assertEquals(result[result.length - 1], fibSeriesResult[fibSeriesResult.length - 1], `Expected outcome: ${fibSeriesResult[fibSeriesResult.length - 1]}`);
            assertNotEquals(result[0], fibSeriesResult[4], `Expected outcome: ${fibSeriesResult[0]}`);
        },
    });

    await mcTest({
        name    : "Returns 10 natural numbers",
        testFunc: () => {
            const result = [];
            for (const it of naturalNumbers(10)) {
                result.push(it);
            }
            console.log("natural-nums-Res: ", result);
            assertEquals(result.length, 10, `Expected outcome: ${10}`);
            assertEquals(result[0], 0, `Expected outcome: ${0}`);
            assertEquals(result[result.length - 1], 9, `Expected outcome: ${9}`);
            assertNotEquals(result.length, 0, `Expected outcome: ${10}`);
        },
    });

    await mcTest({
        name    : "Returns 10 positive numbers",
        testFunc: () => {
            const result = [];
            for (const it of positiveNumbers(10)) {
                result.push(it);
            }
            console.log("positive-nums-Res: ", result);
            assertEquals(result.length, 10, `Expected outcome: ${10}`);
            assertEquals(result[0], 1, `Expected outcome: ${1}`);
            assertEquals(result[result.length - 1], 10, `Expected outcome: ${10}`);
            assertNotEquals(result.length, 0, `Expected outcome: ${10}`);
        },
    });

    await mcTest({
        name    : "Returns isPrime",
        testFunc: () => {
            const result = isPrime(2);
            console.log("is-prime-Res: ", result);
            assertEquals(result, true, `Expected outcome: ${true}`);
            assertNotEquals(result, false, `Expected outcome: ${true}`);
        },
    });

    await mcTest({
        name    : "Returns NOT isPrime",
        testFunc: () => {
            const result = isPrime(9);
            console.log("not-is-prime-Res: ", result);
            assertEquals(result, false, `Expected outcome: ${false}`);
            assertNotEquals(result, true, `Expected outcome: ${false}`);
        },
    });

    await mcTest({
        name    : "Returns correct prime numbers, up to primeNumParam",
        testFunc: () => {
            const result = primeNumbers(primeNumParam);
            console.log("prime-numbers-Res: ", result);
            assertEquals(result.length, primeNums.length, `Expected outcome: ${primeNums.length}`);
            assertEquals(result[0], primeNums[0], `Expected outcome: ${primeNums[0]}`);
            assertEquals(result[result.length - 1], primeNums[primeNums.length - 1], `Expected outcome: ${primeNums[primeNums.length - 1]}`);
            assertNotEquals(result[0], 1, `Expected outcome: ${2}`);
        },
    });

    await mcTest({
        name    : "Reverse array of numbers",
        testFunc: () => {
            const numArray = [1, 2, 3, 4, 5];
            const result = reverseArray(numArray);
            console.log("reverse-num-array-Res: ", result);
            assertEquals(result[0], numArray[numArray.length - 1], `Expected outcome: ${numArray[numArray.length - 1]}`);
            assertEquals(result[result.length - 1], numArray[0], `Expected outcome: ${numArray[0]}`);
            assertNotEquals(result[0], numArray[0], `Expected outcome: ${numArray[numArray.length - 1]}`);
        },
    });

    await mcTest({
        name    : "Reverse array of numbers",
        testFunc: () => {
            const numArray = [1, 2, 3, 4, 5];
            const result = reverseArray(numArray);
            console.log("reverse-num-array-Res: ", result);
            assertEquals(result[0], numArray[numArray.length - 1], `Expected outcome: ${numArray[numArray.length - 1]}`);
            assertEquals(result[result.length - 1], numArray[0], `Expected outcome: ${numArray[0]}`);
            assertNotEquals(result[0], numArray[0], `Expected outcome: ${numArray[numArray.length - 1]}`);
        },
    });

    await mcTest({
        name    : "Reverse array of string",
        testFunc: () => {
            const strArray = ["a", "b", "c", "d", "e"];
            const result = reverseArray(strArray);
            console.log("reverse-str-array-Res: ", result);
            assertEquals(result[0], strArray[strArray.length - 1], `Expected outcome: ${strArray[strArray.length - 1]}`);
            assertEquals(result[result.length - 1], strArray[0], `Expected outcome: ${strArray[0]}`);
            assertNotEquals(result[0], strArray[0], `Expected outcome: ${strArray[strArray.length - 1]}`);
        },
    });

    await mcTest({
        name    : "Reverse array of numbers [generator]",
        testFunc: () => {
            const numArray = [1, 2, 3, 4, 5];
            const result: ArrayOfNumber = [];
            for (const it of reverseArrayGen(numArray)) {
                result.push(it);
            }
            console.log("reverse-num-array[generator]-Res: ", result);
            assertEquals(result[0], numArray[numArray.length - 1], `Expected outcome: ${numArray[numArray.length - 1]}`);
            assertEquals(result[result.length - 1], numArray[0], `Expected outcome: ${numArray[0]}`);
            assertNotEquals(result[0], numArray[0], `Expected outcome: ${numArray[numArray.length - 1]}`);
        },
    });

    await mcTest({
        name    : "Reverse array of string [generator]",
        testFunc: () => {
            const strArray = ["a", "b", "c", "d", "e"];
            const result: ArrayOfString = [];
            for (const it of reverseArrayGen(strArray)) {
                result.push(it);
            }
            console.log("reverse-num-array[generator]-Res: ", result);
            assertEquals(result[0], strArray[strArray.length - 1], `Expected outcome: ${strArray[strArray.length - 1]}`);
            assertEquals(result[result.length - 1], strArray[0], `Expected outcome: ${strArray[0]}`);
            assertNotEquals(result[0], strArray[0], `Expected outcome: ${strArray[strArray.length - 1]}`);
        },
    });

    await mcTest({
        name    : "Return pythagoras array value pairs, up to the specified count/number [10]",
        testFunc: () => {
            const result = pythagoras(pythagorasParam);
            console.log("pythagoras10-Res: ", result);
            assertEquals(result.length, pythagorasResult.length, `Expected outcome: ${pythagorasResult.length}`);
            assertEquals(result[0][0], pythagorasResult[0][0], `Expected outcome: ${pythagorasResult[0][0]}`);
            assertEquals(result[0][1], pythagorasResult[0][1], `Expected outcome: ${pythagorasResult[0][1]}`);
            assertEquals(result[0][2], pythagorasResult[0][2], `Expected outcome: ${pythagorasResult[0][2]}`);
            assertEquals(result[result.length - 1][0], pythagorasResult[pythagorasResult.length - 1][0], `Expected outcome: ${pythagorasResult[pythagorasResult.length - 1][0]}`);
            assertEquals(result[result.length - 1][1], pythagorasResult[pythagorasResult.length - 1][1], `Expected outcome: ${pythagorasResult[pythagorasResult.length - 1][1]}`);
            assertEquals(result[result.length - 1][2], pythagorasResult[pythagorasResult.length - 1][2], `Expected outcome: ${pythagorasResult[pythagorasResult.length - 1][2]}`);

            assertNotEquals(result[0][2], pythagorasResult[pythagorasResult.length - 1][2], `Expected outcome: ${pythagorasResult[pythagorasResult.length - 1][2]}`);
        },
    });

    await mcTest({
        name    : "Return pythagoras array value pairs, up to the specified count/number [10, generator]",
        testFunc: () => {
            const result: Array<ArrayOfNumber> = [];
            for (const it of pythagoras(pythagorasParam)) {
                result.push(it);
            }
            console.log("pythagoras10[gen]-Res: ", result);
            assertEquals(result.length, pythagorasResult.length, `Expected outcome: ${pythagorasResult.length}`);
            assertEquals(result[0][0], pythagorasResult[0][0], `Expected outcome: ${pythagorasResult[0][0]}`);
            assertEquals(result[0][1], pythagorasResult[0][1], `Expected outcome: ${pythagorasResult[0][1]}`);
            assertEquals(result[0][2], pythagorasResult[0][2], `Expected outcome: ${pythagorasResult[0][2]}`);

            assertEquals(result[1][0], pythagorasResult[1][0], `Expected outcome: ${pythagorasResult[1][0]}`);
            assertEquals(result[1][1], pythagorasResult[1][1], `Expected outcome: ${pythagorasResult[1][1]}`);
            assertEquals(result[1][2], pythagorasResult[1][2], `Expected outcome: ${pythagorasResult[1][2]}`);

            assertEquals(result[result.length - 1][0], pythagorasResult[pythagorasResult.length - 1][0], `Expected outcome: ${pythagorasResult[pythagorasResult.length - 1][0]}`);
            assertEquals(result[result.length - 1][1], pythagorasResult[pythagorasResult.length - 1][1], `Expected outcome: ${pythagorasResult[pythagorasResult.length - 1][1]}`);
            assertEquals(result[result.length - 1][2], pythagorasResult[pythagorasResult.length - 1][2], `Expected outcome: ${pythagorasResult[pythagorasResult.length - 1][2]}`);

            assertNotEquals(result[0][2], pythagorasResult[pythagorasResult.length - 1][2], `Expected outcome: ${pythagorasResult[pythagorasResult.length - 1][2]}`);

        },
    });

    await mcTest({
        name    : "Return pythagoras array value pairs, up to the specified count/number[100]",
        testFunc: () => {
            const result = pythagoras(pythagorasParam100);
            console.log("pythagoras100-Res: ", result);
            assertEquals(result.length, pythagorasResult100.length, `Expected outcome: ${pythagorasResult100.length}`);
            assertEquals(result[0][0], pythagorasResult100[0][0], `Expected outcome: ${pythagorasResult100[0][0]}`);
            assertEquals(result[0][1], pythagorasResult100[0][1], `Expected outcome: ${pythagorasResult100[0][1]}`);
            assertEquals(result[0][2], pythagorasResult100[0][2], `Expected outcome: ${pythagorasResult100[0][2]}`);
            assertEquals(result[result.length - 1][0], pythagorasResult100[pythagorasResult100.length - 1][0], `Expected outcome: ${pythagorasResult100[pythagorasResult100.length - 1][0]}`);
            assertEquals(result[result.length - 1][1], pythagorasResult100[pythagorasResult100.length - 1][1], `Expected outcome: ${pythagorasResult100[pythagorasResult100.length - 1][1]}`);
            assertEquals(result[result.length - 1][2], pythagorasResult100[pythagorasResult100.length - 1][2], `Expected outcome: ${pythagorasResult100[pythagorasResult100.length - 1][2]}`);

            assertNotEquals(result[0][2], pythagorasResult100[pythagorasResult100.length - 1][2], `Expected outcome: ${pythagorasResult100[pythagorasResult100.length - 1][2]}`);
        },
    });

    await mcTest({
        name    : "Return pythagoras array value pairs, up to the specified count/number [generator]",
        testFunc: () => {
            const result: Array<ArrayOfNumber> = [];
            for (const it of pythagorasGen(pythagorasParam100)) {
                result.push(it);
            }
            console.log("pythagoras100[gen]-Res: ", result);
            assertEquals(result.length, pythagorasResult100.length, `Expected outcome: ${pythagorasResult100.length}`);
            assertEquals(result[0][0], pythagorasResult100[0][0], `Expected outcome: ${pythagorasResult100[0][0]}`);
            assertEquals(result[0][1], pythagorasResult100[0][1], `Expected outcome: ${pythagorasResult100[0][1]}`);
            assertEquals(result[0][2], pythagorasResult100[0][2], `Expected outcome: ${pythagorasResult100[0][2]}`);

            assertEquals(result[10][0], pythagorasResult100[10][0], `Expected outcome: ${pythagorasResult100[10][0]}`);
            assertEquals(result[10][1], pythagorasResult100[10][1], `Expected outcome: ${pythagorasResult100[10][1]}`);
            assertEquals(result[10][2], pythagorasResult100[10][2], `Expected outcome: ${pythagorasResult100[10][2]}`);


            assertEquals(result[result.length - 1][0], pythagorasResult100[pythagorasResult100.length - 1][0], `Expected outcome: ${pythagorasResult100[pythagorasResult100.length - 1][0]}`);
            assertEquals(result[result.length - 1][1], pythagorasResult100[pythagorasResult100.length - 1][1], `Expected outcome: ${pythagorasResult100[pythagorasResult100.length - 1][1]}`);
            assertEquals(result[result.length - 1][2], pythagorasResult100[pythagorasResult100.length - 1][2], `Expected outcome: ${pythagorasResult100[pythagorasResult100.length - 1][2]}`);

            assertNotEquals(result[0][2], pythagorasResult100[pythagorasResult100.length - 1][2], `Expected outcome: ${pythagorasResult100[pythagorasResult100.length - 1][2]}`);

        },
    });


    postTestResult();

    console.log(`\nTest Completed in ${Date.now() - startTime}ms\n`);
})();
