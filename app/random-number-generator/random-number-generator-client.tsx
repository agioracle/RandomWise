"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { getToolBySlug } from "@/data/tools";
import { ToolIntroduction } from "@/components/tool-introduction";
import SocialShareButtons from "@/components/SocialShareButtons";

export default function RandomNumberGeneratorClient() {
  // Get current tool information
  const currentTool = getToolBySlug('random-number-generator');

  // State for random number generator
  const [minValue, setMinValue] = useState<number>(1);
  const [maxValue, setMaxValue] = useState<number>(100);
  const [result, setResult] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [generateCount, setGenerateCount] = useState<number>(0);
  const [displayNumber, setDisplayNumber] = useState<number | string>(8);
  const [resultHistory, setResultHistory] = useState<number[]>([]);

  // Animation reference
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const finalNumberRef = useRef<number | null>(null);

  // Handle min value change
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setMinValue(value);
    }
  };

  // Handle max value change
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setMaxValue(value);
    }
  };

  // Generate random number
  const generateNumber = () => {
    if (isGenerating) return; // Prevent generating while already in progress

    setIsGenerating(true);
    setGenerateCount(prev => prev + 1);

    // Play sound if enabled
    if (soundEnabled) {
      const audio = new Audio('/sounds/random-number-generator.mp3');
      audio.play().catch(e => console.error("Audio play error:", e));
    }

    // Ensure min is less than max
    const min = Math.min(minValue, maxValue);
    const max = Math.max(minValue, maxValue);

    // Generate the final random number
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    finalNumberRef.current = randomNum;

    // Start the rolling animation
    startTimeRef.current = performance.now();
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    // Animation duration in milliseconds (less than 1 second)
    const animationDuration = 3600; // Changed to 3.6 seconds for a longer animation

    // Animation function
    const animateRolling = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;

      // Calculate progress (0 to 1)
      const progress = Math.min(elapsed / animationDuration, 1);

      // Slow down the rolling as we approach the end
      // Easing function to make the animation more natural
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      if (progress < 1) {
        // Generate a random number for display during animation
        // As progress increases, make the random range smaller to converge on the final number
        const range = max - min;
        const currentMin = min + Math.floor(range * easedProgress * 0.8);
        const currentMax = max - Math.floor(range * easedProgress * 0.8);

        // If we're in the last 20% of the animation, start showing numbers closer to the final result
        if (progress > 0.8) {
          const closeness = (progress - 0.8) * 5; // 0 to 1 in the last 20%
          const targetNumber = finalNumberRef.current || randomNum;
          const variance = Math.floor((1 - closeness) * 10);
          setDisplayNumber(targetNumber - variance + Math.floor(Math.random() * (variance * 2)));
        } else {
          // Random number within the current range
          setDisplayNumber(Math.floor(Math.random() * (currentMax - currentMin + 1)) + currentMin);
        }

        // Continue animation
        animationRef.current = requestAnimationFrame(animateRolling);
      } else {
        // Animation complete, show the final result
        setDisplayNumber(finalNumberRef.current || randomNum);
        setResult(finalNumberRef.current || randomNum);

        // Add to history (keeping only the last 10 results)
        setResultHistory(prev => {
          const newHistory = [finalNumberRef.current || randomNum, ...prev];
          return newHistory.slice(0, 8); // Keep only the last 10 results
        });

        setIsGenerating(false);
        animationRef.current = null;
        startTimeRef.current = null;
      }
    };

    // Start the animation
    animationRef.current = requestAnimationFrame(animateRolling);
  };

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#0D0D23]">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center py-12 px-4 mt-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{currentTool?.name || 'Random Number Generator'}</h1>
        <p className="text-xl text-gray-300 mb-2">{currentTool?.description || 'Generate a random number quickly and easily!'}</p>

        <div className="flex flex-col items-center md:items-start mb-8">
          <SocialShareButtons />
        </div>

        {/* Random Number Generator Card */}
        <Card className="w-full max-w-md bg-[#1A1A3A] border-[#3D3D6B] text-white rounded-xl overflow-hidden">
          {/* Input Fields */}
          <div className="p-8 flex justify-between gap-4">
            <div className="w-1/2">
              <label htmlFor="min" className="block text-sm font-medium text-gray-300 mb-2">Min</label>
              <Input
                id="min"
                type="number"
                value={minValue}
                onChange={handleMinChange}
                className="bg-[#2A2A4A] border-[#3D3D6B] text-white"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="max" className="block text-sm font-medium text-gray-300 mb-2">Max</label>
              <Input
                id="max"
                type="number"
                value={maxValue}
                onChange={handleMaxChange}
                className="bg-[#2A2A4A] border-[#3D3D6B] text-white"
              />
            </div>
          </div>

          {/* Result Display Area */}
          <div className="p-8 flex justify-center items-center">
            <div className="result-container relative w-48 h-36 flex items-center justify-center">
              <div className={`text-8xl font-bold ${isGenerating ? 'number-roll' : ''}`}>
                {displayNumber}
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <div className="px-8 pb-4">
            <Button
              onClick={generateNumber}
              disabled={isGenerating}
              className="w-full bg-[#6C5DD3] hover:bg-[#5A4BBF] text-white py-6"
            >
              Generate
            </Button>
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
        {generateCount > 0 && (
          <div className="mt-8 text-center text-gray-300">
            <p>Total generations: {generateCount}</p>

            {/* Display last 10 results */}
            <div className="mt-4">
              <p className="mb-2">Last results:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {resultHistory.map((num, index) => (
                  <span
                    key={index}
                    className={`inline-block px-3 py-1 rounded-full ${index === 0 ? 'bg-[#6C5DD3] text-white' : 'bg-[#2A2A4A] text-gray-300'}`}
                  >
                    {num}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* SEO Introduction */}
      <ToolIntroduction slug="random-number-generator" />

      {/* Footer */}
      <Footer className="bg-[#0A0A1B] text-gray-400" />

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        .animate-pulse {
          animation: pulse 0.8s infinite;
        }

        .number-roll {
          position: relative;
          overflow: hidden;
          transform-style: preserve-3d;
        }

        .number-roll::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, rgba(26, 26, 58, 0.2) 0%, rgba(26, 26, 58, 0) 20%, rgba(26, 26, 58, 0) 80%, rgba(26, 26, 58, 0.2) 100%);
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
