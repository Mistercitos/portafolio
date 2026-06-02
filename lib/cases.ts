import type { Locale } from './i18n'
import { casesEn } from './cases.en'

export type CaseKind = 'professional' | 'challenge' | 'personal'

export type CaseStudy = {
  slug: string
  title: string
  oneLiner: string
  company: string
  role: string
  yearStart: number
  yearEnd: number | 'present'
  kind: CaseKind
  category: 'Marketplace' | 'B2B SaaS' | 'Construction Tech' | 'Agency' | 'Concept'
  platforms: string[]
  industries: string[]
  teamSize: string
  coverInitial: string
  coverGradient: [string, string]
  featured: boolean
  order: number
  techStack: string[]
  context: string
  challenge: { title: string; body: string }[]
  research: string
  decisions: { kind: string; title: string; body: string }[]
  execution: { title: string; body: string }[]
  outcomes: { metric: string; label: string }[]
  takeaways: string[]
}

export const cases: CaseStudy[] = [
  {
    slug: 'stockai',
    kind: 'challenge',
    title: 'StockAI — Replenishment reimaginado: de configuración manual a decisiones con IA',
    oneLiner:
      'Design challenge de 4 días para Senior PD. Rediseño completo del flujo de replenishment en una plataforma SaaS de retail intelligence — de un formulario manual de 2 pasos a una experiencia donde la IA propone, el usuario decide y el sistema ejecuta. Meta: 25 min → <5 min por decisión.',
    company: 'StockAI · Design Challenge',
    role: 'Senior Product Designer · Solo',
    yearStart: 2026,
    yearEnd: 2026,
    category: 'B2B SaaS',
    platforms: ['Web'],
    industries: ['Retail Intelligence', 'Inventory', 'AI'],
    teamSize: 'Solo · 4 días',
    coverInitial: 'S',
    coverGradient: ['#5FA8D3', '#FDB833'],
    featured: true,
    order: 1,
    techStack: ['Figma', 'Shadcn UI', 'Poppins + Inter', 'Herramientas de IA'],
    context:
      'StockAI es una SaaS de retail intelligence que ayuda a equipos de merchandising con la asignación de inventario a través de tiendas para miles de SKUs. Su feature de Replenishment estaba bloqueando la conversión comercial: prometía "AI-driven" pero forzaba a los usuarios a configurar manualmente cada replenishment a través de un formulario de 2 pasos, sin recomendaciones proactivas, sin transparencia, sin impacto financiero visible. Resultado: crecimiento estancado, baja adopción y un proceso comercial bloqueado. Los usuarios percibían StockAI como un ERP más, no como una herramienta de inteligencia.',
    challenge: [
      {
        title: 'La IA era invisible',
        body: 'Pese al discurso "AI-driven", el flujo era un formulario manual. Los usuarios veían un ERP, no inteligencia. La diferencia con Excel desaparecía.',
      },
      {
        title: 'Dos personas, un solo producto',
        body: 'Inventory Managers (ejecución diaria, sesiones de 15-30 min) y Merchandising Planners (estrategia semanal, sesiones largas de 1-2 horas) necesitaban experiencias distintas — pero duplicar el producto no era viable en el plazo del challenge.',
      },
      {
        title: 'Cero lectura financiera',
        body: 'La pantalla de revisión mostraba unidades, no revenue. Imposible para un Planner justificar decisiones aguas arriba al CSCO. Sin impacto financiero visible, el producto no lograba convertir las pruebas en clientes pagados.',
      },
    ],
    research:
      'Hice una auditoría del flujo actual contra tres lentes: propuesta de valor (¿entrega una experiencia impulsada por IA?), eficiencia del usuario (¿reduce tiempo y carga cognitiva?) y resultados de negocio (¿genera impacto medible?). Encontré 7 problemas priorizados por severidad — 2 críticos (IA invisible en todas las pantallas, configuración manual pesada en los pasos 1-2) y 3 mayores (sin impacto de ingresos visible, nula transparencia de la IA, sin acciones masivas). En paralelo mapeé las personas a partir del brief: Maya (Inventory Manager, uso diario, frustrada con los clics repetitivos, no ve impacto financiero, depende del planner para las decisiones grandes) y David (Merchandising Planner, uso semanal, desconfía de la IA tipo caja negra, debe justificar al CSCO, Excel le sigue resultando más rápido para el análisis).',
    decisions: [
      {
        kind: 'Estrategia',
        title: 'Cambio de paradigma: de configurar a aprobar',
        body: 'El producto no fallaba por mala UX. Fallaba porque la IA era invisible. Cambié el flujo de "configurar → calcular → revisar" a "la IA propone → el usuario decide → el sistema ejecuta". Esto redefine completamente el rol del usuario: de operador a decisor.',
      },
      {
        kind: 'UX',
        title: 'Modo dual, un solo producto',
        body: 'En vez de construir dos productos, el mismo flujo se adapta: los Inventory Managers entran por "Quick Approve" desde el dashboard (revisión en segundos); los Merchandising Planners entran por "Smart Setup" con valores por defecto pre-rellenados por IA (configuración a medida cuando hace falta). Ambos caminos convergen en la misma pantalla de Review & Approve — lo que reduce el costo de construcción y la curva de aprendizaje.',
      },
      {
        kind: 'Tech',
        title: 'Un solo core moment, 60% del esfuerzo',
        body: 'En un challenge acotado en tiempo prioricé profundidad sobre amplitud. El dashboard de inicio y el quick path quedaron en media fidelidad. La pantalla de Review & Approve es la única en alta fidelidad, porque ahí es donde el producto se gana — o pierde — la demo y la conversión.',
      },
    ],
    execution: [
      {
        title: 'AI Insights Dashboard — lo urgente, primero',
        body: 'Reemplacé la lista estática con un inicio accionable. Un banner amarillo arriba expone 3 oportunidades urgentes con +$340K de impacto en ingresos desde la entrada. 4 tarjetas de KPI traducen los datos en contexto: reabastecimientos activos, revisiones de IA pendientes, oportunidad de ingresos y tasa de aceptación de IA. Las píldoras de estado (Crítico / Revisar / Aprobado) y las barras de confianza reemplazan la lista plana — los usuarios saben dónde empezar sin leer.',
      },
      {
        title: 'Quick Path — Inventory Manager',
        body: 'Urgencia codificada por color en el borde de cada card (rojo crítico, amarillo revisión, verde rutina). Botón de aprobar en línea en cada card — Maya no necesita abrir la página de detalle. La acción masiva "Approve all (12)" cierra 12 tiendas en un clic. Un mecanismo que convierte sesiones de 30 minutos en sesiones de 5.',
      },
      {
        title: 'Smart Setup — Merchandising Planner',
        body: 'La IA primero, lo manual como respaldo. Una card amarilla "AI Suggests" sobre el formulario muestra alcance (West Coast), categoría (Footwear), frecuencia (Weekly) e impacto estimado (+$340K · 87 SKUs) — todo pre-rellenado a partir de patrones. Los power users siguen pudiendo ajustar cada campo. Sin empty state inicial.',
      },
      {
        title: 'Core Moment — AI Review & Approve',
        body: 'La pantalla donde StockAI prueba su valor. Impacto en ingresos ($340K) y sobrestock evitado ($85K) en lugar de datos operativos. La confianza como señal de primer nivel: porcentaje + barra de color, filtrable y ordenable. Transparencia en línea: expandir una fila muestra los 4 datos detrás de la lógica (velocidad de venta, nivel de stock, patrón estacional, tiendas similares). Aprobación masiva con resguardos — solo se aplica a ítems sobre 80% de confianza; bajo ese umbral, revisión individual obligatoria.',
      },
    ],
    outcomes: [
      { metric: '25 → 5', label: 'Min por decisión (meta)' },
      { metric: '+60%', label: 'Replenishments por usuario / semana' },
      { metric: '>70%', label: 'Meta de tasa de aceptación de IA' },
      { metric: '4 días', label: 'Duración del challenge' },
    ],
    takeaways: [
      'Si el producto se vende como AI-driven pero la experiencia es un formulario tipo ERP, la diferencia con Excel desaparece, y con ella la conversión.',
      'Construir confianza en la IA requiere transparencia, no ocultarla: confianza visible, lógica expandible en línea y la opción de anular siempre disponible.',
      'Servir a dos personas no implica dos productos. El camino adapta la entrada; el core moment converge.',
      'En un challenge acotado en tiempo, mejor un core moment pixel-perfect que cinco pantallas promedio. Eso es lo que gana demos y convierte pruebas en clientes.',
    ],
  },
  {
    slug: 'wolf',
    title: 'Wolf — La app de JobSeekers que aceleró un marketplace de staffing B2B',
    oneLiner:
      'Cuatro años como Design Lead en un marketplace de staffing B2B. Diseñé de cero la app de JobSeekers que destrabó el crecimiento del producto, definí el sistema de componentes y llevé a producto el creador de solicitudes asistido por IA.',
    company: 'Wolf Inc.',
    role: 'Design Lead / UX Engineer',
    yearStart: 2022,
    yearEnd: 2026,
    kind: 'professional',
    category: 'Marketplace',
    platforms: ['Web', 'iOS', 'Android'],
    industries: ['Staffing', 'Workforce', 'Marketplace'],
    teamSize: 'Único Product Designer',
    coverInitial: 'W',
    coverGradient: ['#7C3AED', '#6B7280'],
    featured: true,
    order: 2,
    techStack: ['Figma', 'React', 'JavaScript', 'Design Systems', 'AI tooling'],
    context:
      'Wolf es una SaaS B2B que construye plataformas tipo marketplace a medida para staffing companies. El ecosistema se divide en tres superficies conectadas: una app para JobSeekers —los trabajadores que buscan y postulan a empleos, filtrando por ubicación y tipo de trabajo—, una plataforma para Clients —restaurantes, clínicas, hospitales y hoteles que publican solicitudes de personal por turno y rol— y una consola de Admin para las staffing companies, donde se gestionan contrataciones, asignación de turnos y operaciones. Me sumé como uno de los primeros cinco empleados, cuando el producto ya existía pero todavía estaba en crudo: funcional, pero con una interfaz y una experiencia que no estaban a la altura de lo que el negocio necesitaba.',
    challenge: [
      {
        title: 'Un producto temprano que profesionalizar',
        body: 'El producto ya existía cuando llegué, pero su interfaz y su experiencia frenaban la adopción. Había que llevarlo de un estado funcional-pero-crudo a un estándar de calidad capaz de sostener el crecimiento comercial.',
      },
      {
        title: 'Tres superficies, tres usuarios, un solo ecosistema',
        body: 'JobSeekers, Clients y Admin tienen objetivos y contextos de uso muy distintos. Cada plataforma necesitaba su propia experiencia sin romper la coherencia del producto completo.',
      },
      {
        title: 'Diseñar más rápido de lo que el equipo podía construir',
        body: 'En una startup en etapa temprana, el diseño suele avanzar más rápido que la capacidad de ingeniería para implementarlo. El reto era secuenciar y priorizar para que cada decisión de diseño se tradujera en producto real, no en backlog.',
      },
    ],
    research:
      'Cada plataforma arrancó con discovery, no con pantallas. Para la primera iniciativa —una app para el lado de Clients— corrí un estudio de perfiles de usuario y necesidades a través de entrevistas y encuestas. Ese mismo rigor se repitió para la app de JobSeekers: entender a fondo cómo un trabajador busca, filtra y postula a un empleo antes de definir un solo flujo. El research no fue una etapa aislada. Fue lo que terminó decidiendo qué se diseñaba y en qué orden.',
    decisions: [
      {
        kind: 'Estrategia',
        title: 'Apostar por el lado del producto con más fricción',
        body: 'La primera app —para Clients— completó su fase de diseño y entró a desarrollo, pero un cambio de prioridades a nivel ejecutivo la pausó antes del lanzamiento. En lugar de un callejón sin salida, el research y los aprendizajes redirigieron el foco hacia la oportunidad de mayor impacto: una app para JobSeekers que hiciera la búsqueda de empleo radicalmente más simple.',
      },
      {
        kind: 'UX',
        title: 'Diseñar y construir en paralelo, sin sacrificar calidad',
        body: 'En vez de esperar a tener el diseño completo antes de empezar a desarrollar, entregué la app pantalla por pantalla: una quedaba validada y pasaba a ingeniería mientras yo avanzaba con la siguiente. Para que la velocidad no costara calidad, acompañé a los desarrolladores en la construcción de cada componente, asegurando que la implementación llegara al mismo nivel que el diseño.',
      },
      {
        kind: 'Tech',
        title: 'Creación de solicitudes asistida por IA',
        body: 'Diseñé un creador de solicitudes de trabajo donde el usuario podía partir de un prompt de texto, un Excel, una foto o dictado por voz, y la IA armaba la solicitud completa: horarios, tipos de trabajo y cantidad de trabajadores. Un mismo objetivo, cuatro formas de llegar a él según cómo cada cliente ya tenía organizada su información.',
      },
    ],
    execution: [
      {
        title: 'App de JobSeekers, de cero a producción',
        body: 'Diseñé la app completa: research, flujos de usuario, biblioteca de componentes en Figma, y todas las pantallas, funcionalidades y features. La entrega fue incremental —pantalla validada, pantalla a desarrollo— para que el producto avanzara sin depender de un único gran lanzamiento.',
      },
      {
        title: 'Sistema de componentes como base de calidad',
        body: 'Construí la biblioteca de componentes que sostuvo la app y trabajé codo a codo con ingeniería para que cada componente implementado conservara la fidelidad del diseño. El sistema se volvió la referencia de calidad para el resto del producto.',
      },
      {
        title: 'Creador de solicitudes con IA multi-input',
        body: 'Llevé a producto el creador asistido por IA: prompt, Excel, foto o voz como punto de partida, y una solicitud estructurada como resultado. Bajó la barrera de entrada para clientes que gestionaban su personal de formas muy distintas.',
      },
      {
        title: 'Marca, marketing y presencia en conferencias',
        body: 'Más allá del producto, diseñé piezas para marketing y customer service —material para promover la compañía y educar a los usuarios—, dirigí dos rediseños del sitio web corporativo y produje todo el diseño para conferencias: presentaciones, stands y material de evento.',
      },
    ],
    outcomes: [
      { metric: '0 → producción', label: 'App de JobSeekers lanzada de cero' },
      { metric: '5K–20K', label: 'Usuarios activos en la plataforma' },
      { metric: '100+', label: 'Staffing companies usando Wolf' },
      { metric: 'NY → Austin', label: 'El crecimiento financió la nueva sede' },
    ],
    takeaways: [
      'Entregar diseño pantalla por pantalla, acompañando a ingeniería en cada componente, mantiene la calidad del diseño viva en producción. La velocidad no tiene por qué costar fidelidad.',
      'Cuando un proyecto se pausa por una decisión de negocio, el research no se descarta: es el insumo que vuelve más certera la siguiente apuesta.',
      'Modernizar una parte del producto y dejar la otra atrás abre una brecha que tarde o temprano se paga en conversión. La consistencia de calidad entre superficies es una decisión de negocio, no de estética.',
      'Ser de los primeros en un equipo significa que el diseñador no solo diseña: define el estándar de calidad con el que se construye todo lo demás.',
    ],
  },
  {
    slug: 'outbuild',
    kind: 'professional',
    title:
      'Outbuild — Entré para crear material de marketing y terminé diseñando el producto',
    oneLiner:
      'ProPlanner era una SaaS de gestión de proyectos para la industria de la construcción, usada por más de 40 constructoras en 8 países de Latinoamérica. Llegué contratado para hacer crecer la base de clientes con material de marketing, asumí la dirección del área y me convertí en el Product Designer del producto — el mismo que, más tarde, daría el salto al mercado de Estados Unidos.',
    company: 'IPSUM → Outbuild',
    role: 'Product Designer + Head of Marketing',
    yearStart: 2019,
    yearEnd: 2021,
    category: 'Construction Tech',
    platforms: ['Web'],
    industries: ['Construcción', 'Project Management', 'B2B SaaS'],
    teamSize: 'Único diseñador · 5 ingenieros',
    coverInitial: 'O',
    coverGradient: ['#0D9488', '#5EEAD4'],
    featured: true,
    order: 3,
    techStack: ['Figma', 'Adobe Creative Suite', 'Product Discovery', 'Brand Systems'],
    context:
      'IPSUM —la compañía que más tarde se convertiría en Outbuild— construía ProPlanner: una SaaS para gestionar proyectos de construcción de punta a punta, tanto la planificación de las personas en obra como la de los recursos del proyecto. Dos mundos que históricamente vivían en planillas, pizarras y la cabeza de un jefe de terreno. Era, además, una de las primeras startups de construction-tech con respaldo de capital de riesgo en Latinoamérica — en una industria que todavía miraba al software con desconfianza. Me sumaron al equipo justo después de que la compañía cerrara una ronda de inversión de un millón de dólares, y me buscaron mientras todavía trabajaba en una agencia digital, con un perfil muy específico en mente: alguien capaz de diseñar y, a la vez, mover la aguja del marketing.',
    challenge: [
      {
        title: 'Un perfil para dos disciplinas',
        body: 'La compañía no buscaba un diseñador más. Buscaba a alguien que pudiera producir el material de marketing para hacer crecer la base de clientes y, a la vez, sostener el estándar de diseño del producto. Dos responsabilidades que en la mayoría de las empresas son dos personas.',
      },
      {
        title: 'Diseñar para la obra, no para la oficina',
        body: 'ProPlanner se usaba en faenas de construcción reales: conectividad intermitente, modelos BIM pesados y complejos, y usuarios sin historia previa de uso de software. Lo que funcionaba en una demo de escritorio no necesariamente sobrevivía en terreno.',
      },
      {
        title: 'Crecer de rol en plena incertidumbre',
        body: 'El alcance del trabajo se expandió de marketing a producto en menos de dos años, y lo hizo en paralelo a las réplicas del estallido social de octubre de 2019 en Chile y a una pandemia que obligó a la compañía entera a pasar de la oficina al trabajo remoto.',
      },
    ],
    research:
      'Antes de diseñar funcionalidades, había que entender un contexto operativo poco común para una SaaS. ProPlanner servía a dos perfiles casi opuestos: el jefe de terreno, que vive la obra en movimiento y con conexión inestable, y el planificador de oficina, que necesita ver el proyecto completo y proyectarlo en el tiempo. Diseñar para uno sin perder al otro fue el marco de casi todas las decisiones. Entender los modelos BIM —su peso, su complejidad y su rol en el flujo de trabajo— fue parte central de ese aprendizaje.',
    decisions: [
      {
        kind: 'Estrategia',
        title: 'Ganarse el producto desde el marketing',
        body: 'La primera misión fue concreta: crear el material de marketing que hiciera crecer la base de clientes. Cumplirla abrió la puerta siguiente —un rediseño completo del sitio web corporativo— y esa, la siguiente. El acceso al producto no se pidió: se ganó entregando resultados en cada frente anterior.',
      },
      {
        kind: 'UX',
        title: 'Diseñar para el peor escenario, no para la demo',
        body: 'Las tareas críticas tenían que funcionar con conectividad intermitente y para usuarios sin experiencia previa con software. Eso empujó hacia interfaces de input mínimo, jerarquía clara y navegación predecible. La obra no perdona una pantalla ambigua.',
      },
      {
        kind: 'Tech',
        title: 'Integrarse en vez de reemplazar',
        body: 'En lugar de pedirle a la industria que abandonara sus herramientas, ProPlanner se conectó a ellas: control de asistencia con GeoVictoria, soporte de modelos BIM e integración con Procore, uno de los referentes globales del construction-tech. Integrarse al ecosistema que las constructoras ya usaban —en vez de competir contra él— fue lo que volvió a ProPlanner una pieza viable dentro de su operación real.',
      },
    ],
    execution: [
      {
        title: 'ProPlanner: planificar la obra completa',
        body: 'Diseñé las funcionalidades centrales del producto de gestión de proyectos —cartas Gantt, programación de actividades y planificación de recursos— pensadas para que un equipo en terreno optimizara los procesos de la obra sin pelear con la herramienta.',
      },
      {
        title: 'Un producto que se conecta al rubro',
        body: 'ProPlanner sumó integraciones que lo volvían parte del ecosistema real de la construcción: control de asistencia con GeoVictoria, soporte de modelos BIM e integración con Procore, uno de los referentes globales del construction-tech.',
      },
      {
        title: 'Marketing, sitio web y dirección del área',
        body: 'Mi primer encargo fue el material de marketing para hacer crecer la base de clientes; el segundo, un rediseño completo del sitio web corporativo. Cuando la dirección del área quedó disponible, la compañía me pidió asumirla, y pasé a responder por todo el marketing y el posicionamiento.',
      },
      {
        title: 'De IPSUM a Outbuild',
        body: 'Tras la pandemia, la compañía tomó una decisión audaz: llevar el producto al mercado de Estados Unidos. Una alianza con Haskell, una de las grandes constructoras generales del país, marcó ese ingreso. El producto y el posicionamiento que ayudé a construir en Latinoamérica fueron parte de la base sobre la que se dio ese salto. Ese mismo producto, ya en Estados Unidos, se reconstruyó y pasó a llamarse Outbuild.',
      },
    ],
    outcomes: [
      { metric: '$1M', label: 'Ronda de inversión cerrada al integrarme al equipo' },
      { metric: '40+', label: 'Constructoras usando ProPlanner en 8 países de Latinoamérica' },
      { metric: '2 áreas', label: 'Producto y marketing, lideradas en paralelo' },
      { metric: 'EE.UU.', label: 'El mercado al que la compañía dio el salto tras la pandemia' },
    ],
    takeaways: [
      'Marketing y producto no son disciplinas opuestas: las dos parten de entender al usuario. Moverme entre una y otra me dio una mirada de negocio que el diseño puro no entrega.',
      'Diseñar para la obra me enseñó que el contexto físico del usuario manda. Una pantalla que asume buena conexión y un usuario experto no es una pantalla terminada.',
      'El alcance de un rol no siempre se negocia. A veces se gana entregando en cada frente anterior, hasta que el siguiente se vuelve la consecuencia natural.',
      'Una integración bien elegida puede volver un producto parte del ecosistema de su industria. Conectar ProPlanner con las herramientas que las constructoras ya usaban fue, al mismo tiempo, una decisión de producto y de negocio. Casi siempre son la misma conversación.',
    ],
  },
  {
    slug: 'lfi',
    kind: 'professional',
    title: 'LFI — De un reemplazo temporal a diseñar para las marcas más grandes de Chile',
    oneLiner:
      'Mi primer estudio de diseño. Durante poco más de un año diseñé piezas digitales, de marca e impresas para más de diez marcas de banca, gobierno, educación, salud, energía y retail. Entre ellas, Scotiabank, Walmart Chile, Clínica Alemana y Marca Chile. El encargo más grande: cerca del 90% de la señalética y el material impreso de la Torre Scotiabank.',
    company: 'LFI Agencia Digital',
    role: 'Digital Graphic Designer',
    yearStart: 2018,
    yearEnd: 2019,
    category: 'Agency',
    platforms: ['Digital', 'Impreso', 'Señalética'],
    industries: ['Banca', 'Gobierno', 'Educación', 'Salud', 'Retail', 'Energía'],
    teamSize: 'Hasta 10 proyectos simultáneos',
    coverInitial: 'L',
    coverGradient: ['#2563EB', '#27272A'],
    featured: false,
    order: 4,
    techStack: ['Adobe Creative Suite', 'Animación 2D/3D', 'Motion graphics', 'Producción audiovisual', 'HTML & CSS'],
    context:
      'LFI Agencia Digital fue mi primer estudio de diseño. Entré a cubrir un reemplazo temporal y, al poco tiempo, la calidad del trabajo convirtió ese reemplazo en un puesto fijo. Una agencia trabaja distinto a un producto: en lugar de una sola plataforma que se profundiza durante años, son muchas marcas a la vez, cada una con su identidad, sus restricciones y sus plazos. Fue ahí donde aprendí a diseñar con rigor y con velocidad al mismo tiempo, y donde mi oficio se amplió mucho más allá del diseño gráfico.',
    challenge: [
      {
        title: 'Muchas marcas, un solo estándar',
        body: 'Una agencia diseña para muchos clientes a la vez, cada uno con su sistema de marca, sus reglas y sus plazos. El reto no era una pieza: era sostener un mismo nivel de calidad saltando de una identidad a otra, varias veces al día.',
      },
      {
        title: 'De la pantalla al edificio',
        body: 'El trabajo iba del diseño digital —redes, mailing, sitios— al impreso y la señalética física. Cada formato tiene sus propias reglas de producción: lo que funciona en una pantalla no funciona en una pieza impresa ni en la señalética de una torre.',
      },
      {
        title: 'Clientes que no perdonan errores',
        body: 'Bancos, gobierno y grandes corporativos llegan con manuales de marca estrictos y cero tolerancia a la inconsistencia. Diseñar para ellos significaba respetar sistemas ajenos al pie de la letra, sin perder criterio propio.',
      },
    ],
    research:
      'Cada cliente nuevo empezaba por lo mismo: entender su sistema de marca a fondo. Manuales, piezas anteriores, tono, restricciones. Antes de diseñar una sola pieza para un banco, una universidad o una viña había que internalizar cómo se veía y cómo sonaba esa marca, porque el trabajo de agencia se juzga, sobre todo, por qué tan invisible es la mano del diseñador detrás de la marca del cliente.',
    decisions: [
      {
        kind: 'Estrategia',
        title: 'Sistemas, no piezas sueltas',
        body: 'Para cada cliente armé módulos visuales reutilizables —plantillas, componentes, reglas de aplicación— en lugar de diseñar cada pieza desde cero. Producir más rápido sin perder consistencia. Era, sin saber todavía el nombre, mi primera intuición de design systems.',
      },
      {
        kind: 'UX',
        title: 'La señalética también es experiencia',
        body: 'Diseñar la señalética de una torre corporativa es diseñar cómo cientos de personas se orientan en un edificio cada día. Lo abordé con el mismo rigor que una interfaz: jerarquía clara, consistencia y cero ambigüedad. Wayfinding antes de saber que se llamaba así.',
      },
      {
        kind: 'Tech',
        title: 'Cruzar al código',
        body: 'En LFI tuve mi primer contacto real con HTML y CSS, maquetando piezas para web. Fue el primer puente entre el diseño y la ingeniería, y la semilla del perfil de diseñador y desarrollador que construí después.',
      },
    ],
    execution: [
      {
        title: 'Diseño digital multicanal',
        body: 'Para el roster de clientes diseñé piezas para redes sociales, campañas de email marketing y sitios web. El flujo constante de comunicación que una marca necesita para sostener su presencia.',
      },
      {
        title: 'Comunicación interna corporativa',
        body: 'Buena parte del trabajo fue comunicación interna: las piezas que mantienen informada y alineada a una organización grande puertas adentro, un encargo recurrente sobre todo para Scotiabank.',
      },
      {
        title: 'Del píxel al papel',
        body: 'El trabajo cruzaba al mundo físico con frecuencia: señalética, material impreso y piezas de evento. Cada formato con sus propias reglas de producción, su escala y su margen de error.',
      },
      {
        title: 'Branding para siete sectores',
        body: 'Produje material de marca para clientes de banca, gobierno, educación, salud, energía, retail y vino — cada uno con su sistema visual propio, su tono y sus restricciones.',
      },
      {
        title: 'Animación, 3D y producción audiovisual',
        body: 'El trabajo no se quedó en lo estático. Edición de imagen, ilustración vectorial, animación 2D y 3D, motion graphics y producción audiovisual: LFI fue una base de craft visual mucho más amplia que el diseño gráfico tradicional.',
      },
    ],
    outcomes: [
      { metric: '10+', label: 'Marcas atendidas en banca, gobierno, salud, retail, energía, educación y vino' },
      { metric: '90%', label: 'De la señalética y el material impreso de la Torre Scotiabank' },
      { metric: 'Píxel → edificio', label: 'Diseño digital, impreso y señalética en un mismo rol' },
      { metric: 'HTML/CSS', label: 'El primer puente entre el diseño y la ingeniería' },
    ],
    takeaways: [
      'El trabajo de agencia me enseñó a diseñar rápido sin que la velocidad se llevara puesta la calidad. Es la única forma de sostener diez marcas a la vez.',
      'Diseñar dentro de sistemas de marca ajenos enseña una humildad útil: el mejor trabajo de agencia es el que no se nota, porque deja brillar a la marca del cliente.',
      'La señalética de un edificio y una interfaz resuelven el mismo problema de fondo: que una persona sepa, sin pensar, hacia dónde ir. Era diseño de producto antes de que yo supiera llamarlo así.',
      'En LFI escribí mi primer HTML y mi primer CSS. No lo supe entonces, pero ese fue el primer paso del camino que me llevó a ser, además de diseñador, desarrollador.',
    ],
  },
  {
    slug: 'astros',
    kind: 'personal',
    title: 'Astros — Un plan de viaje en grupo que vive en un solo lugar',
    oneLiner:
      'Un concepto personal: una app para planear viajes en grupo con una capa social medida, pensada para coordinarse con amigos sin que se vuelva otra red social. La diseñé entera, de principio a fin, por mi cuenta.',
    company: 'Proyecto propio',
    role: 'Concepto de producto · Solo',
    yearStart: 2021,
    yearEnd: 2021,
    category: 'Concept',
    platforms: ['iOS', 'Web'],
    industries: ['Viajes', 'Social', 'Consumo'],
    teamSize: 'Solo',
    coverInitial: 'A',
    coverGradient: ['#5B21B6', '#3B82F6'],
    featured: false,
    order: 5,
    techStack: ['Figma', 'Investigación de usuarios', 'Prototipado'],
    context:
      'Astros nació de algo que me pasaba seguido: cada vez que viajaba con amigos terminábamos con cuatro apps abiertas —Maps, Notes, WhatsApp, Booking— y un Excel compartido en algún Drive. El plan vivía en todas partes y en ninguna, y nadie sabía cuál era el último cambio. Astros explora cómo sería tener todo eso en un solo lugar, con una capa social que ayude a coordinarse sin volverse otra red social más.',
    challenge: [
      {
        title: 'Centralizar sin volverse una red social',
        body: 'La idea era reunir el plan de viaje en un solo lugar compartido, pero sin que terminara pareciéndose a una red social, con sus likes y sus notificaciones constantes.',
      },
      {
        title: 'Pensado para usarse en el viaje',
        body: 'La app tiene que funcionar sin conexión o con muy poca señal. El viaje se planea desde la casa, pero se vive en aviones, trenes y ciudades nuevas.',
      },
      {
        title: 'Un grupo, dos tipos de viajero',
        body: 'En todo grupo hay alguien que organiza y varios que solo quieren seguir el plan. Había que diseñar para los dos sin obligar a todos a configurar nada.',
      },
    ],
    research:
      'Entrevisté a ocho amigos viajeros sobre su último viaje en grupo. El 70% seguía coordinándose con WhatsApp y un Excel. El otro 30% ya había tirado la toalla y le dejaba todo al organizador. Lo que encontré fue claro: el problema no está en planear el viaje, sino en mantener al grupo al día mientras el viaje pasa.',
    decisions: [
      {
        kind: 'Estrategia',
        title: 'El plan en Astros, la conversación en WhatsApp',
        body: 'La conversación se queda donde ya está, en WhatsApp. A Astros va el plan en sí: el itinerario, los gastos, las decisiones que ya se tomaron. Cada cosa en su canal.',
      },
      {
        kind: 'UX',
        title: 'Dos vistas, una para cada momento',
        body: 'La app tiene dos vistas separadas: "Mi vista", con lo que me toca hoy, y "Plan del grupo", con la imagen completa del viaje. Uno pasa de una a otra a propósito, no por accidente.',
      },
      {
        kind: 'Tech',
        title: 'Un registro de cambios, no un feed social',
        body: 'Un registro de lo que cambia en el plan, no de lo que hace la gente. "Carla movió la reserva del hotel al sábado" sirve; "Carla está en el aeropuerto" no aporta nada.',
      },
    ],
    execution: [
      {
        title: 'Itinerario compartido y editable',
        body: 'Un calendario que cualquiera del grupo puede editar, con los cambios visibles para todos. Funciona sin conexión y se sincroniza solo al volver a tener señal.',
      },
      {
        title: 'La vista "Hoy"',
        body: 'Durante el viaje, la pantalla principal muestra solo el bloque del día. Nada más. El plan completo queda a un gesto de distancia.',
      },
      {
        title: 'Gastos divididos sin pelear',
        body: 'Cada cosa del plan puede llevar un costo opcional. Al final del viaje, un resumen calcula solo quién le debe cuánto a quién.',
      },
    ],
    outcomes: [
      { metric: 'Concepto', label: 'Validado con 8 entrevistas' },
      { metric: '12', label: 'Pantallas diseñadas' },
      { metric: 'iOS y Web', label: 'Multiplataforma' },
      { metric: '2021', label: 'Proyecto propio' },
    ],
    takeaways: [
      'Coordinarse no es lo mismo que conversar. La conversación tiene su canal; el plan estructurado va al producto.',
      'La mayoría de la gente en un grupo solo quiere seguir el plan. El producto tiene que estar pensado para ellos, no solo para quien organiza.',
      'Diseñar esto me enseñó a pensar en la baja conectividad, algo que después se volvió una restricción real cuando trabajé en Outbuild.',
    ],
  },
  {
    slug: 'deliverynow',
    kind: 'personal',
    title: 'DeliveryNow — Delivery más sostenible sin pedirle un esfuerzo al usuario',
    oneLiner:
      'Un concepto mobile que explora cómo una app de delivery puede empujar decisiones más sostenibles —menos empaque, pedidos agrupados, productores locales— sin sonar a sermón.',
    company: 'Proyecto propio',
    role: 'Concepto de producto · Solo',
    yearStart: 2021,
    yearEnd: 2021,
    category: 'Concept',
    platforms: ['iOS'],
    industries: ['Delivery', 'Sostenibilidad', 'Consumo'],
    teamSize: 'Solo',
    coverInitial: 'D',
    coverGradient: ['#059669', '#6EE7B7'],
    featured: false,
    order: 6,
    techStack: ['Figma', 'Prototipado mobile'],
    context:
      'En plena pandemia, pedir delivery se volvió parte de la rutina diaria. Cada pedido llegaba con tres o cuatro bolsas plásticas, cubiertos descartables que nadie usaba y comida traída desde 40 km cuando había una opción a 5. DeliveryNow explora cómo el flujo de la app puede sugerir decisiones más sostenibles sin convertirse en algo que te hace sentir culpable por pedir comida.',
    challenge: [
      {
        title: 'Reducir la fricción, no sumarla',
        body: 'Cualquier empujón hacia lo sostenible compite con las ganas del usuario de comer ahora. Si agrego un paso de más, lo más probable es que abandone el pedido.',
      },
      {
        title: 'Sostenibilidad sin sermón',
        body: 'La culpa funciona una vez y molesta diez. Había que diseñar para que la opción sostenible fuera la opción fácil, la que se elige sin pensar.',
      },
      {
        title: 'Que lo sostenible pese en el orden de resultados',
        body: 'Los algoritmos de las apps actuales ordenan por lo más cercano, lo más rápido y lo más barato. La idea era sumar el menor empaque y lo local a esa ecuación sin matar la conversión.',
      },
    ],
    research:
      'Revisé cinco apps de delivery —PedidosYa, Rappi, Uber Eats, entre otras— y encontré el mismo patrón en todas: la opción sostenible existe, pero hay que activarla, está escondida en el checkout y casi siempre llega como un costo extra. Y nada le da una razón al restaurante para participar.',
    decisions: [
      {
        kind: 'Estrategia',
        title: 'Lo sostenible viene activado por defecto',
        body: 'La opción de "sin cubiertos descartables" viene marcada de entrada; si los necesitas, los pides. Invertir cuál es el punto de partida cambia el comportamiento de casi todos.',
      },
      {
        kind: 'UX',
        title: 'Etiquetas ambientales discretas',
        body: 'Pequeñas etiquetas en las tarjetas de cada restaurante: "local · 5 km", "poco empaque". No es para moralizar, es para que el usuario decida con la información a la vista.',
      },
      {
        kind: 'Tech',
        title: 'Una ventana de entrega con incentivo',
        body: 'Una ventana flexible de quince minutos extra permite agrupar pedidos de la misma zona. El usuario gana un descuento, el repartidor hace una ruta más corta, y se recorren menos kilómetros en total.',
      },
    ],
    execution: [
      {
        title: 'Descubrimiento con etiquetas ambientales',
        body: 'Los restaurantes con producto local, opciones veggie o empaque compostable se distinguen con una pequeña etiqueta, sin tener que separarlos en una categoría aparte.',
      },
      {
        title: 'Cubiertos descartables, solo si los pides',
        body: 'Por defecto no van. Quien los quiere, los marca. Es una decisión de arquitectura del producto más que de interfaz.',
      },
      {
        title: 'Un resumen de impacto después del pedido',
        body: 'Al terminar la compra, una pantalla muestra algo concreto: "Este pedido evitó 2 bolsas plásticas y 18 km de ruta extra". Sin culpa, solo el dato.',
      },
    ],
    outcomes: [
      { metric: 'Concepto', label: 'Validado con 5 usuarios' },
      { metric: '9', label: 'Pantallas diseñadas' },
      { metric: 'iOS', label: 'Diseño mobile' },
      { metric: '2021', label: 'Proyecto propio' },
    ],
    takeaways: [
      'Lo sostenible gana cuando viene por defecto. Pierde cuando hay que activarlo y encima te hacen sentir culpa.',
      'La fricción es la peor consejera de la sostenibilidad: si agrego un paso, la gente abandona.',
      'El orden en que una app muestra las opciones es una decisión de diseño. Lo que está arriba es lo que se elige.',
    ],
  },
  {
    slug: 'plannyme',
    kind: 'personal',
    title: 'PlannyMe — Un planner calmado, no la productividad como deporte',
    oneLiner:
      'Un concepto mobile de planner personal que se aleja del lenguaje de la productividad agresiva. La idea es ayudar a construir hábitos con calma, en lugar de exprimir cada minuto del día.',
    company: 'Proyecto propio',
    role: 'Concepto de producto · Solo',
    yearStart: 2022,
    yearEnd: 2022,
    category: 'Concept',
    platforms: ['iOS'],
    industries: ['Productividad', 'Bienestar', 'Consumo'],
    teamSize: 'Solo',
    coverInitial: 'P',
    coverGradient: ['#E11D48', '#FCA5A5'],
    featured: false,
    order: 7,
    techStack: ['Figma', 'Prototipado mobile'],
    context:
      'Las apps de productividad competían por ver cuál agregaba más funciones para "optimizar tu día": Notion, Sunsama, Todoist. Quería diseñar lo contrario: un planner que no te haga sentir mal por no terminar la lista. Mi hipótesis era simple: la productividad que se sostiene en el tiempo viene de hábitos constantes, no de semanas heroicas.',
    challenge: [
      {
        title: 'Diseñar sin gamificación',
        body: 'Casi toda app de productividad suma rachas, puntajes y niveles. Eso engancha dos semanas y después pesa. Quería ver si se podía diseñar sin esos mecanismos.',
      },
      {
        title: 'Hábitos, no solo tareas',
        body: 'El objetivo no era "vacía tu bandeja de entrada", era "camina veinte minutos cada día durante un mes". La frecuencia y la constancia piden una interfaz distinta.',
      },
      {
        title: 'Una voz humana, no de software',
        body: 'El texto de estas apps suele ser agresivo, del tipo "¡a darlo todo hoy!". Quería una voz que sonara a una persona, no a un coach motivacional.',
      },
    ],
    research:
      'Encuesté a doce personas que habían abandonado al menos tres apps de productividad en el último año. El patrón se repetía: arrancan con motivación, llenan los primeros días y abandonan a las dos semanas. Lo que más se repetía al describirlo: "la app me hace sentir mal cuando no llego".',
    decisions: [
      {
        kind: 'Estrategia',
        title: 'Los días imperfectos están permitidos',
        body: 'Saltarse un día no rompe ninguna racha ni se marca como un fracaso. Es lo contrario de lo que hacen casi todas las apps, y ese es justamente el punto.',
      },
      {
        kind: 'UX',
        title: 'Máximo tres prioridades por día',
        body: 'Si tienes quince cosas pendientes, el sistema te obliga a elegir. El límite no es una traba: es la función. La lista no se puede estirar.',
      },
      {
        kind: 'Tech',
        title: 'El lenguaje, antes que nada',
        body: 'Decir "hoy estuvo tranquilo" en lugar de "0% de productividad". Un cambio chico de palabras que termina definiendo todo el producto.',
      },
    ],
    execution: [
      {
        title: 'La vista del día, con tres espacios',
        body: 'Una estructura fija: tres bloques visibles, no más. La cuarta tarea aparece en una sección aparte, la de "después".',
      },
      {
        title: 'Hábitos sin rachas que castiguen',
        body: 'Los hábitos se ven como una grilla tranquila. Un día saltado no se marca en rojo. Lo que importa es cómo viene el mes, no la cadena perfecta.',
      },
      {
        title: 'Un resumen de la semana, en palabras',
        body: 'Cada domingo, un resumen de la semana en lenguaje normal. Cuenta lo que pasó, sin puntajes. Es más un diario que un reporte.',
      },
    ],
    outcomes: [
      { metric: 'Concepto', label: 'Validado con 12 entrevistas' },
      { metric: '8', label: 'Pantallas diseñadas' },
      { metric: 'iOS', label: 'Diseño mobile' },
      { metric: '2022', label: 'Proyecto propio' },
    ],
    takeaways: [
      'Poner un límite puede ser una función: obligar a elegir tres prioridades hace que se elijan las tres que de verdad importan.',
      'El tono del texto es una decisión de producto, no de marketing. Define cómo se siente la app más que la propia interfaz.',
      'Las rachas gamificadas enganchan al principio y cansan al final. La constancia que dura viene de no castigar el día que se falla.',
    ],
  },
]

function localeCases(locale: Locale): CaseStudy[] {
  return locale === 'en' ? casesEn : cases
}

export function getCases(locale: Locale): CaseStudy[] {
  return localeCases(locale)
}

export function getCaseBySlug(slug: string, locale: Locale): CaseStudy | undefined {
  return localeCases(locale).find((c) => c.slug === slug)
}

export function getFeaturedCases(locale: Locale): CaseStudy[] {
  return localeCases(locale)
    .filter((c) => c.featured)
    .sort((a, b) => a.order - b.order)
}

export function getCasesByKind(kind: CaseKind, locale: Locale): CaseStudy[] {
  return localeCases(locale)
    .filter((c) => c.kind === kind)
    .sort((a, b) => a.order - b.order)
}
