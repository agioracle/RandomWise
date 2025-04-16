import React from "react";
import Image from "next/image";
import { tools } from "@/data/tools";

export function Hero() {
  return (
    <section className="hero-gradient pt-32 pb-20 px-4 relative overflow-hidden">
      <div className="container mx-auto text-center relative">
        <h1 className="text-5xl font-bold mb-6">
          Struggling to make a decision?
        </h1>
        <p className="text-xl text-muted-foreground mb-12">
          Make decisions easy & fun with our complete collection of free random tools.
        </p>
        <div className="flex justify-center gap-8 flex-wrap">
          {tools.slice(0, 5).map((tool, index) => (
            <div key={tool.name} className={`w-24 text-primary ${index >= 3 ? 'hidden sm:block' : ''}`}>
              <Image
                src={tool.image}
                alt={tool.name}
                width={tool.width}
                height={tool.height}
                className="w-24 h-24 mb-2"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
