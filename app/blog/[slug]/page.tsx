import React from "react";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import path from "path";
import fs from "fs";
import SocialShareButtons from "@/components/SocialShareButtons";

interface BlogDetailPageProps {
  params: { slug: string };
}

// Required for static export in Next.js App Router
export function generateStaticParams() {
  const articlesDir = path.join(process.cwd(), "app/blog/articles");
  const slugs = fs.readdirSync(articlesDir)
    .filter((file) => file.endsWith(".tsx"))
    .map((file) => ({ slug: file.replace(/\.tsx$/, "") }));
  return slugs;
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = params;
  let ArticleComponent: React.ComponentType | null = null;

  try {
    // Dynamically import the article component
    // Note: This works in Next.js if you use require and your articles are server components
    // For client components or if you want SSR, you may need to adjust this
    const articlePath = path.join(process.cwd(), "app/blog/articles", `${slug}.tsx`);
    if (fs.existsSync(articlePath)) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      ArticleComponent = require(`../articles/${slug}.tsx`).default;
    }
  } catch (err) {
    ArticleComponent = null;
  }

  if (!ArticleComponent) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0D0D23]">
      <Navigation />
      <main className="flex-1 flex flex-col items-center justify-center py-12 px-4 mt-16 w-full">
        <div className="w-full max-w-2xl bg-[#1A1A3A] border-[#3D3D6B] text-white rounded-xl overflow-hidden p-8">
          <ArticleComponent />
        </div>
        <div className="flex flex-col items-center md:items-start mb-8">
          <SocialShareButtons />
        </div>
      </main>
      <Footer className="bg-[#0A0A1B] text-gray-400" />
    </div>
  );
}
