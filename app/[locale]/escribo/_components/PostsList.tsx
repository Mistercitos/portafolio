'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ViewTransitionLink } from '@/app/components/ViewTransitionLink'
import { localizedPath, type Locale } from '@/lib/i18n'
import type { Post } from '@/lib/posts'

type ListStrings = {
  filterAria: string
  all: string
  readingSuffix: string
  emptyTitle: string
  emptyBody: string
}

const STRINGS: Record<Locale, ListStrings> = {
  es: {
    filterAria: 'Filtrar posts por categoría',
    all: 'Todos',
    readingSuffix: 'min de lectura',
    emptyTitle: 'Sin posts en esta categoría todavía.',
    emptyBody: 'En breve subo más — prueba otra categoría mientras tanto.',
  },
  en: {
    filterAria: 'Filter posts by category',
    all: 'All',
    readingSuffix: 'min read',
    emptyTitle: 'No posts in this category yet.',
    emptyBody: 'More coming soon — try another category in the meantime.',
  },
}

export function PostsList({ posts, locale }: { posts: Post[]; locale: Locale }) {
  const t = STRINGS[locale]
  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'es-CL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    [locale],
  )

  // Categorías únicas presentes en los posts publicados
  const categories = useMemo(() => {
    const seen = new Set<string>()
    for (const p of posts) seen.add(p.category)
    return Array.from(seen)
  }, [posts])

  const [filter, setFilter] = useState<string | null>(null)

  const filtered = useMemo(() => {
    if (!filter) return posts
    return posts.filter((p) => p.category === filter)
  }, [filter, posts])

  return (
    <>
      {/* Filter pills */}
      <div
        role="group"
        aria-label={t.filterAria}
        style={{
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          marginBottom: 48,
          paddingBottom: 24,
          borderBottom: '0.5px solid var(--divider)',
        }}
      >
        <FilterPill
          label={t.all}
          count={posts.length}
          active={filter === null}
          onClick={() => setFilter(null)}
        />
        {categories.map((cat) => {
          const count = posts.filter((p) => p.category === cat).length
          return (
            <FilterPill
              key={cat}
              label={cat}
              count={count}
              active={filter === cat}
              onClick={() => setFilter(cat)}
            />
          )
        })}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <EmptyState title={t.emptyTitle} body={t.emptyBody} />
      ) : (
        <AnimatePresence mode="popLayout">
          <motion.div
            key={filter ?? 'all'}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'grid', gap: 0 }}
          >
            {filtered.map((p, i) => (
              <PostCard
                key={p.slug}
                post={p}
                index={i}
                totalCount={filtered.length}
                locale={locale}
                dateLabel={dateFormatter.format(new Date(p.publishedAt))}
                readingSuffix={t.readingSuffix}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  )
}

/* ─────────────────────────────────────────────────────────────────────── */
/* FilterPill                                                                */
/* ─────────────────────────────────────────────────────────────────────── */

function FilterPill({
  label,
  count,
  active,
  onClick,
}: {
  label: string
  count: number
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={{
        padding: '8px 14px',
        borderRadius: 999,
        border: `0.5px solid ${active ? 'var(--accent)' : 'var(--border-strong)'}`,
        background: active ? 'var(--accent-weak)' : 'transparent',
        color: active ? 'var(--accent)' : 'var(--text-secondary)',
        fontSize: 13,
        fontWeight: 500,
        letterSpacing: '0.01em',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        transition:
          'background var(--t-fast) var(--ease), border-color var(--t-fast) var(--ease), color var(--t-fast) var(--ease)',
      }}
    >
      {label}
      <span
        style={{
          fontSize: 11,
          opacity: active ? 0.85 : 0.55,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {count}
      </span>
    </button>
  )
}

/* ─────────────────────────────────────────────────────────────────────── */
/* PostCard                                                                  */
/* ─────────────────────────────────────────────────────────────────────── */

function PostCard({
  post,
  index,
  totalCount,
  locale,
  dateLabel,
  readingSuffix,
}: {
  post: Post
  index: number
  totalCount: number
  locale: Locale
  dateLabel: string
  readingSuffix: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <ViewTransitionLink
        href={localizedPath(`/escribo/${post.slug}`, locale)}
        style={{
          display: 'block',
          paddingBlock: 32,
          borderTop: '0.5px solid var(--border)',
          borderBottom: index === totalCount - 1 ? '0.5px solid var(--border)' : 'none',
          transition: 'background var(--t-fast) var(--ease)',
        }}
      >
        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
          <div
            style={{
              flexShrink: 0,
              width: 112,
              display: 'grid',
              gap: 8,
              paddingTop: 6,
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignSelf: 'flex-start',
                padding: '4px 10px',
                borderRadius: 999,
                background: 'var(--accent-weak)',
                color: 'var(--accent)',
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              {post.category}
            </span>
            <p
              style={{
                margin: 0,
                fontSize: 12,
                color: 'var(--muted)',
                lineHeight: 1.4,
              }}
            >
              {dateLabel}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 11,
                color: 'var(--subtle)',
                letterSpacing: '0.04em',
              }}
            >
              {post.readingMinutes} {readingSuffix}
            </p>
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <h2
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 500,
                lineHeight: 1.25,
                letterSpacing: '-0.01em',
                color: 'var(--text)',
              }}
            >
              {post.title}
            </h2>
            <p
              style={{
                margin: '12px 0 0',
                fontSize: 15,
                lineHeight: 1.6,
                color: 'var(--text-secondary)',
                maxWidth: '60ch',
              }}
            >
              {post.excerpt}
            </p>
            {post.tags && post.tags.length > 0 ? (
              <div style={{ display: 'flex', gap: 6, marginTop: 16, flexWrap: 'wrap' }}>
                {post.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: '3px 8px',
                      borderRadius: 999,
                      border: '0.5px solid var(--border)',
                      fontSize: 10,
                      letterSpacing: '0.06em',
                      color: 'var(--muted)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <div
            aria-hidden
            style={{
              alignSelf: 'flex-end',
              color: 'var(--muted)',
              fontSize: 18,
              paddingBottom: 4,
            }}
          >
            →
          </div>
        </div>
      </ViewTransitionLink>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────────── */
/* EmptyState                                                                */
/* ─────────────────────────────────────────────────────────────────────── */

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div
      style={{
        padding: '60px 24px',
        textAlign: 'center',
        border: '0.5px dashed var(--border-strong)',
        borderRadius: 18,
      }}
    >
      <p
        className="serif"
        style={{
          margin: 0,
          fontSize: 22,
          fontStyle: 'italic',
          color: 'var(--text)',
        }}
      >
        {title}
      </p>
      <p style={{ margin: '12px 0 0', fontSize: 14, color: 'var(--muted)' }}>{body}</p>
    </div>
  )
}
