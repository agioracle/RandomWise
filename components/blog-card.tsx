import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/data/blog-posts";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group" prefetch>
      <Card className="bg-[#1A1A3A] border-[#3D3D6B] text-white rounded-xl overflow-hidden transition-shadow hover:shadow-lg group-hover:shadow-2xl">
        {post.image && (
          <div className="relative w-full h-48">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
            />
          </div>
        )}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
          <p className="text-gray-300 mb-4">{post.excerpt}</p>
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>{post.author}</span>
            <span>{new Date(post.date).toLocaleDateString()}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
