import type { Locale } from './i18n'
import { timelineEn, principlesEn, beliefsEn, skillsMatrixEn } from './timeline.en'

export type TimelineItem = {
  id: string
  role: string
  company: string
  period: string
  context: string
  bullets: string[]
  techStack?: string[]
}

export const timeline: TimelineItem[] = [
  {
    id: 'wolf',
    role: 'Design Lead / UX Engineer',
    company: 'Wolf Inc.',
    period: 'Abr 2022 — Feb 2026',
    context: 'Marketplace de staffing (web y mobile) · Mercado de EE.UU. · Remoto desde Chile',
    bullets: [
      'Lideré el diseño UX/UI como único Product Designer de un marketplace multi-lado, usado por entre 5.000 y 20.000 personas y más de 100 staffing companies en Estados Unidos.',
      'Diseñé y lancé la app mobile de Job Seekers, de cero a producción en 2022. Fue una de las piezas que más pesó en el pitch comercial.',
      'Construí el design system de la nada hasta más de 100 componentes reutilizables, y terminó siendo la referencia de calidad que usaba ingeniería.',
      'Diseñé la creación de solicitudes asistida por IA con cuatro puntos de partida: prompt de texto, Excel, foto y dictado por voz.',
      'Rediseñé la creación masiva de solicitudes para resolver varios tipos de trabajo en una sola operación, reemplazando planillas y calendarios manuales.',
      'Implementé componentes en producción con React y JavaScript, y acompañé a 7 ingenieros en la implementación de la interfaz.',
    ],
    techStack: ['React', 'JavaScript', 'Figma', 'Design Tokens'],
  },
  {
    id: 'outbuild',
    role: 'Product Designer + Head of Marketing',
    company: 'IPSUM → Outbuild',
    period: 'Nov 2019 — Sep 2021',
    context: 'SaaS de construction-tech · Chile y Latinoamérica',
    bullets: [
      'Me sumé justo después de una ronda de inversión de un millón de dólares, para diseñar ProPlanner, una SaaS usada por más de 40 constructoras en 8 países de Latinoamérica.',
      'Entré contratado para marketing y terminé repartiendo mi tiempo entre producto y marca, con un equipo de 5 ingenieros: pasé de diseñador a Head of Marketing y Product Designer.',
      'Diseñé las funcionalidades centrales del producto —cartas Gantt, programación y planificación de recursos— pensadas para usarse en faenas de construcción reales.',
      'Diseñé para un contexto operativo difícil: obras con conectividad intermitente y usuarios sin experiencia previa con software.',
      'El producto se conectó al ecosistema del rubro con integraciones como GeoVictoria, modelos BIM y Procore.',
    ],
    techStack: ['Figma', 'Adobe Creative Suite', 'Brand Systems'],
  },
  {
    id: 'lfi',
    role: 'Digital Graphic Designer',
    company: 'LFI Agencia Digital',
    period: 'Oct 2018 — Nov 2019',
    context: 'Agencia digital · Santiago, Chile',
    bullets: [
      'Diseñé piezas digitales, de marca e impresas para más de diez marcas de banca, gobierno, educación, salud, energía y retail, entre ellas Scotiabank, Walmart Chile, Clínica Alemana y Marca Chile.',
      'Para Scotiabank diseñé cerca del 90% de la señalética y el material impreso de su torre corporativa, además de buena parte de su comunicación interna.',
      'Tuve mi primer contacto real con HTML y CSS maquetando piezas para web — el primer puente hacia el perfil de diseñador y desarrollador que construí después.',
      'Trabajé con hasta diez proyectos en paralelo, lo que me enseñó a sostener la calidad saltando de un sistema de marca a otro varias veces al día.',
    ],
    techStack: ['Adobe Creative Suite', 'HTML', 'CSS'],
  },
]

export const principles = [
  {
    n: '01',
    title: 'Producto antes que pantalla.',
    body: 'Empiezo por el contexto de negocio y el comportamiento del usuario, no por features aisladas. Las decisiones de UX que duran son las que se justifican fuera de Figma.',
  },
  {
    n: '02',
    title: 'Sistemas antes que one-offs.',
    body: 'Tokens, contratos entre disciplinas, y QA bidireccional con engineering. Un design system muere si vive solo en Figma — tiene que vivir en código.',
  },
  {
    n: '03',
    title: 'Diseño que se entrega.',
    body: 'Escribo código de producción donde acelera la entrega. No para reemplazar engineering — para acortar el ciclo veo → propongo → en producción.',
  },
  {
    n: '04',
    title: 'Reducir ambigüedad temprano.',
    body: 'Hago explícitos los trade-offs antes de empezar a diseñar. Es más barato resolver desacuerdos en un doc que en un PR.',
  },
]

/**
 * Beliefs — voz personal punchy. Lo que pienso del oficio.
 * Diferente de "principles" — esto son opiniones declarativas, no procesos.
 */
export const beliefs = [
  {
    n: '01',
    statement:
      'El producto de verdad se decide en las conversaciones incómodas: cuando lo que quiere el usuario, lo que necesita el negocio y lo que puede construir ingeniería no coinciden. Ese desacuerdo es mi lugar de trabajo.',
  },
  {
    n: '02',
    statement:
      'Un design system no es una librería de componentes: es un acuerdo entre diseño e ingeniería sobre cómo se construye. Y un acuerdo que solo vive en Figma no se cumple solo.',
  },
  {
    n: '03',
    statement:
      'Creo que en 2026 un Product Designer que no sabe escribir código está en desventaja. No por tener que hacer el trabajo de ingeniería, sino porque sin conocer el material con el que trabaja, muchas de sus decisiones terminan siendo adivinanza.',
  },
  {
    n: '04',
    statement:
      'Una decisión sin su trade-off escrito en alguna parte no es una decisión, es una preferencia. Y las preferencias no se sostienen cuando el equipo crece.',
  },
  {
    n: '05',
    statement:
      'La IA dentro de un producto solo funciona si la persona puede ver de dónde salió la sugerencia. Cuando no entiende el porqué, deja de confiar, y termina volviendo a hacerlo a mano.',
  },
]

/**
 * Skills matrix — agrupado por categoría.
 */
export const skillsMatrix = [
  {
    category: 'Diseño',
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
      'Prompt design para productos',
      'Bulk approve & threshold patterns',
      'Trust & accountability in AI',
    ],
  },
  {
    category: 'Ingeniería',
    items: ['JavaScript (ES6+)', 'React', 'HTML', 'CSS', 'Git', 'Responsive design', 'Frontend implementation'],
  },
  {
    category: 'Producto',
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
    category: 'Herramientas',
    items: ['Figma (advanced)', 'FigJam', 'Adobe Creative Suite', 'Cursor', 'Notion', 'Linear', 'GitHub'],
  },
]

/* ── Getters locale-aware ──────────────────────────────────────────── */
export function getTimeline(locale: Locale) {
  return locale === 'en' ? timelineEn : timeline
}

export function getPrinciples(locale: Locale) {
  return locale === 'en' ? principlesEn : principles
}

export function getBeliefs(locale: Locale) {
  return locale === 'en' ? beliefsEn : beliefs
}

export function getSkillsMatrix(locale: Locale) {
  return locale === 'en' ? skillsMatrixEn : skillsMatrix
}
