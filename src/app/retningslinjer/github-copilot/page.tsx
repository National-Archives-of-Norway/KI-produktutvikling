import { ContentArticle } from "@/components/content-article";
import { copilotGuidelines } from "@/content/pages/github-copilot";

export const metadata = {
  title: copilotGuidelines.navTitle,
  description: copilotGuidelines.lead,
};

export default function Page() {
  return <ContentArticle page={copilotGuidelines} />;
}
