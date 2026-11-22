import { test } from "node:test";
import assert from "node:assert/strict";
import typeHindi, {
  createHindi,
  attachHindiInput,
  convertKrutiToUnicode,
  convertUnicodeToKruti,
  convertDevLysToUnicode,
  getAltCode,
  getKrutiDevCharacter,
  getKeyboardLayout,
  getSupportedFonts
} from "../index.js";

test("Default export typeHindi works as a function", () => {
  assert.equal(typeof typeHindi, "function");

  let val = "";
  let sel = 0;
  const input = {
    get value() { return val; },
    set value(v) { val = v; },
    get selectionStart() { return sel; },
    set selectionStart(s) { sel = s; },
    get selectionEnd() { return sel; },
    set selectionEnd(e) { sel = e; },
    setSelectionRange(s) { sel = s; },
    dispatchEvent: () => true
  };

  typeHindi({
    code: "KeyD",
    key: "d",
    target: input,
    preventDefault: () => {}
  });

  assert.equal(input.value, "क");
});

test("Named exports are present and correctly typed", () => {
  assert.equal(typeof createHindi, "function");
  assert.equal(typeof attachHindiInput, "function");
  assert.equal(typeof convertKrutiToUnicode, "function");
  assert.equal(typeof convertUnicodeToKruti, "function");
  assert.equal(typeof convertDevLysToUnicode, "function");
  assert.equal(typeof getAltCode, "function");
  assert.equal(typeof getKrutiDevCharacter, "function");
  assert.equal(typeof getKeyboardLayout, "function");
  assert.equal(typeof getSupportedFonts, "function");
});
