import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ViewTransitionLink } from '@/app/components/ViewTransitionLink'
import { Reveal } from '@/app/components/Reveal'
import { ReadingProgress } from '@/app/components/ReadingProgress'
import { PortableTextRenderer } from '@/app/components/PortableTextRenderer'
import { posts, getPostBySlug } from '@/lib/posts'
import { getCaseBySlug } from '@/lib/cases'
import { localizedPath, toLocale, type Locale } from '@/lib/i18n'

type Params = Promise<{ locale: string; slug: string }>

const BASE = 'https://chrisdelbarco.design'

type PostStrings = {
  notFound: string
  back: string
  related: string
  relatedCta: string
  readingSuffix: string
  homeName: string
  writingName: string
}

const STRINGS: Record<Locale, PostStrings> = {
  es: {
    notFound: 'Post no encontrado',
    back: 'Volver a todos los posts',
    related: 'Case study relacionado',
    relatedCta: 'Ver el case completo →',
    readingSuffix: 'min',
    homeName: 'Inicio',
    writingName: 'Escribo',
  },
  en: {
    notFound: 'Post not found',
    back: 'Back to all posts',
    related: 'Related case study',
    relatedCta: 'See the full case →',
    readingSuffix: 'min read',
    homeName: 'Home',
    writingName: 'Writing',
  },
}

export function generateStaticParams() {
  return posts.filter((p) => p.status === 'published').map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params
  const locale = toLocale(rawLocale)
  const p = getPostBySlug(slug, locale)
  if (!p) return { title: STRINGS[locale].notFound }
  const ogImage = `/api/og?title=${encodeURIComponent(p.title)}&eyebrow=${encodeURIComponent(p.category)}`
  const path = `/escribo/${p.slug}`
  return {
    title: p.title,
    description: p.excerpt,
    alternates: {
      canonical: localizedPath(path, locale),
      languages: { es: path, en: `/en${path}`, 'x-default': path },
    },
    openGraph: {
      type: 'article',
      title: p.title,
      description: p.excerpt,
      publishedTime: p.publishedAt,
      tags: p.tags,
      images: [{ url: ogImage, width: 1200, height: 630, alt: p.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: p.title,
      description: p.excerpt,
      images: [ogImage],
    },
  }
}

export default async function PostPage({ params }: { params: Params }) {
  const { locale: rawLocale, slug } = await params
  const locale = toLocale(rawLocale)
  const t = STRINGS[locale]
  const p = getPostBySlug(slug, locale)
  if (!p || p.status !== 'published') notFound()

  const related = p.relatedCaseStudy ? getCaseBySlug(p.relatedCaseStudy, locale) : undefined

  const dateFormatter = new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: p.title,
        description: p.excerpt,
        datePublished: p.publishedAt,
        dateModified: p.publishedAt,
        inLanguage: locale,
        url: `${BASE}${localizedPath(`/escribo/${p.slug}`, locale)}`,
        author: { '@type': 'Person', name: 'Christian Del Barco', url: BASE },
        keywords: p.tags.join(', '),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: t.homeName,
            item: `${BASE}${localizedPath('/', locale)}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: t.writingName,
            item: `${BASE}${localizedPath('/escribo', locale)}`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: p.title,
            item: `${BASE}${localizedPath(`/escribo/${p.slug}`, locale)}`,
          },
        ],
      },
    ],
  }

  return (
    <article className="container" style={{ paddingTop: 40, paddingBottom: 40, maxWidth: 760 }}>
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <ViewTransitionLink
        href={localizedPath('/escribo', locale)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 13,
          color: 'var(--text-secondary)',
          marginBottom: 48,
        }}
      >
        <span aria-hidden>←</span>
        {t.back}
      </ViewTransitionLink>

      <header style={{ marginBottom: 56 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 11,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--subtle)',
            marginBottom: 24,
          }}
        >
          <span>{p.category}</span>
          <span aria-hidden style={{ opacity: 0.5 }}>·</span>
          <span>{dateFormatter.format(new Date(p.publishedAt))}</span>
          <span aria-hidden style={{ opacity: 0.5 }}>·</span>
          <span>
            {p.readingMinutes} {t.readingSuffix}
          </span>
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: 'clamp(36px, 4.8vw, 60px)',
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: '-0.025em',
            color: 'var(--text)',
          }}
        >
          {p.title}
        </h1>
        <p
          style={{
            margin: '24px 0 0',
            fontSize: 19,
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
            maxWidth: '60ch',
          }}
        >
          {p.excerpt}
        </p>
      </header>

      <Reveal>
        <PortableTextRenderer blocks={p.body} />
      </Reveal>

      {related ? (
        <div
          style={{
            marginTop: 80,
            padding: '32px 24px',
            borderRadius: 18,
            background: 'var(--surface-subtle)',
            border: '0.5px solid var(--border)',
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--subtle)',
              marginBottom: 10,
            }}
          >
            {t.related}
          </p>
          <h3
            className="serif"
            style={{
              margin: 0,
              fontSize: 24,
              fontStyle: 'italic',
              fontWeight: 500,
              color: 'var(--text)',
              letterSpacing: '-0.01em',
            }}
          >
            {related.title}
          </h3>
          <ViewTransitionLink
            href={localizedPath(`/trabajo/${related.slug}`, locale)}
            style={{
              display: 'inline-block',
              marginTop: 16,
              fontSize: 14,
              color: 'var(--accent)',
              borderBottom: '1px solid var(--accent)',
              paddingBottom: 2,
            }}
          >
            {t.relatedCta}
          </ViewTransitionLink>
        </div>
      ) : null}
    </article>
  )
}
