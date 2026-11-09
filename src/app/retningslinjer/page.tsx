import { ContentArticle } from "@/components/content-article";
import { guidelines } from "@/content/pages/retningslinjer";

export const metadata = {
  title: guidelines.navTitle,
  description: guidelines.lead,
};

export default function Page() {
  return <ContentArticle page={guidelines} />;
}
