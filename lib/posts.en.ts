import type { Post } from './posts'

/** Versión en inglés de los posts del blog — misma estructura que `posts.ts`. */
export const postsEn: Post[] = [
  {
    slug: 'tres-formas-de-crear-un-job',
    title: 'Three ways to create a Job: designing AI-assisted input in a staffing marketplace',
    excerpt:
      "What I learned designing three input routes in parallel at Wolf — voice, natural language, and Excel files. UX decisions, the traps I hit, and why AI doesn't replace design.",
    publishedAt: '2026-05-16',
    readingMinutes: 9,
    tags: ['product-design', 'ai-ux', 'marketplaces', 'design-systems'],
    category: 'Design',
    status: 'published',
    relatedCaseStudy: 'wolf',
    body: [
      {
        type: 'p',
        text: 'The day a client asked us to create 47 Jobs in a single session, I knew the form had to die.',
      },
      {
        type: 'p',
        text: "Not the form as a concept — but the form as the only way into the system. When an operator at a staffing company in Texas has to create 47 shifts every Monday at 7 AM to cover the next two weeks, and each shift has its schedule, its job type, its required skills, and its pay rate, the traditional form isn't an experience. It's a punishment.",
      },
      {
        type: 'p',
        text: 'This is the story of how we ended up with three different ways to create a Job at Wolf — voice dictation, natural-language text, and Excel upload — and why I think designing for that input flexibility is one of the most underrated skills in Product Design in 2026.',
      },
      { type: 'placeholder', label: 'The three input routes · architecture diagram', caption: 'Diagram · 16:9', variant: 'hero' },
      { type: 'h2', text: 'Context: when the form wins, operators lose' },
      {
        type: 'p',
        text: 'Wolf is a multi-sided marketplace for the staffing industry in the United States. Three user types coexist: staffing-company Admins, Clients (companies that hire staff), and Job Seekers (workers who receive Jobs in their mobile app).',
      },
      {
        type: 'stats',
        items: [
          { value: '5K–20K', label: 'Active users' },
          { value: '100+', label: 'Staffing companies' },
          { value: '20–80', label: 'Jobs per operator / week' },
        ],
      },
      {
        type: 'p',
        text: "When I joined the product, the flow was the classic form. 47 Jobs × 14 fields = 658 inputs. At 2 seconds per input — being optimistic — that's 22 minutes of data entry for something the operator conceptually already had in her head since the previous Tuesday.",
      },
      {
        type: 'pullquote',
        text: "The form wasn't the problem. The problem was that it was the only door into the system.",
      },
      { type: 'h2', text: "The hypothesis: how a piece of data is entered isn't how it's stored" },
      {
        type: 'p',
        text: 'The first UX decision I made was to separate two things the product team had been conflating: how the user expresses intent vs how the system represents that intent internally.',
      },
      {
        type: 'p',
        text: "A Job, inside the system, will always be the same object: a Job with a schedule, one or more JobTypes, a set of requirements, and a payRate. That structure doesn't change. What could change was how the operator arrived at that object.",
      },
      {
        type: 'ol',
        items: [
          'Voice. For the operator who is driving or multitasking. "I need 4 cooks for Saturday from 8 AM to 4 PM at the client Hilton Austin, pay rate 22." The system listens, transcribes, parses, and shows the structured Job for confirmation.',
          "Written natural language. For the operator who prefers to type but doesn't want to navigate 14 inputs. Same idea, different channel.",
          'Excel upload. For the operator who already has the information in a spreadsheet (which happens 70% of the time). Drag, drop, automatic column mapping, preview, confirmation.',
        ],
      },
      {
        type: 'p',
        text: "The form stayed as a fourth option — for when the operator wants granular control or is creating a Job that doesn't fit any prior pattern.",
      },
      { type: 'placeholder', label: 'Preview screen shared across the three routes', caption: 'Flow · 16:9', variant: 'hero' },
      { type: 'h2', text: 'Decision #1 — Visual convergence before submitting' },
      {
        type: 'p',
        text: "Here's a subtlety that changed the product: the three routes converge on the same preview screen before submitting. This sounded obvious when I wrote it in the discovery doc, but the engineers' first version had three completely separate flows, with no convergence point.",
      },
      {
        type: 'pullquote',
        text: "If the operator doesn't see the same Job object on the same screen before submit, they won't trust the AI. And if they don't trust the AI, they'll go back to the form.",
      },
      {
        type: 'p',
        text: 'The preview screen became the contract. What the operator sees is exactly what will be created in the system. Any data the AI inferred has a subtle "inferred" badge. Click the badge → it shows where that inference came from. Inline editing on any field before submit.',
      },
      {
        type: 'p',
        text: "Input could be flexible; verification could not. That asymmetry is what let us take the AI to production without losing the operator's trust.",
      },
      { type: 'h2', text: 'Decision #2 — Handling the mess of real Excel' },
      {
        type: 'p',
        text: 'The voice and NLP part was fun to design. The Excel part was where I suffered. Real Excel, in production, in staffing, is a structural mess:',
      },
      {
        type: 'ul',
        items: [
          'Columns with different names depending on who built the file (pay, payrate, pay_rate, $/hr).',
          'Schedules expressed as a range, as specific days, or as a prose paragraph.',
          'Multiple JobTypes embedded in a single row using commas, slashes, or columns depending on the client.',
          'Empty rows mixed in. Headers on row 3 instead of row 1. Sheets with notes nobody read.',
        ],
      },
      {
        type: 'p',
        text: 'The common trap is to design the "happy path" and show a generic error when something goes wrong. The generic error is where operational products go to die.',
      },
      { type: 'placeholder', label: 'Excel column reconciliation UI', caption: 'Wireframe · 4:3', variant: 'gallery' },
      { type: 'h3', text: 'What we did' },
      {
        type: 'ol',
        items: [
          'Tolerant parser. The backend tries several mapping strategies. Each one produces a confidence score.',
          'Reconciliation UI. If confidence is high, it auto-applies the mapping with a subtle banner to review. If confidence is low, it opens an explicit step where the operator drags columns to fields.',
          'Row-by-row preview. Before submit, the operator sees each row as an individual Job. Jobs with warnings are flagged in orange and edited inline.',
          'Partial submit. If 45 of 47 Jobs are OK and 2 have warnings, the operator can submit the 45 and leave the 2 as drafts.',
        ],
      },
      {
        type: 'p',
        text: 'Partial submit was the one that generated the most pushback in engineering. The reason was reasonable: how to handle the "pending draft Jobs" state in the database. But from a UX standpoint the answer was obvious: if we force them to resolve the whole Excel before creating a single Job, the operator would rather open the form and start from scratch. I saw it 6 times in testing.',
      },
      {
        type: 'p',
        text: 'We agreed on a compromise: drafts persist for 7 days, and the operator is notified 48 hours before cleanup. It solved the UX problem without creating an infinite graveyard in the DB.',
      },
      { type: 'h2', text: 'Decision #3 — When NOT to use AI' },
      {
        type: 'p',
        text: 'After the second month in production, we discovered something uncomfortable: for very simple Jobs — a single shift, a single worker, a known client — the voice/NLP route was slower than the form.',
      },
      {
        type: 'p',
        text: 'It made sense in hindsight: AI has a conversational overhead. Saying "I need an electrician for tomorrow from 9 to 5 at Marriott downtown" takes 5 seconds. But filling three fields in an optimized form takes 4. And the AI preview adds another 3-4 seconds to confirm.',
      },
      {
        type: 'pullquote',
        text: "AI isn't the product experience. It's just one of the ways into it.",
      },
      {
        type: 'p',
        text: "This distinction strikes me as the most underrated one right now. Many products are being designed on the premise that AI = everything conversational = better. It's false, and the data proves it.",
      },
      { type: 'h2', text: 'What I take to my next role' },
      {
        type: 'ol',
        items: [
          "Separate intent from representation. The internal system can be rigid. The way the user reaches it doesn't have to be.",
          'The convergence screen is the contract. Any parallel flow needs a single point where the user verifies before committing.',
          'Design the error path with the same rigor as the happy path. Column mapping, partial submit, persistent drafts — those are UX decisions, not engineering ones.',
          "Don't push AI where it doesn't help. The form was still faster for simple Jobs. Accepting that and designing for it is the difference between a product that respects its user and one that chases a trend.",
        ],
      },
      { type: 'divider' },
      {
        type: 'p',
        text: 'This was teamwork. I was the only Product Designer on the product, but it was possible thanks to constant collaboration with 7 engineers and several rounds of user testing with real operators in the Midwest and Texas. The Design System grew from 0 to 60-100+ components during this period — without that structural piece, the three input routes could not have launched with visual consistency without throwing the roadmap out the window.',
      },
    ],
  },
  {
    slug: 'tokens-themes-contratos',
    title: 'Tokens, themes, and contracts — how to build a Design System engineering actually adopts',
    excerpt:
      "What I learned building Wolf's Design System from zero to 100+ components over 4 years. Tokens, theming, two-way QA, and why adoption is measured in code, not in Figma.",
    publishedAt: '2026-05-25',
    readingMinutes: 11,
    tags: ['design-systems', 'design-tokens', 'design-engineering'],
    category: 'Systems',
    status: 'draft',
    relatedCaseStudy: 'wolf',
    body: [
      {
        type: 'p',
        text: "Wolf's Design System grew from zero to 60-100+ components over my nearly 4 years at the company. The hardest part wasn't designing it. The hardest part was getting the 7 engineers to adopt it as the source of truth — in a non-standardized codebase.",
      },
      { type: 'h2', text: 'The common mistake: confusing a library with a system' },
      {
        type: 'p',
        text: 'Having 200 components in Figma is not a Design System. A Design System is a contract between disciplines with tokens, rules, and feedback loops. My first audit found 14 variants of the same button used in 9 different places in the codebase.',
      },
      { type: 'h2', text: 'Contract #1 — Tokens before components' },
      {
        type: 'p',
        text: 'We started with tokens (colors, spacing, radius, motion) in CSS variables before touching components. Naming by context, not by value: --bg, --accent, --text. This made it possible to swap to dark mode later without touching components.',
      },
      {
        type: 'pullquote',
        text: 'The alias layer is what saves you from having to rewrite 60 components when the branding changes.',
      },
      { type: 'p', text: '[Rest of the post in draft — final expansion pending, based on outline]' },
    ],
  },
  {
    slug: 'designers-que-codifican',
    title: 'Why Senior Product Designers should write code in 2026',
    excerpt:
      'The false dilemma between designing and coding. Why Product Designers who also write production code are becoming the new standard — and what stack to learn if you start today.',
    publishedAt: '2026-06-08',
    readingMinutes: 8,
    tags: ['design-engineering', 'product-design', 'career'],
    category: 'Career',
    status: 'draft',
    body: [
      {
        type: 'p',
        text: 'When I tell other designers that I write production code, the most common reaction is: "but then you\'re a developer." No. I\'m a Product Designer. And yes, I also write code. And I think in 2026 that combination should not be a rarity.',
      },
      { type: 'h2', text: 'The false "designer vs developer" dilemma' },
      {
        type: 'p',
        text: 'The professionalization of design in the 2010s created this artificial dichotomy. The myth of "pure specialization" works at companies with 50+ designers. It does not work at startups with 1.',
      },
      { type: 'p', text: '[Rest of the post in draft — final expansion pending, based on outline]' },
    ],
  },
]
