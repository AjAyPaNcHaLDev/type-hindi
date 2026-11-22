/**
 * Remington Hindi Keyboard Layout
 * Standard Kruti Dev 010 Typewriter Layout (Used in CPCT, SSC, High Court exams)
 */

export const REMINGTON_LAYOUT = {
  name: "remington",
  font: "Kruti Dev 010",
  description: "Standard Remington Hindi typewriter keyboard layout",
  mappings: {
    // Number Row
    Backquote: { key: "`", output: "्", outputShift: "ृ", code: "Backquote" },
    Digit1: { key: "1", output: "!", outputShift: "१", code: "Digit1" },
    Digit2: { key: "2", output: "/", outputShift: "२", code: "Digit2" },
    Digit3: { key: "3", output: "रु", outputShift: "३", code: "Digit3" },
    Digit4: { key: "4", output: "+", outputShift: "४", code: "Digit4" },
    Digit5: { key: "5", output: "ः", outputShift: "५", code: "Digit5" },
    Digit6: { key: "6", output: "'", outputShift: "६", code: "Digit6" },
    Digit7: { key: "7", output: "-", outputShift: "७", code: "Digit7" },
    Digit8: { key: "8", output: "ʼ", outputShift: "८", code: "Digit8" },
    Digit9: { key: "9", output: ";", outputShift: "९", code: "Digit9" },
    Digit0: { key: "0", output: "द्ध", outputShift: "०", code: "Digit0" },
    Minus: { key: "-", output: "ऋ", outputShift: "–", code: "Minus" },
    Equal: { key: "=", output: "़", outputShift: "त्र", code: "Equal" },
    Backslash: { key: "\\", output: ".", outputShift: "।", code: "Backslash" },

    // Top Letter Row (QWERTY)
    KeyQ: { key: "q", output: "ु", outputShift: "फ", code: "KeyQ" },
    KeyW: { key: "w", output: "ू", outputShift: "ॅ", code: "KeyW" },
    KeyE: { key: "e", output: "म", outputShift: "म्", code: "KeyE" },
    KeyR: { key: "r", output: "त", outputShift: "त्", code: "KeyR" },
    KeyT: { key: "t", output: "ज", outputShift: "ज्", code: "KeyT" },
    KeyY: { key: "y", output: "ल", outputShift: "ल्", code: "KeyY" },
    KeyU: { key: "u", output: "न", outputShift: "न्", code: "KeyU" },
    KeyI: { key: "i", output: "प", outputShift: "प्", code: "KeyI" },
    KeyO: { key: "o", output: "व", outputShift: "व्", code: "KeyO" },
    KeyP: { key: "p", output: "च", outputShift: "च्", code: "KeyP" },
    BracketLeft: { key: "[", output: "ख्", outputShift: "क्ष", code: "BracketLeft" },
    BracketRight: { key: "]", output: ",", outputShift: "द्व", code: "BracketRight" },

    // Home Letter Row (ASDF)
    KeyA: { key: "a", output: "ं", outputShift: "ा", code: "KeyA" },
    KeyS: { key: "s", output: "े", outputShift: "ै", code: "KeyS" },
    KeyD: { key: "d", output: "क", outputShift: "क्", code: "KeyD" },
    KeyF: { key: "f", output: "ि", outputShift: "थ्", code: "KeyF" },
    KeyG: { key: "g", output: "ह", outputShift: "ळ", code: "KeyG" },
    KeyH: { key: "h", output: "ी", outputShift: "भ्", code: "KeyH" },
    KeyJ: { key: "j", output: "र", outputShift: "श्र", code: "KeyJ" },
    KeyK: { key: "k", output: "ा", outputShift: "ज्ञ", code: "KeyK" },
    KeyL: { key: "l", output: "स", outputShift: "स्", code: "KeyL" },
    Semicolon: { key: ";", output: "य", outputShift: "रु", code: "Semicolon" },
    Quote: { key: "'", output: "श्", outputShift: "ष्", code: "Quote" },

    // Bottom Letter Row (ZXCV)
    KeyZ: { key: "z", output: "्र", outputShift: "र्", code: "KeyZ" },
    KeyX: { key: "x", output: "ग", outputShift: "ग्", code: "KeyX" },
    KeyC: { key: "c", output: "ब", outputShift: "ब्", code: "KeyC" },
    KeyV: { key: "v", output: "अ", outputShift: "ट", code: "KeyV" },
    KeyB: { key: "b", output: "इ", outputShift: "ठ", code: "KeyB" },
    KeyN: { key: "n", output: "द", outputShift: "छ", code: "KeyN" },
    KeyM: { key: "m", output: "उ", outputShift: "ड", code: "KeyM" },
    Comma: { key: ",", output: "ए", outputShift: "ढ", code: "Comma" },
    Period: { key: ".", output: "ण्", outputShift: "झ्", code: "Period" },
    Slash: { key: "/", output: "ध्", outputShift: "घ्", code: "Slash" }
  }
};

export default REMINGTON_LAYOUT;
