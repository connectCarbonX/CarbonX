import type { Metadata } from 'next';
import CmsAdminPage from '@/components/cms/cms-admin-page';

export const metadata: Metadata = {
  title: 'CMS | CARBON-X',
  description: 'Private admin console for CARBON-X constants management.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CmsPage() {
  return <CmsAdminPage />;
}
