import { SITE, focusRing } from "./SiteConfig";

/* Visible on phones only (hidden from md and up). */

export default function MobileActionBar() {
  const base = `flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-xs font-semibold ${focusRing}`;
  const icon = {
    viewBox: "0 0 24 24",
    className: "h-5 w-5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[#D6E0DE] bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-2px_12px_rgba(31,42,51,0.08)] md:hidden"
      role="region"
      aria-label="Quick contact"
    >
      <div className="flex divide-x divide-[#E3EAE9] rtl:divide-x-reverse">
        <a href={`tel:${SITE.phoneTel}`} className={`${base} text-[#1F2A33]`}>
          <svg {...icon}>
            <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
          </svg>
          Call
        </a>
        <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className={`${base} text-[#1F2A33]`}>
          <svg {...icon}>
            <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.6-5.4A8.4 8.4 0 1 1 21 11.5z" />
          </svg>
          WhatsApp
        </a>
        <a href={SITE.bookHref} className={`${base} bg-[#2F5D62] text-white`}>
          <svg {...icon}>
            <rect x="3" y="4.5" width="18" height="16" rx="2" />
            <path d="M16 2.5v4M8 2.5v4M3 10h18" />
          </svg>
          Book
        </a>
      </div>
    </div>
  );
}