import Link from "next/link";
import { getSiteLinks } from "@/content/features";
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
        {getSiteLinks().map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
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
