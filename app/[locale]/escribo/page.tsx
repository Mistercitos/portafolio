import type { Metadata } from 'next'
import { Reveal } from '@/app/components/Reveal'
import { getPublishedPosts } from '@/lib/posts'
import { toLocale, type Locale } from '@/lib/i18n'
import { PostsList } from './_components/PostsList'

type WritingContent = {
  metaTitle: string
  metaDescription: string
  eyebrow: string
  title: string
  intro: string
}

const WRITING: Record<Locale, WritingContent> = {
  es: {
    metaTitle: 'Escribo',
    metaDescription:
      'Notas sobre design systems, diseño de productos operacionales, IA en interfaces complejas y el cruce entre diseño e ingeniería.',
    eyebrow: 'Escribo',
    title: 'Notas desde el medio.',
    intro:
      'Escribo sobre cómo diseño productos operacionales, lo que aprendí armando un design system de cero a más de 100 componentes, y por qué creo que en 2026 un Product Designer debería escribir código.',
  },
  en: {
    metaTitle: 'Writing',
    metaDescription:
      'Notes on design systems, designing operational products, AI in complex interfaces, and the crossover between design and engineering.',
    eyebrow: 'Writing',
    title: 'Notes from the middle.',
    intro:
      'I write about how I design operational products, what I learned building a design system from zero to 100+ components, and why I think a Product Designer should write code in 2026.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const locale = toLocale((await params).locale)
  const t = WRITING[locale]
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      canonical: locale === 'en' ? '/en/escribo' : '/escribo',
      languages: { es: '/escribo', en: '/en/escribo', 'x-default': '/escribo' },
    },
  }
}

export default async function WritingIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const locale = toLocale((await params).locale)
  const t = WRITING[locale]
  const posts = getPublishedPosts(locale)

  return (
    <div className="container" style={{ paddingTop: 80, paddingBottom: 40, maxWidth: 920 }}>
      <Reveal>
        <header style={{ marginBottom: 56, maxWidth: '60ch' }}>
          <p
            style={{
              margin: 0,
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--subtle)',
              marginBottom: 14,
            }}
          >
            {t.eyebrow}
          </p>
          <h1
            className="serif"
            style={{
              margin: 0,
              fontSize: 'clamp(40px, 5.4vw, 72px)',
              fontWeight: 500,
              fontStyle: 'italic',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: 'var(--text)',
            }}
          >
            {t.title}
          </h1>
          <p
            style={{
              margin: '24px 0 0',
              fontSize: 17,
              lineHeight: 1.65,
              color: 'var(--text-secondary)',
            }}
          >
            {t.intro}
          </p>
        </header>
      </Reveal>

      <Reveal delay={0.1}>
        <PostsList posts={posts} locale={locale} />
      </Reveal>
    </div>
  )
}
