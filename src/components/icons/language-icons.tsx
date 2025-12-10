import { cn } from "@/lib/utils";
import type { Language } from "@/lib/types";
import { BrainCircuit, Shield } from "lucide-react";

type LanguageIconProps = {
  language: Language["id"];
  className?: string;
};

// Simple SVG icons for languages
const icons: Record<Language["id"], React.ComponentType<{ className?: string }>> = {
  html: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 10.5l-3 3-3-3" />
      <path d="M3 4l1.5 14.5L12 21l7.5-2.5L21 4H3z" />
    </svg>
  ),
  css: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8l-.8 4.2c-.1.5.3 1 .8 1h16c.5 0 1-.4 1-1L20 8" />
      <path d="M4.5 13L3 20h18l-1.5-7" />
      <path d="M10 16.5h4" />
    </svg>
  ),
  javascript: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 9h4" />
      <path d="M12 9v6" />
      <path d="M12 18a1 1 0 001-1v-1a1 1 0 00-1-1h-1a1 1 0 01-1-1V9a1 1 0 011-1h1a1 1 0 011 1" />
      <path d="M4 6V4a2 2 0 012-2h12a2 2 0 012 2v2" />
      <path d="M4 18v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
    </svg>
  ),
  python: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13.83 11.17l-2.66 2.66" />
      <path d="M10.17 12.83l-2.66-2.66" />
      <path d="M15 4H9a2 2 0 00-2 2v2.5a.5.5 0 00.5.5h1.25a.5.5 0 01.5.5v1a.5.5 0 01-.5.5H8.5a.5.5 0 00-.5.5V15a2 2 0 002 2h6a2 2 0 002-2v-2.5a.5.5 0 00-.5-.5h-1.25a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5h1.25a.5.5 0 00.5-.5V6a2 2 0 00-2-2z" />
    </svg>
  ),
  java: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 10h-2a2 2 0 00-2 2v4h4" />
      <path d="M8 8c0-2.21 1.79-4 4-4s4 1.79 4 4" />
      <path d="M14 14v2a2 2 0 01-2 2H8a2 2 0 01-2-2v-2a2 2 0 012-2h1" />
    </svg>
  ),
  c: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 16a6 6 0 10-12 0" />
      <path d="M18 8a6 6 0 11-12 0" />
      <path d="M12 2v20" />
    </svg>
  ),
  cpp: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 12H8" />
      <path d="M10 10v4" />
      <path d="M16 12h-1" />
      <path d="M15 10v4" />
      <path d="M10.1 16.3A6 6 0 1118 8a6 6 0 01-7.9 8.3z" />
    </svg>
  ),
  php: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="12" rx="10" ry="7" />
      <path d="M7 12h11" />
      <path d="M7 9v6" />
      <path d="M17 9v6" />
    </svg>
  ),
  go: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12h6" />
      <path d="M9 6h6" />
      <path d="M12 6v12" />
      <path d="M5 12a7 7 0 007 7 7 7 0 007-7" />
    </svg>
  ),
  xml: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 10l-6 6 6 6" />
      <path d="M16 10l6 6-6 6" />
      <path d="M14 2l-4 20" />
    </svg>
  ),
  'prompt-engineering': BrainCircuit,
  'ethical-hacking': Shield,
};

export function LanguageIcon({ language, className }: LanguageIconProps) {
  const Icon = icons[language];
  if (!Icon) return null;
  return <Icon className={cn("w-6 h-6", className)} />;
}
