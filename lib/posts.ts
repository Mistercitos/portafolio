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
      'Cómo resolvimos la creación masiva de Jobs en Wolf combinando voz, texto libre, Excel y un punto único de revisión antes de publicar.',
    publishedAt: '2026-05-16',
    readingMinutes: 9,
    tags: ['product-design', 'ai-ux', 'marketplaces', 'design-systems'],
    category: 'Diseño',
    status: 'published',
    relatedCaseStudy: 'wolf',
    body: [
      {
        type: 'p',
        text: 'El día que un cliente tuvo que crear 47 Jobs en una sola sesión, quedó claro que el formulario no podía seguir siendo la única puerta de entrada.',
      },
      {
        type: 'p',
        text: 'No era un problema del formulario como patrón. Era un problema de volumen, contexto y repetición. Una operadora de staffing podía empezar un lunes a las 7 AM con turnos para dos semanas, distintos clientes, horarios, roles, skills y pay rates. En ese escenario, completar campo por campo era una forma lenta de traducir algo que la persona ya tenía armado en su cabeza o en una planilla.',
      },
      {
        type: 'p',
        text: 'Terminamos diseñando tres rutas para crear un Job: dictado por voz, texto libre y carga de Excel. La clave no fue hacer tres productos distintos, sino lograr que todas esas rutas terminaran en la misma pantalla de revisión.',
      },
      { type: 'placeholder', label: 'Las tres rutas de input · diagrama de arquitectura', caption: 'Diagrama · 16:9', variant: 'hero' },
      { type: 'h2', text: 'Contexto: cuando el formulario gana, los operadores pierden' },
      {
        type: 'p',
        text: 'Wolf es un marketplace multi-lado para la industria de staffing en Estados Unidos. Conviven tres tipos de usuarios: administradores de la staffing company, clientes que contratan personal y job seekers que reciben los Jobs en la app mobile.',
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
        text: 'Cuando llegué al producto, el flujo principal era el formulario clásico. 47 Jobs × 14 campos = 658 entradas. A 2 segundos por campo —siendo optimistas— son 22 minutos de carga manual para una tarea que, conceptualmente, ya estaba resuelta antes de abrir la plataforma.',
      },
      {
        type: 'pullquote',
        text: 'El formulario no era el problema. El problema era que fuera la única puerta de entrada al sistema.',
      },
      { type: 'h2', text: 'La hipótesis: cómo se entra un dato no es cómo se guarda' },
      {
        type: 'p',
        text: 'La primera decisión de UX fue separar dos cosas que estábamos mezclando: cómo una persona expresa una intención y cómo el sistema necesita representarla internamente.',
      },
      {
        type: 'p',
        text: 'Dentro del sistema, un Job seguía siendo el mismo objeto: schedule, uno o más JobTypes, requirements y pay rate. Esa estructura no cambiaba. Lo que sí podía cambiar era la forma en que la operadora llegaba a ese objeto.',
      },
      {
        type: 'ol',
        items: [
          'Voz. Para quien está coordinando turnos mientras hace otra cosa. La persona dicta algo como: "Necesito 4 cocineros para el sábado de 8 AM a 4 PM en Hilton Austin, pay rate 22". El sistema estructura la información y la muestra para confirmar.',
          'Texto libre. Para quien prefiere escribir una instrucción completa sin recorrer 14 campos. Misma intención, otro canal.',
          'Excel. Para los casos donde la información ya existe en una planilla. Carga del archivo, mapeo de columnas, revisión y confirmación.',
        ],
      },
      {
        type: 'p',
        text: 'El formulario quedó como cuarta opción: útil cuando se necesita control granular o cuando el Job no encaja en un patrón previo.',
      },
      { type: 'placeholder', label: 'Pantalla de preview compartida entre las tres rutas', caption: 'Flow · 16:9', variant: 'hero' },
      { type: 'h2', text: 'Decisión #1 — Convergencia visual antes de enviar' },
      {
        type: 'p',
        text: 'La decisión que ordenó todo fue obligar a que las tres rutas terminaran en la misma pantalla de revisión. Al principio parecía un detalle, pero evitó que voz, texto y Excel se convirtieran en tres experiencias separadas.',
      },
      {
        type: 'pullquote',
        text: 'Si la persona no ve el Job final antes de publicarlo, no confía en el sistema. Y si no confía, vuelve al formulario.',
      },
      {
        type: 'p',
        text: 'La pantalla de revisión se convirtió en el contrato. Lo que aparece ahí es exactamente lo que se va a crear. Cualquier dato inferido queda marcado con una señal sutil; al abrirla, se muestra de dónde salió esa interpretación. Cada campo se puede editar en línea antes de publicar.',
      },
      {
        type: 'p',
        text: 'La entrada podía ser flexible; la verificación, no. Esa asimetría fue lo que permitió lanzar asistencia inteligente sin debilitar la confianza de los usuarios.',
      },
      { type: 'h2', text: 'Decisión #2 — Manejar el desastre del Excel real' },
      {
        type: 'p',
        text: 'La ruta por voz y texto libre era relativamente directa de prototipar. Excel fue otra historia. En staffing, las planillas reales suelen venir con estructura irregular:',
      },
      {
        type: 'ul',
        items: [
          'Columnas con nombres distintos según quién armó el archivo (pay, payrate, pay_rate, $/hr).',
          'Schedules expresados como rango, días concretos o texto libre.',
          'Múltiples JobTypes dentro de una sola fila usando comas, slashes o columnas según el cliente.',
          'Filas vacías mezcladas. Headers en la fila 3 en vez de la 1. Hojas con notas que nadie leyó.',
        ],
      },
      {
        type: 'p',
        text: 'La salida fácil era diseñar el caso ideal y mostrar un error genérico cuando algo no calzaba. En productos operacionales, ese error genérico es exactamente donde la gente abandona el flujo.',
      },
      { type: 'placeholder', label: 'UI de reconciliación de columnas del Excel', caption: 'Wireframe · 4:3', variant: 'gallery' },
      { type: 'h3', text: 'Lo que hicimos' },
      {
        type: 'ol',
        items: [
          'Parser tolerante. El backend intenta varias estrategias de mapeo. Cada una produce una confianza.',
          'UI de reconciliación. Si la confianza es alta, se aplica el mapeo y se muestra un aviso para revisar. Si la confianza es baja, se abre un paso explícito donde la persona arrastra columnas hacia campos.',
          'Revisión fila por fila. Antes de publicar, cada fila aparece como un Job individual. Los Jobs con advertencias se marcan en naranja y se editan en línea.',
          'Publicación parcial. Si 45 de 47 Jobs están listos y 2 tienen advertencias, se pueden publicar los 45 y dejar los otros 2 como borrador.',
        ],
      },
      {
        type: 'p',
        text: 'La publicación parcial fue lo que más discusión generó con ingeniería. La preocupación era válida: había que manejar borradores pendientes en la base de datos. Pero en pruebas vimos el patrón con claridad: si obligábamos a resolver todo el Excel antes de crear un solo Job, la persona prefería cerrar el flujo y empezar desde el formulario.',
      },
      {
        type: 'p',
        text: 'El acuerdo fue simple: los borradores persisten 7 días y se avisa 48 horas antes de limpiarlos. Resolvió el problema de UX sin dejar estados pendientes para siempre.',
      },
      { type: 'h2', text: 'Decisión #3 — Cuándo NO usar IA' },
      {
        type: 'p',
        text: 'Después del segundo mes en producción apareció un dato incómodo: para Jobs muy simples —un turno, un trabajador, un cliente conocido— la ruta de voz o texto libre podía ser más lenta que el formulario.',
      },
      {
        type: 'p',
        text: 'Tenía sentido. Decir "necesito un electricista para mañana de 9 a 5 en Marriott downtown" toma varios segundos, y luego hay que revisar el resultado. Si el formulario optimizado resuelve ese caso en tres campos, no vale la pena esconderlo.',
      },
      {
        type: 'pullquote',
        text: 'La asistencia inteligente no reemplaza la experiencia del producto. Es una entrada más.',
      },
      {
        type: 'p',
        text: 'Esa distinción fue importante para el roadmap. No todo debía volverse conversacional. La mejor experiencia era dejar que cada caso usara la entrada que realmente le convenía.',
      },
      { type: 'h2', text: 'Lo que aprendimos' },
      {
        type: 'ol',
        items: [
          'Separar intención de representación. El sistema interno puede ser rígido. La forma en que el usuario llega a él no tiene por qué serlo.',
          'La pantalla de convergencia es el contrato. Cualquier flujo paralelo necesita un punto único donde la persona verifica antes de confirmar.',
          'Diseñar el camino del error con el mismo rigor que el caso ideal. Mapeo de columnas, publicación parcial y borradores persistentes son decisiones de UX, no solo de implementación.',
          'No usar asistencia inteligente donde no aporta. Si el formulario es más rápido para Jobs simples, hay que mantenerlo visible y optimizado.',
        ],
      },
      { type: 'divider' },
      {
        type: 'p',
        text: 'Yo era el único Product Designer del producto, pero esto fue trabajo de equipo. Lo sacamos adelante con colaboración constante con 7 ingenieros y varias rondas de pruebas con operadoras reales en Texas y el Midwest. El Design System también fue clave: creció de 0 a 60-100+ componentes durante ese periodo y permitió que las tres rutas se lanzaran con consistencia visual sin romper el roadmap.',
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
      'El falso dilema entre diseñar y codear. Por qué los Product Designers que también escriben código de producción se están volviendo el nuevo estándar — y qué stack aprender si empiezas hoy.',
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
