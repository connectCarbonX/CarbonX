import type { Metadata } from 'next';
import { MarketingSite } from '@/app/page';

export const metadata: Metadata = {
  title: 'Features | CARBON-X',
  description:
    'Explore the core CARBON-X features, from action tracking and impact analytics to AI-powered sustainability insights.',
};

export default function FeaturesPage() {
  return <MarketingSite page='features' />;
}
