"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Sun, Settings2, CircleSlash, LayoutGrid } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { tools } from "@/data/tools";
import { Features } from "@/components/features";
import { Testimonials } from "@/components/testimonials";
import { Hero } from "@/components/hero";
import { ToolsGrid } from "@/components/tools-grid";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <Hero />

      {/* Tools Grid */}
      <ToolsGrid />

      {/* Features */}
      <Features />

      {/* Testimonials */}
      <Testimonials />

      {/* Footer */}
      <Footer />
    </div>
  );
}
