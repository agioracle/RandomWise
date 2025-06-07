import { getToolBySlug } from "@/data/tools";
import type { Metadata } from 'next';
import RockPaperScissorsClient from './rock-paper-scissors-client';

// Generate metadata for this page
export async function generateMetadata(): Promise<Metadata> {
  const currentTool = getToolBySlug('rock-paper-scissors');

  return {
    title: currentTool?.name + ' - RandomWise',
    description: currentTool?.description,
    keywords: currentTool?.keywords ? currentTool.keywords.join(', ') : undefined,
    alternates: {
      canonical: '/rock-paper-scissors',
    },
    openGraph: {
      title: currentTool?.name + ' - RandomWise',
      description: currentTool?.description,
      url: 'https://randomwise.app/rock-paper-scissors',
      siteName: 'RandomWise',
    },
  };
}

export default function RockPaperScissorsPage() {
  return <RockPaperScissorsClient />;
}
