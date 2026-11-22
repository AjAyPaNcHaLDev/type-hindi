/**
 * Backward compatibility adapter for typeHindi(event)
 * Upgraded with cursor preservation and React-compatible event dispatching
 */

import { KeyboardHandler } from "../typing/keyboard-handler.js";

const defaultHandler = new KeyboardHandler({ layout: "remington" });

/**
 * Intercepts keydown events and types Hindi characters into the target input
 * Maintains 100% backward compatibility with `v1.0.2` consumers
 * @param {KeyboardEvent} event
 */
export function typeHindi(event) {
  if (!event) return;
  defaultHandler.handleKeyDown(event);
}

export default typeHindi;
