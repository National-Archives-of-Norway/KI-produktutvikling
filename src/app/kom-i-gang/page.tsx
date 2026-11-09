import { ContentArticle } from "@/components/content-article";
import { gettingStarted } from "@/content/pages/kom-i-gang";

export const metadata = {
  title: gettingStarted.navTitle,
  description: gettingStarted.lead,
};

export default function Page() {
  return <ContentArticle page={gettingStarted} />;
}
