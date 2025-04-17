"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { tools } from "@/data/tools";
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Shuffle, RotateCcw } from "lucide-react";

export default function NotFound() {
  const [randomTool, setRandomTool] = useState(tools[0]);
  const [diceValue, setDiceValue] = useState<number>(1);
  const [isRolling, setIsRolling] = useState(false);
  
  // Function to get a random tool suggestion
  const getRandomTool = () => {
    const randomIndex = Math.floor(Math.random() * tools.length);
    setRandomTool(tools[randomIndex]);
  };

  // Function to roll the dice
  const rollDice = () => {
    if (isRolling) return;
    
    setIsRolling(true);
    
    // Simulate dice rolling animation
    let rollCount = 0;
    const maxRolls = 10;
    const rollInterval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      rollCount++;
      
      if (rollCount >= maxRolls) {
        clearInterval(rollInterval);
        setIsRolling(false);
      }
    }, 100);
  };

  // Get a random tool on initial load
  useEffect(() => {
    getRandomTool();
  }, []);

  // Function to render the correct dice face
  const renderDiceFace = () => {
    switch (diceValue) {
      case 1: return <Dice1 className="h-16 w-16" />;
      case 2: return <Dice2 className="h-16 w-16" />;
      case 3: return <Dice3 className="h-16 w-16" />;
      case 4: return <Dice4 className="h-16 w-16" />;
      case 5: return <Dice5 className="h-16 w-16" />;
      case 6: return <Dice6 className="h-16 w-16" />;
      default: return <Dice1 className="h-16 w-16" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="space-y-8 max-w-3xl mx-auto">
          {/* 404 Header */}
          <h1 className="text-7xl font-bold text-primary">404</h1>
          
          <h2 className="text-3xl font-semibold">Page Not Found</h2>
          
          <p className="text-xl text-muted-foreground">
            Oops! Looks like you've stumbled upon a page that doesn't exist.
          </p>
          
          {/* Interactive Dice Game */}
          <div className="bg-muted p-8 rounded-lg mt-8">
            <h3 className="text-xl font-semibold mb-4">Roll the Dice of Destiny</h3>
            
            <div className="flex flex-col items-center gap-4">
              <div className={`p-4 bg-background rounded-lg shadow-md transition-all ${isRolling ? 'animate-bounce' : ''}`}>
                {renderDiceFace()}
              </div>
              
              <Button 
                onClick={rollDice} 
                className="gap-2"
                disabled={isRolling}
                size="lg"
              >
                <RotateCcw className="h-4 w-4" />
                Roll Again
              </Button>
              
              <p className="text-sm text-muted-foreground mt-2">
                {isRolling ? "Rolling..." : `You rolled a ${diceValue}!`}
              </p>
            </div>
          </div>
          
          {/* Random Tool Suggestion */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Try one of our random tools instead:</h3>
            
            <div className="flex flex-col items-center gap-4">
              <div className="bg-muted p-6 rounded-lg flex items-center gap-4">
                <div className="relative">
                  <Image 
                    src={randomTool.image} 
                    alt={randomTool.name} 
                    width={80} 
                    height={80} 
                    className="rounded-md"
                  />
                </div>
                
                <div className="text-left">
                  <h4 className="font-semibold text-lg">{randomTool.name}</h4>
                  <p className="text-sm text-muted-foreground">{randomTool.description}</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button asChild variant="default">
                  <Link href={`/${randomTool.slug}`}>
                    Try This Tool
                  </Link>
                </Button>
                
                <Button onClick={getRandomTool} variant="outline" className="gap-2">
                  <Shuffle className="h-4 w-4" />
                  Suggest Another
                </Button>
              </div>
            </div>
          </div>
          
          {/* Back to Home */}
          <div className="mt-8">
            <Button asChild size="lg" variant="secondary">
              <Link href="/">
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
