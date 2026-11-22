/**
 * Unicode Normalizer and Devanagari Linguistic Utilities
 */

export const HALANT = "\u094D"; // ्
export const CHHOTI_I = "\u093F"; // ि
export const REPH_RA = "\u0930" + HALANT; // र्
export const NUKTA = "\u093C"; // ़
export const ANUSVARA = "\u0902"; // ं
export const VISARGA = "\u0903"; // ः
export const CHANDRABINDU = "\u0901"; // ँ

// Consonant codepoints: \u0915 to \u0939, plus additional Devanagari consonants
export const DEVANAGARI_CONSONANTS = new Set([
  "क", "ख", "ग", "घ", "ङ",
  "च", "छ", "ज", "झ", "ञ",
  "ट", "ठ", "ड", "ढ", "ण",
  "त", "थ", "द", "ध", "न",
  "प", "फ", "ब", "भ", "म",
  "य", "र", "ल", "व", "श", "ष", "स", "ह",
  "क़", "ख़", "ग़", "ज़", "फ़", "ड़", "ढ़", "य़",
  "ळ", "ऴ", "ऱ", "ऩ"
]);

// Matras / Dependent vowel signs: \u093E to \u094C, \u0962, \u0963, etc.
export const DEVANAGARI_MATRAS = new Set([
  "ा", "ि", "ी", "ु", "ू", "ृ", "ॄ", "ॅ", "े", "ै", "ॉ", "ो", "ौ",
  "ॎ", "ॏ", "ॢ", "ॣ"
]);

/**
 * Standardize text into Canonical Unicode Normalization Form C (NFC)
 * @param {string} text
 * @returns {string}
 */
export function normalizeUnicode(text) {
  if (!text || typeof text !== "string") return "";
  return text.normalize("NFC");
}

/**
 * Checks if a character is a Devanagari consonant
 * @param {string} ch
 * @returns {boolean}
 */
export function isConsonant(ch) {
  return DEVANAGARI_CONSONANTS.has(ch);
}

/**
 * Checks if a character is a Devanagari dependent vowel sign (matra)
 * @param {string} ch
 * @returns {boolean}
 */
export function isMatra(ch) {
  return DEVANAGARI_MATRAS.has(ch);
}

/**
 * Strips zero-width characters (ZWJ, ZWNJ, BOM)
 * @param {string} text
 * @returns {string}
 */
export function stripZeroWidth(text) {
  if (!text) return "";
  return text.replace(/[\u200B-\u200D\uFEFF]/g, "");
}
