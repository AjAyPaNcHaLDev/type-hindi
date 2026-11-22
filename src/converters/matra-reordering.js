/**
 * Matra and Reph Reordering Engine
 */

import { HALANT, CHHOTI_I, REPH_RA } from "../core/unicode-normalizer.js";

/**
 * Reorders pre-base Chhoti-i ('f') in Kruti Dev string into logical post-base Unicode matra ('ि')
 * e.g. "fd" -> "d" + "ि" -> "कि"
 * e.g. "fLFkfr" -> "LFk" + "ि" + "r" + "ि" -> "स्थिति"
 * @param {string} text
 * @returns {string}
 */
export function reorderKrutiChhotiI(text) {
  if (!text || typeof text !== "string") return "";

  let result = text;
  let idx = result.indexOf("f");

  while (idx !== -1) {
    let clusterEnd = idx + 1;
    
    while (clusterEnd < result.length) {
      const ch = result[clusterEnd];
      clusterEnd++;
      if (!isKrutiHalfLetter(ch) && ch !== "z") {
        // If next char is 'k' forming a full letter (e.g. Hk, Fk, [k), include 'k'
        if (clusterEnd < result.length && result[clusterEnd] === "k") {
          clusterEnd++;
        }
        break;
      }
    }

    const cluster = result.slice(idx + 1, clusterEnd);
    result = result.slice(0, idx) + cluster + CHHOTI_I + result.slice(clusterEnd);
    idx = result.indexOf("f", idx + cluster.length + 1);
  }

  return result;
}

/**
 * Reorders floating Reph ('Z' or '±') in Kruti Dev text
 * Moves Reph to immediately precede the syllable it floats over
 * e.g. "deZ" -> "d" + "र्" + "e" -> "कर्म"
 * @param {string} text
 * @returns {string}
 */
export function reorderKrutiReph(text) {
  if (!text || typeof text !== "string") return "";

  let result = text;
  // Match preceding consonant cluster (including ';' for 'य', etc.)
  const rephRegex = /((?:[DETYUIOPLWSXCVB[{<>]|k)?(?:[;a-zA-Z\u0080-\u024F\u0900-\u097F][ksS]?))(Z|±)/g;

  result = result.replace(rephRegex, (match, syllable) => {
    return REPH_RA + syllable;
  });

  return result;
}

/**
 * Reorders Unicode Chhoti-i ('ि') back into leading Kruti Dev 'f'
 * @param {string} text
 * @returns {string}
 */
export function reorderUnicodeChhotiI(text) {
  if (!text || typeof text !== "string") return "";
  const pattern = /((?:[\u0915-\u0939]\u094D)*[\u0915-\u0939])\u093F/g;
  return text.replace(pattern, "f$1");
}

/**
 * Reorders Unicode Reph ('र्') back into trailing Kruti Dev 'Z'
 * @param {string} text
 * @returns {string}
 */
export function reorderUnicodeReph(text) {
  if (!text || typeof text !== "string") return "";
  const pattern = /\u0930\u094D((?:[\u0915-\u0939]\u094D)*[\u0915-\u0939][\u093E-\u094C\u0901-\u0903]?)/g;
  return text.replace(pattern, "$1Z");
}

function isKrutiHalfLetter(ch) {
  const halfChars = "DETYUIOPLWSXCVB[{<>";
  return halfChars.includes(ch);
}
