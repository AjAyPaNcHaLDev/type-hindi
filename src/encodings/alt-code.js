/**
 * Kruti Dev 010 & DevLys Windows Alt-Code Database & Lookup Utilities
 * Covers Windows ANSI / CP-1252 codepoints (0160 - 0231)
 */

export const ALT_CODE_DATABASE = [
  { altCode: "0160", decimal: 160, hex: "0x00A0", ansiChar: "\u00A0", unicode: "\u0970", description: "Abbreviation / Sanksheppak Chinh (डॉ॰)" },
  { altCode: "0161", decimal: 161, hex: "0x00A1", ansiChar: "¡", unicode: "द्ध", description: "Ddha Conjunct (बुद्ध)" },
  { altCode: "0165", decimal: 165, hex: "0x00A5", ansiChar: "¥", unicode: "०", description: "Devanagari Zero" },
  { altCode: "0170", decimal: 170, hex: "0x00AA", ansiChar: "ª", unicode: "ट्", description: "Half Tta" },
  { altCode: "0177", decimal: 177, hex: "0x00B1", ansiChar: "±", unicode: "र्", description: "Variant Reph" },
  { altCode: "0180", decimal: 180, hex: "0x00B4", ansiChar: "´", unicode: "ञ", description: "Nya" },
  { altCode: "0188", decimal: 188, hex: "0x00BC", ansiChar: "¼", unicode: "(", description: "Left Parenthesis" },
  { altCode: "0189", decimal: 189, hex: "0x00BD", ansiChar: "½", unicode: ")", description: "Right Parenthesis" },
  { altCode: "0191", decimal: 191, hex: "0x00BF", ansiChar: "¿", unicode: "ऋ", description: "Ri Vowel" },
  { altCode: "0197", decimal: 197, hex: "0x00C5", ansiChar: "Å", unicode: "ट्ट", description: "Tta-Tta Conjunct (पट्टी)" },
  { altCode: "0198", decimal: 198, hex: "0x00C6", ansiChar: "Æ", unicode: "ट्ठ", description: "Tta-Ttha Conjunct" },
  { altCode: "0199", decimal: 199, hex: "0x00C7", ansiChar: "Ç", unicode: "ड्ढ", description: "Dda-Ddha Conjunct" },
  { altCode: "0200", decimal: 200, hex: "0x00C8", ansiChar: "È", unicode: "ड्ड", description: "Dda-Dda Conjunct (गुड्डा)" },
  { altCode: "0201", decimal: 201, hex: "0x00C9", ansiChar: "Ê", unicode: "झ", description: "Jha Variant" },
  { altCode: "0203", decimal: 203, hex: "0x00CB", ansiChar: "Ë", unicode: "ह्न", description: "Ha-Na Conjunct (चिह्न)" },
  { altCode: "0204", decimal: 204, hex: "0x00CC", ansiChar: "Ì", unicode: "ह्म", description: "Ha-Ma Conjunct (ब्रह्मा)" },
  { altCode: "0205", decimal: 205, hex: "0x00CD", ansiChar: "Í", unicode: "ह्य", description: "Ha-Ya Conjunct (सह्य)" },
  { altCode: "0206", decimal: 206, hex: "0x00CE", ansiChar: "Î", unicode: "हृ", description: "Ha + Ri Matra (हृदय)" },
  { altCode: "0207", decimal: 207, hex: "0x00CF", ansiChar: "Ï", unicode: "ह्ल", description: "Ha-La Conjunct (प्रह्लाद)" },
  { altCode: "0209", decimal: 209, hex: "0x00D1", ansiChar: "Ñ", unicode: "ह्व", description: "Ha-Va Conjunct (आह्वान)" },
  { altCode: "0216", decimal: 216, hex: "0x00D8", ansiChar: "Ø", unicode: "क्र", description: "Ka-Rakar Conjunct (क्रम)" },
  { altCode: "0217", decimal: 217, hex: "0x00D9", ansiChar: "Ù", unicode: "फ्र", description: "Pha-Rakar Conjunct (फ्रांस)" },
  { altCode: "0221", decimal: 221, hex: "0x00DD", ansiChar: "Ý", unicode: "्र", description: "Rakar Modifier" },
  { altCode: "0224", decimal: 224, hex: "0x00E0", ansiChar: "à", unicode: "द्व", description: "Da-Va Conjunct (द्वार)" },
  { altCode: "0225", decimal: 225, hex: "0x00E1", ansiChar: "á", unicode: "द्र", description: "Da-Ra Conjunct (द्रव्य)" },
  { altCode: "0226", decimal: 226, hex: "0x00E2", ansiChar: "â", unicode: "द्य", description: "Da-Ya Conjunct (विद्या)" },
  { altCode: "0227", decimal: 227, hex: "0x00E3", ansiChar: "ã", unicode: "क्त", description: "Ka-Ta Conjunct (भक्त)" },
  { altCode: "0228", decimal: 228, hex: "0x00E4", ansiChar: "ä", unicode: "स्त्र", description: "Sa-Ta-Ra Conjunct (अस्त्र)" },
  { altCode: "0229", decimal: 229, hex: "0x00E5", ansiChar: "å", unicode: "त्र", description: "Tra Conjunct (छात्र)" },
  { altCode: "0230", decimal: 230, hex: "0x00E6", ansiChar: "æ", unicode: "क्ष", description: "Ksha Conjunct (वृक्ष)" },
  { altCode: "0231", decimal: 231, hex: "0x00E7", ansiChar: "ç", unicode: "प्र", description: "Pa-Rakar Conjunct (प्रकार)" }
];

// Lookup maps for fast O(1) resolution
const codeToEntryMap = new Map();
const charToEntryMap = new Map();
const ansiToEntryMap = new Map();

for (const entry of ALT_CODE_DATABASE) {
  codeToEntryMap.set(entry.altCode, entry);
  // Also support without leading zero e.g. "161" or 161
  codeToEntryMap.set(String(entry.decimal), entry);
  codeToEntryMap.set(entry.decimal, entry);

  charToEntryMap.set(entry.unicode, entry);
  ansiToEntryMap.set(entry.ansiChar, entry);
}

/**
 * Get the Windows Alt+numpad code for a Hindi character or conjunct
 * @param {string} character
 * @returns {string | null} e.g. "0216" for "क्र"
 */
export function getAltCode(character) {
  if (!character) return null;
  const entry = charToEntryMap.get(character);
  return entry ? entry.altCode : null;
}

/**
 * Get the Devanagari character or symbol for a given Alt code
 * @param {string | number} code e.g. "0216" or 216
 * @returns {string | null} e.g. "क्र"
 */
export function getKrutiDevCharacter(code) {
  if (code === undefined || code === null) return null;
  const entry = codeToEntryMap.get(code) || codeToEntryMap.get(String(code));
  return entry ? entry.unicode : null;
}

/**
 * Get the raw ANSI character corresponding to an Alt code
 * @param {string | number} code
 * @returns {string | null} e.g. "Ø" for "0216"
 */
export function getAnsiCharacter(code) {
  if (code === undefined || code === null) return null;
  const entry = codeToEntryMap.get(code) || codeToEntryMap.get(String(code));
  return entry ? entry.ansiChar : null;
}
