"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface NavigationProps {
  className?: string;
}

export function Navigation({ className = "" }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`fixed w-full z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${className}`}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold" onClick={() => setIsMobileMenuOpen(false)}>
          RandomWise
        </Link>
        {/* Desktop Menu Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/tools" className="hover:text-primary transition-colors">
            All Tools
          </Link>
          <Link href="/ask-decidely" className="hover:text-primary transition-colors">
            Ask Decidely
          </Link>
          <Link href="/blog" className="hover:text-primary transition-colors">
            Blog
          </Link>
        </div>
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-background shadow-md py-4 px-4">
          <div className="flex flex-col space-y-4">
            <Link 
              href="/" 
              className="text-foreground/80 hover:text-primary transition-colors block" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/tools" 
              className="text-foreground/80 hover:text-primary transition-colors block" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              All Tools
            </Link>
            <Link 
              href="/ask-decidely" 
              className="text-foreground/80 hover:text-primary transition-colors block" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Ask Decidely
            </Link>
            <Link 
              href="/blog" 
              className="text-foreground/80 hover:text-primary transition-colors block" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
