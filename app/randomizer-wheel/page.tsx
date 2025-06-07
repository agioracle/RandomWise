import { getToolBySlug } from "@/data/tools";
import type { Metadata } from 'next';
import RandomizerWheelClient from './randomizer-wheel-client';

// Generate metadata for this page
export async function generateMetadata(): Promise<Metadata> {
  const currentTool = getToolBySlug('randomizer-wheel');

  return {
    title: currentTool?.name + ' - RandomWise',
    description: currentTool?.description,
    keywords: currentTool?.keywords ? currentTool.keywords.join(', ') : undefined,
    alternates: {
      canonical: '/randomizer-wheel',
    },
    openGraph: {
      title: currentTool?.name + ' - RandomWise',
      description: currentTool?.description,
      url: 'https://randomwise.app/randomizer-wheel',
      siteName: 'RandomWise',
    },
  };
}

export default function RandomizerWheelPage() {
  return <RandomizerWheelClient />;
}
