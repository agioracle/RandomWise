import { getToolBySlug } from "@/data/tools";
import type { Metadata } from 'next';
import RollDiceClient from './roll-dice-client';

// Generate metadata for this page
export async function generateMetadata(): Promise<Metadata> {
  const currentTool = getToolBySlug('roll-dice');

  return {
    title: currentTool?.name + ' - RandomWise',
    description: currentTool?.description,
    keywords: currentTool?.keywords ? currentTool.keywords.join(', ') : undefined,
    alternates: {
      canonical: '/roll-dice',
    },
    openGraph: {
      title: currentTool?.name + ' - RandomWise',
      description: currentTool?.description,
      url: 'https://randomwise.app/roll-dice',
      siteName: 'RandomWise',
    },
  };
}

export default function RollDicePage() {
  return <RollDiceClient />;
}
