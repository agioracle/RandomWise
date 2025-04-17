"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { getToolBySlug } from "@/data/tools";
import { ToolIntroduction } from "@/components/tool-introduction";

// Define dice types with their sides and colors
const diceTypes = [
  { id: 'd4', sides: 4, color: '#FF6B6B', shape: 'tetrahedron' }, // Tetrahedron
  { id: 'd6', sides: 6, color: '#4A3EAF', shape: 'cube' },   // Cube
  { id: 'd8', sides: 8, color: '#4ECDC4', shape: 'octahedron' },  // Octahedron
  { id: 'd10', sides: 10, color: '#FFD166', shape: 'decahedron' }, // Decahedron
  { id: 'd12', sides: 12, color: '#F72585', shape: 'dodecahedron' }, // Dodecahedron
  { id: 'd20', sides: 20, color: '#8AC926', shape: 'icosahedron' }  // Icosahedron
];

export default function RollDicePage() {
  // Get current tool information
  const currentTool = getToolBySlug('roll-dice');

  // State for dice roll
  const [selectedDiceType, setSelectedDiceType] = useState<string>('d6'); // Default to d6 dice
  const [diceCount, setDiceCount] = useState<number>(2); // Default to 2 dice
  const [results, setResults] = useState<number[]>([]);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [rollCount, setRollCount] = useState<number>(0);
  const [rollHistory, setRollHistory] = useState<{diceType: string, count: number, results: number[]}[]>([]);
  const [showCustomize, setShowCustomize] = useState<boolean>(false);

  // Animation references
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const finalResultsRef = useRef<number[]>([]);

  // Get dice details by id
  const getDiceDetails = (diceId: string) => {
    return diceTypes.find(dice => dice.id === diceId) || diceTypes[1]; // Default to d6
  };

  // Roll the dice
  const rollDice = () => {
    if (isRolling) return; // Prevent rolling while already rolling

    setIsRolling(true);
    setRollCount(prev => prev + 1);

    // Play sound if enabled
    if (soundEnabled) {
      const audio = new Audio('/sounds/dice-roll.mp3');
      audio.play().catch(e => console.error("Audio play error:", e));
    }

    // Generate final results
    const finalResults = Array(diceCount).fill(0).map(() => {
      const { sides } = getDiceDetails(selectedDiceType);
      return Math.floor(Math.random() * sides) + 1;
    });

    finalResultsRef.current = finalResults;

    // Start the rolling animation
    startTimeRef.current = performance.now();
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    // Animation duration in milliseconds
    const animationDuration = 800; // Reduced from 2000ms to 800ms

    // Animation function
    const animateRolling = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;

      // Calculate progress (0 to 1)
      const progress = Math.min(elapsed / animationDuration, 1);

      // Easing function to make the animation more natural
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      if (progress < 1) {
        // Generate random numbers for display during animation
        const animationResults = Array(diceCount).fill(0).map(() => {
          const { sides } = getDiceDetails(selectedDiceType);
          return Math.floor(Math.random() * sides) + 1;
        });

        setResults(animationResults);

        // Continue animation
        animationRef.current = requestAnimationFrame(animateRolling);
      } else {
        // Animation complete, show the final result
        setResults(finalResultsRef.current);

        // Add to history (keeping only the last 8 results)
        setRollHistory(prev => {
          const newHistory = [
            { diceType: selectedDiceType, count: diceCount, results: [...finalResultsRef.current] },
            ...prev
          ];
          return newHistory.slice(0, 8);
        });

        setIsRolling(false);
        animationRef.current = null;
        startTimeRef.current = null;
      }
    };

    // Start the animation
    animationRef.current = requestAnimationFrame(animateRolling);
  };

  // Select dice type
  const selectDiceType = (diceId: string) => {
    setSelectedDiceType(diceId);
  };

  // Increase dice count
  const increaseDiceCount = () => {
    if (diceCount < 5) { // Maximum 5 dice
      setDiceCount(diceCount + 1);
    }
  };

  // Decrease dice count
  const decreaseDiceCount = () => {
    if (diceCount > 1) { // Minimum 1 die
      setDiceCount(diceCount - 1);
    }
  };

  // Reset to default dice selection
  const resetDice = () => {
    setSelectedDiceType('d6');
    setDiceCount(2);
  };

  // Render a die with the appropriate shape and number
  const renderDie = (diceId: string, result: number | string, index: number) => {
    const { color, shape, sides } = getDiceDetails(diceId);

    // For d6 (cube), render all faces in 3D
    if (diceId === 'd6') {
      return (
        <div
          key={index}
          className={`die-container relative m-2 ${isRolling ? 'rolling' : ''}`}
        >
          <div
            className={`dice-3d dice-${diceId} ${isRolling ? 'animate-roll' : ''}`}
            style={{
              '--dice-color': color,
              '--dice-text-color': 'white'
            } as React.CSSProperties}
            data-result={result || '?'}
          >
            <div className="dice-face dice-face-1">{result || '?'}</div>
            <div className="dice-face dice-face-2">{result || '?'}</div>
            <div className="dice-face dice-face-3">{result || '?'}</div>
            <div className="dice-face dice-face-4">{result || '?'}</div>
            <div className="dice-face dice-face-5">{result || '?'}</div>
            <div className="dice-face dice-face-6">{result || '?'}</div>
          </div>
        </div>
      );
    }

    // For all other dice, render a simple 2D shape with rotation animation
    return (
      <div
        key={index}
        className={`die-container relative m-2 ${isRolling ? 'rolling' : ''}`}
      >
        <div
          className={`dice-simple dice-${diceId} ${isRolling ? 'simple-animate-roll' : ''}`}
          style={{
            '--dice-color': color,
            '--dice-text-color': 'white'
          } as React.CSSProperties}
          data-result={result || '?'}
        >
          <div className="dice-simple-face">
            {result || '?'}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0D0D23]">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center py-12 px-4 mt-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{currentTool?.name || 'Roll Dice'}</h1>
        <p className="text-xl text-gray-300 mb-12">{currentTool?.description || 'Roll virtual dice for games or random decisions.'}</p>

        {/* Dice Roll Card */}
        <Card className="w-full max-w-md bg-[#1A1A3A] border-[#3D3D6B] text-white rounded-xl overflow-hidden">
          {/* Dice Display Area */}
          <div className="p-8 flex flex-wrap justify-center items-center">
            <div className="dice-container relative flex flex-wrap justify-center">
              {Array(diceCount).fill(0).map((_, index) => (
                renderDie(selectedDiceType, results[index] || (isRolling ? '?' : (index === 0 ? 5 : 2)), index)
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="px-8 pb-4 flex justify-between gap-4">
            <Button
              onClick={rollDice}
              disabled={isRolling}
              className="flex-1 bg-[#6C5DD3] hover:bg-[#5A4BBF] text-white py-6"
            >
              Roll
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowCustomize(!showCustomize)}
              className="flex-1 border-[#3D3D6B] text-white hover:bg-[#2A2A4A] py-6"
            >
              Customize
            </Button>
          </div>

          {/* Customize Options */}
          {showCustomize && (
            <div className="border-t border-[#3D3D6B] px-8 py-4">
              <h3 className="text-lg font-semibold mb-3">Select Dice Type</h3>
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {diceTypes.map((dice) => (
                  <button
                    key={dice.id}
                    onClick={() => selectDiceType(dice.id)}
                    className={`p-2 rounded-md transition-all ${
                      selectedDiceType === dice.id
                        ? 'ring-2 ring-white scale-110'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 flex items-center justify-center text-white font-bold`}
                      style={{ backgroundColor: dice.color }}
                    >
                      {dice.sides}
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-4 mb-2">
                <h3 className="text-lg font-semibold mb-3">Number of Dice</h3>
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={decreaseDiceCount}
                    disabled={diceCount <= 1}
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${diceCount <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#3D3D6B]'}`}
                  >
                    <span className="text-2xl">-</span>
                  </button>
                  <span className="text-xl font-bold">{diceCount}</span>
                  <button
                    onClick={increaseDiceCount}
                    disabled={diceCount >= 5}
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${diceCount >= 5 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#3D3D6B]'}`}
                  >
                    <span className="text-2xl">+</span>
                  </button>
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  onClick={resetDice}
                  className="text-sm text-gray-400 hover:text-white"
                >
                  Reset
                </Button>
              </div>
            </div>
          )}

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

        {/* Stats and History */}
        {rollCount > 0 && (
          <div className="mt-8 text-center text-gray-300">
            <p>Total rolls: {rollCount}</p>

            {/* Display roll history */}
            <div className="mt-4">
              <p className="mb-2">Last results:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {rollHistory.map((roll, historyIndex) => (
                  <div
                    key={historyIndex}
                    className={`inline-flex gap-1 px-3 py-1 rounded-full ${historyIndex === 0 ? 'bg-[#6C5DD3] text-white' : 'bg-[#2A2A4A] text-gray-300'}`}
                  >
                    <span className="font-semibold">{roll.count}×{roll.diceType.substring(1)}</span>:
                    {roll.results.map((result, i) => (
                      <span key={i}>{result}</span>
                    )).reduce((prev, curr) => prev === null ? curr : <>{prev}, {curr}</>, null)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* SEO Introduction */}
      <ToolIntroduction slug="roll-dice" />

      {/* Footer */}
      <Footer className="bg-[#0A0A1B] text-gray-400" />

      {/* Animation and Shape Styles */}
      <style jsx global>{`
        .die-container {
          width: 80px;
          height: 80px;
          perspective: 1200px;
          margin: 15px;
        }

        .dice-3d {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.3s ease-out;
        }

        .dice-simple {
          width: 100%;
          height: 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease-out;
        }

        .rolling {
          animation: container-roll 800ms ease-out; /* Reduced from 2s to 800ms */
        }

        .animate-roll {
          animation: dice-roll 800ms cubic-bezier(0.175, 0.885, 0.32, 1.275); /* Reduced from 2s to 800ms */
          transform-style: preserve-3d;
        }

        .simple-animate-roll {
          animation: simple-dice-roll 800ms ease-out; /* Reduced from 2s to 800ms */
        }

        .dice-face {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: bold;
          color: var(--dice-text-color, white);
          background-color: var(--dice-color);
          border: 2px solid rgba(255, 255, 255, 0.3);
          box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.3);
          backface-visibility: hidden;
          border-radius: 5px;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }

        .dice-simple-face {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: bold;
          color: white;
          background-color: var(--dice-color);
          border: 2px solid rgba(255, 255, 255, 0.3);
          box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.3);
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }

        /* D6 (cube) specific styles */
        .dice-d6 .dice-face {
          width: 80px;
          height: 80px;
        }
        .dice-d6 .dice-face-1 {
          transform: translateZ(40px);
        }
        .dice-d6 .dice-face-2 {
          transform: rotateY(180deg) translateZ(40px);
        }
        .dice-d6 .dice-face-3 {
          transform: rotateY(90deg) translateZ(40px);
        }
        .dice-d6 .dice-face-4 {
          transform: rotateY(-90deg) translateZ(40px);
        }
        .dice-d6 .dice-face-5 {
          transform: rotateX(90deg) translateZ(40px);
        }
        .dice-d6 .dice-face-6 {
          transform: rotateX(-90deg) translateZ(40px);
        }

        /* Simple dice shapes */
        .dice-d4 .dice-simple-face {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }

        .dice-d8 .dice-simple-face {
          clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
        }

        .dice-d10 .dice-simple-face {
          clip-path: polygon(50% 0%, 80% 30%, 80% 70%, 50% 100%, 20% 70%, 20% 30%);
        }

        .dice-d12 .dice-simple-face {
          clip-path: polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%);
        }

        .dice-d20 .dice-simple-face {
          clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
        }

        @keyframes container-roll {
          0% { transform: translate3d(0, 0, 0); }
          20% { transform: translate3d(-30%, -20%, 0) rotate(8deg); }
          40% { transform: translate3d(25%, 25%, 0) rotate(-8deg); }
          60% { transform: translate3d(-15%, 15%, 0) rotate(6deg); }
          80% { transform: translate3d(10%, -10%, 0) rotate(-3deg); }
          100% { transform: translate3d(0, 0, 0); }
        }

        /* Complex animation for d6 (cube) */
        @keyframes dice-roll {
          0% {
            transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
          }
          15% {
            transform: rotateX(180deg) rotateY(120deg) rotateZ(240deg);
          }
          30% {
            transform: rotateX(360deg) rotateY(240deg) rotateZ(120deg);
          }
          45% {
            transform: rotateX(540deg) rotateY(360deg) rotateZ(300deg);
          }
          60% {
            transform: rotateX(720deg) rotateY(480deg) rotateZ(420deg);
          }
          75% {
            transform: rotateX(810deg) rotateY(570deg) rotateZ(540deg);
          }
          90% {
            transform: rotateX(900deg) rotateY(630deg) rotateZ(630deg);
          }
          100% {
            transform: rotateX(1080deg) rotateY(720deg) rotateZ(720deg);
          }
        }

        /* Simple rotation animation for other dice */
        @keyframes simple-dice-roll {
          0% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(90deg);
          }
          50% {
            transform: rotate(180deg);
          }
          75% {
            transform: rotate(270deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
