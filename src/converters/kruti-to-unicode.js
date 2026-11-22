/**
 * Kruti Dev (010 - 055) to Unicode Devanagari Converter
 */

import SequenceMatcher from "../core/sequence-matcher.js";
import { normalizeUnicode } from "../core/unicode-normalizer.js";
import { reorderKrutiChhotiI, reorderKrutiReph } from "./matra-reordering.js";
import { ALT_CODE_DATABASE } from "../encodings/alt-code.js";

// Multi-character composite mappings for Kruti Dev 010
const KRUTI_COMPOSITES = [
  // Full consonants formed with kaanha (k)
  ["Hkk", "भा"],
  ["Hk", "भ"],
  ["[kk", "खा"],
  ["[k", "ख"],
  ["?kk", "घा"],
  ["?k", "घ"],
  ["Fkk", "था"],
  ["Fk", "थ"],
  ["/kk", "धा"],
  ["/k", "ध"],
  ["'kk", "शा"],
  ["'k", "श"],
  [">kk", "झा"],
  [">k", "झ"],

  // Double-stroke vowels and matras
  ["vks", "ओ"],
  ["vkS", "औ"],
  ["vk", "आ"],
  ["ks", "ो"],
  ["kS", "ौ"],
  ["iz", "प्र"],
  ["dz", "क्र"],
  ["nz", "द्र"],
  ["=k", "त्र"],
  ["~k", "त्र"],

  // Nukta combinations
  ["M+", "ड़"],
  ["<+", "ढ़"],
  ["+", "़"],

  // Remington shifted conjuncts
  ["{", "क्ष"],
  ["}", "द्व"],
  ["K", "ज्ञ"],
  ["J", "श्र"],
  ["|", "द्य"]
];

// Single character mappings
const KRUTI_SINGLE_CHARS = [
  // Consonants
  ["d", "क"],
  ["D", "क्"],
  ["x", "ग"],
  ["X", "ग्"],
  ["?", "घ्"],
  ["p", "च"],
  ["P", "च्"],
  ["N", "छ"],
  ["t", "ज"],
  ["T", "ज्"],
  [">", "झ्"],
  ["V", "ट"],
  ["B", "ठ"],
  ["M", "ड"],
  ["<", "ढ"],
  [".", "ण्"],
  ["r", "त"],
  ["R", "त्"],
  ["F", "थ्"],
  ["n", "द"],
  ["/", "ध्"],
  ["u", "न"],
  ["U", "न्"],
  ["i", "प"],
  ["I", "प्"],
  ["Q", "फ"],
  ["c", "ब"],
  ["C", "ब्"],
  ["H", "भ्"],
  ["e", "म"],
  ["E", "म्"],
  [";", "य"],
  ["j", "र"],
  ["y", "ल"],
  ["Y", "ल्"],
  ["o", "व"],
  ["O", "व्"],
  ["'", "श्"],
  ["\"", "ष्"],
  ["l", "स"],
  ["L", "स्"],
  ["g", "ह"],
  ["G", "ळ"],

  // Independent Vowels
  ["v", "अ"],
  ["b", "इ"],
  ["m", "उ"],
  [",", "ए"],

  // Matras / Vowel Signs
  ["k", "ा"],
  ["s", "े"],
  ["S", "ै"],
  ["h", "ी"],
  ["q", "ु"],
  ["w", "ू"],
  ["W", "ॅ"],
  ["a", "ं"],
  ["A", "ा"],
  ["z", "्र"],
  ["`", "्"],
  ["~", "्"],

  // Digits & Punctuation
  ["1", "१"],
  ["2", "२"],
  ["3", "३"],
  ["4", "४"],
  ["5", "५"],
  ["6", "६"],
  ["7", "७"],
  ["8", "८"],
  ["9", "९"],
  ["0", "०"],
  ["\\", "।"]
];

const ALT_CODE_RULES = ALT_CODE_DATABASE.map(entry => [entry.ansiChar, entry.unicode]);

const altMatcher = new SequenceMatcher(ALT_CODE_RULES);
const compositeMatcher = new SequenceMatcher(KRUTI_COMPOSITES);
const singleMatcher = new SequenceMatcher(KRUTI_SINGLE_CHARS);

/**
 * Convert Kruti Dev encoded string to Devanagari Unicode
 * @param {string} text Legacy Kruti Dev string
 * @param {object} [options] Conversion options
 * @returns {string} Standard Unicode Devanagari text
 */
export function convertKrutiToUnicode(text, options = {}) {
  if (!text || typeof text !== "string") return "";

  let result = text;

  // Phase 1: Alt codes
  result = altMatcher.replace(result);

  // Phase 2: Composite ligatures and full consonants (e.g. /k -> ध, Hk -> भ, [k -> ख)
  result = compositeMatcher.replace(result);

  // Phase 3: Reorder floating Reph ('Z' / '±')
  result = reorderKrutiReph(result);

  // Phase 4: Reorder pre-base Chhoti-i ('f')
  result = reorderKrutiChhotiI(result);

  // Phase 5: Single characters
  result = singleMatcher.replace(result);

  // Phase 6: Normalization
  return normalizeUnicode(result);
}

/**
 * Convert with detailed diagnostics report
 * @param {string} text
 * @param {object} [options]
 * @returns {{ originalText: string, convertedText: string, durationMs: number }}
 */
export function convertKrutiToUnicodeWithReport(text, options = {}) {
  const start = Date.now();
  const convertedText = convertKrutiToUnicode(text, options);
  const durationMs = Date.now() - start;

  return {
    originalText: text,
    convertedText,
    durationMs
  };
}

export default convertKrutiToUnicode;
