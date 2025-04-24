import React from "react";
import Link from "next/link";

interface FooterProps {
  className?: string;
}

export function Footer({ className = "" }: FooterProps) {
  return (
    <footer className={`bg-muted text-muted-foreground py-8 px-4 mt-auto ${className}`}>
      <div className="container mx-auto text-center">
        <p className="mb-4">&copy; {new Date().getFullYear()} RandomWise. All rights reserved.</p>
        <div className="flex justify-center gap-4">
          <Link href="/privacy-policy" className="text-sm hover:text-primary transition-colors">Privacy Policy</Link>
          <span className="text-sm">|</span>
          <Link href="/terms-of-service" className="text-sm hover:text-primary transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
