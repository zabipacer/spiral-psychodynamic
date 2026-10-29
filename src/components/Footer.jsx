import { SITE, focusRing, SpiralLogo } from "./SiteConfig";

export default function Footer() {
  const linkClass = `rounded text-[#CFE0DE] underline-offset-4 hover:text-white hover:underline ${focusRing} focus-visible:ring-offset-[#1F2A33] focus-visible:ring-white`;

  return (
    // pb-24 on mobile keeps content clear of the sticky mobile bar
    <footer className="bg-[#1F2A33] pb-24 text-[#CFE0DE] md:pb-0">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-white">
              <SpiralLogo className="h-7 w-7" />
              <p className="text-lg font-semibold">
                {SITE.brand}, Psychotherapy in {SITE.city}
              </p>
            </div>

            <address className="mt-5 space-y-2 text-sm not-italic leading-relaxed">
              <p>{SITE.address}</p>
              <p>
                Phone:{" "}
                <a href={`tel:${SITE.phoneTel}`} className={linkClass} dir="ltr">
                  {SITE.phoneDisplay}
                </a>
              </p>
              <p>
                WhatsApp:{" "}
                <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Message us
                </a>
              </p>
              <p>Hours: {SITE.hours}</p>
            </address>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-sm font-semibold text-white">Quick links</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="/privacy" className={linkClass}>Privacy and Confidentiality</a></li>
              <li><a href="/faq" className={linkClass}>FAQ</a></li>
              <li><a href="/contact" className={linkClass}>Contact</a></li>
            </ul>
          </nav>
        </div>

        <div role="note" className="mt-10 rounded-lg border border-[#3F5560] bg-[#26343E] p-4 text-sm leading-relaxed">
          <p className="font-semibold text-white">If you are in crisis</p>
          <p className="mt-1">
            If you are in immediate danger or thinking of harming yourself, please contact local
            emergency services or go to the nearest emergency room. Therapy sessions are not a
            substitute for emergency care.
          </p>
          {SITE.helpline && (
            <p className="mt-2">
              Helpline: <span className="font-semibold text-white" dir="ltr">{SITE.helpline}</span>
            </p>
          )}
        </div>

        <p className="mt-8 border-t border-[#33444F] pt-6 text-xs leading-relaxed text-[#9FB4B2]">
          Dr./Mr./Ms. {SITE.therapist} is a licensed clinical psychologist. License No. {SITE.license}.
        </p>
      </div>
    </footer>
  );
}