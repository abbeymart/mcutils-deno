import {
    assertEquals, assertNotEquals, mcTest, postTestResult,
} from "../test_deps.ts";
import {
    isArrayType, isEmail, isEmpty, isEven, isNumberDigit, isNumberFloat, isObjectType, isOdd, isPassword, isPhone,
    isPostalCode,
    isProvided,
    isStringAlpha,
    isStringChar,
} from "../src/index.ts";

(async () => {
    const startTime = Date.now();

    await mcTest({
        name    : "Validate provided (not null/empty) value",
        testFunc: () => {
            const result = isProvided("abc");
            console.log("provided[str]-res: ", result);
            assertEquals(result, true, `Expected outcome: ${true}`);
            assertNotEquals(result, false, `Expected outcome: ${true}`);
        },
    });

    await mcTest({
        name    : "Validate provided (not null/empty) value",
        testFunc: () => {
            const result = isProvided({name: "Abi", location: "Toronto"});
            console.log("provided[obj]-res: ", result);
            assertEquals(result, true, `Expected outcome: ${true}`);
            assertNotEquals(result, false, `Expected outcome: ${true}`);
        },
    });

    await mcTest({
        name    : "Validate not-provided (null/empty) value",
        testFunc: () => {
            const result = isProvided({});
            console.log("not-provided[obj]-res: ", result);
            assertEquals(result, false, `Expected outcome: ${false}`);
            assertNotEquals(result, true, `Expected outcome: ${false}`);
        },
    });

    await mcTest({
        name    : "Validate not-provided (null/empty) value",
        testFunc: () => {
            const result = isProvided("");
            console.log("not-provided-res: ", result);
            assertEquals(result, false, `Expected outcome: ${false}`);
            assertNotEquals(result, true, `Expected outcome: ${false}`);
        },
    });

    await mcTest({
        name    : "Validate 2 as even number",
        testFunc: () => {
            const result = isEven(2);
            console.log("even-res: ", result);
            assertEquals(result, true, `Expected outcome: ${true}`);
            assertNotEquals(result, false, `Expected outcome: ${true}`);
        },
    });

    await mcTest({
        name    : "Validate 3 as odd number",
        testFunc: () => {
            const result = isOdd(3);
            console.log("odd-res: ", result);
            assertEquals(result, true, `Expected outcome: ${true}`);
            assertNotEquals(result, false, `Expected outcome: ${true}`);
        },
    });

    await mcTest({
        name    : "Validate 10 is a digit [integer]",
        testFunc: () => {
            const result = isNumberDigit(10);
            console.log("digit-res: ", result);
            assertEquals(result, true, `Expected outcome: ${true}`);
            assertNotEquals(result, false, `Expected outcome: ${true}`);
        },
    });

    await mcTest({
        name    : "Validate 10.10 is not a digit [integer]",
        testFunc: () => {
            const result = isNumberDigit(10.10);
            console.log("not-digit-res: ", result);
            assertEquals(result, false, `Expected outcome: ${false}`);
            assertNotEquals(result, true, `Expected outcome: ${false}`);
        },
    });

    await mcTest({
        name    : "Validate 10.10 is a float",
        testFunc: () => {
            const result = isNumberFloat(10.10);
            console.log("float-res: ", result);
            assertEquals(result, true, `Expected outcome: ${true}`);
            assertNotEquals(result, false, `Expected outcome: ${true}`);
        },
    });

    await mcTest({
        name    : "Validate 10,10 is a float",
        testFunc: () => {
            const result = isNumberFloat("10,10");
            console.log("float-res: ", result);
            assertEquals(result, true, `Expected outcome: ${true}`);
            assertNotEquals(result, false, `Expected outcome: ${true}`);
        },
    });

    await mcTest({
        name    : "Validate 10 is not a float",
        testFunc: () => {
            const result = isNumberFloat(10);
            console.log("not-float-res: ", result);
            assertEquals(result, false, `Expected outcome: ${false}`);
            assertNotEquals(result, true, `Expected outcome: ${false}`);
        },
    });

    await mcTest({
        name    : "Validate value is an ObjectType",
        testFunc: () => {
            const result = isObjectType({name: "Abi", location: "Toronto"});
            console.log("is-ObjectType-res: ", result);
            assertEquals(result, true, `Expected outcome: ${true}`);
            assertNotEquals(result, false, `Expected outcome: ${true}`);
        },
    });

    await mcTest({
        name    : "Validate value is an Array",
        testFunc: () => {
            const result = isArrayType(["Abi", "Toronto"]);
            console.log("is-ArrayType-res: ", result);
            assertEquals(result, true, `Expected outcome: ${true}`);
            assertNotEquals(result, false, `Expected outcome: ${true}`);
        },
    });


    await mcTest({
        name    : "Validate is string of characters",
        testFunc: () => {
            const result = isStringChar("Abbey Success");
            console.log("is-stringChar-res: ", result);
            assertEquals(result, true, `Expected outcome: ${true}`);
            assertNotEquals(result, false, `Expected outcome: ${true}`);
        },
    });

    await mcTest({
        name    : "Validate is string of alphanumerics",
        testFunc: () => {
            const result = isStringAlpha("Abbey Success 1000");
            console.log("is-stringAlpha-res: ", result);
            assertEquals(result, true, `Expected outcome: ${true}`);
            assertNotEquals(result, false, `Expected outcome: ${true}`);
        },
    });

    await mcTest({
        name    : "Validate value is empty",
        testFunc: () => {
            const result = isEmpty({});
            console.log("is-ObjectType-res: ", result);
            assertEquals(result, true, `Expected outcome: ${true}`);
            assertNotEquals(result, false, `Expected outcome: ${true}`);
        },
    });

    await mcTest({
        name    : "Validate value is NOT empty",
        testFunc: () => {
            const result = isEmpty({name: "Abi", location: "Toronto"});
            console.log("is-ObjectType-res: ", result);
            assertEquals(result, false, `Expected outcome: ${false}`);
            assertNotEquals(result, true, `Expected outcome: ${false}`);
        },
    });

    await mcTest({
        name    : "Valid email address",
        testFunc: () => {
            const result = isEmail("great.success@allways.com");
            console.log("valid-email-res: ", result);
            assertEquals(result, true, `Expected outcome: ${true}`);
            assertNotEquals(result, false, `Expected outcome: ${true}`);
        },
    });

    await mcTest({
        name    : "Non-valid email address",
        testFunc: () => {
            const result = isEmail("great.success@tomtom");
            console.log("valid-email-res: ", result);
            assertEquals(result, false, `Expected outcome: ${false}`);
            assertNotEquals(result, true, `Expected outcome: ${false}`);
        },
    });

    await mcTest({
        name    : "Valid password",
        testFunc: () => {
            const result = isPassword("@#Waygood10");
            console.log("valid-password-res: ", result);
            assertEquals(result, true, `Expected outcome: ${true}`);
            assertNotEquals(result, false, `Expected outcome: ${true}`);
        },
    });

    await mcTest({
        name    : "Non valid password",
        testFunc: () => {
            const result = isPassword("waygood10");
            console.log("non-valid-password-res: ", result);
            assertEquals(result, false, `Expected outcome: ${false}`);
            assertNotEquals(result, true, `Expected outcome: ${false}`);
        },
    });

    await mcTest({
        name    : "Valid phone number",
        testFunc: () => {
            const result = isPhone("1-800-234-9989");
            console.log("valid-phone-res: ", result);
            assertEquals(result, true, `Expected outcome: ${true}`);
            assertNotEquals(result, false, `Expected outcome: ${true}`);
        },
    });

    await mcTest({
        name    : "Valid phone number - 2",
        testFunc: () => {
            const result = isPhone("18002349989");
            console.log("valid-phone-res: ", result);
            assertEquals(result, true, `Expected outcome: ${true}`);
            assertNotEquals(result, false, `Expected outcome: ${true}`);
        },
    });

    await mcTest({
        name    : "In-valid phone number",
        testFunc: () => {
            const result = isPhone("9989");
            console.log("in-valid-phone-res: ", result);
            assertEquals(result, false, `Expected outcome: ${false}`);
            assertNotEquals(result, true, `Expected outcome: ${false}`);
        },
    });

    await mcTest({
        name    : "Valid postal code - Canada",
        testFunc: () => {
            const result = isPostalCode("M9V 4M4");
            console.log("valid-postalCode[CA]-res: ", result);
            assertEquals(result, true, `Expected outcome: ${true}`);
            assertNotEquals(result, false, `Expected outcome: ${true}`);
        },
    });

    await mcTest({
        name    : "Valid postal code - US",
        testFunc: () => {
            const result = isPostalCode("99779");
            console.log("valid-postalCode[US]-res: ", result);
            assertEquals(result, true, `Expected outcome: ${true}`);
            assertNotEquals(result, false, `Expected outcome: ${true}`);
        },
    });

    postTestResult();

    console.log(`\nTest Completed in ${Date.now() - startTime}ms\n`);
})();
