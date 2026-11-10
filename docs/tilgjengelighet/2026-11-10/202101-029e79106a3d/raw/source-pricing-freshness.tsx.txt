"use client";
import { useEffect, useState } from "react";
export function PricingFreshness({ checkedAt }: { checkedAt: string | null }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    // Vurder ferskhet ved åpning eller nytt prisgrunnlag, uten tidsstyrte innsettinger.
    setNow(Date.now());
  }, [checkedAt]);
  return checkedAt &&
    now &&
    now - Date.parse(checkedAt) > 7 * 24 * 60 * 60 * 1000 ? (
    <p className="price-warning">
      Kontrollen er eldre enn sju dager. Sjekk leverandørens prisliste før du
      bruker tallene.
    </p>
  ) : null;
}
