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
import { ToolIntroduction } from "@/components/tool-introduction";
import SocialShareButtons from "@/components/SocialShareButtons";

export default function RockPaperScissorsPage() {
  // Get current tool information
  const currentTool = getToolBySlug('rock-paper-scissors');

  // State for game
  const [userChoice, setUserChoice] = useState<'rock' | 'paper' | 'scissors' | null>(null);
  const [computerChoice, setComputerChoice] = useState<'rock' | 'paper' | 'scissors' | null>(null);
  const [result, setResult] = useState<'win' | 'lose' | 'draw' | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [gameCount, setGameCount] = useState<number>(0);
  const [stats, setStats] = useState({ wins: 0, losses: 0, draws: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [slotMachineIndex, setSlotMachineIndex] = useState<number>(0);
  const [slotMachineInterval, setSlotMachineInterval] = useState<NodeJS.Timeout | null>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const choices = ['rock', 'paper', 'scissors'];

  const getChoiceImage = (choice: 'rock' | 'paper' | 'scissors' | null) => {
    if (!choice) return '/images/rps.webp';
    return `/images/${choice}.webp`;
  };

  const determineWinner = (user: 'rock' | 'paper' | 'scissors', computer: 'rock' | 'paper' | 'scissors') => {
    if (user === computer) return 'draw';
    if (
      (user === 'rock' && computer === 'scissors') ||
      (user === 'paper' && computer === 'rock') ||
      (user === 'scissors' && computer === 'paper')
    ) {
      return 'win';
    }
    return 'lose';
  };

  const playGame = (userSelection: 'rock' | 'paper' | 'scissors') => {
    if (isPlaying) return; // Prevent playing while already in progress

    setIsPlaying(true);
    setUserChoice(userSelection);
    setComputerChoice(null);
    setResult(null);
    setGameCount(prev => prev + 1);

    // Play sound if enabled
    if (soundEnabled) {
      const audio = new Audio('/sounds/rock-paper-scissors.mp3');
      audio.play();
    }

    // Start slot machine animation
    if (slotMachineInterval) {
      clearInterval(slotMachineInterval);
    }

    const interval = setInterval(() => {
      setSlotMachineIndex(prev => (prev + 1) % 3);
    }, 100); // Change image every 100ms

    setSlotMachineInterval(interval);

    // Simulate computer thinking
    const gameDuration = 1000; // milliseconds
    const randomIndex = Math.floor(Math.random() * 3);
    const computerSelection = choices[randomIndex] as 'rock' | 'paper' | 'scissors';

    setTimeout(() => {
      // Stop slot machine animation
      if (slotMachineInterval) {
        clearInterval(slotMachineInterval);
        setSlotMachineInterval(null);
      }

      setComputerChoice(computerSelection);
      const gameResult = determineWinner(userSelection, computerSelection);
      setResult(gameResult);

      // Update stats
      setStats(prev => ({
        ...prev,
        wins: gameResult === 'win' ? prev.wins + 1 : prev.wins,
        losses: gameResult === 'lose' ? prev.losses + 1 : prev.losses,
        draws: gameResult === 'draw' ? prev.draws + 1 : prev.draws,
      }));

      // Play result sound if enabled
      if (soundEnabled) {
        const resultSound = gameResult === 'win' ? 'win' : gameResult === 'lose' ? 'lose' : 'draw';
        const audio = new Audio(`/sounds/${resultSound}.mp3`);
        audio.play();
      }

      setIsPlaying(false);
    }, gameDuration);
  };

  const getResultText = () => {
    if (!result) return '';
    if (result === 'win') return 'You win!';
    if (result === 'lose') return 'You lose!';
    return 'It\'s a draw!';
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0D0D23]">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center py-12 px-4 mt-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{currentTool?.name || 'Rock Paper Scissors'}</h1>
        <p className="text-xl text-gray-300 mb-2">{currentTool?.description || 'Play a quick game of Rock Paper Scissors to settle decisions.'}</p>

        <div className="flex flex-col items-center md:items-start mb-8">
          <SocialShareButtons />
        </div>

        {/* Game Card */}
        <Card className="w-full max-w-md bg-[#1A1A3A] border-[#3D3D6B] text-white rounded-xl overflow-hidden">
          {/* Game Display Area */}
          <div className="p-6 flex justify-between items-center">
            <div className="text-center">
              <h3 className="text-lg mb-2">Decidely</h3>
              <div className="relative w-24 h-24 mx-auto">
                <Image
                  src={isPlaying ? getChoiceImage(choices[slotMachineIndex] as 'rock' | 'paper' | 'scissors') : getChoiceImage(computerChoice as 'rock' | 'paper' | 'scissors')}
                  alt={computerChoice || 'Decidely choice'}
                  width={96}
                  height={96}
                  className={`object-contain transition-all duration-300 ${isPlaying ? 'animate-pulse' : ''}`}
                  priority
                />
              </div>
            </div>

            {/* Result Display */}
            <div className="text-center flex-shrink-0 px-2">
              {result ? (
                <h2 className={`text-2xl font-bold ${result === 'win' ? 'text-green-400' : result === 'lose' ? 'text-red-400' : 'text-yellow-400'}`}>
                  {getResultText()}
                </h2>
              ) : (
                <div className="h-8 flex items-center justify-center">
                  <span className="text-xl text-gray-400">VS</span>
                </div>
              )}
            </div>

            <div className="text-center">
              <h3 className="text-lg mb-2">You</h3>
              <div className="relative w-24 h-24 mx-auto">
                <Image
                  src={getChoiceImage(userChoice as 'rock' | 'paper' | 'scissors')}
                  alt={userChoice || 'Your choice'}
                  width={96}
                  height={96}
                  className="object-contain transition-all duration-300"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Choice Buttons */}
          <div className="grid grid-cols-3 gap-2 px-6 py-4">
            <Button
              onClick={() => playGame('rock')}
              disabled={isPlaying}
              className="bg-[#6C5DD3] hover:bg-[#5A4BBF] text-white py-4"
            >
              <Image src="/images/rock.webp" alt="Rock" width={40} height={40} className="mx-auto" />
            </Button>
            <Button
              onClick={() => playGame('paper')}
              disabled={isPlaying}
              className="bg-[#6C5DD3] hover:bg-[#5A4BBF] text-white py-4"
            >
              <Image src="/images/paper.webp" alt="Paper" width={40} height={40} className="mx-auto" />
            </Button>
            <Button
              onClick={() => playGame('scissors')}
              disabled={isPlaying}
              className="bg-[#6C5DD3] hover:bg-[#5A4BBF] text-white py-4"
            >
              <Image src="/images/scissors.webp" alt="Scissors" width={40} height={40} className="mx-auto" />
            </Button>
          </div>

          {/* Play Button */}
          <div className="px-6 pb-4">
            <Button
              onClick={() => {
                // If user has already made a choice, use that choice
                // Otherwise, select a random choice
                const choice = userChoice || choices[Math.floor(Math.random() * 3)] as 'rock' | 'paper' | 'scissors';
                playGame(choice);
              }}
              disabled={isPlaying}
              className="w-full bg-[#6C5DD3] hover:bg-[#5A4BBF] text-white py-6"
            >
              Play
            </Button>
          </div>

          {/* Sound Option */}
          <div className="border-t border-[#3D3D6B] px-6 py-4">
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

        {/* Stats */}
        {gameCount > 0 && (
          <div className="mt-8 text-center text-gray-300">
            <p>Total games: {gameCount}</p>
            <p>Wins: {stats.wins} | Losses: {stats.losses} | Draws: {stats.draws}</p>
          </div>
        )}
      </main>

      {/* SEO Introduction */}
      <ToolIntroduction slug="rock-paper-scissors" />

      {/* Footer */}
      <Footer className="bg-[#0A0A1B] text-gray-400" />

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .animate-pulse {
          animation: pulse 0.5s infinite;
        }
      `}</style>
    </div>
  );
}
