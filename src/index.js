/**
 * type-hindi (v2.0)
 * Complete Hindi Typing & Legacy Font Conversion Library
 */

import { typeHindi } from "./legacy/type-hindi.js";
import { createHindi, attachHindiInput, getKeyboardLayout, getSupportedFonts } from "./core/engine.js";
import { convertKrutiToUnicode, convertKrutiToUnicodeWithReport } from "./converters/kruti-to-unicode.js";
import { convertUnicodeToKruti } from "./converters/unicode-to-kruti.js";
import { convertDevLysToUnicode, convertUnicodeToDevLys } from "./converters/devlys-to-unicode.js";
import { getAltCode, getKrutiDevCharacter, getAnsiCharacter, ALT_CODE_DATABASE } from "./encodings/alt-code.js";
import { normalizeUnicode } from "./core/unicode-normalizer.js";

// Named exports
export {
  typeHindi,
  createHindi,
  attachHindiInput,
  convertKrutiToUnicode,
  convertKrutiToUnicodeWithReport,
  convertUnicodeToKruti,
  convertDevLysToUnicode,
  convertUnicodeToDevLys,
  getAltCode,
  getKrutiDevCharacter,
  getAnsiCharacter,
  getKeyboardLayout,
  getSupportedFonts,
  normalizeUnicode,
  ALT_CODE_DATABASE
};

// Default export preserving backward compatibility
export default typeHindi;
