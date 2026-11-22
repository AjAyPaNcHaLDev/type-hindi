/**
 * Unicode Devanagari to Kruti Dev (010) Converter
 */

import SequenceMatcher from "../core/sequence-matcher.js";
import { normalizeUnicode } from "../core/unicode-normalizer.js";
import { reorderUnicodeChhotiI, reorderUnicodeReph } from "./matra-reordering.js";

// Multi-character Unicode sequences to Kruti Dev
const UNICODE_COMPOSITES = [
  ["ओ", "vks"],
  ["औ", "vkS"],
  ["आ", "vk"],
  ["भा", "Hkk"],
  ["भ", "Hk"],
  ["खा", "[kk"],
  ["ख", "[k"],
  ["घा", "?kk"],
  ["घ", "?k"],
  ["था", "Fkk"],
  ["थ", "Fk"],
  ["धा", "/kk"],
  ["ध", "/k"],
  ["शा", "'kk"],
  ["श", "'k"],
  ["झा", ">kk"],
  ["झ", ">k"],
  ["ो", "ks"],
  ["ौ", "kS"],
  ["प्र", "iz"],
  ["क्र", "Ø"],
  ["फ्र", "Ù"],
  ["द्व", "à"],
  ["द्र", "á"],
  ["द्य", "|"],
  ["क्त", "ã"],
  ["स्त्र", "ä"],
  ["त्र", "å"],
  ["क्ष", "æ"],
  ["द्ध", "¡"],
  ["ट्ट", "Å"],
  ["ट्ठ", "Æ"],
  ["ड्ढ", "Ç"],
  ["ड्ड", "È"],
  ["ह्न", "Ë"],
  ["ह्म", "Ì"],
  ["ह्य", "Í"],
  ["हृ", "Î"],
  ["ह्ल", "Ï"],
  ["ह्व", "Ñ"],
  ["ज्ञ", "K"],
  ["श्र", "J"]
];

const UNICODE_SINGLE_CHARS = [
  // Consonants
  ["क", "d"],
  ["क्", "D"],
  ["ग", "x"],
  ["ग्", "X"],
  ["घ्", "?"],
  ["च", "p"],
  ["च्", "P"],
  ["छ", "N"],
  ["ज", "t"],
  ["ज्", "T"],
  ["झ्", ">"],
  ["ट", "V"],
  ["ट्", "ª"],
  ["ठ", "B"],
  ["ड", "M"],
  ["ढ", "<"],
  ["ण", "."],
  ["ण्", "."],
  ["त", "r"],
  ["त्", "R"],
  ["थ्", "F"],
  ["द", "n"],
  ["ध्", "/"],
  ["न", "u"],
  ["न्", "U"],
  ["प", "i"],
  ["प्", "I"],
  ["फ", "Q"],
  ["ब", "c"],
  ["ब्", "C"],
  ["भ्", "H"],
  ["म", "e"],
  ["म्", "E"],
  ["य", ";"],
  ["र", "j"],
  ["ल", "y"],
  ["ल्", "Y"],
  ["व", "o"],
  ["व्", "O"],
  ["श्", "'"],
  ["ष्", "\""],
  ["स", "l"],
  ["स्", "L"],
  ["ह", "g"],
  ["ळ", "G"],

  // Independent Vowels
  ["अ", "v"],
  ["इ", "b"],
  ["उ", "m"],
  ["ए", ","],
  ["ऋ", "¿"],

  // Matras
  ["ा", "k"],
  ["े", "s"],
  ["ै", "S"],
  ["ी", "h"],
  ["ु", "q"],
  ["ू", "w"],
  ["ॅ", "W"],
  ["ं", "a"],
  ["्", "~"],
  ["़", "़"],
  ["्र", "z"],

  // Digits & Punctuation
  ["१", "1"],
  ["२", "2"],
  ["३", "3"],
  ["४", "4"],
  ["५", "5"],
  ["६", "6"],
  ["७", "7"],
  ["८", "8"],
  ["९", "9"],
  ["०", "0"],
  ["।", "\\"]
];

const compositeMatcher = new SequenceMatcher(UNICODE_COMPOSITES);
const singleMatcher = new SequenceMatcher(UNICODE_SINGLE_CHARS);

/**
 * Convert standard Unicode Devanagari text to Kruti Dev 010 legacy format
 * @param {string} text
 * @param {object} [options]
 * @returns {string}
 */
export function convertUnicodeToKruti(text, options = {}) {
  if (!text || typeof text !== "string") return "";

  let result = normalizeUnicode(text);

  // Step 1: Reorder Reph ('र्' -> 'Z')
  result = reorderUnicodeReph(result);

  // Step 2: Reorder Chhoti-i ('ि' -> 'f')
  result = reorderUnicodeChhotiI(result);

  // Step 3: Map multi-character ligatures and conjuncts
  result = compositeMatcher.replace(result);

  // Step 4: Map single characters
  result = singleMatcher.replace(result);

  return result;
}

export default convertUnicodeToKruti;
