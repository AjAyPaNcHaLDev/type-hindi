import { test } from "node:test";
import assert from "node:assert/strict";
import { getAltCode, getKrutiDevCharacter, getAnsiCharacter, ALT_CODE_DATABASE } from "../src/encodings/alt-code.js";

test("Alt-code lookup by character", () => {
  assert.equal(getAltCode("क्र"), "0216");
  assert.equal(getAltCode("द्ध"), "0161");
  assert.equal(getAltCode("फ्र"), "0217");
  assert.equal(getAltCode("॰"), "0160");
  assert.equal(getAltCode("क्त"), "0227");
  assert.equal(getAltCode("द्व"), "0224");
  assert.equal(getAltCode("द्य"), "0226");
  assert.equal(getAltCode("ट्ट"), "0197");
  assert.equal(getAltCode("हृ"), "0206");
});

test("Character lookup by Alt-code", () => {
  assert.equal(getKrutiDevCharacter("0216"), "क्र");
  assert.equal(getKrutiDevCharacter(216), "क्र");
  assert.equal(getKrutiDevCharacter("0161"), "द्ध");
  assert.equal(getKrutiDevCharacter(161), "द्ध");
  assert.equal(getKrutiDevCharacter("0160"), "॰");
  assert.equal(getKrutiDevCharacter("0227"), "क्त");
  assert.equal(getKrutiDevCharacter("0197"), "ट्ट");
});

test("ANSI character lookup by Alt-code", () => {
  assert.equal(getAnsiCharacter("0216"), "Ø");
  assert.equal(getAnsiCharacter("0217"), "Ù");
  assert.equal(getAnsiCharacter("0161"), "¡");
  assert.equal(getAnsiCharacter("0224"), "à");
  assert.equal(getAnsiCharacter("0226"), "â");
});

test("ALT_CODE_DATABASE completeness", () => {
  assert.ok(ALT_CODE_DATABASE.length >= 30);
  for (const entry of ALT_CODE_DATABASE) {
    assert.ok(entry.altCode);
    assert.ok(entry.unicode);
    assert.ok(entry.ansiChar);
  }
});
