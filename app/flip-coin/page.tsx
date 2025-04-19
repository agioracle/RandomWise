"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { getToolBySlug } from "@/data/tools";
import { getToolIntroductionBySlug } from "@/data/tool-introductions";
import { ToolIntroduction } from "@/components/tool-introduction";
import SocialShareButtons from "@/components/SocialShareButtons";

export default function FlipCoinPage() {
  // Get current tool information
  const currentTool = getToolBySlug('flip-coin');
  const toolIntroduction = getToolIntroductionBySlug('flip-coin');

  // State for coin flip
  const [result, setResult] = useState<'Heads' | 'Tails' | null>(null);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [repeatUntilHeads, setRepeatUntilHeads] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [flipCount, setFlipCount] = useState<number>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const flipCoin = () => {
    if (isFlipping) return; // Prevent flipping while already flipping

    setIsFlipping(true);
    setResult(null); // Clear previous result while flipping
    setFlipCount(prev => prev + 1);

    // Play sound if enabled
    if (soundEnabled) {
      const audio = new Audio('/sounds/coin-flip.mp3');
      audio.play();
    }

    // Simulate flip duration
    const flipDuration = 1000; // milliseconds
    const outcome = Math.random() < 0.5 ? 'Heads' : 'Tails';

    setTimeout(() => {
      setResult(outcome);
      setIsFlipping(false);

      // If repeat until heads is enabled and result is tails, flip again
      if (repeatUntilHeads && outcome === 'Tails') {
        setTimeout(() => flipCoin(), 500); // Wait a bit before flipping again
      }
    }, flipDuration);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0D0D23]">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center py-12 px-4 mt-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{currentTool?.name || 'Flip a Coin'}</h1>
        <p className="text-xl text-gray-300 mb-2">{currentTool?.description || 'Toss a virtual coin to decide between options.'}</p>

        <div className="flex flex-col items-center md:items-start mb-8">
          <SocialShareButtons />
        </div>

        {/* Coin Flip Card */}
        <Card className="w-full max-w-md bg-[#1A1A3A] border-[#3D3D6B] text-white rounded-xl overflow-hidden">
          {/* Coin Display Area */}
          <div className="p-8 flex justify-center items-center">
            <div className="coin-container relative w-48 h-48">
              <div
                className={`relative w-full h-full ${isFlipping ? 'animate-flip' : ''}`}
              >
                <Image
                  src={result === 'Heads' || (!result && !isFlipping) ? '/images/coin-heads.webp' : '/images/coin-tails.webp'}
                  alt={result || 'Coin'}
                  width={192}
                  height={192}
                  className={`object-contain transition-all duration-300 ${isFlipping ? 'opacity-100' : 'opacity-100'}`}
                  priority
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="px-8 pb-4 flex justify-between gap-4">
            <Button
              onClick={flipCoin}
              disabled={isFlipping}
              className="flex-1 bg-[#6C5DD3] hover:bg-[#5A4BBF] text-white py-6"
            >
              Toss
            </Button>
            {/* <Button
              variant="outline"
              className="flex-1 border-[#3D3D6B] text-white hover:bg-[#2A2A4A] py-6"
            >
              Customize
            </Button> */}
          </div>

          {/* Options */}
          <div className="border-t border-[#3D3D6B] px-8 py-4">
            <div className="flex justify-between items-center py-2">
              <span className="text-white">Repeat until heads</span>
              <Switch
                checked={repeatUntilHeads}
                onCheckedChange={setRepeatUntilHeads}
                className="data-[state=checked]:bg-[#6C5DD3]"
              />
            </div>
          </div>

          {/* Sound Option */}
          <div className="border-t border-[#3D3D6B] px-8 py-4">
            <div className="flex justify-between items-center py-2">
              <span className="text-white">Sound</span>
              <Switch
                checked={soundEnabled}
                onCheckedChange={setSoundEnabled}
                className="data-[state=checked]:bg-[#6C5DD3]"
              />
            </div>
          </div>
        </Card>

        {/* Stats (optional) */}
        {flipCount > 0 && (
          <div className="mt-8 text-center text-gray-300">
            <p>Total flips: {flipCount}</p>
            {result && <p>Last result: {result}</p>}
          </div>
        )}
      </main>

      {/* SEO Introduction */}
      <ToolIntroduction slug="flip-coin" />

      {/* Footer */}
      <Footer className="bg-[#0A0A1B] text-gray-400" />

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes flip {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(1080deg); }
        }
        .animate-flip {
          animation: flip 1s ease-out;
        }
      `}</style>
    </div>
  );
}
