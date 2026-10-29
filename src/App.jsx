import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import { SITE, focusRing } from "./components/SiteConfig";

/* If you use React Router / Next.js, swap <a href> for <Link to>. */

/* ----------------------------------------------------------
   SEO COPY
   ---------------------------------------------------------- */

const TITLE = `Psychologist in ${SITE.city}, Lebanon | Trauma, Anxiety & Family Therapy | ${SITE.name}`;
const DESCRIPTION = `${SITE.therapist} is a licensed clinical psychologist in ${SITE.city}, Lebanon with 6+ years of practice. Psychodynamic, systemic and CBT therapy for trauma and PTSD, anxiety and panic, depression, narcissistic relationships and family patterns. In person and online, in ${SITE.languages}.`;

/* ----------------------------------------------------------
   OPTIONAL SITE FIELDS (add to siteConfig.js to override)
   SITE.mapEmbedUrl   -> paste the src from Google Maps > Share > Embed a map
   SITE.directionsUrl -> your Google Business Profile "directions" link
   SITE.areasServed   -> array of nearby towns you want to name
   ---------------------------------------------------------- */

const MAP_QUERY = SITE.mapQuery || `${SITE.latitude},${SITE.longitude}`;
const MAP_EMBED =
  SITE.mapEmbedUrl ||
  `https://maps.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=15&output=embed`;
