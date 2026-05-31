import type { UseCategory } from './uses'

/** Versión en inglés de los "uses" — misma estructura que `uses.ts` (fuente ES). */
export const usesEn: UseCategory[] = [
  {
    name: 'Hardware',
    items: [
      { name: 'MacBook Pro 14" M3 Pro', description: 'Where almost all the work happens. 18GB of RAM, 1TB.' },
      { name: 'LG UltraFine 4K 24"', description: 'Second monitor, so Figma and the browser fit side by side.' },
      { name: 'Keychron K3 Pro', description: 'Low-profile mechanical — more comfortable than the laptop keyboard for long sessions.' },
      { name: 'Logitech MX Master 3S', description: 'The smooth horizontal scroll makes a real difference in Figma.' },
    ],
  },
  {
    name: 'Design',
    items: [
      { name: 'Figma', description: 'My default tool: UI, prototypes, specs, and design systems.', url: 'https://figma.com' },
      { name: 'FigJam', description: 'For discovery workshops, journey maps, and information architecture.' },
      { name: 'Linear', description: 'Tasks and roadmaps. Faster than Jira for small teams.', url: 'https://linear.app' },
      { name: 'Notion', description: 'Design system documentation and research notes.', url: 'https://notion.so' },
    ],
  },
  {
    name: 'Development',
    items: [
      { name: 'VS Code', description: 'My main editor, with GitHub Copilot and the Tailwind, ESLint, and Prettier extensions.', url: 'https://code.visualstudio.com' },
      { name: 'Cursor', description: 'For when I work close to the edge of what I know technically.', url: 'https://cursor.com' },
      { name: 'iTerm2 + Oh My Zsh', description: 'A terminal with decent autocomplete.' },
      { name: 'GitHub', description: 'My public and private repositories.', url: 'https://github.com/Mistercitos' },
    ],
  },
  {
    name: 'Typefaces',
    items: [
      { name: 'Inter', description: 'For headings and body text. A variable font with weight and optical-size axes.', url: 'https://rsms.me/inter/' },
      { name: 'Newsreader', description: 'The editorial serif I use for accents and the blog. Variable too.', url: 'https://fonts.google.com/specimen/Newsreader' },
      { name: 'JetBrains Mono', description: 'For code blocks.', url: 'https://www.jetbrains.com/lp/mono/' },
    ],
  },
  {
    name: 'Reading',
    items: [
      { name: 'Refactoring UI · Adam Wathan & Steve Schoger', description: 'The book I most recommend to engineers who want to understand design.' },
      { name: 'Shape Up · Basecamp', description: 'Good for discussing product cycles. Less so for following to the letter.' },
      { name: 'Inspired · Marty Cagan', description: 'My mental model for product discovery and for understanding the product, design, and engineering roles.' },
    ],
  },
]
