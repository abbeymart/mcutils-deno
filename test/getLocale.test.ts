import {
    assertEquals, assertNotEquals, assertNotStrictEquals, assertStrictEquals,
    mcTest, postTestResult,
} from "../test_deps.ts";
import { getLocale, Locale, LocaleFunc, LocaleValueType, ObjectType } from "../src/index.ts";
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
            assertEquals(localeRes["code"] as LocaleValueType, localeLabelObject.code as LocaleValueType, `Expected outcome: ${localeLabelObject.code}`);
            assertEquals(localeRes["name"] as LocaleValueType, localeLabelObject.name as LocaleValueType, `Expected outcome: ${localeLabelObject.name}`);
            assertNotEquals(localeRes["code"] as LocaleValueType, "name", `Expected outcome: ${localeLabelObject.code}`);
            assertNotEquals(localeRes["name"] as LocaleValueType, "code", `Expected outcome: ${localeLabelObject.name}`);
            assertStrictEquals(localeRes as LocaleValueType, (localeLabelObject), `Expected outcome: ${(localeLabelObject)}`);
            assertNotStrictEquals(localeRes as LocaleValueType, localeLabelObject.name as LocaleValueType, `Expected outcome: ${(localeLabelObject)}`);
        },
    });
    await mcTest({
        name    : "Successfully return constants object / record",
        testFunc: () => {
            const localeRes = getLocale(localeConstantFiles, localeConstantOptions) as Locale<ObjectType>;
            console.log("locale-constants-Res: ", localeRes);
            assertEquals((localeRes["getShortDesc"] as LocaleFunc)(), localeConstantObject["SHORT_DESC"] as LocaleValueType, `Expected outcome: ${localeConstantObject["SHORT_DESC"]}`);
            assertEquals((localeRes.getDefaultLanguage as LocaleFunc)(), localeConstantObject["DEFAULT_LANG"] as LocaleValueType, `Expected outcome: ${localeConstantObject["DEFAULT_LANG"]}`);
            assertNotEquals((localeRes.getShortDesc as LocaleFunc)(), 100, `Expected outcome: ${localeConstantObject["SHORT_DESC"]}`);
            assertNotEquals((localeRes.getDefaultLanguage as LocaleFunc)(), "fr-CA", `Expected outcome: ${localeConstantObject["DEFAULT_LANG"]}`);
        },
    });

    postTestResult();

    console.log(`\nTest Completed in ${Date.now() - startTime}ms\n`);
})();