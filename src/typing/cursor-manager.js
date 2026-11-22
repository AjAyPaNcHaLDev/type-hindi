/**
 * Cursor and Selection Manager
 * Safely handles caret positioning and text range replacement for inputs and textareas
 */

/**
 * Inserts a string at the current caret position or replaces the selected text range
 * @param {HTMLInputElement | HTMLTextAreaElement} target
 * @param {string} textToInsert
 * @returns {{ newValue: string, newCaretPosition: number }}
 */
export function insertTextAtCaret(target, textToInsert) {
  if (!target || typeof target.value !== "string") {
    return { newValue: "", newCaretPosition: 0 };
  }

  const currentValue = target.value;
  const start = target.selectionStart ?? currentValue.length;
  const end = target.selectionEnd ?? currentValue.length;

  const prefix = currentValue.slice(0, start);
  const suffix = currentValue.slice(end);

  const newValue = prefix + textToInsert + suffix;
  const newCaretPosition = start + textToInsert.length;

  return {
    newValue,
    newCaretPosition
  };
}

/**
 * Restores selection / caret position on target element
 * @param {HTMLInputElement | HTMLTextAreaElement} target
 * @param {number} position
 */
export function setCaretPosition(target, position) {
  if (!target || typeof target.setSelectionRange !== "function") return;
  try {
    target.setSelectionRange(position, position);
  } catch {
    // Ignore environments where setSelectionRange is unsupported
  }
}
