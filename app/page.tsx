"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Sun, Settings2, CircleSlash, Menu, X, LayoutGrid } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const tools = [
    {
      name: "Flip Coin",
      image: "/images/coin.png",
      description: "Make a quick yes/no decision with our virtual coin flipper.",
      width: 120,
      height: 120,
    },
    {
      name: "Spin Wheel",
      image: "/images/wheel.png",
      description: "Randomly select items or make choices with our customizable spinning wheel.",
      width: 120,
      height: 120,
    },
    {
      name: "Roll Dice",
      image: "/images/dice.png",
      description: "Simulate rolling single or multiple dice for games or random outcomes.",
      width: 120,
      height: 120,
    },
    {
      name: "Random Number",
      image: "/images/randnum.png",
      description: "Generate secure random numbers within your specified range.",
      width: 120,
      height: 120,
    },
    {
      name: "Rock Paper Scissors",
      image: "/images/rps.png",
      description: "Play a quick game of Rock Paper Scissors to settle decisions.",
      width: 120,
      height: 120,
    },
    {
      name: "Card Picker",
      image: "/images/cards.png",
      description: "Randomly draw one or more cards from a standard 52-card deck.",
      width: 120,
      height: 120,
    },
  ];

  const features = [
    {
      icon: Sun,
      title: "Quick & Easy",
      description: "Make 'wise' decisions in seconds with our user-friendly and fun random tools.",
    },
    {
      icon: Settings2,
      title: "Customizable",
      description: "Personalize the random tools to suit your decision-making needs.",
    },
    {
      icon: CircleSlash,
      title: "Always Free",
      description: "Enjoy unlimited access to all random tools at no cost.",
    },
  ];

  const testimonials = [
    {
      quote: "RandomWise is a lifesaver! It's my go-to whenever I need to make a quick decision. Highly recommended!",
      name: "Sarah W.",
      title: "Frequent User",
      avatar: "/images/avatars/avatar1.png",
    },
    {
      quote: "The variety of tools is amazing. From simple coin flips to tarot readings, it has everything.",
      name: "Callia P.",
      title: "Event Planner",
      avatar: "/images/avatars/avatar2.png",
    },
    {
      quote: "I love using the Spin Wheel for fun group decisions. It always adds an element of excitement!",
      name: "Mike G.",
      title: "Office Worker",
      avatar: "/images/avatars/avatar3.png",
    },
    {
      quote: "Finally, a site that gathers all these useful random tools in one place. Well designed and easy to use.",
      name: "Alex T.",
      title: "Student",
      avatar: "/images/avatars/avatar4.png",
    },
    {
      quote: "The 'Ask Decidely' feature is surprisingly insightful. It helped me think through a tough choice.",
      name: "Jessica R.",
      title: "Student",
      avatar: "/images/avatars/avatar5.png",
    },
    {
      quote: "Simple, fast, and reliable. What more could you ask for in a random generator tool?",
      name: "David K.",
      title: "Developer",
      avatar: "/images/avatars/avatar6.png",
    }
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
            <Link href="/about" className="hover:text-primary transition-colors">
              About
            </Link>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background shadow-md md:hidden">
            <div className="container mx-auto px-4 py-4 flex flex-col items-center gap-4">
              <Link href="/" className="hover:text-primary transition-colors w-full text-center py-2" onClick={toggleMobileMenu}>
                Home
              </Link>
              <Link href="/tools" className="hover:text-primary transition-colors w-full text-center py-2" onClick={toggleMobileMenu}>
                All Tools
              </Link>
              <Link href="/ask-decidely" className="hover:text-primary transition-colors w-full text-center py-2" onClick={toggleMobileMenu}>
                Ask Decidely
              </Link>
              <Link href="/blog" className="hover:text-primary transition-colors w-full text-center py-2" onClick={toggleMobileMenu}>
                Blog
              </Link>
              <Link href="/about" className="hover:text-primary transition-colors w-full text-center py-2" onClick={toggleMobileMenu}>
                About
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
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

      {/* Tools Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {tools.map((tool) => (
              <Card key={tool.name} className="tool-card flex flex-col items-center justify-center p-4 hover:shadow-lg transition-shadow">
                <Image
                  src={tool.image}
                  alt={tool.name}
                  width={tool.width}
                  height={tool.height}
                  className="w-16 h-16 mb-4 mx-auto"
                />
                <h3 className="text-xl font-semibold mb-2 text-center mt-4">{tool.name}</h3>
                <p className="text-muted-foreground text-left text-sm px-2">{tool.description}</p>
              </Card>
            ))}
            {/* View All Tools Card */}
            <Card className="tool-card flex flex-col items-center justify-center p-4 text-center bg-secondary hover:bg-secondary/90 transition-colors h-full">
              <Link href="/tools" className="flex flex-col items-center justify-center h-full w-full">
                <LayoutGrid className="w-12 h-12 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2 text-primary">View All Tools</h3>
                <p className="text-muted-foreground text-left text-sm px-2">Explore our complete collection of random tools.</p>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">Features</h2>
          <div className="grid grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="text-center">
                  <Icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-left text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-secondary">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Users Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="testimonial-card flex flex-col">
                <CardContent className="pt-6 flex-grow">
                  <blockquote className="text-lg mb-6 italic before:content-['“'] after:content-['”']">
                    {testimonial.quote}
                  </blockquote>
                </CardContent>
                <CardFooter className="flex items-center gap-4 mt-auto">
                  <Image src={testimonial.avatar} alt={testimonial.name} width={48} height={48} className="rounded-full" />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted text-muted-foreground py-8 px-4 mt-auto">
        <div className="container mx-auto text-center">
          <p className="mb-4">&copy; {new Date().getFullYear()} RandomWise. All rights reserved.</p>
          <div className="flex justify-center gap-4">
            <Link href="/privacy" className="text-sm hover:text-primary transition-colors">Privacy Policy</Link>
            <span className="text-sm">|</span>
            <Link href="/terms" className="text-sm hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