const DIRECTIONS =
  SITE.directionsUrl ||
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAP_QUERY)}`;

/* Edit this list to the towns your clients really travel from. */
const AREAS_SERVED = SITE.areasServed || [
  "Zahle",
  "Chtaura",
  "Rayak",
  "Baalbek",
  "Bar Elias",
  "Jdita",
  "Taalabaya",
  "Saadnayel",
  "Anjar",
  "Qab Elias",
  "West Beqaa",
  "Beirut (online)",
];

/* ----------------------------------------------------------
   IMAGES  (drop files in /public/images/, keep these names or edit)
   w/h = real pixel size, used to reserve space and avoid layout shift
   ---------------------------------------------------------- */

const IMG = {
  portrait: {
    src: "/dany.jpg",
    alt: `${SITE.therapist}, licensed clinical psychologist in ${SITE.city}, Lebanon`,
    w: 960,
    h: 1200,
  },
  room: {
    src: "/p11.jpg",
    alt: `Quiet, private therapy room for psychotherapy sessions in ${SITE.city}, Lebanon`,
    w: 1400,
    h: 933,
  },
  detail: {
    src: "/p2.jpg",
    alt: "Armchairs and soft lighting in a confidential counselling room",
    w: 900,
    h: 1200,
  },
  online: {
    src: "/online.jpg",
    alt: "Client attending a secure online therapy session with a psychologist by video",
    w: 1400,
    h: 933,
  },
  exterior: {
    src: "/interior.jpg",
    alt: `Entrance to ${SITE.name} clinic in ${SITE.city}, Lebanon`,
    w: 1400,
    h: 933,
  },
};

/* ----------------------------------------------------------
   CONTENT
   ---------------------------------------------------------- */

/* Pain points people actually search and feel, in their own words */
const SIGNS = [
  {
    title: "You are always on edge",
    text: "Racing thoughts at 3 a.m., a tight chest, panic attacks that come from nowhere, and a mind that cannot switch off even when nothing is wrong.",
    icon: "M13 2L4 14h7l-1 8 9-12h-7l1-8z",
  },
  {
    title: "The past keeps showing up",
    text: "Flashbacks, nightmares, jumping at loud sounds, or feeling numb after loss, war, the port blast, displacement or an accident. Your nervous system is still protecting you from something that is over.",
    icon: "M12 8v5l3 2M21 12a9 9 0 11-3-6.7L21 8M21 3v5h-5",
  },
  {
    title: "You keep repeating the same relationship",
    text: "Intense closeness that turns cold, walking on eggshells, being made to doubt your memory, or fear of being left. Many people describe this as living with a narcissistic partner, parent or boss.",
    icon: "M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5",
  },
  {
    title: "Family feels heavy",
    text: "Being the one who holds everyone together, the black sheep, or the child who was never allowed to say no. Guilt each time you try to set a boundary.",
    icon: "M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2M10 11a4 4 0 100-8 4 4 0 000 8zM21 21v-2a4 4 0 00-3-3.9M17 3.1a4 4 0 010 7.8",
  },
  {
    title: "Nothing you do feels enough",
    text: "A harsh inner critic, perfectionism, people-pleasing, and a quiet belief that you are too much, or not enough. Often this started long before you could put words to it.",
    icon: "M12 21s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.6-7 10-7 10z",
  },
  {
    title: "Your body is carrying it",
    text: "Headaches, stomach trouble, exhaustion, muscle tension or unexplained pain that doctors cannot fully explain. Stress held for years often speaks through the body.",
    icon: "M3 12h4l3-8 4 16 3-8h4",
  },
];

const SERVICES = [
  {
    title: "Trauma and PTSD recovery",
    text: "Process painful memories, calm hypervigilance and flashbacks, and rebuild safety after single events or long-term complex trauma and childhood adversity.",
    href: "/services/trauma-therapy",
  },
  {
    title: "Anxiety, panic and low mood",
    text: "Work with generalised anxiety, panic attacks, rumination, depression, burnout and overwhelm, using tools you can practise between sessions.",
    href: "/services/anxiety-therapy",
  },
  {
    title: "Family therapy and systemic work",
    text: "Make sense of enmeshment, family roles, intergenerational patterns and communication breakdowns, and repair connection where it is possible.",
    href: "/services/family-therapy",
  },
  {
    title: "Relationships and narcissistic abuse",
    text: "Recognise idealisation, devaluation, gaslighting and trauma bonding, rebuild trust in your own judgement, and understand fear of closeness or abandonment.",
    href: "/services/relationship-therapy",
  },
  {
    title: "Self-worth, identity and attachment",
    text: "Heal the effects of early emotional neglect and poor mirroring, quiet the inner critic, and build a steadier sense of who you are.",
    href: "/services/self-worth",
  },
  {
    title: "Online therapy in Lebanon and abroad",
    text: "Secure video sessions for clients across Lebanon and for Lebanese living overseas, in Arabic, English or French.",
    href: "/online-therapy",
  },
];

const APPROACH = [
  {
    title: "Psychodynamic",
    text: "Explores the unconscious patterns, defences and early attachments that quietly run your present. Understanding why you react, not just how, is what makes change last.",
  },
  {
    title: "Systemic family",
    text: "Looks at you in the context of your family and relationships. Symptoms often make sense once the roles, rules and loyalties around you are visible.",
  },
  {
    title: "Cognitive behavioural (CBT)",
    text: "Practical, structured skills to challenge anxious and self-critical thinking, regulate emotions and change habits that keep distress going.",
  },
];

const REASONS = [
  "Licensed clinical psychologist with 6+ years of clinical practice",
  "Master’s in Applied Clinical Psychology, Lebanese University",
  "Three years of psychoanalytic training and a personal psychoanalysis",
  "Integrative framework: psychodynamic, systemic family and CBT",
  `Sessions in ${SITE.languages}, in person in ${SITE.city} or online`,
  "Strict confidentiality, in a non-judgemental frame",
];

const STEPS = [
  {
    title: "Send a message or book online",
    text: "WhatsApp, phone, email or the booking calendar. No clinical details needed at this stage.",
  },
  {
    title: "Short intro conversation",
    text: "We talk briefly about what you need and whether we are a good fit.",
  },
  {
    title: "First session",
    text: "We explore your story, set goals, and agree on a pace that feels right.",
  },
];

/* Grouped FAQ: every question a first-time client really asks */
const FAQ_GROUPS = [
  {
    group: "Getting started",
    items: [
      {
        q: "How do I know if I need therapy?",
        a: "If worry, low mood, past events or family tension are affecting your sleep, work, health or relationships, talking to a psychologist can help. You do not need to be in crisis, and you do not need a diagnosis, to begin.",
      },
      {
        q: "I do not even know what is wrong with me. Can I still come?",
        a: "Yes. Many people arrive saying only that something feels off. The first sessions are for understanding what you are carrying, and I conduct a careful clinical assessment so that you leave with words for it.",
      },
      {
        q: "What happens in the first session?",
        a: "We talk about what brought you, your history as far as you wish to share it, and what you hope will change. You are never pushed to speak about anything before you feel ready. By the end we agree on goals and on how often to meet.",
      },
      {
        q: "I tried therapy before and it did not help. Why would this be different?",
        a: "Therapy works best when the approach fits the person. I combine psychodynamic, systemic and CBT methods, so we can adjust if something is not helping. We also review progress together instead of leaving it unspoken.",
      },
      {
        q: "Is going to a psychologist a sign that I am weak or ‘crazy’?",
        a: "No. Seeking help is a sign that you take your life seriously. Most of my clients are working, functioning people who are tired of coping alone.",
      },
    ],
  },
  {
    group: "What I help with",
    items: [
      {
        q: "Can therapy help with trauma and PTSD, even from years ago?",
        a: "Yes. Trauma does not expire. Flashbacks, nightmares, emotional numbness, being easily startled or avoiding reminders can continue for years, including after war, the 2020 Beirut blast, loss, violence or childhood experiences. Treatment is paced so that you stay in control and are not overwhelmed.",
      },
      {
        q: "Do I have to tell you everything that happened?",
        a: "No. Trauma work does not require reliving every detail. We first build safety and coping skills, and you decide what to share and when.",
      },
      {
        q: "Can you help with panic attacks and constant anxiety?",
        a: "Yes. We look at what triggers the panic, what your body does, and what the fear is protecting you from. You learn practical tools to settle the body and challenge catastrophic thinking, while we also work on the deeper causes.",
      },
      {
        q: "I think my partner, parent or boss is a narcissist. Can you help?",
        a: "I cannot diagnose someone I have not assessed, but I can help you with the effects. These include self-doubt, confusion, fear of conflict, repeated cycles of idealisation and devaluation, and difficulty leaving. Therapy helps you see the pattern, rebuild trust in your own perception and decide what to do next.",
      },
      {
        q: "Why do I keep choosing the same kind of partner?",
        a: "Often early relationships set an emotional template, which we call attachment patterns. Without noticing, we are drawn to what feels familiar, even if it hurts. Psychodynamic work helps you recognise and change that template.",
      },
      {
        q: "My family is the source of my stress. Do I have to bring them?",
        a: "Not necessarily. Many people work on family patterns alone, and change in one person already shifts the whole system. Family sessions can be arranged when it is appropriate and when everyone agrees.",
      },
      {
        q: "I have physical symptoms and my doctors find nothing. Can therapy help?",
        a: "After a medical check, psychosomatic symptoms such as tension, headaches, stomach problems and fatigue often respond to psychological work, as emotional stress is frequently held in the body. Therapy does not replace medical care.",
      },
      {
        q: "I feel empty, worthless or stuck. Is that something you work with?",
        a: "Yes. Low self-worth, a harsh inner critic, people-pleasing and depression are among the most common reasons people come. We look at where these beliefs began and slowly build a kinder, more stable relationship with yourself.",
      },
    ],
  },
  {
    group: "How therapy works",
    items: [
      {
        q: "What is the difference between a psychologist and a psychiatrist?",
        a: "A clinical psychologist assesses and treats emotional and psychological difficulties through psychotherapy. A psychiatrist is a medical doctor who can prescribe medication. Some people benefit from both, and I will tell you if I think a medical or psychiatric opinion would help you.",
      },
      {
        q: "What is psychodynamic therapy, and how is it different from CBT?",
        a: "Psychodynamic therapy explores the roots of your patterns, including early experiences, relationships and unconscious conflicts. CBT focuses on present thoughts and behaviours with practical exercises. I integrate both, together with a family-systems view, depending on what you need.",
      },
      {
        q: "How long is a session and how often do we meet?",
        a: "Standard sessions last around 50 minutes. Most people start weekly, then move to a less frequent rhythm as things settle. We agree on this together after the first session.",
      },
      {
        q: "How long will therapy take?",
        a: "It depends on what you are dealing with. Focused problems such as a specific fear may improve within weeks to months. Long-standing trauma, attachment or family patterns usually need longer. We review progress regularly so you always know where you stand.",
      },
      {
        q: "Is what I say in sessions confidential?",
        a: "Yes. What you share stays private, with a few legal and safety exceptions that I explain clearly in our first session. Nothing is discussed with family, employers or anyone else without your consent.",
      },
    ],
  },
  {
    group: "Practical details",
    items: [
      {
        q: `Where is your clinic in ${SITE.city}?`,
        a: `The clinic is in ${SITE.city}, ${SITE.region}, Lebanon. You will find the address, a map and directions in the location section of this page. Clients also visit from nearby towns across the Beqaa.`,
      },
      {
        q: "Do you offer online therapy, and is it as effective?",
        a: "Yes. Online sessions take place by secure video for clients in Lebanon and abroad, and research shows they can be as effective as in-person therapy for most concerns, including anxiety, depression and trauma. They are especially useful if you live far away, travel, or are part of the Lebanese diaspora.",
      },
      {
        q: "What if my electricity or internet cuts out during an online session?",
        a: "It happens, and it is fine. We agree in advance on a backup, usually a phone call or a switch to WhatsApp, and we continue from where we stopped. If the session is cut short, we make it up or adjust.",
      },
      {
        q: "Which languages do you work in?",
        a: `Sessions are available in ${SITE.languages}. Many clients move between languages during a session, which is welcome, because emotions are sometimes easier to name in one language than another.`,
      },
      {
        q: "How much does a session cost, and can I get a receipt for insurance?",
        a: "I share the fee openly when you get in touch, so there are no surprises. A receipt can be provided on request, and whether your insurer reimburses psychotherapy depends on your policy, so it is worth checking with them.",
      },
      {
        q: "How do I book a first appointment?",
        a: `Use the WhatsApp button, call ${SITE.phoneDisplay}, email ${SITE.email}, or pick a time directly on the booking calendar.`,
      },
    ],
  },
  {
    group: "If things feel urgent",
    items: [
      {
        q: "What should I do if I am in crisis or having thoughts of ending my life?",
        a: "Please reach out right now. In Lebanon you can call the Embrace Lifeline on 1564, which is free and confidential, or the Lebanese Red Cross on 140 for an ambulance. If you are in immediate danger, go to the nearest emergency department or ask someone near you to stay with you. Psychotherapy sessions are not an emergency service.",
      },
    ],
  },
];

const ALL_FAQS = FAQ_GROUPS.flatMap((g) => g.items);

/* ----------------------------------------------------------
   JSON-LD
   ---------------------------------------------------------- */

function StructuredData() {
  const practice = {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "MedicalOrganization", "Psychologist"],
    "@id": `${SITE.siteUrl}/#practice`,
    name: SITE.name,
    alternateName: "The Spiral Model",
    description: `Licensed clinical psychology practice in ${SITE.city}, Lebanon, specialising in trauma and PTSD recovery, anxiety and mood disorders, narcissistic relationship abuse, attachment and family dynamics. Integrative psychodynamic, systemic and CBT approach, in person and online.`,
    url: SITE.siteUrl,
    telephone: SITE.phoneTel,
    email: SITE.email,
    image: [
      `${SITE.siteUrl}${IMG.room.src}`,
      `${SITE.siteUrl}${IMG.exterior.src}`,
      `${SITE.siteUrl}${IMG.portrait.src}`,
    ],
    logo: `${SITE.siteUrl}/images/logo.png`,
    priceRange: "$$",
    medicalSpecialty: "https://schema.org/Psychiatric",
    availableLanguage: ["Arabic", "English", "French"],
    hasMap: SITE.googleBusinessUrl || DIRECTIONS,
    address: {
      "@type": "PostalAddress",
      ...(SITE.streetAddress && { streetAddress: SITE.streetAddress }),
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      ...(SITE.postalCode && { postalCode: SITE.postalCode }),
      addressCountry: SITE.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.latitude,
      longitude: SITE.longitude,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Beqaa Governorate" },
      { "@type": "Country", name: "Lebanon" },
      ...AREAS_SERVED.filter((a) => !/online|beqaa/i.test(a)).map((a) => ({
        "@type": "City",
        name: a,
      })),
    ],
    availableService: SERVICES.map((s) => ({
      "@type": "MedicalTherapy",
      name: s.title,
      description: s.text,
      url: `${SITE.siteUrl}${s.href}`,
    })),
    knowsAbout: [
      "Psychotherapy",
      "Trauma and PTSD treatment",
      "Complex trauma",
      "Panic and anxiety disorders",
      "Depression and burnout",
      "Narcissistic abuse recovery",
      "Attachment theory",
      "Family systems therapy",
      "Online therapy",
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: SITE.hoursOpens,
        closes: SITE.hoursCloses,
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "appointments",
        telephone: SITE.phoneTel,
        email: SITE.email,
        availableLanguage: ["Arabic", "English", "French"],
        areaServed: "LB",
      },
    ],
    potentialAction: {
      "@type": "ReserveAction",
      name: "Book a therapy session",
      target: {
        "@type": "EntryPoint",
        urlTemplate: SITE.bookHref,
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
    },
    founder: { "@id": `${SITE.siteUrl}/#dany-charbel` },
    employee: { "@id": `${SITE.siteUrl}/#dany-charbel` },
    sameAs: [SITE.googleBusinessUrl, SITE.linkedinUrl, SITE.instagramUrl].filter(Boolean),
  };

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE.siteUrl}/#dany-charbel`,
    name: "Dany Charbel",
    honorificSuffix: "Msc",
    jobTitle: "Licensed Clinical Psychologist",
    image: `${SITE.siteUrl}${IMG.portrait.src}`,
    description:
      "Licensed clinical psychologist and psychotherapist in Lebanon, founder of The Spiral Psychodynamic Model. Integrates psychodynamic therapy, systemic family practice and cognitive behavioural therapy.",
    telephone: SITE.phoneTel,
    email: SITE.email,
    url: `${SITE.siteUrl}/about`,
    worksFor: { "@id": `${SITE.siteUrl}/#practice` },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Lebanese University, Faculty of Sciences",
    },
    knowsLanguage: ["ar", "en", "fr"],
    knowsAbout: [
      "Trauma recovery",
      "Post-traumatic stress",
      "Anxiety disorders",
      "Mood disorders",
      "Family and systemic therapy",
      "Psychodynamic therapy",
      "Psychoanalytic technique",
      "Cognitive behavioural therapy",
      "Narcissistic personality pathology",
      "Attachment and early relational trauma",
      "Psychosomatic symptoms",
      "Psychological resilience",
    ],
    ...(SITE.licenseNumber && {
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "license",
        name: SITE.licenseBody,
        identifier: SITE.licenseNumber,
      },
    }),
    sameAs: [SITE.linkedinUrl, SITE.googleBusinessUrl].filter(Boolean),
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ALL_FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const page = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE.siteUrl}/#webpage`,
    url: `${SITE.siteUrl}/`,
    name: TITLE,
    description: DESCRIPTION,
    inLanguage: "en",
    about: { "@id": `${SITE.siteUrl}/#practice` },
    primaryImageOfPage: `${SITE.siteUrl}${IMG.room.src}`,
  };

  return (
    <>
      {[practice, person, faq, page].map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
        />
      ))}
    </>
  );
}

