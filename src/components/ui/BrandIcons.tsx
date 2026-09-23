export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "h-4 w-4"}
      aria-hidden="true"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.2" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className ?? "h-4 w-4"}
      aria-hidden="true"
    >
      <path d="M13.5 21v-7h2.4l.4-2.8h-2.8V9.4c0-.8.3-1.4 1.5-1.4h1.4V5.5c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5v2H8.6V14h2.4v7h2.5z" />
    </svg>
  );
}

export function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className ?? "h-4 w-4"}
      aria-hidden="true"
    >
      <path d="M16.6 3c.4 2.1 1.8 3.6 3.9 3.9v3c-1.5 0-2.9-.5-3.9-1.3v6.2c0 3.6-2.9 6.2-6.2 6.2A6.1 6.1 0 0 1 4.3 14c0-3.4 2.7-6.2 6.2-6.2h.6v3a3.2 3.2 0 0 0-3.6 2.1 3.2 3.2 0 0 0 2.3 4 3.2 3.2 0 0 0 3.7-3.1V3h3.1z" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? "h-4 w-4"} aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.1c-1.6 0-3.1-.5-4.3-1.3l-.3-.2-3 .8.8-2.9-.2-.3A8.1 8.1 0 1 1 12 20.1zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.3-3.3c-.1-.2 0-.4.1-.5l.9-.9c.1-.2.1-.4 0-.5L9.5 8.1c-.3-.7-.6-.7-.9-.7h-.7c-.2 0-.6.1-.8.4-.3.3-1 1-1 2.5s1 2.9 1.2 3.1c.1.2 2.4 3.7 5.9 5.1 2.9 1.2 3.5 1 4.1.9.6-.1 1.8-.8 2.1-1.5.3-.8.3-1.4.2-1.5-.1-.1-.3-.2-.6-.3z" />
    </svg>
  );
}