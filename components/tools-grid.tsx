import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { LayoutGrid } from "lucide-react";
import { tools } from "@/data/tools";

export function ToolsGrid() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {tools.slice(0, 5).map((tool) => (
            <Link key={tool.name} href={`/${tool.slug}`} className="block hover:no-underline">
              <Card className="tool-card flex flex-col items-center justify-center p-4 h-full hover:shadow-lg transition-shadow">
                <Image
                  src={tool.image}
                  alt={tool.name}
                  width={tool.width}
                  height={tool.height}
                  className="w-16 h-16 mb-4 mx-auto"
                />
                <h3 className="text-xl font-semibold mb-2 text-center mt-4">{tool.name}</h3>
                {/* <p className="text-muted-foreground text-left text-sm px-2">{tool.description}</p> */}
              </Card>
            </Link>
          ))}
          {/* View All Tools Card */}
          <Card className="tool-card flex flex-col items-center justify-center p-4 text-center bg-secondary hover:bg-secondary/90 transition-colors h-full">
            <Link href="/all-tools" className="flex flex-col items-center justify-center h-full w-full">
              <LayoutGrid className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2 text-primary">View All Tools</h3>
              {/* <p className="text-muted-foreground text-left text-sm px-2">Explore our complete collection of random tools.</p> */}
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
}
