import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') ?? 'Christian Del Barco'
  const eyebrow = searchParams.get('eyebrow') ?? 'Senior Product Designer'
  const accent = '#FF4D14'
  const bg = '#FAF7F2'
  const ink = '#161514'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: bg,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 22,
            color: ink,
            letterSpacing: '-0.01em',
          }}
        >
          <span>
            <span style={{ color: accent }}>.</span>chrisdelbarco
          </span>
          <span style={{ color: 'rgba(20,18,14,0.55)', fontSize: 18, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
            {eyebrow}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 78,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              fontWeight: 600,
              color: ink,
              maxWidth: 980,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 18,
            color: 'rgba(20,18,14,0.55)',
          }}
        >
          <span>chrisdelbarco.design</span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span
              style={{
                width: 32,
                height: 4,
                background: accent,
                borderRadius: 2,
              }}
            />
            <span style={{ color: ink, letterSpacing: '0.04em' }}>SaaS · B2B · Marketplaces</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
