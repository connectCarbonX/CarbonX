import type { Metadata } from 'next';
import { MarketingSite } from '@/app/page';

export const metadata: Metadata = {
  title: 'Impact | CARBON-X',
  description:
    'View the live CARBON-X impact story, including emissions saved, water conserved, and travel offset equivalents.',
};

export default function ImpactPage() {
  return <MarketingSite page='impact' />;
}
