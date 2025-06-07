import { getToolBySlug } from "@/data/tools";
import type { Metadata } from 'next';
import RandomNumberGeneratorClient from './random-number-generator-client';

// Generate metadata for this page
export async function generateMetadata(): Promise<Metadata> {
  const currentTool = getToolBySlug('random-number-generator');

  return {
    title: currentTool?.name + ' - RandomWise',
    description: currentTool?.description,
    keywords: currentTool?.keywords ? currentTool.keywords.join(', ') : undefined,
    alternates: {
      canonical: '/random-number-generator',
    },
    openGraph: {
      title: currentTool?.name + ' - RandomWise',
      description: currentTool?.description,
      url: 'https://randomwise.app/random-number-generator',
      siteName: 'RandomWise',
    },
  };
}

export default function RandomNumberGeneratorPage() {
  return <RandomNumberGeneratorClient />;
}
