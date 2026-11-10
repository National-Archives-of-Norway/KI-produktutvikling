"use client";
import { useEffect, useState } from "react";
export function PricingFreshness({ checkedAt }: { checkedAt: string | null }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const update = () => setNow(Date.now());
    update();
    const id = setInterval(update, 60 * 60 * 1000);
    return () => clearInterval(id);
  }, []);
  return checkedAt &&
    now &&
    now - Date.parse(checkedAt) > 7 * 24 * 60 * 60 * 1000 ? (
    <p className="price-warning">
      Kontrollen er eldre enn sju dager. Sjekk leverandørens prisliste før du
      bruker tallene.
    </p>
  ) : null;
}
