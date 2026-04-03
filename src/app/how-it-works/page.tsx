import type { Metadata } from 'next';
import { MarketingSite } from '@/app/page';

export const metadata: Metadata = {
  title: 'How It Works | CARBON-X',
  description:
    'See how CARBON-X works step by step, from joining the beta to logging eco-actions and tracking your impact.',
};

export default function HowItWorksPage() {
  return <MarketingSite page='how-it-works' />;
}
