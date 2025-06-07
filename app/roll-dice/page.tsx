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
  };
}

export default function RollDicePage() {
  return <RollDiceClient />;
}
