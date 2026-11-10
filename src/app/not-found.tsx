import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fant ikke siden",
  description:
    "Siden finnes ikke. Finn innholdet via forsiden eller nettstedskartet.",
};

export default function NotFound() {
  return (
    <article className="article">
      <div className="eyebrow">404 · SIDE IKKE FUNNET</div>
      <h1>Fant ikke siden</h1>
      <p className="lead">
        Adressen kan være feil, eller siden kan ha blitt flyttet.
      </p>
      <p>
        <Link href="/">Gå til forsiden</Link> eller finn innholdet i{" "}
        <Link href="/nettstedskart/">nettstedskartet</Link>.
      </p>
    </article>
  );
}
