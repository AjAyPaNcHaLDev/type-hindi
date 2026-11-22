/**
 * DevLys to Unicode & Unicode to DevLys Converters
 * Handles DevLys-specific single-glyph mappings (like '£' for 'ख')
 */

import { convertKrutiToUnicode } from "./kruti-to-unicode.js";
import { convertUnicodeToKruti } from "./unicode-to-kruti.js";

// DevLys specific glyph differences
const DEVLYS_SPECIFIC = [
  ["£", "ख"],
  ["§", "ट्ट"]
];

/**
 * Convert DevLys text to Unicode Devanagari
 * @param {string} text
 * @param {object} [options]
 * @returns {string}
 */
export function convertDevLysToUnicode(text, options = {}) {
  if (!text || typeof text !== "string") return "";

  let result = text;
  for (const [devlysGlyph, unicodeGlyph] of DEVLYS_SPECIFIC) {
    result = result.split(devlysGlyph).join(unicodeGlyph);
  }

  return convertKrutiToUnicode(result, options);
}

/**
 * Convert Unicode Devanagari to DevLys format
 * @param {string} text
 * @param {object} [options]
 * @returns {string}
 */
export function convertUnicodeToDevLys(text, options = {}) {
  if (!text || typeof text !== "string") return "";
  return convertUnicodeToKruti(text, options);
}

export default convertDevLysToUnicode;
