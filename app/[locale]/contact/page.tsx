import type { Metadata } from 'next'
import { Reveal } from '@/app/components/Reveal'
import { Stagger, StaggerItem } from '@/app/components/Stagger'
import { EmailContactCard } from './_components/EmailContactCard'
import { toLocale, type Locale } from '@/lib/i18n'

const EMAIL = 'cdelbarcog92@gmail.com'

type Channel = { label: string; url: string; handle: string; description: string }
type Faq = { q: string; a: string }
type StatusItemData = { dot: 'success' | 'neutral'; label: string; value: string }

type ContactContent = {
  metaTitle: string
  metaDescription: string
  eyebrow: string
  title: string
  intro: string
  status: StatusItemData[]
  channelsEyebrow: string
  channelsTitle: string
  channels: Channel[]
  faqEyebrow: string
  faqTitle: string
  faq: Faq[]
  closingTitle: string
  closingBody: string
}

const CONTACT: Record<Locale, ContactContent> = {
  es: {
    metaTitle: 'Contacto',
    metaDescription:
      'Escríbeme a cdelbarcog92@gmail.com o conectemos en LinkedIn. Respondo en menos de 24 horas hábiles.',
    eyebrow: 'Contacto',
    title: 'Hablemos.',
    intro:
      'La forma más rápida de contactarme es por email. Abajo hay un asistente que arma el asunto y una plantilla según el tipo de mensaje. Respondo en menos de 24 horas hábiles.',
    status: [
      { dot: 'success', label: 'Tiempo de respuesta', value: '< 24h hábiles' },
      { dot: 'success', label: 'Disponibilidad', value: 'Remoto US y LATAM' },
      { dot: 'neutral', label: 'Idiomas', value: 'ES · EN' },
      { dot: 'neutral', label: 'Time zone', value: 'GMT-3 (Santiago)' },
    ],
    channelsEyebrow: 'Otros canales · 02',
    channelsTitle: 'Si prefieres un canal más corto.',
    channels: [
      {
        label: 'LinkedIn',
        url: 'https://linkedin.com/in/cdelbarco',
        handle: 'in/cdelbarco',
        description: 'Mi perfil profesional y las recomendaciones de gente con la que trabajé.',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/Mistercitos',
        handle: 'Mistercitos',
        description: 'Proyectos propios, este portafolio y experimentos en código.',
      },
      {
        label: 'Behance',
        url: 'https://behance.net/cdelbarco',
        handle: 'cdelbarco',
        description: 'Mi trabajo gráfico más antiguo: agencia, branding y piezas multicanal.',
      },
    ],
    faqEyebrow: 'FAQ · 03',
    faqTitle: 'Antes de que preguntes.',
    faq: [
      {
        q: '¿Estás abierto a roles de tiempo completo?',
        a: 'Sí. Me interesan equipos que construyen producto operacional, B2B SaaS o marketplaces, para roles de Senior Product Designer, UX Engineer o Design Engineer. Trabajo remoto desde Santiago y evalúo relocación según el caso.',
      },
      {
        q: '¿Trabajas freelance o consultoría?',
        a: 'Sí, con cupos limitados. Funciona mejor para proyectos cortos, de 4 a 12 semanas, con un alcance claro, o para consultoría puntual sobre design systems, AI UX o productos operacionales.',
      },
      {
        q: '¿Cuál es tu tiempo de respuesta?',
        a: 'Menos de 24 horas en días hábiles. Si es urgente, escribe [URGENTE] en el asunto y respondo el mismo día.',
      },
      {
        q: '¿Aceptas llamadas exploratorias?',
        a: 'Sí, aunque prefiero un primer email con contexto. Si tiene sentido, agendamos 20 o 30 minutos. El calendario lo coordino por correo después.',
      },
      {
        q: '¿Idiomas y zona horaria?',
        a: 'Español nativo e inglés avanzado. Trabajo desde Santiago (GMT-3) y cubro sin problema el horario de la costa este y central de Estados Unidos.',
      },
    ],
    closingTitle: 'Si me escribes por algo serio, hazlo fácil de leer.',
    closingBody:
      'Un mensaje útil me dice de qué empresa escribes, para qué rol o proyecto, en qué etapa está, y qué te llamó la atención de mi trabajo. Con eso, respondo el mismo día.',
  },
  en: {
    metaTitle: 'Contact',
    metaDescription:
      'Email me at cdelbarcog92@gmail.com or connect on LinkedIn. I reply within 24 business hours.',
    eyebrow: 'Contact',
    title: "Let's talk.",
    intro:
      "The fastest way to reach me is by email. Below there's a helper that builds the subject line and a template based on the type of message. I reply within 24 business hours.",
    status: [
      { dot: 'success', label: 'Response time', value: '< 24 business hours' },
      { dot: 'success', label: 'Availability', value: 'Remote — US & LATAM' },
      { dot: 'neutral', label: 'Languages', value: 'ES · EN' },
      { dot: 'neutral', label: 'Time zone', value: 'GMT-3 (Santiago)' },
    ],
    channelsEyebrow: 'Other channels · 02',
    channelsTitle: "If you'd rather use a shorter channel.",
    channels: [
      {
        label: 'LinkedIn',
        url: 'https://linkedin.com/in/cdelbarco',
        handle: 'in/cdelbarco',
        description: "My professional profile and recommendations from people I've worked with.",
      },
      {
        label: 'GitHub',
        url: 'https://github.com/Mistercitos',
        handle: 'Mistercitos',
        description: 'Personal projects, this portfolio, and code experiments.',
      },
      {
        label: 'Behance',
        url: 'https://behance.net/cdelbarco',
        handle: 'cdelbarco',
        description: 'My older graphic work: agency, branding, and multichannel pieces.',
      },
    ],
    faqEyebrow: 'FAQ · 03',
    faqTitle: 'Before you ask.',
    faq: [
      {
        q: 'Are you open to full-time roles?',
        a: "Yes. I'm interested in teams building operational products, B2B SaaS, or marketplaces, for Senior Product Designer, UX Engineer, or Design Engineer roles. I work remotely from Santiago and consider relocation case by case.",
      },
      {
        q: 'Do you take freelance or consulting work?',
        a: 'Yes, with limited availability. It works best for short projects, 4 to 12 weeks, with a clear scope, or for focused consulting on design systems, AI UX, or operational products.',
      },
      {
        q: "What's your response time?",
        a: "Under 24 hours on business days. If it's urgent, put [URGENT] in the subject line and I'll reply the same day.",
      },
      {
        q: 'Do you take intro calls?',
        a: 'Yes, though I prefer a first email with some context. If it makes sense, we book 20 or 30 minutes. I coordinate the calendar by email afterward.',
      },
      {
        q: 'Languages and time zone?',
        a: 'Native Spanish and advanced English. I work from Santiago (GMT-3) and comfortably cover US East Coast and Central time.',
      },
    ],
    closingTitle: "If you're reaching out about something serious, make it easy to read.",
    closingBody:
      "A useful message tells me what company you're writing from, for what role or project, what stage it's at, and what caught your eye in my work. With that, I reply the same day.",
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const locale = toLocale((await params).locale)
  const t = CONTACT[locale]
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      canonical: locale === 'en' ? '/en/contact' : '/contact',
      languages: { es: '/contact', en: '/en/contact', 'x-default': '/contact' },
    },
  }
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Christian Del Barco',
  jobTitle: 'Senior Product Designer',
  url: 'https://chrisdelbarco.design',
  email: EMAIL,
  sameAs: [
    'https://linkedin.com/in/cdelbarco',
    'https://github.com/Mistercitos',
    'https://behance.net/cdelbarco',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      email: EMAIL,
      contactType: 'professional inquiries',
      availableLanguage: ['Spanish', 'English'],
    },
  ],
  address: { '@type': 'PostalAddress', addressLocality: 'Santiago', addressCountry: 'CL' },
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const locale = toLocale((await params).locale)
  const t = CONTACT[locale]

  return (
    <div className="container" style={{ paddingTop: 80, paddingBottom: 40, maxWidth: 880 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />

      {/* HERO */}
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
              fontSize: 'clamp(48px, 6.4vw, 88px)',
              fontWeight: 500,
              fontStyle: 'italic',
              lineHeight: 1.04,
              letterSpacing: '-0.025em',
              color: 'var(--text)',
            }}
          >
            {t.title}
          </h1>
          <p
            style={{
              margin: '28px 0 0',
              fontSize: 18,
              lineHeight: 1.65,
              color: 'var(--text-secondary)',
            }}
          >
            {t.intro}
          </p>
        </header>
      </Reveal>

      {/* EMAIL CARD */}
      <Reveal delay={0.08}>
        <EmailContactCard email={EMAIL} locale={locale} />
      </Reveal>

      {/* MINI STATUS BAR */}
      <Reveal delay={0.12}>
        <div
          style={{
            marginTop: 32,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 18,
            paddingBlock: 24,
            borderBlock: '0.5px solid var(--divider)',
          }}
        >
          {t.status.map((s) => (
            <StatusItem key={s.label} dot={s.dot} label={s.label} value={s.value} />
          ))}
        </div>
      </Reveal>

      {/* CANALES ADICIONALES */}
      <section style={{ marginTop: 80 }}>
        <Reveal>
          <header style={{ marginBottom: 32 }}>
            <p
              className="serif"
              style={{
                margin: 0,
                fontSize: 14,
                fontStyle: 'italic',
                color: 'var(--accent)',
                marginBottom: 12,
                letterSpacing: '0.04em',
              }}
            >
              {t.channelsEyebrow}
            </p>
            <h2
              className="serif"
              style={{
                margin: 0,
                fontSize: 'clamp(28px, 3.4vw, 44px)',
                fontWeight: 500,
                fontStyle: 'italic',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                color: 'var(--text)',
              }}
            >
              {t.channelsTitle}
            </h2>
          </header>
        </Reveal>

        <Stagger gap={0.08}>
          {t.channels.map((c) => (
            <StaggerItem key={c.label}>
              <a
                href={c.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1fr) auto',
                  gap: 24,
                  alignItems: 'center',
                  paddingBlock: 24,
                  borderTop: '0.5px solid var(--divider)',
                  transition: 'background var(--t-fast) var(--ease)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                    <p style={{ margin: 0, fontSize: 18, fontWeight: 500, color: 'var(--text)' }}>
                      {c.label}
                    </p>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--muted)' }}>
                      {c.handle}
                    </span>
                  </div>
                  <p
                    style={{
                      margin: '6px 0 0',
                      fontSize: 14,
                      color: 'var(--text-secondary)',
                      lineHeight: 1.55,
                    }}
                  >
                    {c.description}
                  </p>
                </div>
                <span style={{ color: 'var(--muted)', fontSize: 16 }} aria-hidden>
                  ↗
                </span>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* FAQ */}
      <section style={{ marginTop: 96 }}>
        <Reveal>
          <header style={{ marginBottom: 32 }}>
            <p
              className="serif"
              style={{
                margin: 0,
                fontSize: 14,
                fontStyle: 'italic',
                color: 'var(--accent)',
                marginBottom: 12,
                letterSpacing: '0.04em',
              }}
            >
              {t.faqEyebrow}
            </p>
            <h2
              className="serif"
              style={{
                margin: 0,
                fontSize: 'clamp(28px, 3.4vw, 44px)',
                fontWeight: 500,
                fontStyle: 'italic',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                color: 'var(--text)',
              }}
            >
              {t.faqTitle}
            </h2>
          </header>
        </Reveal>

        <Stagger gap={0.08}>
          {t.faq.map((item, i) => (
            <StaggerItem key={i}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '40px minmax(0, 1fr)',
                  gap: 24,
                  paddingBlock: 28,
                  borderTop: '0.5px solid var(--divider)',
                  borderBottom: i === t.faq.length - 1 ? '0.5px solid var(--divider)' : 'none',
                }}
              >
                <p
                  className="serif"
                  style={{
                    margin: 0,
                    fontSize: 18,
                    fontStyle: 'italic',
                    fontWeight: 500,
                    color: 'var(--accent)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </p>
                <div>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: 18,
                      fontWeight: 500,
                      color: 'var(--text)',
                      letterSpacing: '-0.005em',
                      lineHeight: 1.35,
                    }}
                  >
                    {item.q}
                  </h3>
                  <p
                    style={{
                      margin: '10px 0 0',
                      fontSize: 15,
                      lineHeight: 1.65,
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {item.a}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Closing note */}
      <Reveal>
        <div
          style={{
            marginTop: 72,
            padding: '32px 36px',
            borderRadius: 22,
            background: 'var(--surface-subtle)',
            border: '0.5px dashed var(--border-strong)',
            textAlign: 'center',
          }}
        >
          <p
            className="serif"
            style={{
              margin: 0,
              fontSize: 'clamp(22px, 2.6vw, 30px)',
              fontStyle: 'italic',
              fontWeight: 500,
              color: 'var(--text)',
              letterSpacing: '-0.01em',
              lineHeight: 1.35,
            }}
          >
            {t.closingTitle}
          </p>
          <p style={{ margin: '14px 0 0', fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 }}>
            {t.closingBody}
          </p>
        </div>
      </Reveal>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────── */

function StatusItem({
  dot,
  label,
  value,
}: {
  dot: 'success' | 'neutral'
  label: string
  value: string
}) {
  const color = dot === 'success' ? '#10B981' : 'var(--muted)'
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span
          aria-hidden
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: color,
            ...(dot === 'success' && { boxShadow: `0 0 0 4px rgba(16, 185, 129, 0.16)` }),
          }}
        />
        <p
          style={{
            margin: 0,
            fontSize: 11,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--subtle)',
          }}
        >
          {label}
        </p>
      </div>
      <p style={{ margin: 0, fontSize: 15, color: 'var(--text)', fontWeight: 500 }}>{value}</p>
    </div>
  )
}
