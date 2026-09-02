import { whatsapp } from "@/content/site";

/**
 * Discreet floating WhatsApp action ("Ai întrebări?") — the client explicitly
 * asked for it. Kept deliberately SECONDARY (small, bottom-right, muted styling)
 * so it never competes with the page's primary quiz CTA. Hidden on the bare
 * `/evaluare` page via SiteChrome. Collapses to just the icon on small screens.
 */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={whatsapp.aria}
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full border border-line bg-white/95 py-2.5 pl-2.5 pr-3 text-sm font-medium text-navy shadow-md backdrop-blur transition-colors hover:bg-bone sm:pr-4"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366] text-white">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
          <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.42 9.42 0 0 1 14.64-11.6 9.4 9.4 0 0 1 2.76 6.66c0 5.2-4.23 9.36-9.4 9.36zm5.5-14.86A11.3 11.3 0 0 0 2.5 21.9L1 27.4l5.62-1.47a11.28 11.28 0 0 0 5.4 1.38h.01c6.22 0 11.29-5.06 11.29-11.28a11.2 11.2 0 0 0-3.3-7.99z" />
        </svg>
      </span>
      <span className="hidden sm:inline">{whatsapp.label}</span>
    </a>
  );
}
