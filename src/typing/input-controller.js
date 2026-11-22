/**
 * Input Controller
 * Updates DOM input/textarea values safely and dispatches synthetic input events
 * to ensure complete compatibility with React, Vue, Svelte, and Angular.
 */

import { insertTextAtCaret, setCaretPosition } from "./cursor-manager.js";

/**
 * Updates an input or textarea element's value in a React-friendly manner
 * @param {HTMLInputElement | HTMLTextAreaElement} target
 * @param {string} character
 */
export function dispatchCharacterInput(target, character) {
  if (!target || typeof character !== "string") return;

  const { newValue, newCaretPosition } = insertTextAtCaret(target, character);

  // Invoke native prototype setter to bypass React's valueTracker interception
  const prototype = target instanceof (typeof HTMLTextAreaElement !== "undefined" ? HTMLTextAreaElement : Object)
    ? (typeof HTMLTextAreaElement !== "undefined" ? HTMLTextAreaElement.prototype : Object.prototype)
    : (typeof HTMLInputElement !== "undefined" ? HTMLInputElement.prototype : Object.prototype);

  const descriptor = Object.getOwnPropertyDescriptor(prototype, "value");

  if (descriptor && descriptor.set) {
    descriptor.set.call(target, newValue);
  } else {
    target.value = newValue;
  }

  // Restore caret position
  setCaretPosition(target, newCaretPosition);

  // Dispatch standard bubbling 'input' event
  if (typeof Event !== "undefined") {
    const inputEvent = new Event("input", { bubbles: true, cancelable: true });
    target.dispatchEvent(inputEvent);
  }
}
