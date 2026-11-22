# type-hindi (v2.0)

A comprehensive, zero-dependency Hindi typing and legacy font conversion library for JavaScript and Node.js.

Supports authentic **Kruti Dev 010 (Remington Typewriter)** layouts, **DevLys**, **Alt+numpad codes**, and **bidirectional Unicode conversion**.

---

## ✨ Features

- ⌨️ **Authentic Remington Hindi Layout:** Real Kruti Dev 010 typewriter keyboard simulation with Shift combinations, half-letters, conjuncts, matras, and numbers.
- 🔄 **Bidirectional Font Conversion:** 
  - Kruti Dev (010, 011, 012, 014, 016, 020, 055) ➔ Unicode Devanagari
  - Unicode Devanagari ➔ Kruti Dev (010)
  - DevLys (010, 020) ➔ Unicode Devanagari
- 🎯 **Advanced Caret & Selection Handling:** Preserves cursor position, replaces text selections, and supports mid-sentence typing.
- ⚛️ **Modern Framework Ready:** Dispatches synthetic bubbling `input` events, ensuring 100% compatibility with React controlled inputs (`value` + `onChange`), Vue (`v-model`), Svelte, and Angular.
- 🔢 **Windows Alt-Code Subsystem:** Complete database of 30+ Alt codes (`Alt+0160` to `Alt+0231`) for special ligatures and symbols (क्र, फ्र, द्ध, ट्ट, ड्ड, ह्न, ह्म, हृ, etc.).
- 🚀 **Zero Dependencies & Blazing Fast:** Built in pure lightweight JavaScript. Runs seamlessly in modern browsers, Node.js, and Web Workers.
- 🛡️ **100% Backward Compatible:** Existing `typeHindi(event)` code from v1 continues working without breaking changes.

---

## 📦 Installation

```bash
npm install type-hindi
# or
yarn add type-hindi
# or
pnpm add type-hindi
```

---

## 🚀 Quick Start

### 1. Simple Drop-in Typing (Backward Compatible)

Works with any `<input>` or `<textarea>` element:

```javascript
import typeHindi from "type-hindi";

const input = document.querySelector("#hindi-input");
input.addEventListener("keydown", (e) => typeHindi(e));
```

### 2. React Component Usage

```jsx
import React, { useState } from "react";
import typeHindi, { createHindi } from "type-hindi";

export function HindiEditor() {
  const [text, setText] = useState("");

  return (
    <input
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      onKeyDown={(e) => typeHindi(e)}
      placeholder="यहाँ टाइप करें (Remington Hindi)..."
    />
  );
}
```

### 3. Dedicated Engine Instance (`createHindi`)

```javascript
import { createHindi } from "type-hindi";

const hindi = createHindi({
  layout: "remington",
  font: "krutidev-010"
});

document.querySelector("textarea").addEventListener("keydown", (e) => {
  hindi.handleKeyDown(e);
});
```

---

## 🔄 Font Conversion

### Convert Kruti Dev to Unicode Devanagari

```javascript
import { convertKrutiToUnicode } from "type-hindi";

// Basic words
convertKrutiToUnicode("Hkkjr");  // "भारत"
convertKrutiToUnicode("fdlku");  // "किसान"
convertKrutiToUnicode("fLFkfr"); // "स्थिति"

// Reph and Rakar
convertKrutiToUnicode("deZ");    // "कर्म"
convertKrutiToUnicode("/keZ");   // "धर्म"
convertKrutiToUnicode("izdk'k"); // "प्रकाश"

// Alt-code ligatures
convertKrutiToUnicode("Øe");     // "क्रम" (Alt+0216)
convertKrutiToUnicode("cq¡");    // "बुद्ध" (Alt+0161)
```

### Convert Unicode to Kruti Dev

```javascript
import { convertUnicodeToKruti } from "type-hindi";

convertUnicodeToKruti("भारत");  // "Hkkjr"
convertUnicodeToKruti("कर्म");   // "deZ"
convertUnicodeToKruti("प्रकाश"); // "izdk'k"
```

### DevLys Font Conversion

```javascript
import { convertDevLysToUnicode } from "type-hindi";

convertDevLysToUnicode("£M+x");  // "खड़ग"
```

---

## 🔢 Alt-Code Lookup

Look up Windows Alt codes for special Hindi characters and ligatures:

