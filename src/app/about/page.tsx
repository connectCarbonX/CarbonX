import type { Metadata } from 'next';
import { MarketingSite } from '@/app/page';

export const metadata: Metadata = {
  title: 'About Us | CARBON-X',
  description:
    'Learn more about the Carbon-X team, leadership direction, and the people shaping the platform across founder vision, technology, and management.',
};

export default function AboutPage() {
  return <MarketingSite page='about' />;
}
