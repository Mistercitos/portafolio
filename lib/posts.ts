import type { Locale } from './i18n'
import { postsEn } from './posts.en'

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'pullquote'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'code'; language: string; code: string; filename?: string }
  | { type: 'placeholder'; label: string; caption?: string; variant?: 'hero' | 'gallery' | 'mobile' | 'process' }
  | { type: 'stats'; items: { value: string; label: string }[] }
  | { type: 'divider' }

export type Post = {
  slug: string
  title: string
  excerpt: string
  publishedAt: string // ISO
  readingMinutes: number
  tags: string[]
  category: string
  status: 'published' | 'draft'
  body: Block[]
  relatedCaseStudy?: string // slug
}

export const posts: Post[] = [
  {
    slug: 'tres-formas-de-crear-un-job',
    title: 'Tres formas de crear un Job: diseñar asistencia con IA en un marketplace de staffing',
    excerpt:
      'Lo que aprendí diseñando tres rutas de entrada en paralelo en Wolf —voz, lenguaje natural y archivos Excel—. Decisiones de UX, las trampas con las que choqué, y por qué la IA no reemplaza al diseño.',
    publishedAt: '2026-05-16',
    readingMinutes: 9,
    tags: ['product-design', 'ai-ux', 'marketplaces', 'design-systems'],
    category: 'Diseño',
    status: 'published',
    relatedCaseStudy: 'wolf',
    body: [
      {
        type: 'p',
        text: 'El día que un cliente nos pidió crear 47 Jobs en una sola sesión, supe que el formulario tenía que morir.',
      },
      {
        type: 'p',
        text: 'No el formulario como concepto — sino el formulario como única forma de entrada al sistema. Cuando una operadora de una staffing company en Texas tiene que crear 47 turnos cada lunes a las 7 AM para cubrir las próximas dos semanas, y cada turno tiene su horario, su tipo de trabajo, sus skills requeridos y su pay rate, el formulario tradicional no es una experiencia. Es un castigo.',
      },
      {
        type: 'p',
        text: 'Esta es la historia de cómo terminamos con tres formas distintas de crear un Job en Wolf —dictado por voz, texto en lenguaje natural y carga de Excel— y por qué creo que diseñar para esa flexibilidad de entrada es una de las habilidades más subestimadas del Product Design en 2026.',
      },
      { type: 'placeholder', label: 'Las tres rutas de input · diagrama de arquitectura', caption: 'Diagrama · 16:9', variant: 'hero' },
      { type: 'h2', text: 'Contexto: cuando el formulario gana, los operadores pierden' },
      {
        type: 'p',
        text: 'Wolf es un marketplace multi-lado para la industria de staffing en Estados Unidos. Tres tipos de usuarios coexisten: Admins de la staffing company, Clients (empresas que contratan staff), y Job Seekers (workers que reciben los Jobs en su app mobile).',
      },
      {
        type: 'stats',
        items: [
          { value: '5K–20K', label: 'Usuarios activos' },
          { value: '100+', label: 'Staffing companies' },
          { value: '20–80', label: 'Jobs por operadora / semana' },
        ],
      },
      {
        type: 'p',
        text: 'Cuando llegué al producto, el flow era el formulario clásico. 47 Jobs × 14 campos = 658 inputs. A 2 segundos por input — siendo optimistas — son 22 minutos de data entry para algo que conceptualmente la operadora ya tenía en su cabeza desde el martes anterior.',
      },
      {
        type: 'pullquote',
        text: 'El formulario no era el problema. El problema era que fuera la única puerta de entrada al sistema.',
      },
      { type: 'h2', text: 'La hipótesis: cómo se entra un dato no es cómo se guarda' },
      {
        type: 'p',
        text: 'La primera decisión de UX que tomé fue separar dos cosas que el equipo de producto venía confundiendo: cómo el usuario expresa intención vs cómo el sistema representa esa intención internamente.',
      },
      {
        type: 'p',
        text: 'Un Job, dentro del sistema, siempre va a ser el mismo objeto: un Job con un schedule, uno o más JobType, un set de requirements y un payRate. Esa estructura no cambia. Lo que sí podía cambiar era cómo la operadora llegaba a ese objeto.',
      },
      {
        type: 'ol',
        items: [
          'Voz. Para la operadora que está manejando o multi-tasking. "Necesito 4 cocineros para el sábado de 8 AM a 4 PM en el cliente Hilton Austin, pay rate 22." El sistema escucha, transcribe, parsea y muestra el Job estructurado para confirmación.',
          'Lenguaje natural escrito. Para la operadora que prefiere tipear pero no quiere navegar 14 inputs. Misma idea, distinto canal.',
          'Excel upload. Para la operadora que ya tiene la información en un spreadsheet (lo que pasa el 70% del tiempo). Drag, drop, mapeo automático de columnas, preview, confirmación.',
        ],
      },
      {
        type: 'p',
        text: 'El formulario quedó como cuarta opción — para cuando el operador quiere control granular o está creando un Job que no encaja en ningún patrón previo.',
      },
      { type: 'placeholder', label: 'Pantalla de preview compartida entre las tres rutas', caption: 'Flow · 16:9', variant: 'hero' },
      { type: 'h2', text: 'Decisión #1 — Convergencia visual antes de enviar' },
      {
        type: 'p',
        text: 'Acá viene una sutileza que cambió el producto: las tres rutas convergen en la misma pantalla de preview antes de hacer submit. Esto sonó obvio cuando lo escribí en el doc de discovery, pero la primera versión de los engineers fue tener tres flujos completamente separados, sin punto de convergencia.',
      },
      {
        type: 'pullquote',
        text: 'Si el operador no ve el mismo objeto Job en la misma pantalla antes de submit, no va a confiar en la IA. Y si no confía en la IA, va a volver al formulario.',
      },
      {
        type: 'p',
        text: 'La pantalla de preview se convirtió en el contrato. Lo que el operador ve es exactamente lo que se va a crear en el sistema. Cualquier dato que la IA infirió tiene un badge sutil que dice "inferred". Click en el badge → muestra de dónde salió esa inferencia. Edit inline en cualquier campo antes de submit.',
      },
      {
        type: 'p',
        text: 'La entrada podía ser flexible; la verificación, no. Esa asimetría fue lo que nos permitió llevar la IA a producción sin perder la confianza del operador.',
      },
      { type: 'h2', text: 'Decisión #2 — Manejar el desastre del Excel real' },
      {
        type: 'p',
        text: 'La parte de voz y NLP fue divertida de diseñar. La parte de Excel fue donde sufrí. Excel real, en producción, en staffing, es un desastre estructural:',
      },
      {
        type: 'ul',
        items: [
          'Columnas con nombres distintos según quién armó el archivo (pay, payrate, pay_rate, $/hr).',
          'Schedules expresados como rango, como días concretos, o como párrafo prosa.',
          'Múltiples JobTypes embedded en una sola fila usando comas, slashes o columnas según el cliente.',
          'Filas vacías mezcladas. Headers en la fila 3 en vez de la 1. Hojas con notas que nadie leyó.',
        ],
      },
      {
        type: 'p',
        text: 'La trampa común es diseñar el "happy path" y mostrar un error genérico cuando algo sale mal. El error genérico es donde mueren los productos operacionales.',
      },
      { type: 'placeholder', label: 'UI de reconciliación de columnas del Excel', caption: 'Wireframe · 4:3', variant: 'gallery' },
      { type: 'h3', text: 'Lo que hicimos' },
      {
        type: 'ol',
        items: [
          'Parser tolerante. El backend intenta varias estrategias de mapeo. Cada una produce una confianza.',
          'UI de reconciliación. Si la confianza es alta, autoaplica el mapping con una banner sutil para revisar. Si la confianza es baja, abre un step explícito donde el operador arrastra columnas a campos.',
          'Preview row-by-row. Antes de submit, el operador ve cada fila como un Job individual. Los Jobs con warnings se marcan en naranja y se editan inline.',
          'Partial submit. Si 45 de 47 Jobs están OK y 2 tienen warnings, el operador puede submitear los 45 y dejar los 2 en draft.',
        ],
      },
      {
        type: 'p',
        text: 'Partial submit fue la que más resistencia generó en engineering. La razón era razonable: cómo manejar el estado de "draft Jobs pendientes" en la base de datos. Pero desde UX la respuesta era obvia: si los obligamos a resolver el Excel completo antes de crear un solo Job, el operador prefiere abrir el formulario y empezar de cero. Lo vi en testing 6 veces.',
      },
      {
        type: 'p',
        text: 'Acordamos un compromiso: drafts persisten 7 días, se notifica al operador 48 horas antes del cleanup. Resolvió el problema de UX sin generar un graveyard infinito en la DB.',
      },
      { type: 'h2', text: 'Decisión #3 — Cuándo NO usar IA' },
      {
        type: 'p',
        text: 'Después del segundo mes en producción, descubrimos algo incómodo: para Jobs muy simples — un solo turno, un solo worker, un cliente conocido — la ruta de voz/NLP era más lenta que el formulario.',
      },
      {
        type: 'p',
        text: 'Tenía sentido en retrospectiva: la IA tiene un overhead conversacional. Decir "necesito un electricista para mañana de 9 a 5 en Marriott downtown" toma 5 segundos. Pero llenar tres campos en un formulario optimizado toma 4. Y el preview de la IA agrega otros 3-4 segundos para confirmar.',
      },
      {
        type: 'pullquote',
        text: 'La IA no es la experiencia del producto. Es apenas una de las formas de entrar a ella.',
      },
      {
        type: 'p',
        text: 'Esta distinción me parece la más subestimada del momento. Hay muchos productos diseñando con la premisa de que IA = todo conversacional = mejor. Es falso, y el dato lo demuestra.',
      },
      { type: 'h2', text: 'Lo que llevo a mi próximo rol' },
      {
        type: 'ol',
        items: [
          'Separar intención de representación. El sistema interno puede ser rígido. La forma en que el usuario llega a él no tiene por qué serlo.',
          'La pantalla de convergencia es el contrato. Cualquier flow paralelo necesita un único punto donde el usuario verifica antes de comprometer.',
          'Diseñar el camino del error con el mismo rigor que el happy path. Mapeo de columnas, partial submit, drafts persistentes — son decisiones de UX, no de engineering.',
          'No empujes IA donde no aporta. El formulario seguía siendo más rápido para Jobs simples. Aceptarlo y diseñarlo así es la diferencia entre un producto que respeta a su usuario y uno que persigue una tendencia.',
        ],
      },
      { type: 'divider' },
      {
        type: 'p',
        text: 'Esto fue un trabajo de equipo. Yo era el único Product Designer del producto, pero fue posible gracias a la colaboración constante con 7 engineers y varias rondas de user testing con operadoras reales en el mid-west y Texas. El Design System creció de 0 a 60-100+ componentes durante este periodo — sin esa pieza estructural, las tres rutas de input no se podrían haber lanzado con consistencia visual sin tirar el roadmap por la ventana.',
      },
    ],
  },
  {
    slug: 'tokens-themes-contratos',
    title: 'Tokens, themes y contratos — cómo construir un Design System que ingeniería sí adopta',
    excerpt:
      'Lo que aprendí construyendo el Design System de Wolf de cero a 100+ componentes en 4 años. Tokens, theming, QA bidireccional y por qué la adopción se mide en código, no en Figma.',
    publishedAt: '2026-05-25',
    readingMinutes: 11,
    tags: ['design-systems', 'design-tokens', 'design-engineering'],
    category: 'Sistemas',
    status: 'draft',
    relatedCaseStudy: 'wolf',
    body: [
      {
        type: 'p',
        text: 'El Design System de Wolf creció de cero a 60-100+ componentes durante mis casi 4 años en la compañía. Lo más difícil no fue diseñarlo. Lo más difícil fue conseguir que los 7 engineers lo adoptaran como source of truth — en un codebase no estandarizado.',
      },
      { type: 'h2', text: 'El error común: confundir librería con sistema' },
      {
        type: 'p',
        text: 'Tener 200 componentes en Figma no es un Design System. Un Design System es un contrato entre disciplinas con tokens, reglas y feedback loops. Mi primer audit encontró 14 variantes del mismo botón usadas en 9 lugares distintos del codebase.',
      },
      { type: 'h2', text: 'Contrato #1 — Tokens antes que componentes' },
      {
        type: 'p',
        text: 'Arrancamos con tokens (colors, spacing, radius, motion) en CSS variables antes de tocar componentes. Naming por contexto, no por valor: --bg, --accent, --text. Esto permitió swap a dark mode después sin tocar componentes.',
      },
      {
        type: 'pullquote',
        text: 'La capa de aliases es lo que evita tener que reescribir 60 componentes cuando cambia el branding.',
      },
      { type: 'p', text: '[Resto del post en draft — pendiente expansión final basada en outline]' },
    ],
  },
  {
    slug: 'designers-que-codifican',
    title: 'Por qué los Senior Product Designers deberían escribir código en 2026',
    excerpt:
      'El falso dilema entre diseñar y codear. Por qué los Product Designers que también escriben código de producción se están volviendo el nuevo estándar — y qué stack aprender si empezás hoy.',
    publishedAt: '2026-06-08',
    readingMinutes: 8,
    tags: ['design-engineering', 'product-design', 'career'],
    category: 'Carrera',
    status: 'draft',
    body: [
      {
        type: 'p',
        text: 'Cuando le digo a otros diseñadores que escribo código de producción, la reacción más común es: "pero entonces sos developer". No. Soy Product Designer. Y sí, también escribo código. Y creo que en 2026 esa combinación no debería ser una rareza.',
      },
      { type: 'h2', text: 'El falso dilema "designer vs developer"' },
      {
        type: 'p',
        text: 'La profesionalización del diseño en los 2010s creó esta dicotomía artificial. El mito de la "especialización pura" funciona en empresas con 50+ designers. No funciona en startups con 1.',
      },
      { type: 'p', text: '[Resto del post en draft — pendiente expansión final basada en outline]' },
    ],
  },
]

function localePosts(locale: Locale): Post[] {
  return locale === 'en' ? postsEn : posts
}

export function getPostBySlug(slug: string, locale: Locale): Post | undefined {
  return localePosts(locale).find((p) => p.slug === slug)
}

export function getPublishedPosts(locale: Locale): Post[] {
  return localePosts(locale)
    .filter((p) => p.status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export function getAllPosts(locale: Locale): Post[] {
  return [...localePosts(locale)].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )
}
