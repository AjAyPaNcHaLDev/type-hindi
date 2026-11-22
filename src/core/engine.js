/**
 * Core Engine & Factory Functions
 * Exposes createHindi() and attachHindiInput()
 */

import KeyboardHandler from "../typing/keyboard-handler.js";
import { convertKrutiToUnicode } from "../converters/kruti-to-unicode.js";
import { convertUnicodeToKruti } from "../converters/unicode-to-kruti.js";
import { convertDevLysToUnicode } from "../converters/devlys-to-unicode.js";
import { REMINGTON_LAYOUT } from "../layouts/remington.js";
import { LEGACY_HINDI_LAYOUT } from "../layouts/legacy-hindi.js";

/**
 * Creates an instance of the Hindi typing engine
 * @param {object} [options]
 * @param {"remington" | "legacy-hindi"} [options.layout="remington"]
 * @param {"unicode" | "legacy"} [options.output="unicode"]
 * @returns {object} HindiEngine instance
 */
export function createHindi(options = {}) {
  const handler = new KeyboardHandler(options);

  return {
    handleKeyDown: (event) => handler.handleKeyDown(event),
    convert: (text, convOptions) => convertKrutiToUnicode(text, convOptions),
    getLayout: () => handler.layout,
    destroy: () => {}
  };
}

/**
 * Attaches Hindi typing handlers directly to a DOM input or textarea element
 * @param {HTMLInputElement | HTMLTextAreaElement} element
 * @param {object} [options]
 * @returns {{ destroy: () => void, setOptions: (opts: object) => void }}
 */
export function attachHindiInput(element, options = {}) {
  if (!element || typeof element.addEventListener !== "function") {
    throw new Error("attachHindiInput requires a valid DOM HTMLInputElement or HTMLTextAreaElement.");
  }

  let handler = new KeyboardHandler(options);

  const keydownListener = (event) => {
    handler.handleKeyDown(event);
  };

  element.addEventListener("keydown", keydownListener);

  return {
    destroy: () => {
      element.removeEventListener("keydown", keydownListener);
    },
    setOptions: (newOpts) => {
      handler = new KeyboardHandler({ ...options, ...newOpts });
    }
  };
}

/**
 * Get keyboard layout definition by name
 * @param {"remington" | "legacy-hindi"} name
 * @returns {object}
 */
export function getKeyboardLayout(name = "remington") {
  return name === "legacy-hindi" ? LEGACY_HINDI_LAYOUT : REMINGTON_LAYOUT;
}

/**
 * Returns a list of all supported legacy font identifiers
 * @returns {string[]}
 */
export function getSupportedFonts() {
  return [
    "krutidev-010",
    "krutidev-011",
    "krutidev-012",
    "krutidev-014",
    "krutidev-016",
    "krutidev-020",
    "krutidev-055",
    "devlys-010",
    "devlys-020"
  ];
}
