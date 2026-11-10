import { ContentArticle } from "@/components/content-article";
import { cookieInformation } from "@/content/pages/informasjonskapsler";
export const metadata = {
  title: cookieInformation.navTitle,
  description: cookieInformation.lead,
};
export default function Page() {
  return <ContentArticle page={cookieInformation} />;
}
