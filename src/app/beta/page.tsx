import type { Metadata } from 'next';
import { MarketingSite } from '@/app/page';

export const metadata: Metadata = {
  title: 'Beta Phase | CARBON-X',
  description:
    'Get the latest beta-phase details for CARBON-X, including testing status, product validation, and launch readiness.',
};

export default function BetaPage() {
  return <MarketingSite page='beta' />;
}
