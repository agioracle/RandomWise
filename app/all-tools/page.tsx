"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { getAllTools } from "@/data/tools";

export default function AllToolsPage() {
  const tools = getAllTools();

  return (
    <div className="flex flex-col min-h-screen bg-[#0D0D23]">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center py-12 px-4 mt-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">All Tools</h1>
        <p className="text-xl text-gray-300 mb-12">Explore our complete collection of random tools for quick decision-making.</p>

        {/* Tools Grid */}
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {tools.map((tool) => (
              <Link key={tool.name} href={`/${tool.slug}`} className="block hover:no-underline">
                <Card className="tool-card flex flex-col items-center justify-center p-6 h-full hover:shadow-lg transition-shadow bg-[#1A1A3A] border-[#3D3D6B] text-white rounded-xl overflow-hidden">
                  <div className="w-24 h-24 relative mb-6">
                    <Image
                      src={tool.image}
                      alt={tool.name}
                      width={tool.width}
                      height={tool.height}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-center">{tool.name}</h3>
                  <p className="text-gray-300 text-center">{tool.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-16">
          <Link
            href="/"
            className="text-[#6C5DD3] hover:text-[#5A4BBF] flex items-center justify-center"
          >
            <span className="mr-2">←</span> Back to Home
          </Link>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
