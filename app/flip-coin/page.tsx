import { getToolBySlug } from "@/data/tools";
import type { Metadata } from 'next';
import FlipCoinClient from './flip-coin-client';

// Generate metadata for this page
export async function generateMetadata(): Promise<Metadata> {
  const currentTool = getToolBySlug('flip-coin');

  return {
    title: currentTool?.name + ' - RandomWise',
    description: currentTool?.description,
    keywords: currentTool?.keywords ? currentTool.keywords.join(', ') : undefined,
  };
}

export default function FlipCoinPage() {
  return <FlipCoinClient />;
}
