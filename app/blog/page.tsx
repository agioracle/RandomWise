import React from "react";
import fs from "fs";
import path from "path";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

// Helper to get all article filenames
function getArticleSlugs() {
  const articlesDir = path.join(process.cwd(), "app/blog/articles");
  return fs.readdirSync(articlesDir)
    .filter((file) => file.endsWith(".tsx"))
    .map((file) => file.replace(/\.tsx$/, ""));
}

// Helper to get article metadata (for demo, just slug and title)
function getArticles() {
  const slugs = getArticleSlugs();
  return slugs
    .map((slug) => {
      const article = require(`./articles/${slug}.tsx`);
      const meta = article.metadata || {};
      return {
        slug,
        title: meta.title || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        excerpt: meta.excerpt || "",
        date: meta.date || "",
        author: meta.author || "",
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0)); // Sort descending by date
}

export default function BlogListPage() {
  const articles = getArticles();
  return (
    <div className="flex flex-col min-h-screen bg-[#0D0D23]">
      <Navigation />
      <main className="flex-1 flex flex-col items-center justify-center py-12 px-4 mt-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Blog</h1>
        <p className="text-xl text-gray-300 mb-12">Read latest articles and updates from RandomWise.</p>
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8">
          {articles.map((article) => (
            <Card key={article.slug} className="bg-[#1A1A3A] border-[#3D3D6B] text-white rounded-xl overflow-hidden flex flex-col">
              <div className="p-6 flex-1 flex flex-col">
                <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
                <p className="text-gray-400 mb-2 text-sm">By {article.author} · {article.date}</p>
                <p className="mb-4 text-gray-300">{article.excerpt}</p>
                <Link href={`/blog/${article.slug}`} className="mt-auto text-[#6C5DD3] hover:underline font-semibold">Read More →</Link>
              </div>
            </Card>
          ))}
        </div>
      </main>
      <Footer className="bg-[#0A0A1B] text-gray-400" />
    </div>
  );
}
