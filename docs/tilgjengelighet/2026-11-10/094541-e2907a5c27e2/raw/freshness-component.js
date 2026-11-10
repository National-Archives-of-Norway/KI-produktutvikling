"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
export function PricingFreshness({ checkedAt }) {
    const [now, setNow] = useState(null);
    useEffect(() => {
        const update = () => setNow(Date.now());
        update();
        const id = setInterval(update, 60 * 60 * 1000);
        return () => clearInterval(id);
    }, []);
    return checkedAt &&
        now &&
        now - Date.parse(checkedAt) > 7 * 24 * 60 * 60 * 1000 ? (_jsx("p", { className: "price-warning", children: "Kontrollen er eldre enn sju dager. Sjekk leverand\u00F8rens prisliste f\u00F8r du bruker tallene." })) : null;
}
