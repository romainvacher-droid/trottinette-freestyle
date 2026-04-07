'use client';

interface TurnstileProps {
  onToken: (token: string) => void;
}

export default function Turnstile({ onToken }: TurnstileProps) {
  // Ne rien faire – on utilise la checkbox fallback dans les pages
  return null;
}