```javascript
import { getAltCode, getKrutiDevCharacter, getAnsiCharacter } from "type-hindi";

// Get Alt-code from Devanagari character
getAltCode("क्र"); // "0216"
getAltCode("द्ध"); // "0161"
getAltCode("फ्र"); // "0217"
getAltCode("॰");  // "0160" (डॉ॰ abbreviation)
getAltCode("क्त"); // "0227"

// Get Devanagari character from Alt-code
getKrutiDevCharacter("0216"); // "क्र"
getKrutiDevCharacter(161);    // "द्ध"

// Get Windows ANSI char
getAnsiCharacter("0216");     // "Ø"
```

---

## ⌨️ Remington Keyboard Layout Reference

### Normal Keys (Without Shift)
| Key | Output | Description | Key | Output | Description |
| :---: | :---: | :--- | :---: | :---: | :--- |
| **q** | `ु` | Chhoti U Matra | **a** | `ं` | Anusvara |
| **w** | `ू` | Badi U Matra | **s** | `े` | E Matra |
| **e** | `म` | Ma | **d** | `क` | Ka |
| **r** | `त` | Ta | **f** | `ि` | Chhoti I Matra |
| **t** | `ज` | Ja | **g** | `ह` | Ha |
| **y** | `ल` | La | **h** | `ी` | Badi I Matra |
| **u** | `न` | Na | **j** | `र` | Ra |
| **i** | `प` | Pa | **k** | `ा` | Aa Matra |
| **o** | `व` | Va | **l** | `स` | Sa |
| **p** | `च` | Cha | **;** | `य` | Ya |
| **[** | `ख्` | Half Kha | **'** | `श्` | Half Sha |
| **z** | `्र` | Rakar | **x** | `ग` | Ga |
| **c** | `ब` | Ba | **v** | `अ` | A |
| **b** | `इ` | I | **n** | `द` | Da |
| **m** | `उ` | U | **,** | `ए` | E |

### Shifted Keys (With Shift)
| Key | Output | Description | Key | Output | Description |
| :---: | :---: | :--- | :---: | :---: | :--- |
| **Q** | `फ` | Pha | **A** | `ा` | Aa Matra |
| **W** | `ॅ` | Chandrabindu | **S** | `ै` | Ai Matra |
| **E** | `म्` | Half Ma | **D** | `क्` | Half Ka |
| **R** | `त्` | Half Ta | **F** | `थ्` | Half Tha |
| **T** | `ज्` | Half Ja | **G** | `ळ` | Lla |
| **Y** | `ल्` | Half La | **H** | `भ्` | Half Bha |
| **U** | `न्` | Half Na | **J** | `श्र` | Shra |
| **I** | `प्` | Half Pa | **K** | `ज्ञ` | Gya |
| **O** | `व्` | Half Va | **L** | `स्` | Half Sa |
| **P** | `च्` | Half Cha | **:** | `रु` | Ru |
| **{** | `क्ष` | Ksha | **"** | `ष्` | Murdhanya Sha |
| **Z** | `र्` | Reph | **X** | `ग्` | Half Ga |
| **C** | `ब्` | Half Ba | **V** | `ट` | Tta |
| **B** | `ठ` | Ttha | **N** | `छ` | Chha |
| **M** | `ड` | Dda | **<** | `ढ` | Ddha |

---

## 📚 API Reference

### `typeHindi(event)`
Default export. Attaches to `onKeyDown` on `<input>` or `<textarea>`.

### `createHindi(options)`
Creates a configurable typing engine instance:
- `options.layout`: `'remington'` (default) or `'legacy-hindi'`
- `options.font`: `'krutidev-010'` (default)
- Returns: `{ handleKeyDown(e), convert(text), getLayout() }`

### `attachHindiInput(element, options)`
Attaches event listeners directly to an input or textarea with automatic cleanup:
```javascript
const handle = attachHindiInput(myInput);
// Later:
handle.destroy();
```

### `convertKrutiToUnicode(text, options)`
Converts Kruti Dev legacy string to Devanagari Unicode.

### `convertUnicodeToKruti(text, options)`
Converts Devanagari Unicode string to Kruti Dev format.

### `convertDevLysToUnicode(text, options)`
Converts DevLys text to Devanagari Unicode.

### `getAltCode(character)`
Returns the 4-digit Windows Alt code string (e.g. `"0216"` for `"क्र"`).

### `getKrutiDevCharacter(code)`
Returns the Devanagari character for a given Alt code (e.g. `"क्र"` for `216` or `"0216"`).

---

## 📄 License

ISC © [Ajay Panchal](https://github.com/ajaypanchaldev)
