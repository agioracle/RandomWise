import React from "react";
import Link from "next/link";

interface FooterProps {
  className?: string;
}

export function Footer({ className = "" }: FooterProps) {
  return (
    <footer className={`bg-slate-900 text-slate-300 py-8 px-4 mt-auto ${className}`}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* About Column */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">RandomWise</h3>
            <p className="text-sm mb-2">Quick decision-making tools for everyday choices.</p>
            <p className="text-sm">&copy; {new Date().getFullYear()} RandomWise. All rights reserved.</p>
          </div>

          {/* Tools Column */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Random Tools</h3>
            <div className="space-y-2">
              <Link href="/flip-coin" className="block text-sm hover:text-primary transition-colors">Flip Coin</Link>
              <Link href="/randomizer-wheel" className="block text-sm hover:text-primary transition-colors">Randomizer Wheel</Link>
              <Link href="/roll-dice" className="block text-sm hover:text-primary transition-colors">Roll Dice</Link>
              <Link href="/random-number-generator" className="block text-sm hover:text-primary transition-colors">Random Number Generator</Link>
              <Link href="/rock-paper-scissors" className="block text-sm hover:text-primary transition-colors">Rock Paper Scissors</Link>
              {/* <Link href="/temple-fortune-stick" className="block text-sm hover:text-primary transition-colors">Temple Fortune Stick</Link>
              <Link href="/random-card-picker" className="block text-sm hover:text-primary transition-colors">Random Card Picker</Link> */}
            </div>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Legal</h3>
            <div className="space-y-2">
              <Link href="/privacy-policy" className="block text-sm hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="/terms-of-service" className="block text-sm hover:text-primary transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
