import type { TimelineItem } from './timeline'

/** Versión en inglés de la trayectoria y los datos del About. */
export const timelineEn: TimelineItem[] = [
  {
    id: 'wolf',
    role: 'Design Lead / UX Engineer',
    company: 'Wolf Inc.',
    period: 'Apr 2022 — Feb 2026',
    context: 'Staffing marketplace (web & mobile) · US market · Remote from Chile',
    bullets: [
      'Led UX/UI design as the sole Product Designer of a multi-sided marketplace used by 5,000 to 20,000 people and 100+ staffing companies in the United States.',
      'Designed and launched the Job Seekers mobile app, from zero to production in 2022. It became one of the strongest pieces of the commercial pitch.',
      'Built the design system from nothing to 100+ reusable components, and it became the quality reference engineering worked against.',
      'Designed AI-assisted request creation with four starting points: text prompt, Excel, photo, and voice dictation.',
      'Redesigned bulk request creation to resolve several job types in a single operation, replacing spreadsheets and manual calendars.',
      'Implemented production components with React and JavaScript, and supported 7 engineers through the interface implementation.',
    ],
    techStack: ['React', 'JavaScript', 'Figma', 'Design Tokens'],
  },
  {
    id: 'outbuild',
    role: 'Product Designer + Head of Marketing',
    company: 'IPSUM → Outbuild',
    period: 'Nov 2019 — Sep 2021',
    context: 'Construction-tech SaaS · Chile and Latin America',
    bullets: [
      'Joined right after a one-million-dollar funding round to design ProPlanner, a SaaS used by 40+ contractors across 8 Latin American countries.',
      'Hired for marketing and ended up splitting my time between product and brand, with a team of 5 engineers: I went from designer to Head of Marketing and Product Designer.',
      "Designed the product's core features —Gantt charts, scheduling, and resource planning— built to be used on real construction sites.",
      'Designed for a tough operating context: job sites with intermittent connectivity and users with no prior software experience.',
      'The product plugged into the industry ecosystem with integrations like GeoVictoria, BIM models, and Procore.',
    ],
    techStack: ['Figma', 'Adobe Creative Suite', 'Brand Systems'],
  },
  {
    id: 'lfi',
    role: 'Digital Graphic Designer',
    company: 'LFI Digital Agency',
    period: 'Oct 2018 — Nov 2019',
    context: 'Digital agency · Santiago, Chile',
    bullets: [
      'Designed digital, brand, and print pieces for 10+ brands across banking, government, education, healthcare, energy, and retail — among them Scotiabank, Walmart Chile, Clínica Alemana, and Marca Chile.',
      'For Scotiabank, designed close to 90% of the signage and print material for their corporate tower, plus much of their internal communication.',
      'Had my first real contact with HTML and CSS building pieces for the web — the first bridge toward the designer-and-developer profile I built afterward.',
      'Worked on up to ten projects in parallel, which taught me to hold quality while jumping from one brand system to another several times a day.',
    ],
    techStack: ['Adobe Creative Suite', 'HTML', 'CSS'],
  },
]

export const principlesEn = [
  {
    n: '01',
    title: 'Product before screen.',
    body: 'I start from the business context and user behavior, not isolated features. The UX decisions that last are the ones you can justify outside of Figma.',
  },
  {
    n: '02',
    title: 'Systems before one-offs.',
    body: 'Tokens, contracts between disciplines, and two-way QA with engineering. A design system dies if it only lives in Figma — it has to live in code.',
  },
  {
    n: '03',
    title: 'Design that ships.',
    body: 'I write production code where it speeds up delivery. Not to replace engineering — to shorten the cycle from see → propose → in production.',
  },
  {
    n: '04',
    title: 'Reduce ambiguity early.',
    body: "I make trade-offs explicit before designing starts. It's cheaper to resolve disagreements in a doc than in a PR.",
  },
]

export const beliefsEn = [
  {
    n: '01',
    statement:
      "Real product gets decided in the uncomfortable conversations: when what the user wants, what the business needs, and what engineering can build don't line up. That disagreement is where I work.",
  },
  {
    n: '02',
    statement:
      "A design system isn't a component library: it's an agreement between design and engineering on how things get built. And an agreement that only lives in Figma doesn't keep itself.",
  },
  {
    n: '03',
    statement:
      "I believe that in 2026 a Product Designer who can't write code is at a disadvantage. Not because they have to do engineering's job, but because without knowing the material they work with, many of their decisions end up being guesswork.",
  },
  {
    n: '04',
    statement:
      "A decision without its trade-off written down somewhere isn't a decision, it's a preference. And preferences don't hold up as the team grows.",
  },
  {
    n: '05',
    statement:
      "AI inside a product only works if the person can see where the suggestion came from. When they don't understand the why, they stop trusting it, and end up going back to doing it by hand.",
  },
]

export const skillsMatrixEn = [
  {
    category: 'Design',
    items: [
      'Product design',
      'UX strategy',
      'UI design',
      'Information architecture',
      'User research',
      'Prototyping',
      'Accessibility (WCAG)',
      'Journey mapping',
    ],
  },
  {
    category: 'Design systems',
    items: [
      'Design tokens',
      'Component libraries',
      'Theming & re-skin',
      'Design-to-code workflows',
      'Variable fonts',
      'Documentation in code',
    ],
  },
  {
    category: 'AI / Product intelligence',
    items: [
      'AI-driven UX patterns',
      'Confidence scoring & transparency',
      'Multi-modal input design (voice · NLP · structured)',
      'Human-in-the-loop workflows',
      'Prompt design for products',
      'Bulk approve & threshold patterns',
      'Trust & accountability in AI',
    ],
  },
  {
    category: 'Engineering',
    items: ['JavaScript (ES6+)', 'React', 'HTML', 'CSS', 'Git', 'Responsive design', 'Frontend implementation'],
  },
  {
    category: 'Product',
    items: ['Product discovery', 'Agile / Scrum', 'Cross-functional collab', 'Design QA', 'User testing', 'Trade-off framing'],
  },
  {
    category: 'Marketing & brand',
    items: [
      'Brand strategy',
      'Marketing positioning',
      'Landing page design',
      'Email marketing',
      'Social media design',
      'Campaign systems',
      'UX & marketing copy',
      'Product-marketing alignment',
    ],
  },
  {
    category: 'Tools',
    items: ['Figma (advanced)', 'FigJam', 'Adobe Creative Suite', 'Cursor', 'Notion', 'Linear', 'GitHub'],
  },
]
