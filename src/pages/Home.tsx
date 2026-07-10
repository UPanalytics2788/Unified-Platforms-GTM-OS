import PageTemplate from '../components/PageTemplate';
import { useSitePage } from '../hooks/useSitePage';
import { HOME_PAGE } from '../data/sitePages';

export default function Home() {
  // Realtime CMS document (pages/home) with code fallback — edits in the
  // Admin panel appear here instantly without a redeploy.
  const { data } = useSitePage('home', HOME_PAGE);

  return <PageTemplate data={data} />;
}
