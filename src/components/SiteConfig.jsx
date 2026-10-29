/* ----------------------------------------------------------
   siteConfig.jsx — single source of truth.
   Exports: SITE, NAV, focusRing, SpiralLogo, helpers.
   ---------------------------------------------------------- */

export const SITE = {
  // ---- Identity ----
  name: "The Spiral Psychodynamic Model",
  brand: "Spiral Psychodynamic",
  shortName: "Spiral Psychodynamic",
  therapist: "Dany Charbel, Msc",
  therapistShort: "Dany Charbel",
  credential: "Licensed Clinical Psychologist",
  role: "Psychotherapist & Founder",

  // ---- Domain ----
  siteUrl: "https://thespiralpsychodynamicmodel.com", // TODO: confirm real domain

  // ---- Location (Beqaa, Lebanon — per GBP + LinkedIn) ----
  streetAddress: "",                    // TODO: only if the GBP shows one
  city: "Beqaa",
  region: "Beqaa Governorate",
  postalCode: "",
  country: "Lebanon",
  countryCode: "LB",
  latitude: "33.8463",
  longitude: "35.9019",
  serviceArea: "Lebanon and online worldwide",

  // ---- Contact ----
  phoneTel: "+96179183419",
  phoneDisplay: "+961 79 183 419",
  whatsapp: "https://wa.me/96179183419",
  email: "danycharbel522@gmail.com",
  bookHref: "https://calendly.com/danycharbel", // TODO: real Calendly link
  googleBusinessUrl: "https://maps.google.com/?cid=13598137340045833278",
  instagramUrl: "",
  linkedinUrl: "https://www.linkedin.com/in/dany-charbel",

  // ---- Hours ----
  hoursDisplay: "Mon–Fri, 9 am–7 pm",
  hoursShort: "Mon–Fri, closes 7 pm",
  hoursOpens: "09:00",
  hoursCloses: "19:00",

  // ---- Credentials ----
  licenseNumber: "",                    // TODO: LOPSY number when verified
  licenseBody: "Lebanese Order of Psychologists (LOPSY)",
  education: "Master’s in Applied Clinical Psychology, Lebanese University",
  languages: "Arabic, English and French",
  languagesList: ["Arabic", "English", "French"],

  // ---- Safety ----
  helpline: "",                         // TODO: verified Lebanese crisis line

  // ---- Navigation ----
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Approach", href: "/approach" },
    { label: "Services", href: "/services" },
    { label: "Online Therapy", href: "/online-therapy" },
    { label: "FAQ", href: "/faq" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
};

/* ---------- Backwards-compatible alias ----------
   Header.jsx and Footer.jsx import NAV, so export it. */
export const NAV = SITE.nav;

/* ---------- Shared focus ring ---------- */
export const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F5D62] focus-visible:ring-offset-2 focus-visible:ring-offset-white";

/* ---------- Logo ----------
   Same spiral as the hero, sized for the header. */
export function SpiralLogo({ className = "h-9 w-9" }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M100 100a6 6 0 0 1 12 0 18 18 0 0 1-36 0 30 30 0 0 1 60 0 42 42 0 0 1-84 0 54 54 0 0 1 108 0 66 66 0 0 1-132 0 78 78 0 0 1 156 0"
        stroke="#2F5D62"
        strokeWidth="12"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ---------- Safe string builders (no ", ," / no "undefined") ---------- */
export const addressLine = () =>
  [SITE.streetAddress, SITE.city, SITE.region, SITE.country]
    .filter(Boolean)
    .join(", ");

export const cityLine = () =>
  [SITE.city, SITE.country].filter(Boolean).join(", ");

export const fullTitle = () =>
  [SITE.therapist, SITE.credential].filter(Boolean).join(" · ");

export const licenseLine = () =>
  [
    `${SITE.therapistShort} is a licensed clinical psychologist.`,
    SITE.licenseNumber
      ? `License No. ${SITE.licenseNumber} (${SITE.licenseBody}).`
      : `${SITE.licenseBody}.`,
  ]
    .filter(Boolean)
    .join(" ");