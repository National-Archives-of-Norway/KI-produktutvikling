import Link from "next/link";
import { resources } from "@/content/resources";

export const metadata = { title: "Nettstedskart" };

export default function SiteMapPage() {
  return (
    <article className="article">
      <Link href="/">← Til forsiden</Link>
      <h1>Nettstedskart</h1>
      <p>Finn alle sidene i KI-Produktutvikling.</p>
      <h2>Sider</h2>
      <ul>
        <li>
          <Link href="/">Forsiden</Link>
        </li>
        <li>
          <Link href="/#ressurser">Verktøykatalog</Link>
        </li>
        <li>
          <Link href="/kom-i-gang/">Kom i gang</Link>
        </li>
        <li>
          <Link href="/om/">Om portalen</Link>
        </li>
        <li>
          <Link href="/spor/">Spør kunnskapsbasen</Link>
        </li>
        <li>
          <Link href="/tilgjengelighet/">Tilgjengelighetserklæring</Link>
        </li>
      </ul>
      <h2>Ressurser</h2>
      <ul>
        {resources.map((resource) => (
          <li key={resource.slug}>
            <Link href={`/ressurser/${resource.slug}/`}>{resource.title}</Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
