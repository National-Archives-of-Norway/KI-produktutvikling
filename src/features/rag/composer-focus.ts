// Rene avgjørelser uten DOM-/React-avhengighet. Samme knapp beholder samme
// betydning ved gjentatt Enter/klikk; useChat sperrer dessuten aktiv forespørsel.
export function shouldIgnoreSend(busy: boolean): boolean {
  return busy;
}

export function focusTargetAfterRequest<T>(
  active: T | null,
  elements: { send: T | null; body: T; input: T | null },
): T | null {
  if (active === elements.body || (elements.send && active === elements.send))
    return elements.input;
  return null;
}

// Gjenopprett tastaturfokus uten å flytte leseposisjonen til skjemaet.
export function restoreFocusAfterRequest(
  active: object | null,
  elements: {
    send: object | null;
    body: object;
    input: { focus(options?: { preventScroll?: boolean }): void } | null;
  },
): void {
  if (focusTargetAfterRequest<object>(active, elements) === elements.input)
    elements.input?.focus({ preventScroll: true });
}
