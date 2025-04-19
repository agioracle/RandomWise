"use client";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Twitter, Facebook, Linkedin } from "lucide-react";
import { SiDiscord, SiWhatsapp, SiTelegram, SiInstagram } from "react-icons/si";

export default function SocialShareButtons() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [fullUrl, setFullUrl] = useState("https://randomwise.tools");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const origin = window.location.origin;
      const search = searchParams?.toString();
      setFullUrl(origin + pathname + (search ? `?${search}` : ""));
    }
  }, [pathname, searchParams]);

  return (
    <div className="flex flex-col items-center md:items-start mt-3">
      <div className="flex flex-row gap-3">
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=Check%20out%20RandomWise%20for%20fun%20decision-making%20tools!`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Twitter"
          className="rounded-full hover:bg-primary/10 text-primary border border-primary w-10 h-10 flex items-center justify-center transition bg-transparent"
        >
          <Twitter className="w-5 h-5 text-primary" fill="none" />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
          className="rounded-full hover:bg-primary/10 text-primary border border-primary w-10 h-10 flex items-center justify-center transition bg-transparent"
        >
          <Facebook className="w-5 h-5 text-primary" fill="none" />
        </a>
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(fullUrl)}&title=RandomWise%20-%20Fun%20Decision%20Making%20Tools`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
          className="rounded-full hover:bg-primary/10 text-primary border border-primary w-10 h-10 flex items-center justify-center transition bg-transparent"
        >
          <Linkedin className="w-5 h-5 text-primary" fill="none" />
        </a>
        <a
          href={`https://www.instagram.com/?url=${encodeURIComponent(fullUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Instagram"
          className="rounded-full hover:bg-primary/10 text-primary border border-primary w-10 h-10 flex items-center justify-center transition bg-transparent"
        >
          <SiInstagram className="w-5 h-5 text-primary" />
        </a>
        <a
          href="https://discord.com/channels/@me"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Discord"
          className="rounded-full hover:bg-primary/10 text-primary border border-primary w-10 h-10 flex items-center justify-center transition bg-transparent"
        >
          <SiDiscord className="w-5 h-5 text-primary" />
        </a>
        <a
          href={`https://wa.me/?text=Check%20out%20RandomWise%20for%20fun%20decision-making%20tools!%20${encodeURIComponent(fullUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on WhatsApp"
          className="rounded-full hover:bg-primary/10 text-primary border border-primary w-10 h-10 flex items-center justify-center transition bg-transparent"
        >
          <SiWhatsapp className="w-5 h-5 text-primary" />
        </a>
        <a
          href={`https://t.me/share/url?url=${encodeURIComponent(fullUrl)}&text=Check%20out%20RandomWise%20for%20fun%20decision-making%20tools!`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Telegram"
          className="rounded-full hover:bg-primary/10 text-primary border border-primary w-10 h-10 flex items-center justify-center transition bg-transparent"
        >
          <SiTelegram className="w-5 h-5 text-primary" />
        </a>
      </div>
    </div>
  );
}
