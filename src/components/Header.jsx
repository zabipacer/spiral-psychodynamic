import { useState } from "react";
import { SITE, NAV, focusRing, SpiralLogo } from "./SiteConfig";

/* Swap <a> for your router's <Link to=...> if you use React Router / Next.js */

export default function Header({ currentPath = "/" }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#D6E0DE] bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href="/"
          className={`flex items-center gap-2 rounded text-[#2F5D62] ${focusRing}`}
          aria-label={`${SITE.brand} home`}
        >
          <SpiralLogo />
          <span className="text-base font-semibold leading-tight text-[#1F2A33] sm:text-lg">
            Spiral Psychodynamic
            <span className="block text-xs font-normal text-[#4B5B66]">
              Psychotherapy in {SITE.city}
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const active = currentPath === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${focusRing} ${
                  active
                    ? "bg-[#EAF1F0] text-[#2F5D62]"
                    : "text-[#34434D] hover:bg-[#F3F7F6] hover:text-[#2F5D62]"
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <a
            href={SITE.bookHref}
            className={`ms-3 rounded-full bg-[#2F5D62] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#244A4E] ${focusRing}`}
          >
            Book a Session
          </a>
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className={`inline-flex h-10 w-10 items-center justify-center rounded-md text-[#1F2A33] hover:bg-[#F3F7F6] lg:hidden ${focusRing}`}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="border-t border-[#D6E0DE] bg-white px-4 pb-4 pt-2 lg:hidden"
        >
          <ul className="flex flex-col">
            {NAV.map((item) => {
              const active = currentPath === item.href;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-md px-3 py-3 text-base font-medium ${focusRing} ${
                      active ? "bg-[#EAF1F0] text-[#2F5D62]" : "text-[#34434D]"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <a
            href={SITE.bookHref}
            onClick={() => setOpen(false)}
            className={`mt-3 block rounded-full bg-[#2F5D62] px-5 py-3 text-center text-base font-semibold text-white ${focusRing}`}
          >
            Book a Session
          </a>
        </nav>
      )}
    </header>
  );
}