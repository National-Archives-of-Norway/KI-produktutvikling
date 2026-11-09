import { ContentArticle } from "@/components/content-article";
import { about } from "@/content/pages/om";

export const metadata = { title: about.navTitle, description: about.lead };

export default function Page() {
  return <ContentArticle page={about} />;
}
