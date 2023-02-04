import {
    assertEquals, assertNotEquals, assertNotStrictEquals, assertStrictEquals,
    mcTest, postTestResult,
} from "../test_deps.ts";
import { getLocale, Locale, LocaleFunc, } from "../src/index.ts";
import {
    localeConstantFiles, localeConstantObject, localeConstantOptions, localeLabelOptions, localeLabelFiles,
    localeLabelObject
} from "./data/testData.ts";

(async () => {
    const startTime = Date.now();
    await mcTest({
        name    : "Successfully returns locale labels object / record",
        testFunc: () => {
            const localeRes = getLocale(localeLabelFiles, localeLabelOptions);
            console.log("locale-labels-Res: ", localeRes);
            assertEquals(localeRes["code"] as string, localeLabelObject.code as string, `Expected outcome: ${localeLabelObject.code as string}`);
            assertEquals(localeRes["name"] as string, localeLabelObject.name as string, `Expected outcome: ${localeLabelObject.name as string}`);
            assertNotEquals(localeRes["code"] as string, "name", `Expected outcome: ${localeLabelObject.code as string}`);
            assertNotEquals(localeRes["name"] as string, "code", `Expected outcome: ${localeLabelObject.name as string}`);
            assertStrictEquals(localeRes as Locale, (localeLabelObject), `Expected outcome: ${(localeLabelObject)}`);
            assertNotStrictEquals(localeRes as Locale, localeLabelObject.name as string, `Expected outcome: ${(localeLabelObject)}`);
        },
    });
    await mcTest({
        name    : "Successfully return constants object / record",
        testFunc: () => {
            const localeRes = getLocale(localeConstantFiles, localeConstantOptions);
            console.log("locale-constants-Res: ", localeRes);
            assertEquals((localeRes["getShortDesc"] as LocaleFunc)(), localeConstantObject["SHORT_DESC"] as string, `Expected outcome: ${localeConstantObject["SHORT_DESC"] as string}`);
            assertEquals((localeRes.getDefaultLanguage as LocaleFunc)(), localeConstantObject["DEFAULT_LANG"] as string, `Expected outcome: ${localeConstantObject["DEFAULT_LANG"] as string}`);
            assertNotEquals((localeRes.getShortDesc as LocaleFunc)(), 100, `Expected outcome: ${localeConstantObject["SHORT_DESC"] as string}`);
            assertNotEquals((localeRes.getDefaultLanguage as LocaleFunc)(), "fr-CA", `Expected outcome: ${localeConstantObject["DEFAULT_LANG"] as string}`);
        },
    });

    postTestResult();

    console.log(`\nTest Completed in ${Date.now() - startTime}ms\n`);
})();