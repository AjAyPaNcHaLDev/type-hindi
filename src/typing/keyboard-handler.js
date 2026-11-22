/**
 * Keyboard Handler
 * Intercepts keydown events, evaluates modifier states, and routes to input controller
 */

import { dispatchCharacterInput } from "./input-controller.js";
import { REMINGTON_LAYOUT } from "../layouts/remington.js";
import { LEGACY_HINDI_LAYOUT } from "../layouts/legacy-hindi.js";

const SPECIAL_KEYS = new Set([
  "Backspace", "Delete", "Enter", "Tab", "Escape",
  "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown",
  "Home", "End", "PageUp", "PageDown", "Insert",
  "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"
]);

export class KeyboardHandler {
  /**
   * @param {object} [options]
   * @param {"remington" | "legacy-hindi"} [options.layout="remington"]
   * @param {"unicode" | "legacy"} [options.output="unicode"]
   */
  constructor(options = {}) {
    this.layoutName = options.layout || "remington";
    this.outputMode = options.output || "unicode";
    this.layout = this.layoutName === "legacy-hindi" ? LEGACY_HINDI_LAYOUT : REMINGTON_LAYOUT;
  }

  /**
   * Main keydown event processor
   * @param {KeyboardEvent} event
   * @returns {boolean} Whether the event was intercepted and handled
   */
  handleKeyDown(event) {
    if (!event) return false;

    // 1. Bypass modifier key combinations (Ctrl, Command/Meta, Alt)
    if (event.ctrlKey || event.metaKey || event.altKey) {
      return false;
    }

    // 2. Bypass IME composition
    if (event.isComposing) {
      return false;
    }

    // 3. Bypass special navigation and control keys
    if (SPECIAL_KEYS.has(event.key)) {
      return false;
    }

    // 4. Evaluate Shift and CapsLock states
    let isShiftActive = Boolean(event.shiftKey);
    if (event.getModifierState && event.getModifierState("CapsLock")) {
      isShiftActive = !isShiftActive;
    }

    // 5. Look up key mapping: prioritize physical event.code, fallback to key
    const mapping = this.findMapping(event);
    if (!mapping) {
      return false;
    }

    const outputChar = isShiftActive
      ? (mapping.outputShift || mapping.output)
      : mapping.output;

    if (!outputChar) {
      return false;
    }

    // 6. Prevent default browser character insertion
    if (typeof event.preventDefault === "function") {
      event.preventDefault();
    }

    // 7. Dispatch character into target input/textarea
    if (event.target) {
      dispatchCharacterInput(event.target, outputChar);
    }

    return true;
  }

  /**
   * Find matching mapping entry from active layout
   * @private
   * @param {KeyboardEvent} event
   * @returns {{ output: string, outputShift?: string } | null}
   */
  findMapping(event) {
    const mappings = this.layout.mappings;

    // Direct physical code match (e.g. 'KeyD', 'Digit1')
    if (event.code && mappings[event.code]) {
      return mappings[event.code];
    }

    // Search by key property
    const targetKey = event.key ? event.key.toLowerCase() : "";
    for (const item of Object.values(mappings)) {
      if (item.key && item.key.toLowerCase() === targetKey) {
        return item;
      }
    }

    return null;
  }
}

export default KeyboardHandler;
