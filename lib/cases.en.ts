import type { CaseStudy } from './cases'

/**
 * Versión en inglés de las case studies — adaptada para recruiters tech de EE.UU.
 * Comparte la misma estructura `CaseStudy` que `cases.ts` (la fuente en español).
 * Los campos no textuales (slug, gradientes, años, order…) son idénticos a la
 * versión ES; solo cambia el contenido redactado.
 */
export const casesEn: CaseStudy[] = [
  {
    slug: 'stockai',
    kind: 'challenge',
    title: 'StockAI — Replenishment reimagined: from manual setup to AI-driven decisions',
    oneLiner:
      'A 4-day Senior Product Designer challenge. A full redesign of the replenishment flow in a retail-intelligence SaaS — from a manual 2-step form to an experience where AI proposes, the user decides, and the system executes. Goal: 25 min → under 5 min per decision.',
    company: 'StockAI · Design Challenge',
    role: 'Senior Product Designer · Solo',
    yearStart: 2026,
    yearEnd: 2026,
    category: 'B2B SaaS',
    platforms: ['Web'],
    industries: ['Retail Intelligence', 'Inventory', 'AI'],
    teamSize: 'Solo · 4 days',
    coverInitial: 'S',
    coverGradient: ['#5FA8D3', '#FDB833'],
    featured: true,
    order: 1,
    techStack: ['Figma', 'Shadcn UI', 'Poppins + Inter', 'AI tooling'],
    context:
      'StockAI is a retail-intelligence SaaS that helps merchandising teams allocate inventory across stores for thousands of SKUs. Its Replenishment feature was blocking sales conversion: it promised an "AI-driven" product but forced users to configure every replenishment by hand through a 2-step form — no proactive recommendations, no transparency, no visible financial impact. The result: stalled growth, low adoption, and a blocked sales process. Users saw StockAI as just another ERP, not an intelligence tool.',
    challenge: [
      {
        title: 'The AI was invisible',
        body: 'Despite the "AI-driven" pitch, the flow was a manual form. Users saw an ERP, not intelligence. The gap with a spreadsheet disappeared.',
      },
      {
        title: 'Two personas, one product',
        body: 'Inventory Managers (daily execution, 15–30 minute sessions) and Merchandising Planners (weekly strategy, long 1–2 hour sessions) needed different experiences — but duplicating the product was not viable within the challenge timeframe.',
      },
      {
        title: 'No financial read',
        body: 'The review screen showed units, not revenue. Impossible for a Planner to justify decisions upward to the CSCO. With no visible financial impact, the product could not turn trials into paying customers.',
      },
    ],
    research:
      'I audited the existing flow against three lenses: value proposition (does it deliver on "AI-driven"?), user efficiency (does it cut time and cognitive load?), and business outcomes (does it create measurable impact?). I found 7 problems ranked by severity — 2 critical (invisible AI across every screen, heavy manual setup in steps 1–2) and 3 major (no visible revenue impact, zero AI transparency, no bulk actions). In parallel I mapped the personas from the brief: Maya (Inventory Manager, daily use, frustrated by repetitive clicks, can\'t see financial impact, depends on the planner for the big decisions) and David (Merchandising Planner, weekly use, distrusts black-box AI, has to justify decisions to the CSCO, still finds Excel faster for analysis).',
    decisions: [
      {
        kind: 'Strategy',
        title: 'A paradigm shift: from configuring to approving',
        body: 'The product was not failing because of bad UX. It was failing because the AI was invisible. I shifted the flow from "configure → calculate → review" to "AI proposes → user decides → system executes." That completely redefines the user\'s role: from operator to decision-maker.',
      },
      {
        kind: 'UX',
        title: 'Dual mode, one product',
        body: 'Instead of building two products, the same flow adapts: Inventory Managers enter through "Quick Approve" from the dashboard (review in seconds); Merchandising Planners enter through "Smart Setup" with AI-prefilled defaults (tailored configuration when it is needed). Both paths converge on the same Review & Approve screen — which cuts build cost and the learning curve.',
      },
      {
        kind: 'Tech',
        title: 'One core moment, 60% of the effort',
        body: 'In a time-boxed challenge I prioritized depth over breadth. The home dashboard and the quick path stayed at medium fidelity. The Review & Approve screen is the only one at high fidelity, because that is where the product wins — or loses — the demo and the conversion.',
      },
    ],
    execution: [
      {
        title: 'AI Insights Dashboard — the urgent first',
        body: 'I replaced the static list with an actionable home. A yellow banner up top surfaces 3 urgent opportunities worth +$340K in revenue impact right away. 4 KPI cards translate the data into context: active replenishments, pending AI reviews, revenue opportunity, and AI acceptance rate. Status pills (Critical / Review / Approved) and confidence bars replace the flat list — users know where to start without reading.',
      },
      {
        title: 'Quick Path — Inventory Manager',
        body: 'Urgency color-coded on each card\'s border (red critical, yellow review, green routine). An inline approve button on every card — Maya never has to open the detail page. The "Approve all (12)" bulk action closes 12 stores in one click. A mechanism that turns 30-minute sessions into 5-minute ones.',
      },
      {
        title: 'Smart Setup — Merchandising Planner',
        body: 'AI first, manual as backup. A yellow "AI Suggests" card above the form shows scope (West Coast), category (Footwear), frequency (Weekly), and estimated impact (+$340K · 87 SKUs) — all prefilled from patterns. Power users can still adjust every field. No blank initial empty state.',
      },
      {
        title: 'Core Moment — AI Review & Approve',
        body: 'The screen where StockAI proves its worth. Revenue impact ($340K) and overstock avoided ($85K) instead of operational data. Confidence as a first-class signal: percentage + color bar, filterable and sortable. Inline transparency: expanding a row reveals the 4 data points behind the logic (sales velocity, stock level, seasonal pattern, similar stores). Bulk approval with guardrails — it only applies to items above 80% confidence; below that threshold, individual review is required.',
      },
    ],
    outcomes: [
      { metric: '25 → 5', label: 'Min per decision (goal)' },
      { metric: '+60%', label: 'Replenishments per user / week' },
      { metric: '>70%', label: 'Target AI acceptance rate' },
      { metric: '4 days', label: 'Challenge duration' },
    ],
    takeaways: [
      'If a product is sold as AI-driven but the experience is an ERP-style form, the gap with a spreadsheet disappears — and conversion goes with it.',
      'Building trust in AI takes transparency, not hiding it: visible confidence, logic you can expand inline, and an override that is always within reach.',
      'Serving two personas does not mean two products. The path adapts the entry point; the core moment converges.',
      'In a time-boxed challenge, one pixel-perfect core moment beats five average screens. That is what wins demos and turns trials into customers.',
    ],
  },
  {
    slug: 'wolf',
    kind: 'professional',
    title: 'Wolf — The JobSeeker app that accelerated a B2B staffing marketplace',
    oneLiner:
      'Four years as Design Lead on a B2B staffing marketplace. I designed the JobSeeker app from scratch — the one that unblocked product growth — defined the component system, and shipped the AI-assisted job-request builder.',
    company: 'Wolf Inc.',
    role: 'Design Lead / UX Engineer',
    yearStart: 2022,
    yearEnd: 2026,
    category: 'Marketplace',
    platforms: ['Web', 'iOS', 'Android'],
    industries: ['Staffing', 'Workforce', 'Marketplace'],
    teamSize: 'Sole Product Designer',
    coverInitial: 'W',
    coverGradient: ['#7C3AED', '#6B7280'],
    featured: true,
    order: 2,
    techStack: ['Figma', 'React', 'JavaScript', 'Design Systems', 'AI tooling'],
    context:
      'Wolf is a B2B SaaS that builds custom marketplace-style platforms for staffing companies. The ecosystem splits into three connected surfaces: a JobSeeker app — the workers who search and apply for jobs, filtering by location and job type — a Client platform — restaurants, clinics, hospitals, and hotels that post staffing requests by shift and role — and an Admin console for the staffing companies, where hiring, shift assignment, and operations are managed. I joined as one of the first five employees, when the product already existed but was still rough: functional, but with an interface and an experience that were not where the business needed them to be.',
    challenge: [
      {
        title: 'An early product to professionalize',
        body: 'The product already existed when I arrived, but its interface and experience were holding adoption back. It had to move from a functional-but-rough state to a quality bar that could carry commercial growth.',
      },
      {
        title: 'Three surfaces, three users, one ecosystem',
        body: 'JobSeekers, Clients, and Admin have very different goals and contexts of use. Each platform needed its own experience without breaking the coherence of the whole product.',
      },
      {
        title: 'Designing faster than the team could build',
        body: 'At an early-stage startup, design usually moves faster than engineering can implement it. The challenge was sequencing and prioritizing so every design decision turned into real product, not backlog.',
      },
    ],
    research:
      'Every platform started with discovery, not screens. For the first initiative — an app for the Client side — I ran a study of user profiles and needs through interviews and surveys. That same rigor carried over to the JobSeeker app: deeply understanding how a worker searches, filters, and applies for a job before defining a single flow. Research was not a separate stage. It is what ended up deciding what got designed, and in what order.',
    decisions: [
      {
        kind: 'Strategy',
        title: 'Betting on the side of the product with the most friction',
        body: 'The first app — for Clients — finished its design phase and moved into development, but an executive shift in priorities paused it before launch. Instead of a dead end, the research and learnings redirected focus to the higher-impact opportunity: a JobSeeker app that made job hunting radically simpler.',
      },
      {
        kind: 'UX',
        title: 'Design and build in parallel, without trading away quality',
        body: 'Rather than waiting for the full design before development started, I delivered the app screen by screen: one would get validated and move to engineering while I pushed ahead with the next. So speed would not cost quality, I worked alongside the developers building each component, making sure the implementation reached the same bar as the design.',
      },
      {
        kind: 'Tech',
        title: 'AI-assisted request creation',
        body: 'I designed a job-request builder where the user could start from a text prompt, an Excel file, a photo, or voice dictation, and the AI assembled the full request: schedules, job types, and worker counts. One goal, four ways to reach it depending on how each client had already organized their information.',
      },
    ],
    execution: [
      {
        title: 'JobSeeker app, from zero to production',
        body: 'I designed the whole app: research, user flows, the Figma component library, and every screen, function, and feature. Delivery was incremental — screen validated, screen to development — so the product moved forward without depending on a single big launch.',
      },
      {
        title: 'A component system as the foundation of quality',
        body: 'I built the component library that carried the app and worked side by side with engineering so every implemented component kept the fidelity of the design. The system became the quality reference for the rest of the product.',
      },
      {
        title: 'Multi-input AI request builder',
        body: 'I shipped the AI-assisted builder: prompt, Excel, photo, or voice as a starting point, and a structured request as the result. It lowered the barrier to entry for clients who managed their staffing in very different ways.',
      },
      {
        title: 'Brand, marketing, and conference presence',
        body: 'Beyond the product, I designed pieces for marketing and customer service — material to promote the company and educate users — led two redesigns of the corporate website, and produced all the design for conferences: presentations, booths, and event material.',
      },
    ],
    outcomes: [
      { metric: '0 → production', label: 'JobSeeker app launched from scratch' },
      { metric: '5K–20K', label: 'Active users on the platform' },
      { metric: '100+', label: 'Staffing companies using Wolf' },
      { metric: 'NY → Austin', label: 'Growth funded the new headquarters' },
    ],
    takeaways: [
      'Delivering design screen by screen, working with engineering on each component, keeps design quality alive in production. Speed does not have to cost fidelity.',
      'When a project is paused by a business decision, the research is not thrown away: it is the input that makes the next bet sharper.',
      'Modernizing one part of the product and leaving the other behind opens a gap that eventually gets paid for in conversion. Consistent quality across surfaces is a business decision, not an aesthetic one.',
      'Being one of the first on a team means the designer does not just design: they set the quality standard everything else is built to.',
    ],
  },
  {
    slug: 'outbuild',
    kind: 'professional',
    title: 'Outbuild — I joined to make marketing material and ended up designing the product',
    oneLiner:
      'ProPlanner was a project-management SaaS for the construction industry, used by 40+ contractors across 8 Latin American countries. I was hired to grow the customer base with marketing material, took over the marketing function, and became the product designer — for the same product that would later make the leap to the US market.',
    company: 'IPSUM → Outbuild',
    role: 'Product Designer + Head of Marketing',
    yearStart: 2019,
    yearEnd: 2021,
    category: 'Construction Tech',
    platforms: ['Web'],
    industries: ['Construction', 'Project Management', 'B2B SaaS'],
    teamSize: 'Sole designer · 5 engineers',
    coverInitial: 'O',
    coverGradient: ['#0D9488', '#5EEAD4'],
    featured: true,
    order: 3,
    techStack: ['Figma', 'Adobe Creative Suite', 'Product Discovery', 'Brand Systems'],
    context:
      'IPSUM — the company that would later become Outbuild — built ProPlanner: a SaaS to manage construction projects end to end, both the planning of people on site and of project resources. Two worlds that had historically lived in spreadsheets, whiteboards, and a site manager\'s head. It was also one of the first venture-backed construction-tech startups in Latin America — in an industry that still eyed software with distrust. I was brought onto the team right after the company closed a one-million-dollar funding round, and they recruited me while I was still working at a digital agency, with a very specific profile in mind: someone who could design and, at the same time, move the needle on marketing.',
    challenge: [
      {
        title: 'One profile for two disciplines',
        body: 'The company was not looking for another designer. It was looking for someone who could produce the marketing material to grow the customer base and, at the same time, hold the design standard of the product. Two responsibilities that at most companies are two people.',
      },
      {
        title: 'Designing for the job site, not the office',
        body: 'ProPlanner was used on real construction sites: intermittent connectivity, heavy and complex BIM models, and users with no prior history of using software. What worked in a desktop demo did not necessarily survive in the field.',
      },
      {
        title: 'Growing in role amid full uncertainty',
        body: 'The scope of the work expanded from marketing to product in under two years, and it did so alongside the aftershocks of Chile\'s October 2019 social uprising and a pandemic that forced the entire company from the office to remote work.',
      },
    ],
    research:
      'Before designing features, I had to understand an operating context unusual for a SaaS. ProPlanner served two almost opposite profiles: the site manager, who lives the job on the move with an unstable connection, and the office planner, who needs to see the whole project and project it over time. Designing for one without losing the other framed nearly every decision. Understanding BIM models — their weight, their complexity, and their role in the workflow — was a central part of that learning.',
    decisions: [
      {
        kind: 'Strategy',
        title: 'Earning the product through marketing',
        body: 'The first mission was concrete: create the marketing material that would grow the customer base. Delivering on it opened the next door — a full redesign of the corporate website — and that one opened the next. Access to the product was not asked for: it was earned by delivering on every prior front.',
      },
      {
        kind: 'UX',
        title: 'Design for the worst case, not the demo',
        body: 'Critical tasks had to work with intermittent connectivity and for users with no prior software experience. That pushed toward minimal-input interfaces, clear hierarchy, and predictable navigation. The job site does not forgive an ambiguous screen.',
      },
      {
        kind: 'Tech',
        title: 'Integrate instead of replace',
        body: 'Rather than asking the industry to abandon its tools, ProPlanner connected to them: attendance tracking with GeoVictoria, BIM model support, and integration with Procore, one of the global benchmarks of construction tech. Plugging into the ecosystem contractors already used — instead of competing against it — is what made ProPlanner a viable piece of their real operation.',
      },
    ],
    execution: [
      {
        title: 'ProPlanner: planning the whole job site',
        body: 'I designed the product\'s core features — Gantt charts, activity scheduling, and resource planning — built so a team in the field could optimize the job\'s processes without fighting the tool.',
      },
      {
        title: 'A product that plugs into the industry',
        body: 'ProPlanner added integrations that made it part of construction\'s real ecosystem: attendance tracking with GeoVictoria, BIM model support, and integration with Procore, one of the global benchmarks of construction tech.',
      },
      {
        title: 'Marketing, website, and leading the function',
        body: 'My first assignment was the marketing material to grow the customer base; the second, a full redesign of the corporate website. When the lead of the function opened up, the company asked me to take it on, and I became responsible for all of marketing and positioning.',
      },
      {
        title: 'From IPSUM to Outbuild',
        body: 'After the pandemic, the company made a bold call: take the product to the US market. A partnership with Haskell, one of the country\'s large general contractors, marked that entry. The product and the positioning I helped build in Latin America were part of the foundation that leap was made on. That same product, now in the US, was rebuilt and renamed Outbuild.',
      },
    ],
    outcomes: [
      { metric: '$1M', label: 'Funding round closed as I joined the team' },
      { metric: '40+', label: 'Contractors using ProPlanner across 8 Latin American countries' },
      { metric: '2 functions', label: 'Product and marketing, led in parallel' },
      { metric: 'United States', label: 'The market the company leapt to after the pandemic' },
    ],
    takeaways: [
      'Marketing and product are not opposite disciplines: both start from understanding the user. Moving between them gave me a business lens that pure design does not hand you.',
      'Designing for the job site taught me that the user\'s physical context rules. A screen that assumes a good connection and an expert user is not a finished screen.',
      'The scope of a role is not always negotiated. Sometimes it is earned by delivering on every prior front, until the next one becomes the natural consequence.',
      'A well-chosen integration can make a product part of its industry\'s ecosystem. Connecting ProPlanner to the tools contractors already used was, at once, a product decision and a business one. They are almost always the same conversation.',
    ],
  },
  {
    slug: 'lfi',
    kind: 'professional',
    title: 'LFI — From a temporary cover to designing for Chile\'s biggest brands',
    oneLiner:
      'My first design studio. For just over a year I designed digital, brand, and print pieces for more than ten brands across banking, government, education, healthcare, energy, and retail. Among them: Scotiabank, Walmart Chile, Clínica Alemana, and Marca Chile. The biggest assignment: close to 90% of the signage and print material for the Scotiabank Tower.',
    company: 'LFI Digital Agency',
    role: 'Digital Graphic Designer',
    yearStart: 2018,
    yearEnd: 2019,
    category: 'Agency',
    platforms: ['Digital', 'Print', 'Wayfinding'],
    industries: ['Banking', 'Government', 'Education', 'Healthcare', 'Retail', 'Energy'],
    teamSize: 'Up to 10 projects at once',
    coverInitial: 'L',
    coverGradient: ['#2563EB', '#27272A'],
    featured: false,
    order: 4,
    techStack: ['Adobe Creative Suite', '2D/3D animation', 'Motion graphics', 'Video production', 'HTML & CSS'],
    context:
      'LFI Digital Agency was my first design studio. I came in to cover a temporary leave and, before long, the quality of the work turned that cover into a permanent role. An agency works differently from a product: instead of a single platform you go deeper into over years, it is many brands at once, each with its own identity, constraints, and deadlines. That is where I learned to design with rigor and speed at the same time, and where my craft expanded well beyond graphic design.',
    challenge: [
      {
        title: 'Many brands, one standard',
        body: 'An agency designs for many clients at once, each with its own brand system, rules, and deadlines. The challenge was not one piece: it was holding the same level of quality while jumping from one identity to another, several times a day.',
      },
      {
        title: 'From the screen to the building',
        body: 'The work ranged from digital design — social, mailing, websites — to print and physical signage. Each format has its own production rules: what works on a screen does not work in a printed piece or in the signage of a tower.',
      },
      {
        title: 'Clients who do not forgive mistakes',
        body: 'Banks, government, and large corporations arrive with strict brand manuals and zero tolerance for inconsistency. Designing for them meant respecting someone else\'s system to the letter, without losing your own judgment.',
      },
    ],
    research:
      'Every new client started the same way: understanding their brand system in depth. Manuals, past pieces, tone, constraints. Before designing a single piece for a bank, a university, or a winery, you had to internalize how that brand looked and how it sounded — because agency work is judged, above all, by how invisible the designer\'s hand is behind the client\'s brand.',
    decisions: [
      {
        kind: 'Strategy',
        title: 'Systems, not one-off pieces',
        body: 'For each client I built reusable visual modules — templates, components, application rules — instead of designing every piece from scratch. Producing faster without losing consistency. It was, without knowing the name yet, my first instinct for design systems.',
      },
      {
        kind: 'UX',
        title: 'Signage is experience too',
        body: 'Designing the signage of a corporate tower is designing how hundreds of people find their way through a building every day. I approached it with the same rigor as an interface: clear hierarchy, consistency, and zero ambiguity. Wayfinding before I knew it was called that.',
      },
      {
        kind: 'Tech',
        title: 'Crossing into code',
        body: 'At LFI I had my first real contact with HTML and CSS, building pieces for the web. It was the first bridge between design and engineering, and the seed of the designer-and-developer profile I built afterward.',
      },
    ],
    execution: [
      {
        title: 'Multichannel digital design',
        body: 'For the client roster I designed pieces for social media, email marketing campaigns, and websites. The constant flow of communication a brand needs to sustain its presence.',
      },
      {
        title: 'Corporate internal communication',
        body: 'A good part of the work was internal communication: the pieces that keep a large organization informed and aligned behind closed doors, a recurring assignment especially for Scotiabank.',
      },
      {
        title: 'From pixel to paper',
        body: 'The work crossed into the physical world often: signage, print material, and event pieces. Each format with its own production rules, its own scale, and its own margin for error.',
      },
      {
        title: 'Branding for seven sectors',
        body: 'I produced brand material for clients in banking, government, education, healthcare, energy, retail, and wine — each with its own visual system, tone, and constraints.',
      },
      {
        title: 'Animation, 3D, and video production',
        body: 'The work did not stay static. Image editing, vector illustration, 2D and 3D animation, motion graphics, and video production: LFI was a foundation of visual craft much broader than traditional graphic design.',
      },
    ],
    outcomes: [
      { metric: '10+', label: 'Brands served across banking, government, healthcare, retail, energy, education, and wine' },
      { metric: '90%', label: 'Of the signage and print material for the Scotiabank Tower' },
      { metric: 'Pixel → building', label: 'Digital, print, and signage design in one role' },
      { metric: 'HTML/CSS', label: 'The first bridge between design and engineering' },
    ],
    takeaways: [
      'Agency work taught me to design fast without speed running over quality. It is the only way to carry ten brands at once.',
      'Designing inside someone else\'s brand systems teaches a useful humility: the best agency work is the kind you do not notice, because it lets the client\'s brand shine.',
      'A building\'s signage and an interface solve the same underlying problem: helping a person know, without thinking, where to go. It was product design before I knew to call it that.',
      'At LFI I wrote my first HTML and my first CSS. I did not know it then, but that was the first step of the path that led me to be a developer as well as a designer.',
    ],
  },
  {
    slug: 'astros',
    kind: 'personal',
    title: 'Astros — A group travel plan that lives in one place',
    oneLiner:
      'A personal concept: an app for planning group trips with a measured social layer, built to coordinate with friends without becoming yet another social network. I designed the whole thing, start to finish, on my own.',
    company: 'Personal project',
    role: 'Product concept · Solo',
    yearStart: 2021,
    yearEnd: 2021,
    category: 'Concept',
    platforms: ['iOS', 'Web'],
    industries: ['Travel', 'Social', 'Consumer'],
    teamSize: 'Solo',
    coverInitial: 'A',
    coverGradient: ['#5B21B6', '#3B82F6'],
    featured: false,
    order: 5,
    techStack: ['Figma', 'User research', 'Prototyping'],
    context:
      'Astros came out of something that kept happening to me: every time I traveled with friends we ended up with four apps open — Maps, Notes, WhatsApp, Booking — and a shared spreadsheet on someone\'s Drive. The plan lived everywhere and nowhere, and nobody knew what the latest change was. Astros explores what it would be like to have all of that in one place, with a social layer that helps people coordinate without turning into one more social network.',
    challenge: [
      {
        title: 'Centralize without becoming a social network',
        body: 'The idea was to gather the trip plan in a single shared place, but without it ending up looking like a social network, with its likes and constant notifications.',
      },
      {
        title: 'Built to be used on the trip',
        body: 'The app has to work offline or with very little signal. A trip is planned from home, but it is lived on planes, trains, and in new cities.',
      },
      {
        title: 'One group, two kinds of traveler',
        body: 'In every group there is someone who organizes and several who just want to follow the plan. It had to be designed for both, without forcing everyone to configure anything.',
      },
    ],
    research:
      'I interviewed eight friends who travel about their last group trip. 70% were still coordinating with WhatsApp and a spreadsheet. The other 30% had already given up and left everything to the organizer. What I found was clear: the problem is not planning the trip, it is keeping the group up to date while the trip is happening.',
    decisions: [
      {
        kind: 'Strategy',
        title: 'The plan in Astros, the conversation in WhatsApp',
        body: 'The conversation stays where it already is, in WhatsApp. Astros holds the plan itself: the itinerary, the expenses, the decisions already made. Each thing in its own channel.',
      },
      {
        kind: 'UX',
        title: 'Two views, one for each moment',
        body: 'The app has two separate views: "My view," with what is on me today, and "Group plan," with the full picture of the trip. You move from one to the other on purpose, not by accident.',
      },
      {
        kind: 'Tech',
        title: 'A change log, not a social feed',
        body: 'A record of what changes in the plan, not of what people do. "Carla moved the hotel booking to Saturday" is useful; "Carla is at the airport" adds nothing.',
      },
    ],
    execution: [
      {
        title: 'Shared, editable itinerary',
        body: 'A calendar anyone in the group can edit, with changes visible to everyone. It works offline and syncs on its own once there is signal again.',
      },
      {
        title: 'The "Today" view',
        body: 'During the trip, the main screen shows only the day\'s block. Nothing else. The full plan stays one gesture away.',
      },
      {
        title: 'Split expenses without arguing',
        body: 'Anything in the plan can carry an optional cost. At the end of the trip, a summary works out exactly who owes whom how much.',
      },
    ],
    outcomes: [
      { metric: 'Concept', label: 'Validated with 8 interviews' },
      { metric: '12', label: 'Screens designed' },
      { metric: 'iOS & Web', label: 'Cross-platform' },
      { metric: '2021', label: 'Personal project' },
    ],
    takeaways: [
      'Coordinating is not the same as talking. The conversation has its channel; the structured plan belongs in the product.',
      'Most people in a group just want to follow the plan. The product has to be built for them, not only for the organizer.',
      'Designing this taught me to think about low connectivity — something that later became a real constraint when I worked at Outbuild.',
    ],
  },
  {
    slug: 'deliverynow',
    kind: 'personal',
    title: 'DeliveryNow — More sustainable delivery without asking the user for effort',
    oneLiner:
      'A mobile concept exploring how a delivery app can nudge more sustainable choices — less packaging, batched orders, local producers — without sounding like a lecture.',
    company: 'Personal project',
    role: 'Product concept · Solo',
    yearStart: 2021,
    yearEnd: 2021,
    category: 'Concept',
    platforms: ['iOS'],
    industries: ['Delivery', 'Sustainability', 'Consumer'],
    teamSize: 'Solo',
    coverInitial: 'D',
    coverGradient: ['#059669', '#6EE7B7'],
    featured: false,
    order: 6,
    techStack: ['Figma', 'Mobile prototyping'],
    context:
      'In the thick of the pandemic, ordering delivery became part of the daily routine. Every order arrived with three or four plastic bags, disposable cutlery nobody used, and food brought from 40 km away when there was an option 5 km out. DeliveryNow explores how the app\'s flow can suggest more sustainable choices without turning into something that makes you feel guilty for ordering food.',
    challenge: [
      {
        title: 'Reduce friction, do not add it',
        body: 'Any nudge toward sustainability competes with the user\'s urge to eat now. If I add one extra step, they will most likely abandon the order.',
      },
      {
        title: 'Sustainability without the lecture',
        body: 'Guilt works once and annoys ten times. It had to be designed so the sustainable option was the easy option, the one you pick without thinking.',
      },
      {
        title: 'Make sustainability count in the ranking',
        body: 'Today\'s app algorithms rank by closest, fastest, and cheapest. The idea was to add lower packaging and local sourcing to that equation without killing conversion.',
      },
    ],
    research:
      'I reviewed five delivery apps — PedidosYa, Rappi, Uber Eats, among others — and found the same pattern in all of them: the sustainable option exists, but you have to switch it on, it is hidden in the checkout, and it almost always shows up as an extra cost. And nothing gives the restaurant a reason to take part.',
    decisions: [
      {
        kind: 'Strategy',
        title: 'Sustainable is on by default',
        body: 'The "no disposable cutlery" option comes pre-checked; if you need it, you ask for it. Flipping the starting point changes the behavior of nearly everyone.',
      },
      {
        kind: 'UX',
        title: 'Discreet environmental labels',
        body: 'Small labels on each restaurant card: "local · 5 km," "low packaging." It is not there to moralize, it is there so the user decides with the information in plain sight.',
      },
      {
        kind: 'Tech',
        title: 'A delivery window with an incentive',
        body: 'A flexible window of fifteen extra minutes makes it possible to batch orders from the same area. The user gets a discount, the courier runs a shorter route, and fewer kilometers are covered overall.',
      },
    ],
    execution: [
      {
        title: 'Discovery with environmental labels',
        body: 'Restaurants with local produce, veggie options, or compostable packaging stand out with a small label, without having to split them into a separate category.',
      },
      {
        title: 'Disposable cutlery, only if you ask',
        body: 'By default it is not included. Whoever wants it checks the box. It is a product-architecture decision more than an interface one.',
      },
      {
        title: 'An impact summary after the order',
        body: 'When the purchase is done, a screen shows something concrete: "This order avoided 2 plastic bags and 18 km of extra route." No guilt, just the fact.',
      },
    ],
    outcomes: [
      { metric: 'Concept', label: 'Validated with 5 users' },
      { metric: '9', label: 'Screens designed' },
      { metric: 'iOS', label: 'Mobile design' },
      { metric: '2021', label: 'Personal project' },
    ],
    takeaways: [
      'Sustainable wins when it is the default. It loses when you have to switch it on and get guilt-tripped on top.',
      'Friction is sustainability\'s worst advisor: add one step and people abandon.',
      'The order an app shows options in is a design decision. What is at the top is what gets chosen.',
    ],
  },
  {
    slug: 'plannyme',
    kind: 'personal',
    title: 'PlannyMe — A calm planner, not productivity as a sport',
    oneLiner:
      'A mobile concept for a personal planner that steps away from the language of aggressive productivity. The idea is to help build habits calmly, instead of squeezing every minute out of the day.',
    company: 'Personal project',
    role: 'Product concept · Solo',
    yearStart: 2022,
    yearEnd: 2022,
    category: 'Concept',
    platforms: ['iOS'],
    industries: ['Productivity', 'Wellbeing', 'Consumer'],
    teamSize: 'Solo',
    coverInitial: 'P',
    coverGradient: ['#E11D48', '#FCA5A5'],
    featured: false,
    order: 7,
    techStack: ['Figma', 'Mobile prototyping'],
    context:
      'Productivity apps were competing over which could add the most features to "optimize your day": Notion, Sunsama, Todoist. I wanted to design the opposite: a planner that does not make you feel bad for not finishing the list. My hypothesis was simple: productivity that lasts comes from steady habits, not heroic weeks.',
    challenge: [
      {
        title: 'Designing without gamification',
        body: 'Almost every productivity app piles on streaks, scores, and levels. That hooks you for two weeks and then weighs on you. I wanted to see whether you could design without those mechanics.',
      },
      {
        title: 'Habits, not just tasks',
        body: 'The goal was not "empty your inbox," it was "walk twenty minutes every day for a month." Frequency and consistency call for a different interface.',
      },
      {
        title: 'A human voice, not a software one',
        body: 'The copy in these apps tends to be aggressive — the "give it your all today!" type. I wanted a voice that sounded like a person, not a motivational coach.',
      },
    ],
    research:
      'I surveyed twelve people who had abandoned at least three productivity apps in the past year. The pattern repeated: they start motivated, fill in the first few days, and quit after two weeks. What came up most when they described it: "the app makes me feel bad when I don\'t keep up."',
    decisions: [
      {
        kind: 'Strategy',
        title: 'Imperfect days are allowed',
        body: 'Skipping a day does not break any streak or get flagged as a failure. It is the opposite of what almost every app does, and that is exactly the point.',
      },
      {
        kind: 'UX',
        title: 'A maximum of three priorities a day',
        body: 'If you have fifteen things pending, the system forces you to choose. The limit is not an obstacle: it is the feature. The list cannot stretch.',
      },
      {
        kind: 'Tech',
        title: 'Language, before anything else',
        body: 'Saying "today was quiet" instead of "0% productivity." A small change of words that ends up defining the whole product.',
      },
    ],
    execution: [
      {
        title: 'The day view, with three slots',
        body: 'A fixed structure: three visible blocks, no more. The fourth task shows up in a separate section, the "later" one.',
      },
      {
        title: 'Habits without streaks that punish',
        body: 'Habits show up as a calm grid. A skipped day is not marked in red. What matters is how the month is going, not the perfect chain.',
      },
      {
        title: 'A summary of the week, in words',
        body: 'Every Sunday, a summary of the week in plain language. It tells you what happened, with no scores. It is more a journal than a report.',
      },
    ],
    outcomes: [
      { metric: 'Concept', label: 'Validated with 12 interviews' },
      { metric: '8', label: 'Screens designed' },
      { metric: 'iOS', label: 'Mobile design' },
      { metric: '2022', label: 'Personal project' },
    ],
    takeaways: [
      'Setting a limit can be a feature: forcing a choice of three priorities makes you pick the three that actually matter.',
      'The tone of the copy is a product decision, not a marketing one. It defines how the app feels more than the interface itself.',
      'Gamified streaks hook you at the start and tire you out at the end. Consistency that lasts comes from not punishing the day you slip.',
    ],
  },
]
