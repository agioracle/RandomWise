import React from 'react';
import { getToolIntroductionBySlug } from '@/data/tool-introductions';

type ToolIntroductionProps = {
  slug: string;
  className?: string;
};

export function ToolIntroduction({ slug, className = '' }: ToolIntroductionProps) {
  const toolIntroduction = getToolIntroductionBySlug(slug);

  if (!toolIntroduction) return null;

  return (
    <section className={`max-w-4xl mx-auto px-4 py-12 text-gray-300 ${className}`}>
      <h2 className="text-2xl font-bold text-white mb-4">{toolIntroduction.title}</h2>
      <div className="space-y-4">
        {toolIntroduction.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
        {toolIntroduction.howToUse && (
          <>
            <h3 className="text-xl font-semibold text-white mt-6 mb-2">{toolIntroduction.howToUse.title}</h3>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              {toolIntroduction.howToUse.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </>
        )}
        {toolIntroduction.conclusion && (
          <p className="mt-4">{toolIntroduction.conclusion}</p>
        )}
      </div>
    </section>
  );
}
