import { ContentArticle } from "@/components/content-article";
import { privacy } from "@/content/pages/personvern";

export const metadata = { title: privacy.navTitle, description: privacy.lead };

export default function Page() {
  return <ContentArticle page={privacy} />;
}
