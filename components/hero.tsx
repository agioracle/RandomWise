import React from "react";
import Image from "next/image";
import { tools } from "@/data/tools";
import { LayoutGrid, MessageCircle, Twitter, Facebook, Linkedin, Send } from "lucide-react";
import { SiDiscord, SiWhatsapp, SiTelegram, SiInstagram } from "react-icons/si";
import SocialShareButtons from "@/components/SocialShareButtons";

export function Hero() {
  return (
    <section className="hero-gradient pt-32 pb-20 px-4 relative overflow-hidden">
      <div className="container mx-auto flex flex-col md:flex-row items-center text-center md:text-left relative">
        <div className="flex-1 flex flex-col justify-center mb-2">
          <h1 className="text-5xl font-bold mb-6">
            Struggling to <span className="text-primary">make a decision?</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-12">
            Make decisions easy & fun with our complete collection of free random tools, or ask our AI assistant Dicidely for help.
          </p>
          <div className="flex flex-row gap-4 mt-2 justify-center md:justify-start">
            <a
              href="/all-tools"
              className="px-6 py-3 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/90 transition flex items-center gap-2"
            >
              <LayoutGrid className="w-5 h-5 text-white" />
              View All Tools
            </a>
            <a
              href="/ask-dicidely"
              className="px-6 py-3 rounded-lg border border-primary text-primary font-semibold bg-white shadow hover:bg-primary/10 transition flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Ask Dicidely
            </a>
          </div>
          <div className="flex flex-col items-center md:items-start mt-6">
            <SocialShareButtons />
          </div>
        </div>
        <div className="flex-shrink-0 flex justify-center md:justify-end items-center md:ml-12">
          <Image
            src="/images/hero-image.webp"
            alt="Hero"
            width={512}
            height={512}
            className="mb-2 object-contain rounded-lg"
            priority
          />
        </div>
      </div>
    </section>
  );
}
