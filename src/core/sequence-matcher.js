/**
 * SequenceMatcher
 * Executes multi-character string replacements using a longest-token-first strategy
 * to prevent sub-string collisions (e.g. matching 'Alt+0216' or '[k' before '[' or 'k').
 */

class SequenceMatcher {
  /**
   * @param {Array<[string, string]> | Record<string, string>} mappings
   */
  constructor(mappings = {}) {
    this.rules = [];
    this.setRules(mappings);
  }

  /**
   * Set or update replacement rules. Automatically sorts by pattern length descending.
   * @param {Array<[string, string]> | Record<string, string>} mappings
   */
  setRules(mappings) {
    let entries = [];
    if (Array.isArray(mappings)) {
      entries = mappings.slice();
    } else if (typeof mappings === "object" && mappings !== null) {
      entries = Object.entries(mappings);
    }

    // Sort by descending pattern length so longest tokens match first
    this.rules = entries
      .filter(([pattern]) => pattern && pattern.length > 0)
      .sort((a, b) => b[0].length - a[0].length);
  }

  /**
   * Apply all replacement rules sequentially
   * @param {string} text
   * @returns {string}
   */
  replace(text) {
    if (!text || typeof text !== "string") return "";
    let result = text;
    for (const [pattern, replacement] of this.rules) {
      if (result.includes(pattern)) {
        result = result.split(pattern).join(replacement);
      }
    }
    return result;
  }
}

export default SequenceMatcher;
