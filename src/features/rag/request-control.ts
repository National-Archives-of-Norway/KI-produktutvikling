export type PendingRequest = { id: number; controller: AbortController };
export type RequestSlot = { current: PendingRequest | null };

export function beginRequest(
  slot: RequestSlot,
  id: number,
): PendingRequest | null {
  if (slot.current) return null;
  const request = { id, controller: new AbortController() };
  slot.current = request;
  return request;
}

// Identitet beskytter den nye forespørselen mot et sent svar/finally fra den gamle.
export function finishRequest(
  slot: RequestSlot,
  request: PendingRequest,
): boolean {
  if (slot.current !== request) return false;
  slot.current = null;
  return true;
}

export function cancelRequest(slot: RequestSlot): number | null {
  const request = slot.current;
  if (!request) return null;
  slot.current = null;
  request.controller.abort();
  return request.id;
}
