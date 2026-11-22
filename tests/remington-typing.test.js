import { test } from "node:test";
import assert from "node:assert/strict";
import { createHindi, attachHindiInput, getKeyboardLayout, getSupportedFonts } from "../src/core/engine.js";

// Mock DOM Input Element
function createMockInput(initialValue = "") {
  let val = initialValue;
  let selStart = initialValue.length;
  let selEnd = initialValue.length;
  const eventListeners = {};

  return {
    get value() { return val; },
    set value(v) { val = v; },
    get selectionStart() { return selStart; },
    set selectionStart(s) { selStart = s; },
    get selectionEnd() { return selEnd; },
    set selectionEnd(e) { selEnd = e; },
    setSelectionRange(s, e) { selStart = s; selEnd = e; },
    addEventListener(name, fn) {
      if (!eventListeners[name]) eventListeners[name] = [];
      eventListeners[name].push(fn);
    },
    removeEventListener(name, fn) {
      if (!eventListeners[name]) return;
      eventListeners[name] = eventListeners[name].filter(f => f !== fn);
    },
    dispatchEvent(ev) {
      if (eventListeners[ev.type]) {
        for (const fn of eventListeners[ev.type]) fn(ev);
      }
      return true;
    }
  };
}

test("Remington typing: Unshifted characters", () => {
  const input = createMockInput("");
  const hindi = createHindi({ layout: "remington" });

  // Key 'd' is 'क' in Remington
  hindi.handleKeyDown({
    code: "KeyD",
    key: "d",
    target: input,
    preventDefault: () => {}
  });

  assert.equal(input.value, "क");
  assert.equal(input.selectionStart, 1);
});

test("Remington typing: Shifted characters", () => {
  const input = createMockInput("");
  const hindi = createHindi({ layout: "remington" });

  // Key 'D' with shift is 'क्' (half-ka) in Remington
  hindi.handleKeyDown({
    code: "KeyD",
    key: "D",
    shiftKey: true,
    target: input,
    preventDefault: () => {}
  });

  assert.equal(input.value, "क्");
  assert.equal(input.selectionStart, 2); // 'क' + '्' is 2 codepoints
});

test("Remington typing: Insertion at middle of string (caret preservation)", () => {
  const input = createMockInput("भत");
  input.selectionStart = 1;
  input.selectionEnd = 1;

  const hindi = createHindi({ layout: "remington" });

  // Key 'k' is 'ा' (aa-matra) in Remington
  hindi.handleKeyDown({
    code: "KeyK",
    key: "k",
    target: input,
    preventDefault: () => {}
  });

  assert.equal(input.value, "भात");
  assert.equal(input.selectionStart, 2);
});

test("Remington typing: Text selection replacement", () => {
  const input = createMockInput("नमस्ते दुनिया");
  input.selectionStart = 7;
  input.selectionEnd = 13; // Highlight "दुनिया"

  const hindi = createHindi({ layout: "remington" });

  // Key 'd' is 'क' in Remington
  hindi.handleKeyDown({
    code: "KeyD",
    key: "d",
    target: input,
    preventDefault: () => {}
  });

  assert.equal(input.value, "नमस्ते क");
});

test("Remington typing: Modifier keys bypass", () => {
  const input = createMockInput("");
  const hindi = createHindi({ layout: "remington" });

  // Ctrl+C shortcut
  const handled = hindi.handleKeyDown({
    code: "KeyC",
    key: "c",
    ctrlKey: true,
    target: input,
    preventDefault: () => {}
  });

  assert.equal(handled, false);
  assert.equal(input.value, "");
});

test("Engine utilities: getSupportedFonts & getKeyboardLayout", () => {
  const fonts = getSupportedFonts();
  assert.ok(fonts.includes("krutidev-010"));
  assert.ok(fonts.includes("devlys-010"));

  const layout = getKeyboardLayout("remington");
  assert.equal(layout.name, "remington");
  assert.ok(layout.mappings.KeyD);
});
