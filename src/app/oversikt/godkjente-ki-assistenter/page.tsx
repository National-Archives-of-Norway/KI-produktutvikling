import { ContentArticle } from "@/components/content-article";
import { approvedAssistants } from "@/content/pages/godkjente-ki-assistenter";
export const metadata = {
  title: approvedAssistants.navTitle,
  description: approvedAssistants.lead,
};
export default function Page() {
  return <ContentArticle page={approvedAssistants} />;
}
