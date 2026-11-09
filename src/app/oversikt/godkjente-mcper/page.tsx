import { ContentArticle } from "@/components/content-article";
import { mcpOverview } from "@/content/pages/godkjente-mcper";
export const metadata = {
  title: mcpOverview.navTitle,
  description: mcpOverview.lead,
};
export default function Page() {
  return <ContentArticle page={mcpOverview} />;
}