/* ----------------------------------------------------------
   Small UI pieces
   ---------------------------------------------------------- */

function Button({ href, children, variant = "primary", external = false }) {
  const styles =
    variant === "primary"
      ? "bg-[#2F5D62] text-white hover:bg-[#244A4E]"
      : "border border-[#2F5D62] text-[#2F5D62] hover:bg-[#EAF1F0]";
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold transition-colors ${styles} ${focusRing}`}
    >
      {children}
    </a>
  );
}

/* Image with reserved space, lazy loading, and a calm fallback if the file is missing */
function Photo({ img, priority = false, className = "", rounded = "rounded-2xl", sizes }) {
  const [failed, setFailed] = useState(false);
  return (
    <div
      className={`relative overflow-hidden bg-[#DCE8E6] ${rounded} ${className}`}
      style={{ aspectRatio: `${img.w} / ${img.h}` }}
    >
      {!failed && (
        <img
          src={img.src}
          alt={img.alt}
          width={img.w}
          height={img.h}
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
          {...(priority ? { fetchpriority: "high" } : {})}
        />
      )}
    </div>
  );
}

function Icon({ d, className = "h-6 w-6" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

function HeroSpiral({ className = "" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden="true">
      <path
        d="M100 100a6 6 0 0 1 12 0 18 18 0 0 1-36 0 30 30 0 0 1 60 0 42 42 0 0 1-84 0 54 54 0 0 1 108 0 66 66 0 0 1-132 0 78 78 0 0 1 156 0"
        stroke="#2F5D62"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.9"
      />
    </svg>
  );
}

const h2 = "font-serif text-3xl font-semibold tracking-tight text-[#1F2A33] sm:text-[2.1rem]";
const link = `font-semibold text-[#2F5D62] underline underline-offset-4 rounded ${focusRing}`;

/* ----------------------------------------------------------
   PAGE
   ---------------------------------------------------------- */

export default function App() {
  useEffect(() => {
    document.title = TITLE;

    const setMeta = (selector, attrs) => {
      let el = document.head.querySelector(selector);
      if (!el) {
        el = document.createElement(selector.startsWith("link") ? "link" : "meta");
        document.head.appendChild(el);
      }
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    };

    const ogImage = `${SITE.siteUrl}${IMG.room.src}`;

    setMeta('meta[name="description"]', { name: "description", content: DESCRIPTION });
    setMeta('meta[name="robots"]', {
      name: "robots",
      content: "index, follow, max-image-preview:large, max-snippet:-1",
    });
    setMeta('link[rel="canonical"]', { rel: "canonical", href: SITE.siteUrl + "/" });

    setMeta('meta[property="og:title"]', { property: "og:title", content: TITLE });
    setMeta('meta[property="og:description"]', { property: "og:description", content: DESCRIPTION });
    setMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    setMeta('meta[property="og:url"]', { property: "og:url", content: SITE.siteUrl + "/" });
    setMeta('meta[property="og:locale"]', { property: "og:locale", content: "en_GB" });
    setMeta('meta[property="og:site_name"]', { property: "og:site_name", content: SITE.name });
    setMeta('meta[property="og:image"]', { property: "og:image", content: ogImage });
    setMeta('meta[property="og:image:alt"]', { property: "og:image:alt", content: IMG.room.alt });

    setMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    setMeta('meta[name="twitter:title"]', { name: "twitter:title", content: TITLE });
    setMeta('meta[name="twitter:description"]', { name: "twitter:description", content: DESCRIPTION });
    setMeta('meta[name="twitter:image"]', { name: "twitter:image", content: ogImage });

    /* Local signals */
    setMeta('meta[name="geo.region"]', { name: "geo.region", content: "LB-BI" });
    setMeta('meta[name="geo.placename"]', { name: "geo.placename", content: `${SITE.city}, Lebanon` });
    setMeta('meta[name="geo.position"]', {
      name: "geo.position",
      content: `${SITE.latitude};${SITE.longitude}`,
    });
    setMeta('meta[name="ICBM"]', { name: "ICBM", content: `${SITE.latitude}, ${SITE.longitude}` });
  }, []);

  return (
    <Layout currentPath="/">
      <StructuredData />

      {/* Extra bottom space so the mobile action bar never covers content */}
      <div className="pb-20 md:pb-0">
        {/* ---------- HERO ---------- */}
        <section className="bg-[#EEF4F3]">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 md:grid-cols-[1.25fr_1fr] md:py-20">
            <div>
              <p className="text-base font-semibold text-[#2F5D62]">
                {SITE.therapist}, {SITE.credential}
              </p>
              <h1 className="mt-3 max-w-xl font-serif text-4xl font-semibold leading-[1.12] tracking-tight text-[#1F2A33] sm:text-5xl">
                Therapy for trauma, anxiety and family struggles in {SITE.city}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#34434D]">
                You don’t have to carry this alone. I’m Dany Charbel, a licensed clinical
                psychologist with over six years of practice in Lebanon. I offer a calm,
                confidential space to understand what you’re going through, from PTSD and panic to
                painful relationships and old family patterns, and to move toward change at your
                own pace.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={SITE.bookHref} external>
                  Book a session
                </Button>
                <Button href={SITE.whatsapp} variant="secondary" external>
                  Message on WhatsApp
                </Button>
              </div>

              <p className="mt-4 text-sm text-[#4B5B66]">
                In person in {SITE.city} or online, in {SITE.languages}.
              </p>

              {/* Visible NAP: search engines cross-check this against the Google Business Profile */}
              <address className="mt-8 border-l-2 border-[#2F5D62] pl-4 not-italic text-sm leading-relaxed text-[#4B5B66]">
                <span className="font-semibold text-[#1F2A33]">{SITE.name}</span>
                <br />
                {SITE.streetAddress ? `${SITE.streetAddress}, ` : ""}
                {SITE.city}, {SITE.region}, Lebanon
                <br />
                <a href={`tel:${SITE.phoneTel}`} className={link}>
                  {SITE.phoneDisplay}
                </a>
                <span className="mx-2 text-[#9AA9B2]">|</span>
                <a href={`mailto:${SITE.email}`} className={link}>
                  {SITE.email}
                </a>
                <br />
                {SITE.hoursDisplay}
              </address>
            </div>

            <div className="relative mx-auto w-full max-w-sm">
              <HeroSpiral className="absolute -right-10 -top-10 h-56 w-56 opacity-30" />
              <Photo img={IMG.portrait} priority rounded="rounded-[2rem]" sizes="(min-width: 768px) 384px, 90vw" />
              <p className="mt-3 text-sm text-[#4B5B66]">
                {SITE.therapist}, clinical psychologist and psychotherapist
              </p>
            </div>
          </div>
        </section>

        {/* ---------- CREDENTIAL STRIP ---------- */}
        <section aria-label="Credentials" className="border-y border-[#D6E0DE] bg-white">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 text-sm sm:px-6 md:grid-cols-4">
            <p className="text-[#34434D]">
              <span className="block font-semibold text-[#1F2A33]">Licensed</span>
              Clinical psychologist, {SITE.licenseBody}
            </p>
            <p className="text-[#34434D]">
              <span className="block font-semibold text-[#1F2A33]">Trained</span>
              {SITE.education}
            </p>
            <p className="text-[#34434D]">
              <span className="block font-semibold text-[#1F2A33]">Languages</span>
              {SITE.languages}
            </p>
            <p className="text-[#34434D]">
              <span className="block font-semibold text-[#1F2A33]">Format</span>
              In person in {SITE.city} and secure online sessions
            </p>
          </div>
        </section>

        {/* ---------- SIGNS / PAIN POINTS ---------- */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <h2 className={h2}>You might be here because…</h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#4B5B66]">
            People rarely arrive with a clinical label. They arrive with something that has been
            weighing on them for a long time. If any of this sounds familiar, therapy can help.
          </p>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SIGNS.map((s) => (
              <li key={s.title} className="rounded-2xl border border-[#D6E0DE] bg-white p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF1F0] text-[#2F5D62]">
                  <Icon d={s.icon} />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-[#1F2A33]">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-[#4B5B66]">{s.text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- SERVICES ---------- */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
            <h2 className={h2}>How I can help</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#4B5B66]">
              Therapy is tailored to the person in front of me, not applied from a script. These
              are the areas I work with most often.
            </p>
            <div className="mt-10 grid gap-x-10 gap-y-9 sm:grid-cols-2 md:grid-cols-3">
              {SERVICES.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  className={`group rounded-sm border-t-2 border-[#2F5D62] pt-5 ${focusRing}`}
                >
                  <h3 className="text-xl font-semibold text-[#1F2A33] group-hover:text-[#2F5D62]">
                    {s.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-[#4B5B66]">{s.text}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-[#2F5D62] underline-offset-4 group-hover:underline">
                    Learn more about {s.title.toLowerCase()}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- APPROACH + ROOM PHOTOS ---------- */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <div className="grid items-center gap-12 md:grid-cols-[1fr_1.1fr]">
            <div className="grid grid-cols-5 gap-4">
              <Photo img={IMG.room} className="col-span-3 self-end" sizes="(min-width: 768px) 30vw, 60vw" />
              <Photo img={IMG.detail} className="col-span-2" sizes="(min-width: 768px) 20vw, 40vw" />
            </div>
            <div>
              <h2 className={h2}>An integrative approach, built around you</h2>
              <p className="mt-4 text-lg leading-relaxed text-[#34434D]">
                No single method fits every person. I combine three evidence-based traditions, so
                therapy can be both deep and practical.
              </p>
              <dl className="mt-6 space-y-5">
                {APPROACH.map((a) => (
                  <div key={a.title} className="border-l-2 border-[#2F5D62] pl-4">
                    <dt className="font-semibold text-[#1F2A33]">{a.title}</dt>
                    <dd className="mt-1 leading-relaxed text-[#4B5B66]">{a.text}</dd>
                  </div>
                ))}
              </dl>
              <a href="/approach" className={`mt-6 inline-block ${link}`}>
                Learn about my approach
              </a>
            </div>
          </div>
        </section>

        {/* ---------- THERAPIST'S OWN WORDS (from the GBP) ---------- */}
        <section className="bg-[#EEF4F3]">
          <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
            <blockquote className="border-l-4 border-[#2F5D62] pl-6 font-serif text-lg italic leading-relaxed text-[#34434D]">
              “As a licensed clinical psychologist with over 6 years of clinical practice, I
              specialize in trauma recovery, mood and anxiety disorders, and family dynamic issues.
              I provide tailored psychotherapy sessions to help my clients deal with life
              stressors, handle anxiety and overcome interpersonal problems. I deliver it in a
              non-judgmental frame with respect, and I ensure confidentiality and privacy. My
              integrative clinical framework combines psychodynamic therapy, systemic family
              practice and cognitive behavioral therapy.”
            </blockquote>
            <p className="mt-4 text-sm font-semibold text-[#2F5D62]">
              {SITE.therapist}, {SITE.credential}
            </p>
          </div>
        </section>

        {/* ---------- TRUST ---------- */}
        <section className="bg-[#1F2A33] text-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-20">
            <h2 className="font-serif text-3xl font-semibold tracking-tight">
              Why people choose this practice
            </h2>
            <ul className="space-y-4">
              {REASONS.map((r) => (
                <li key={r} className="flex gap-3 text-lg leading-snug text-[#DCE8E6]">
                  <svg
                    viewBox="0 0 24 24"
                    className="mt-1 h-5 w-5 shrink-0 text-[#8FC3BE]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- ABOUT / E-E-A-T ---------- */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <div className="grid items-start gap-12 md:grid-cols-[1fr_1.4fr]">
            <Photo
              img={{ ...IMG.portrait, alt: `${SITE.therapist} in session room, clinical psychologist in ${SITE.city}` }}
              className="mx-auto w-full max-w-xs md:sticky md:top-24"
              sizes="(min-width: 768px) 320px, 80vw"
            />
            <div>
              <h2 className={h2}>About my training</h2>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-[#34434D]">
                <p>
                  I hold a Master’s degree in Applied Clinical Psychology from the Lebanese
                  University. I conduct comprehensive assessments and diagnoses, and offer
                  tailored psychotherapy sessions designed to help clients cope with life
                  stressors and overcome interpersonal challenges.
                </p>
                <p>
                  I have more than five years of experience working with people exposed to major
                  traumatic life events, including depression, anxiety, PTSD and psychosomatic
                  symptoms. Across my university studies I spent three years training in the
                  psychoanalytic approach and psychodynamic technique, and completed a personal
                  psychoanalysis under the guidance of Dr. Thérèse Ward.
                </p>
                <p>
                  More recently I completed advanced training in Anthroposophical studies and the
                  Holistic Health approach in medicine with Prof. Robert Gorter, a lecturer at San
                  Francisco State University and the UCSF Medical School.
                </p>
              </div>
              <a href="/about" className={`mt-6 inline-block ${link}`}>
                Read the full background
              </a>
            </div>
          </div>
        </section>

        {/* ---------- NAME MEANING ---------- */}
        <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 md:pb-20">
          <h2 className={h2}>What the name means</h2>
          <p className="mt-5 text-lg leading-relaxed text-[#34434D]">
            We return to the past in therapy, but not to remain there. We return to it to
            understand it, and to free the present from repeating it. Growth does not happen in a
            closed circle, but on a spiral path that leads to a deeper awareness of ourselves. That
            is The Spiral Psychodynamic Model, an approach that integrates evidence-based
            psychotherapy with the symbolic and archetypal dimensions of the human psyche. It is a
            psychotherapy practice, not related to the “Spiral Dynamics” theory of social
            development.
          </p>
          <a href="/approach" className={`mt-6 inline-block ${link}`}>
            Learn about The Spiral Psychodynamic Model
          </a>
        </section>

        {/* ---------- ONLINE THERAPY ---------- */}
        <section className="bg-white">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-20">
            <div>
              <h2 className={h2}>Online therapy, wherever you are</h2>
              <p className="mt-4 text-lg leading-relaxed text-[#34434D]">
                Live far from {SITE.city}, travel often, or prefer to talk from home? Secure video
                sessions give you the same depth of work as the clinic. They suit people across
                Lebanon and Lebanese living in the Gulf, Europe, Africa, Canada, Australia and the
                US.
              </p>
              <ul className="mt-5 space-y-2 text-[#4B5B66]">
                <li>Private, encrypted video, in Arabic, English or French</li>
                <li>A phone or WhatsApp backup if the power or internet drops</li>
                <li>Evening and flexible slots to help with time zones</li>
              </ul>
              <a href="/online-therapy" className={`mt-6 inline-block ${link}`}>
                How online therapy works
              </a>
            </div>
            <Photo img={IMG.online} sizes="(min-width: 768px) 50vw, 100vw" />
          </div>
        </section>

        {/* ---------- PROCESS ---------- */}
        <section className="bg-[#EEF4F3]">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
            <h2 className={h2}>What happens when you reach out</h2>
            <ol className="mt-10 grid gap-8 md:grid-cols-3">
              {STEPS.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2F5D62] text-lg font-semibold text-white"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1F2A33]">{s.title}</h3>
                    <p className="mt-1 leading-relaxed text-[#4B5B66]">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- LOCATION / MAP ---------- */}
        <section id="location" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 md:py-20">
          <h2 className={h2}>Find the clinic in {SITE.city}</h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#4B5B66]">
            A private psychology clinic in {SITE.city}, {SITE.region}, easy to reach from across the
            Beqaa Valley. If you cannot travel, online sessions are available.
          </p>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
            <div className="overflow-hidden rounded-2xl border border-[#D6E0DE]">
              <iframe
                title={`Map showing ${SITE.name} in ${SITE.city}, Lebanon`}
                src={MAP_EMBED}
                width="600"
                height="420"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="block h-[340px] w-full border-0 sm:h-[420px]"
              />
            </div>

            <div className="space-y-6">
              <Photo img={IMG.exterior} sizes="(min-width: 1024px) 33vw, 100vw" />

              <address className="not-italic leading-relaxed text-[#34434D]">
                <span className="block font-semibold text-[#1F2A33]">{SITE.name}</span>
                {SITE.streetAddress ? `${SITE.streetAddress}, ` : ""}
                {SITE.city}, {SITE.region}, Lebanon
                <br />
                <a href={`tel:${SITE.phoneTel}`} className={link}>
                  {SITE.phoneDisplay}
                </a>
                <br />
                <span className="text-[#4B5B66]">{SITE.hoursDisplay}</span>
              </address>

              <div className="flex flex-wrap gap-3">
                <Button href={DIRECTIONS} external>
                  Get directions
                </Button>
                {SITE.googleBusinessUrl && (
                  <Button href={SITE.googleBusinessUrl} variant="secondary" external>
                    View on Google
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-lg font-semibold text-[#1F2A33]">Clients come from</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {AREAS_SERVED.map((a) => (
                <li
                  key={a}
                  className="rounded-full border border-[#D6E0DE] bg-white px-4 py-1.5 text-sm text-[#34434D]"
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- FAQ ---------- */}
        <section className="bg-white">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-20">
            <h2 className={h2}>Questions people ask before they begin</h2>
            <p className="mt-4 text-lg leading-relaxed text-[#4B5B66]">
              Starting therapy brings up a lot of questions, and many people feel nervous to ask
              them. Here are honest answers. If yours is missing, just message me.
            </p>

            {FAQ_GROUPS.map((g) => (
              <div key={g.group} className="mt-12">
                <h3 className="font-serif text-xl font-semibold text-[#2F5D62]">{g.group}</h3>
                <div className="mt-4 divide-y divide-[#D6E0DE] border-y border-[#D6E0DE]">
                  {g.items.map((f) => (
                    <details key={f.q} className="group py-5">
                      <summary
                        className={`flex cursor-pointer list-none items-center justify-between gap-4 rounded text-lg font-semibold text-[#1F2A33] ${focusRing} [&::-webkit-details-marker]:hidden`}
                      >
                        {f.q}
                        <svg
                          viewBox="0 0 24 24"
                          className="h-5 w-5 shrink-0 text-[#2F5D62] transition-transform group-open:rotate-180"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </summary>
                      <p className="mt-3 leading-relaxed text-[#4B5B66]">{f.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            ))}

            <a href="/faq" className={`mt-8 inline-block ${link}`}>
              Read all questions
            </a>
          </div>
        </section>

        {/* ---------- FINAL CTA ---------- */}
        <section className="bg-[#2F5D62] text-white">
          <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 md:py-20">
            <h2 className="font-serif text-3xl font-semibold tracking-tight">
              Ready to take the first step?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-[#DCEBE9]">
              Reaching out is not a weakness. It is the first turn of the spiral. Send a message
              and I will reply as soon as I can.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-semibold text-[#2F5D62] hover:bg-[#EAF1F0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#2F5D62]"
              >
                Message on WhatsApp
              </a>
              <a
                href={`tel:${SITE.phoneTel}`}
                className="inline-flex items-center justify-center rounded-full border border-white px-6 py-3 text-base font-semibold text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#2F5D62]"
              >
                Call {SITE.phoneDisplay}
              </a>
              <a
                href={SITE.bookHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white px-6 py-3 text-base font-semibold text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#2F5D62]"
              >
                Book a session
              </a>
            </div>
            <p className="mt-6 text-sm text-[#DCEBE9]">
              {SITE.city}, Lebanon. Online across Lebanon and abroad.
            </p>
            <p className="mx-auto mt-6 max-w-xl text-xs leading-relaxed text-[#C4D8D5]">
              In an emergency in Lebanon, call the Embrace Lifeline on 1564 or the Red Cross on
              140. Therapy sessions are not an emergency service.
            </p>
          </div>
        </section>
      </div>

      {/* ---------- MOBILE ACTION BAR ---------- */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-[#D6E0DE] bg-white/95 p-3 backdrop-blur md:hidden"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <a
          href={SITE.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex-1 rounded-full bg-[#2F5D62] px-4 py-3 text-center text-sm font-semibold text-white ${focusRing}`}
        >
          WhatsApp
        </a>
        <a
          href={`tel:${SITE.phoneTel}`}
          className={`flex-1 rounded-full border border-[#2F5D62] px-4 py-3 text-center text-sm font-semibold text-[#2F5D62] ${focusRing}`}
        >
          Call
        </a>
        <a
          href="#location"
          className={`flex-1 rounded-full border border-[#2F5D62] px-4 py-3 text-center text-sm font-semibold text-[#2F5D62] ${focusRing}`}
        >
          Map
        </a>
      </div>
    </Layout>
  );
}