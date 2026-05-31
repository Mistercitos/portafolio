import type { Metadata } from 'next'
import { inter, newsreader } from '@/lib/fonts'
import { getUI, locales, toLocale, type Locale } from '@/lib/i18n'
import { Header } from '@/app/components/Header'
import { Footer } from '@/app/components/Footer'
import { SmoothScrollProvider } from '@/app/components/SmoothScrollProvider'
import '@/app/globals.css'

type LayoutParams = Promise<{ locale: string }>

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

// OG image dinámica del home — generada por /api/og, localizada por idioma.
const ogTitles: Record<Locale, string> = {
  es: 'Diseño y escalo productos digitales complejos',
  en: 'I design and scale complex digital products',
}

export async function generateMetadata({
  params,
}: {
  params: LayoutParams
}): Promise<Metadata> {
  const locale = toLocale((await params).locale)
  const t = getUI(locale).meta
  const isEn = locale === 'en'
  const ogImage = `/api/og?title=${encodeURIComponent(
    ogTitles[locale],
  )}&eyebrow=${encodeURIComponent('Senior Product Designer · UX Engineer')}`

  return {
    metadataBase: new URL('https://chrisdelbarco.design'),
    title: { default: t.title, template: t.titleTemplate },
    description: t.description,
    alternates: {
      canonical: isEn ? '/en' : '/',
      languages: {
        es: '/',
        en: '/en',
        'x-default': '/',
      },
    },
    openGraph: {
      type: 'website',
      locale: getUI(locale).ogLocale,
      alternateLocale: getUI(isEn ? 'es' : 'en').ogLocale,
      url: isEn ? '/en' : '/',
      siteName: 'Christian Del Barco',
      title: t.title,
      description: t.ogDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: t.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.twitterDescription,
      images: [ogImage],
    },
  }
}

function buildJsonLd(locale: Locale) {
  const t = getUI(locale).meta
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Christian Del Barco',
    jobTitle: 'Senior Product Designer',
    url: 'https://chrisdelbarco.design',
    email: 'cdelbarcog92@gmail.com',
    sameAs: ['https://linkedin.com/in/cdelbarco', 'https://github.com/Mistercitos'],
    address: { '@type': 'PostalAddress', addressLocality: 'Santiago', addressCountry: 'CL' },
    knowsLanguage: ['Spanish', 'English'],
    description: t.description,
  }
  const site = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Christian Del Barco',
    url: locale === 'en' ? 'https://chrisdelbarco.design/en' : 'https://chrisdelbarco.design',
    inLanguage: locale,
    author: { '@type': 'Person', name: 'Christian Del Barco' },
  }
  return [person, site]
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: LayoutParams
}) {
  const locale = toLocale((await params).locale)
  const jsonLd = buildJsonLd(locale)

  return (
    <html
      lang={getUI(locale).htmlLang}
      className={`${inter.variable} ${newsreader.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Theme bootstrap: aplicar el tema persistido antes del primer render para evitar flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`,
          }}
        />
        {jsonLd.map((node, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
          />
        ))}
      </head>
      <body>
        <SmoothScrollProvider>
          <Header locale={locale} />
          <main>{children}</main>
          <Footer locale={locale} />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
