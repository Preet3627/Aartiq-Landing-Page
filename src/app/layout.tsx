import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { APP_INFO } from "@/lib/version";
import { getVersionFromPackage } from "@/lib/version-server";

const APP_VERSION = getVersionFromPackage();

const outfit = Outfit({ 
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
});

const SITE_URL = 'https://aartiq.ponsrischool.in';
const LOGO_URL = `${SITE_URL}/logo-transparent.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Aartiq - Open Source AI-Native Browser with Local LLM & OS Automation`,
    template: `%s | Aartiq - AI-Native Browser`,
  },
  description: "Aartiq is an open-source, AI-native browser with autonomous agent capabilities, local LLM support (Ollama), permission-gated OS automation, and cross-device sync. Built with Electron, Next.js, and TypeScript.",
  keywords: [
    "Aartiq", "AI Browser", "Autonomous Browser",
    "Browser Automation", "Electron Browser", "AI Agent",
    "Local LLM", "Ollama Browser", "Privacy Browser", "Open Source Browser",
    "E2EE Sync", "Cross-Platform Browser", "OS Automation",
    "Browser AI Agent", "macOS Browser",
    "Windows Browser", "Linux Browser", "Android Browser",
    "Productivity Browser", "AI Assistant Browser",
    "Permission-Gated Automation", "Secure Browser",
    "AI-Native Browser", "Autonomous AI Agent"
  ],
  authors: [
    { name: "Preet3627", url: "https://github.com/Preet3627" },
    { name: "Latestinssan", url: "https://github.com/Latestinssan" }
  ],
  creator: "Preet3627",
  publisher: "Aartiq",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Aartiq - Open Source AI-Native Browser",
    description: "An open-source, AI-native browser with autonomous agent capabilities, local LLM support, and cross-device sync. Features permission-gated OS automation and privacy-first design.",
    url: SITE_URL,
    siteName: 'Aartiq',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: LOGO_URL,
        width: 1000,
        height: 1000,
        alt: 'Aartiq - Open Source AI-Native Browser',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aartiq - Open Source AI-Native Browser',
    description: 'Open-source AI-native browser with autonomous agents, local LLM support, and cross-device sync.',
    images: [LOGO_URL],
    creator: '@Preet3627',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'llms.txt': `${SITE_URL}/llms.txt`,
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      'en': SITE_URL,
    },
  },
  verification: {
    google: ['BgnZqDgMLWR3GCOKwPz1U1qh8PSetoVcIc7DsrEy_iA', 'BuPrG5ROAefeU7rpMmWDlhk1-zm2_Y3mHRgNy4XkDyU'],
    yandex: 'yandex-verification-code',
  },
    icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", url: "/logo-transparent.png" },
    { rel: "manifest", url: "/manifest.json" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script type="module" src="https://get.microsoft.com/badge/ms-store-badge.bundled.js"></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Aartiq",
              "alternateName": "Aartiq Browser",
              "url": SITE_URL,
              "image": LOGO_URL,
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": `${SITE_URL}/search?q={search_term_string}`
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Aartiq",
              "alternateName": "Aartiq Browser",
              "url": SITE_URL,
              "logo": LOGO_URL,
              "image": LOGO_URL,
              "sameAs": [
                "https://github.com/Preet3627/Aartiq",
                "https://aartiq.vercel.app"
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": APP_INFO.name,
              "alternateName": APP_INFO.fullName,
              "description": "Open-source AI-native browser with autonomous agent capabilities, background scheduling, local LLM support, and privacy-focused cross-device sync.",
              "url": SITE_URL,
              "image": LOGO_URL,
              "applicationCategory": "UtilityApplication",
              "operatingSystem": ["Windows", "macOS", "Linux", "Android"],
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              },
              "author": {
                "@type": "Person",
                "name": "Preet3627",
                "url": "https://github.com/Preet3627",
                "memberOf": {
                  "@type": "Organization",
                  "name": "Aartiq Team"
                }
              },
              "downloadUrl": `${SITE_URL}/downloads`,
              "softwareVersion": APP_VERSION.version,
              "releaseNotes": "https://github.com/Preet3627/Aartiq/releases",
              "featureList": [
                "AI Agent Control",
                "Local LLM Support (Ollama)",
                "Shell Command Execution",
                "Background Scheduling",
                "Triple-Lock Security",
                "Cross-Device Sync",
                "PDF Generation",
                "Open Source"
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TechArticle",
              "headline": `${APP_INFO.name} Documentation`,
              "description": "Documentation for Aartiq — installation, AI commands, API reference, security model, and developer guides.",
              "url": `${SITE_URL}/docs`,
              "datePublished": "2024-01-01",
              "dateModified": "2026-04-06",
              "author": {
                "@type": "Person",
                "name": "Preet3627",
                "url": "https://github.com/Preet3627"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Aartiq Team",
                "logo": {
                  "@type": "ImageObject",
                  "url": LOGO_URL
                }
              },
              "about": {
                "@type": "SoftwareApplication",
                "name": APP_INFO.name,
                "applicationCategory": "UtilityApplication",
                "operatingSystem": ["Windows", "macOS", "Linux", "Android"]
              },
              "proficiencyLevel": "Beginner",
              "genre": ["Documentation", "Technical Reference", "Developer Guide"]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": `${APP_INFO.name} Documentation Index`,
              "description": "Index of all documentation pages for Aartiq",
              "url": `${SITE_URL}/docs`,
              "mainEntity": {
                "@type": "ItemList",
                "itemListElement": [
                  {"@type": "ListItem", "position": 1, "name": "Getting Started", "url": `${SITE_URL}/docs/getting-started`},
                  {"@type": "ListItem", "position": 2, "name": "Overview", "url": `${SITE_URL}/docs/overview`},
                  {"@type": "ListItem", "position": 3, "name": "AI Commands", "url": `${SITE_URL}/docs/ai-commands`},
                  {"@type": "ListItem", "position": 4, "name": "Security", "url": `${SITE_URL}/docs/security`},
                  {"@type": "ListItem", "position": 5, "name": "Automation", "url": `${SITE_URL}/docs/automation`},
                  {"@type": "ListItem", "position": 6, "name": "Cloud Sync", "url": `${SITE_URL}/docs/cloud-sync`},
                  {"@type": "ListItem", "position": 7, "name": "Plugins", "url": `${SITE_URL}/docs/plugins`},
                  {"@type": "ListItem", "position": 8, "name": "API Reference", "url": `${SITE_URL}/docs/api-reference`}
                ]
              }
            })
          }}
        />
      </head>
      <body className={`${outfit.variable} font-outfit antialiased bg-[#03040b] text-white`}>
        {children}
      </body>
    </html>
  );
}
