import { test } from "node:test";
import assert from "node:assert/strict";
import { convertKrutiToUnicode, convertKrutiToUnicodeWithReport } from "../src/converters/kruti-to-unicode.js";
import { convertUnicodeToKruti } from "../src/converters/unicode-to-kruti.js";
import { convertDevLysToUnicode, convertUnicodeToDevLys } from "../src/converters/devlys-to-unicode.js";

test("Kruti Dev to Unicode: Basic words", () => {
  assert.equal(convertKrutiToUnicode("Hkkjr"), "भारत");
  assert.equal(convertKrutiToUnicode("fdlku"), "किसान");
  assert.equal(convertKrutiToUnicode("eghuk"), "महीना");
  assert.equal(convertKrutiToUnicode("iqLrd"), "पुस्तक");
});

test("Kruti Dev to Unicode: Matras and Vowels", () => {
  assert.equal(convertKrutiToUnicode("d"), "क");
  assert.equal(convertKrutiToUnicode("dk"), "का");
  assert.equal(convertKrutiToUnicode("fd"), "कि");
  assert.equal(convertKrutiToUnicode("dh"), "की");
  assert.equal(convertKrutiToUnicode("dq"), "कु");
  assert.equal(convertKrutiToUnicode("dw"), "कू");
  assert.equal(convertKrutiToUnicode("ds"), "के");
  assert.equal(convertKrutiToUnicode("dS"), "कै");
  assert.equal(convertKrutiToUnicode("dks"), "को");
  assert.equal(convertKrutiToUnicode("dkS"), "कौ");
  assert.equal(convertKrutiToUnicode("da"), "कं");
});

test("Kruti Dev to Unicode: Reph and Rakar", () => {
  assert.equal(convertKrutiToUnicode("deZ"), "कर्म");
  assert.equal(convertKrutiToUnicode("/keZ"), "धर्म");
  assert.equal(convertKrutiToUnicode("lw;Z"), "सूर्य");
  assert.equal(convertKrutiToUnicode("izdk'k"), "प्रकाश");
  assert.equal(convertKrutiToUnicode("xzke"), "ग्राम");
});

test("Kruti Dev to Unicode: Alt-code ligatures", () => {
  assert.equal(convertKrutiToUnicode("Øe"), "क्रम");
  assert.equal(convertKrutiToUnicode("cq¡"), "बुद्ध");
  assert.equal(convertKrutiToUnicode("fo|k"), "विद्या");
});

test("Unicode to Kruti Dev conversion", () => {
  assert.equal(convertUnicodeToKruti("भारत"), "Hkkjr");
  assert.equal(convertUnicodeToKruti("कर्म"), "deZ");
  assert.equal(convertUnicodeToKruti("प्रकाश"), "izdk'k");
  assert.equal(convertUnicodeToKruti("विद्या"), "fo|k");
});

test("Kruti Dev to Unicode: Complex real-world words", () => {
  assert.equal(convertKrutiToUnicode("'kfDr"), "शक्ति");
  assert.equal(convertKrutiToUnicode("HkfDr"), "भक्ति");
  assert.equal(convertKrutiToUnicode("eqfDr"), "मुक्ति");
  assert.equal(convertKrutiToUnicode("lR;"), "सत्य");
  assert.equal(convertKrutiToUnicode("U;k;"), "न्याय");
  assert.equal(convertKrutiToUnicode("vf/kdkj"), "अधिकार");
  assert.equal(convertKrutiToUnicode("lafo/kku"), "संविधान");
  assert.equal(convertKrutiToUnicode("lEeku"), "सम्मान");
  assert.equal(convertKrutiToUnicode("fLFkfr"), "स्थिति");
});

test("Conversion report", () => {
  const report = convertKrutiToUnicodeWithReport("Hkkjr");
  assert.equal(report.originalText, "Hkkjr");
  assert.equal(report.convertedText, "भारत");
  assert.equal(typeof report.durationMs, "number");
});
