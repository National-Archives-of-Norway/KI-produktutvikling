// Ren porttolking uten process.env eller serverimporter. Next og RAG må bruke
// samme standard, trimming og feil også når konfigurasjonen leses ved bygg.
export function parseRagPort(value: string | undefined): number {
  if (value === undefined) return 3001;
  const trimmed = value.trim();
  if (!trimmed)
    throw new Error(
      "Ugyldig RAG_PORT: verdien kan ikke være tom. Utelat variabelen for standardverdi.",
    );
  const port = Number(trimmed);
  if (!Number.isInteger(port) || port < 1 || port > 65535)
    throw new Error("RAG_PORT må være et heltall fra 1 til 65535.");
  return port;
}
