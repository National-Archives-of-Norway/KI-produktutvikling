import Link from "next/link";
import {
  getFeatures,
  featureStatuses,
  featureOverview,
} from "@/content/features";
import { resources } from "@/content/resources";
import { contentPages } from "@/content/knowledge";

export const metadata = {
  title: "Funksjonalitetsoversikt",
  description: "Hva KI-Produktutvikling tilbyr og hva som krever mer oppsett.",
};

export default function FeaturesPage() {
  const features = getFeatures();
  return (
    <article className="article">
      <Link href="/">← Til forsiden</Link>
      <div className="eyebrow">PORTALENS FUNKSJONER</div>
      <h1>Hva kan du gjøre i portalen?</h1>
      <p className="lead">{featureOverview.lead}</p>
      <p>
        {resources.length} ressurser ·{" "}
        {resources.filter((resource) => resource.type === "Skill").length}{" "}
        skills · {contentPages.length} felles innholdssider
      </p>
      <p>
        Oversikten oppdateres fra portalens funksjonsregister og innhold ved
        bygging. {featureOverview.note}
      </p>
      {[
        {
          title: "Dette finnes i portalen",
          items: features.filter(
            (feature) => !["planned", "setup"].includes(feature.status),
          ),
        },
        {
          title: "Krever mer oppsett eller utvikling",
          items: features.filter((feature) =>
            ["planned", "setup"].includes(feature.status),
          ),
        },
      ].map((group) => (
        <section key={group.title}>
          <h2>{group.title}</h2>
          {group.items.map((feature) => (
            <section
              key={feature.id}
              aria-labelledby={`feature-${feature.id}`}
              className="feature-summary"
            >
              <p className="feature-status">
                {featureStatuses[feature.status]}
              </p>
              <h3 id={`feature-${feature.id}`}>{feature.title}</h3>
              <p>{feature.description}</p>
              {feature.href && (
                <Link href={feature.href}>Gå til {feature.title} →</Link>
              )}
            </section>
          ))}
        </section>
      ))}
      <p>
        Se <Link href="/versjonslogg/">versjonsloggen</Link> for endringer og
        dokumenterte kontroller.
      </p>
    </article>
  );
}
