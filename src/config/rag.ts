// Offentlig, miljøuavhengig tidsbudsjett. Ingen servervariabler eller secrets.
// Serverkonfigurasjon, Next-proxy og klient bruker samme kjede.
export const RAG_TIMEOUTS = Object.freeze({
  modelMs: 60_000,
  proxyMs: 65_000,
  clientMs: 70_000,
});
