import type { Metadata } from 'next';
import { MarketingSite } from '@/app/page';

export const metadata: Metadata = {
  title: 'X-Coin | CARBON-X',
  description:
    'Learn how the CARBON-X X-Coin system turns sustainable actions into measurable value and future rewards.',
};

export default function XCoinPage() {
  return <MarketingSite page='x-coin' />;
}
