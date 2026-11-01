import { useState } from 'react'
import { ArrowRight, ChevronDown, ChevronUp, ExternalLink, X, CheckCircle, ShieldCheck, Sparkles, Globe } from 'lucide-react'
import { IMG } from '../data/site'
import { scrollToId } from '../hooks'
import { useLanguage } from '../context/LanguageContext'
import '../styles/OurWork.css'

const CLIENT_PROJECTS = [
  {
    id: 'precastmedia',
    client: 'Precast Media',
    brandTheme: 'brand-red',
    backdropColor: '#eae7e1',
    tags: ['DIGITAL MARKETING', 'PRECAST CONCRETE', '3D ANIMATION', 'BRANDING'],
    liveUrl: 'https://precast-digital-media.vercel.app/',
    headline: 'POURING CONCRETE IDEAS INTO HIGH-GROWTH BRANDS THAT WIN',
    headlineEs: 'CONVIRTIENDO IDEAS SÓLIDAS EN MARCAS LÍDERES DE CONCRETO PREFABRICADO',
    bullets: [
      'High-converting agency website & interactive precast product catalog',
      'Cinematic 3D steel mold animations & photoreal concrete texture rendering',
      'Targeted B2B email campaigns & single-sponsor precast industry newsletters',
      'Full-service corporate branding, stationery, spec sheets & sales collateral',
    ],
    bulletsEs: [
      'Sitio web de agencia de alta conversión y catálogo digital interactivo',
      'Animaciones 3D cinemáticas de moldes de acero y texturizado fotorrealista',
      'Campañas de email B2B segmentadas y boletines exclusivos del sector prefabricado',
      'Branding corporativo integral, hojas técnicas, papelería y material comercial',
    ],
    stats: [
      { label: 'Client Brand Growth', value: '4.6x' },
      { label: '3D Product Renders', value: '150+' },
      { label: 'B2B Newsletter Reach', value: '38k+' },
    ],
    tech: ['React / Vite', 'Three.js 3D', 'Tailwind CSS', 'Vercel Edge', 'HubSpot'],
    isRealScreenshot: true,
    laptopHeroTitle: 'Precast Media Agency',
    laptopHeroSub: 'A digital marketing agency that pours concrete ideas into brands that win.',
    laptopHeroBtn: 'Visit Precast Media',
    laptopHeroImg: IMG.precastMedia,
    phoneRealScreenshot: IMG.precastMobile,
    phoneCaption: 'Precast Media Mobile',
    laptopNavLinks: ['WORK', 'SERVICES', 'ANIMATION', 'NEWSLETTER', 'CONTACT'],
    laptopNavLoc: 'GLOBAL ▾',
    phoneTitle: 'PRECAST MEDIA',
    phoneSub: 'Concrete Ideas That Win',
    phoneItems: [],
  },
  {
    id: 'precastexchange',
    client: 'Precast Exchange',
    brandTheme: 'brand-navy',
    backdropColor: '#e8edf3',
    tags: ['B2B MARKETPLACE', 'ASTM / AASHTO / CSA', 'CAD & BIM HUB'],
    liveUrl: 'https://precastexchange.com/',
    headline: 'THE #1 DIGITAL MARKETPLACE & ENGINEERING HUB FOR PRECAST CONCRETE',
    headlineEs: 'EL MARKETPLACE Y ECOSISTEMA DIGITAL LÍDER EN CONCRETO PREFABRICADO',
    bullets: [
      'ASTM, AASHTO & CSA standards cross-reference lookup engine',
      'Instant CAD / DWG downloads & interactive BIM library integration',
      'Direct contractor RFQ bidding workspace & verified manufacturer storefronts',
      'PrecastGPT AI engineering assistant & automated Bill of Quantities (BOQ)',
    ],
    bulletsEs: [
      'Motor de consulta y cruce de normas técnicas ASTM, AASHTO y CSA',
      'Descarga instantánea de planos CAD / DWG y librería BIM interactiva',
      'Bandeja RFQ para licitaciones directas y vitrinas de fabricantes verificados',
      'Asistente inteligente PrecastGPT y cómputos métricos (BOQ) automatizados',
    ],
    stats: [
      { label: 'Engineers & Producers', value: '12,500+' },
      { label: 'CAD & Spec Downloads', value: '85k+' },
      { label: 'Technical Standards', value: '100% ASTM' },
    ],
    tech: ['Next.js / Laravel', 'Inertia.js', 'PrecastGPT AI', 'CAD / DWG Engine', 'Cloudflare'],
    isRealScreenshot: true,
    laptopHeroTitle: "USA's Precast Marketplace & Engineering Hub",
    laptopHeroSub: 'Producers, engineers and buyers trading precast products, molds and structural specifications.',
    laptopHeroBtn: 'Explore Catalog & CAD',
    laptopHeroImg: IMG.precastExchange,
    phoneRealScreenshot: IMG.precastExchangeMobile,
    phoneCaption: 'Precast Exchange Mobile',
    laptopNavLinks: ['PRODUCTS', 'STANDARDS', 'BIM / CAD', 'PRECASTGPT', 'RFQ INBOX'],
    laptopNavLoc: 'USA · ASTM / CSA',
    phoneTitle: 'PRECAST EXCHANGE',
    phoneSub: 'C478 / C913 · Live Inventory',
    phoneItems: [],
  },
  {
    id: 'wildwing',
    client: 'Wild Wing',
    brandTheme: 'brand-red',
    backdropColor: '#f2ebe3',
    tags: ['RESTAURANT', 'CORPORATE WEBSITE', 'ONLINE ORDERING'],
    headline: "A BOLD REDESIGN FOR CANADA'S FAVOURITE WING PLACE",
    headlineEs: "UN REDISEÑO AUDAZ PARA LA CADENA LÍDER DE RESTAURANTES",
    bullets: [
      'Mobi2Go online ordering integration',
      'Regionalized menus and specials',
      'Google Geo-detection and Maps API integration',
      'Resource and training section for franchisees',
    ],
    bulletsEs: [
      'Integración completa de pedidos online con Mobi2Go',
      'Menús regionalizados y ofertas geolocalizadas',
      'Geodetección de Google Maps API para sucursales',
      'Sección exclusiva de recursos y formación para franquiciados',
    ],
    stats: [
      { label: 'Online Order Growth', value: '+180%' },
      { label: 'Active Franchise Locations', value: '48+' },
      { label: 'Mobile Conversion Rate', value: '3.8x' },
    ],
    tech: ['React / Next.js', 'Mobi2Go API', 'Google Maps API', 'Tailwind CSS', 'AWS CloudFront'],
    laptopHeroTitle: 'Try Our Wild New Menu',
    laptopHeroSub: 'Dine in or take out. But always come back.',
    laptopHeroBtn: 'Scroll to menu',
    laptopHeroImg: IMG.modern,
    laptopNavLinks: ['MENU', 'LOCATIONS', 'SPECIALS', 'FRANCHISE', 'ABOUT'],
    laptopNavLoc: 'ONTARIO ▾',
    phoneTitle: 'WINGS 101™',
    phoneSub: 'Our award-winning chicken wings in 101 flavours',
    phoneItems: [
      { title: 'Garlic Parm Wings', subtitle: 'Best Seller · 1.5 lbs', img: IMG.seedlings },
      { title: 'Smoked Honey BBQ', subtitle: 'Chef Special · 2.0 lbs', img: IMG.sprout },
      { title: 'Dry Cajun Rub', subtitle: 'Crispy & Spicy', img: IMG.trimmer },
    ],
  },
  {
    id: 'greenline',
    client: 'Greenline Grounds & Estates',
    brandTheme: 'brand-forest',
    backdropColor: '#e9f1e8',
    tags: ['COMMERCIAL LAWNCARE', 'ESTATE WEBSITE', 'CLIENT PORTAL'],
    headline: 'A HIGH-CONVERTING DIGITAL PLATFORM FOR PREMIER ESTATE LAWNCARE',
    headlineEs: 'PLATAFORMA DIGITAL DE ALTA CONVERSIÓN PARA MANTENIMIENTO RESIDENCIAL DE ÉLITE',
    bullets: [
      'Interactive lawn measurement & instant pricing engine',
      'Automated recurring Stripe billing & dispatch sync',
      'Live GPS property boundary & satellite lot mapping',
      'VIP homeowner portal with seasonal service tracking',
    ],
    bulletsEs: [
      'Calculadora interactiva de yardas y cotización en tiempo real',
      'Facturación recurrente mensual con Stripe y sincronización de cuadrillas',
      'Mapeo satelital de linderos de propiedad con GPS',
      'Portal privado VIP para clientes con seguimiento de visitas de temporada',
    ],
    stats: [
      { label: 'Inbound Quote Volume', value: '3.2x' },
      { label: 'Monthly Retainer Growth', value: '+$420k' },
      { label: 'Client Retention Rate', value: '98.4%' },
    ],
    tech: ['Next.js', 'Stripe Billing API', 'Mapbox Satellite GIS', 'Twilio SMS', 'HubSpot CRM'],
    laptopHeroTitle: 'Estate Grounds & Turf Management',
    laptopHeroSub: 'Precision landscaping engineered for architectural residences.',
    laptopHeroBtn: 'Get Instant Estimate',
    laptopHeroImg: IMG.cover,
    laptopNavLinks: ['SERVICES', 'ESTATES', 'PACKAGES', 'CALCULATOR', 'PORTAL'],
    laptopNavLoc: 'NEW YORK ▾',
    phoneTitle: 'GREENLINE DISPATCH',
    phoneSub: 'Next Scheduled Visit: Tomorrow 08:30 AM',
    phoneItems: [
      { title: 'Highland Ridge Estate', subtitle: 'Aeration & Precision Edge', img: IMG.path },
      { title: 'Lakeside Manor Grounds', subtitle: 'Organic Fertilizer Spray', img: IMG.lush },
      { title: 'Oakridge Terrace Lawn', subtitle: 'Smart Irrigation Check', img: IMG.garden },
    ],
  },
  {
    id: 'clearview',
    client: 'Clearview Verandas & Hardscapes',
    brandTheme: 'brand-navy',
    backdropColor: '#e6eef5',
    tags: ['LUXURY HARDSCAPES', '3D CONFIGURATOR', 'LEAD ENGINE'],
    headline: 'INTERACTIVE 3D PATIO CONFIGURATOR & BESPOKE ARCHITECTURE',
    headlineEs: 'CONFIGURADOR 3D INTERACTIVO DE PATIOS Y ARQUITECTURA EXTERIOR',
    bullets: [
      'WebGL interactive 3D outdoor kitchen & pergola builder',
      'Virtual sunlight shadow simulation and seasonal render views',
      'Architectural specification sheets & CAD download vault',
      'Integrated CRM pipeline for high-ticket $50k+ contracts',
    ],
    bulletsEs: [
      'Visualizador 3D WebGL en tiempo real para pérgolas y cocinas exteriores',
      'Simulación virtual de sombras y asoleamiento en 4 estaciones',
      'Descarga directa de planos CAD y especificaciones arquitectónicas',
      'Embudo automatizado para contratos residenciales de alto valor ($50k+)',
    ],
    stats: [
      { label: 'Average Deal Size', value: '$68,500' },
      { label: 'Close Rate Improvement', value: '+215%' },
      { label: '3D Configurator Leads', value: '1,450+' },
    ],
    tech: ['Three.js / WebGL', 'React 18', 'Tailwind', 'Node.js', 'Salesforce Sync'],
    laptopHeroTitle: 'Sculpted Hardscape Sanctuaries',
    laptopHeroSub: 'Bioclimatic verandas, architectural stone and outdoor living environments.',
    laptopHeroBtn: 'Launch 3D Builder',
    laptopHeroImg: IMG.glass,
    laptopNavLinks: ['PERGOLAS', 'PATIOS', 'OUTDOOR KITCHENS', '3D BUILDER', 'GALLERY'],
    laptopNavLoc: 'TEXAS ▾',
    phoneTitle: 'CLEARVIEW 3D',
    phoneSub: 'Custom Veranda Specification V-400',
    phoneItems: [
      { title: 'Monolithic Bluestone Pavers', subtitle: '4,200 sq ft Specified', img: IMG.poolModern },
      { title: 'Louvered Corten Pergola', subtitle: 'Motorized Bioclimatic Roof', img: IMG.pool },
      { title: 'Integrated Linear Fire Pit', subtitle: 'Natural Gas 120k BTU', img: IMG.modern },
    ],
  },
  {
    id: 'northfield',
    client: 'Northfield Snow & Ice Operations',
    brandTheme: 'brand-navy',
    backdropColor: '#e7ecf0',
    tags: ['WINTER FLEET', 'ENTERPRISE CONTRACTS', 'SLA PORTAL'],
    headline: 'ZERO-TOLERANCE ICE MANAGEMENT & REAL-TIME FLEET TELEMETRY',
    headlineEs: 'GESTIÓN DE NIEVE CON CERO TOLERANCIA Y TELEMETRÍA DE FLOTA EN TIEMPO REAL',
    bullets: [
      'Automated NOAA weather radar alerts & storm mobilization dispatch',
      'Live GPS truck route tracking with timestamped salting logs',
      'Commercial property manager slip-and-fall liability defense portal',
      'Multi-facility corporate contract bidding engine',
    ],
    bulletsEs: [
      'Alertas automáticas por radar meteorológico NOAA y aviso de salida de flota',
      'Seguimiento GPS en vivo con registro certificado de esparcido de sal',
      'Portal de protección legal contra caídas y resbalones para gerentes de fincas',
      'Motor de cotización consolidada para carteras corporativas multi-sede',
    ],
    stats: [
      { label: 'Zero-Slip SLA Met', value: '100%' },
      { label: 'Fleet Response Time', value: '< 25 min' },
      { label: 'Corporate Facilities', value: '74 Sites' },
    ],
    tech: ['IoT GPS Telemetry', 'NOAA Weather API', 'Next.js', 'PostgreSQL', 'Digital Signatures'],
    laptopHeroTitle: 'Commercial Winter Fleet Operations',
    laptopHeroSub: 'Uninterrupted corporate facility access through heavy blizzards and ice storms.',
    laptopHeroBtn: 'Enter Client Dispatch',
    laptopHeroImg: IMG.snow,
    laptopNavLinks: ['RADAR DISPATCH', 'FLEET LOGS', 'LIABILITY PORTAL', 'FACILITIES', 'RATES'],
    laptopNavLoc: 'MIDWEST ▾',
    phoneTitle: 'FLEET TELEMETRY',
    phoneSub: 'Storm Operation Bravo · Salt Level: 92%',
    phoneItems: [
      { title: 'Plow Unit #14', subtitle: 'Route: Logistics Hub North', img: IMG.snow },
      { title: 'De-Icing Crew #03', subtitle: 'Target: Corporate HQ Plaza', img: IMG.crew },
      { title: 'Front Loader #08', subtitle: 'Clearing Loading Dock Bay', img: IMG.modern },
    ],
  },
  {
    id: 'highoak',
    client: 'High Oak Arboriculture & Surgery',
    brandTheme: 'brand-emerald',
    backdropColor: '#e9f3ec',
    tags: ['TREE SURGERY', 'EMERGENCY DISPATCH', '4K MEDIA'],
    headline: 'RAPID EMERGENCY STORM RESPONSE & HIGH-IMPACT AERIAL SHOWCASE',
    headlineEs: 'RESPUESTA RÁPIDA A EMERGENCIAS Y PORTAFOLIO AÉREO EN RESOLUCIÓN 4K',
    bullets: [
      '24/7 priority emergency storm damage booking hotline with instant SMS',
      '4K drone canopy footage gallery & cinematic heavy crane reels',
      'Certified ISA arborist tree risk assessment questionnaire',
      'Municipal permits and utility line clearance documentation vault',
    ],
    bulletsEs: [
      'Línea de emergencia 24/7 con SMS automático para caída de ramas sobre tejados',
      'Galería de video en dron 4K y reels de izado con grúas de gran tonelaje',
      'Formulario digital de evaluación de riesgo fitosanitario certificado por la ISA',
      'Bóveda digital de permisos municipales y cortes de seguridad eléctrica',
    ],
    stats: [
      { label: 'Emergency Arrival', value: '45 mins' },
      { label: 'Online Storm Bookings', value: '620+' },
      { label: 'Customer Satisfaction', value: '4.98 ★' },
    ],
    tech: ['React / Vite', 'Twilio Instant SMS', 'Vimeo Video Pro', 'Cloudinary 4K CDN', 'Stripe'],
    laptopHeroTitle: 'Veterans of Canopy & Heavy Timber Care',
    laptopHeroSub: 'Precision crane removals, tree preservation and storm restoration.',
    laptopHeroBtn: '24/7 Emergency Dispatch',
    laptopHeroImg: IMG.canopy,
    laptopNavLinks: ['CRANE REMOVALS', 'CANOPY PRUNING', 'RISK AUDIT', 'EMERGENCY 24/7', 'REVIEWS'],
    laptopNavLoc: 'COLORADO ▾',
    phoneTitle: 'ARBORIST DISPATCH',
    phoneSub: 'Certified Climbers On Call 24/7',
    phoneItems: [
      { title: '120ft Pine Crane Lift', subtitle: 'Hazard Elimination Complete', img: IMG.forest },
      { title: 'Oak Canopy Crown Thinning', subtitle: 'Light Penetration +40%', img: IMG.canopy },
      { title: 'Root Flare Excavation', subtitle: 'Air Spade Decompaction', img: IMG.hands },
    ],
  },
  {
    id: 'rootsprout',
    client: 'Root & Sprout Botanical Nurseries',
    brandTheme: 'brand-amber',
    backdropColor: '#f4ede2',
    tags: ['NATIVE NURSERY', 'E-COMMERCE CATALOG', 'WHOLESALE B2B'],
    headline: 'WHOLESALE PLANT NURSERY & DROUGHT-TOLERANT SPECIMEN CATALOG',
    headlineEs: 'CATÁLOGO DIGITAL MAYORISTA DE VIVERO Y ESPECIES AUTÓCTONAS RESISTENTES',
    bullets: [
      'Real-time greenhouse inventory sync & wholesale contractor tiers',
      'USDA climate hardiness zone filter with native companion plant suggestions',
      'Contractor bulk order CSV upload & scheduled nursery freight booking',
      'Plant passport QR code generator with botanical care datasheets',
    ],
    bulletsEs: [
      'Sincronización en vivo del stock de invernadero con tarifas mayoristas por tramos',
      'Buscador por zona climática USDA y sugerencia de especies polinizadoras compañeras',
      'Carga masiva de listas en Excel/CSV y reserva programada de transporte',
      'Generador de pasaportes fitosanitarios y códigos QR de cuidados botánicos',
    ],
    stats: [
      { label: 'Wholesale B2B Orders', value: '+340%' },
      { label: 'Catalog SKU Count', value: '2,800+' },
      { label: 'Freight Order Value', value: '$8,200 avg' },
    ],
    tech: ['Shopify Plus / Headless', 'Algolia Search', 'ERP Inventory Bridge', 'Next.js', 'Stripe'],
    laptopHeroTitle: 'Specimen Trees & Native Perennials',
    laptopHeroSub: 'Cultivated for commercial landscape architects and estate developers.',
    laptopHeroBtn: 'Explore B2B Catalog',
    laptopHeroImg: IMG.greenhouse,
    laptopNavLinks: ['NATIVE TREES', 'ORNAMENTAL SHRUBS', 'GRASSES', 'WHOLESALE CSV', 'DELIVERY'],
    laptopNavLoc: 'CALIFORNIA ▾',
    phoneTitle: 'NURSERY CART (B2B)',
    phoneSub: 'Scheduled Delivery: Flatbed Truck #02',
    phoneItems: [
      { title: 'Acer Palmatum (Japanese Maple)', subtitle: '35 Gallon Root Ball · Qty 12', img: IMG.seedlings },
      { title: 'Calamagrostis Feather Reed', subtitle: '5 Gallon Containers · Qty 150', img: IMG.micro },
      { title: 'Buxus Sempervirens Boxwood', subtitle: 'Topiary Sphere 24in · Qty 40', img: IMG.greenhouse },
    ],
  },
]

export default function OurWork() {
  const { lang } = useLanguage()
  const isEs = lang === 'es'

  // Default shows 2 projects as requested, user clicks the button to unveil additional transformations
  const [visibleCount, setVisibleCount] = useState(2)
  const [selectedProject, setSelectedProject] = useState(null)

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 2, CLIENT_PROJECTS.length))
  }

  const handleShowLess = () => {
    setVisibleCount(2)
    scrollToId('our-work')
  }

  const displayedProjects = CLIENT_PROJECTS.slice(0, visibleCount)
  const hasMore = visibleCount < CLIENT_PROJECTS.length

  return (
    <section className="ourwork-section" id="our-work">
      <div className="wrap">
        {/* Section Header */}
        <div className="ourwork-section__head" data-reveal>
          <div className="ourwork-section__intro">
            <span className="ourwork-section__eyebrow">
              {isEs ? 'Nuestros Trabajos · Casos Reales' : 'Our Work · Client Case Studies'}
            </span>
            <h2 className="ourwork-section__title">
              {isEs ? (
                <>
                  Sitios web y plataformas <br />
                  <span className="serif">que hacen sonar el teléfono.</span>
                </>
              ) : (
                <>
                  Engineered for high conversion. <br />
                  <span className="serif">Crafted to lead the market.</span>
                </>
              )}
            </h2>
            <p className="ourwork-section__lead">
              {isEs
                ? 'Conoce los proyectos reales que hemos desarrollado para empresas del sector: diseño a medida, integración de reservas, cotizadores en vivo y maquetas adaptables en dos columnas.'
                : 'Explore our latest multi-device client case studies: bespoke web applications, automated quote engines, and high-impact digital experiences designed to scale landscape and outdoor brands.'}
            </p>
          </div>

          <div className="ourwork-section__count-pill">
            <Sparkles size={14} className="text-leaf" />
            <span>
              {isEs ? 'Casos de Éxito Destacados' : 'Curated Client Transformations'}
            </span>
          </div>
        </div>

        {/* 2-Column Client Cards List */}
        <div className="ourwork-list">
          {displayedProjects.map((project, idx) => {
            const headline = isEs && project.headlineEs ? project.headlineEs : project.headline
            const bullets = isEs && project.bulletsEs ? project.bulletsEs : project.bullets

            return (
              <article
                key={project.id}
                className="ow-card"
                style={{
                  '--card-backdrop': project.backdropColor,
                  animationDelay: `${(idx % 2) * 0.1}s`,
                }}
                data-reveal
              >
                {/* Left Column: Branding, Title, Bullets & Button */}
                <div className="ow-card__left">
                  <div className="ow-card__top-bar">
                    <span className={`ow-card__logo-badge ${project.brandTheme}`}>
                      {project.client}
                    </span>
                    <div className="ow-card__tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="ow-card__tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className="ow-card__headline">{headline}</h3>

                  <ul className="ow-card__bullets">
                    {bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="ow-card__bullet">
                        <span className="ow-card__dot" aria-hidden="true" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="ow-card__action-row">
                    <button
                      type="button"
                      className="ow-card__btn"
                      onClick={() => setSelectedProject(project)}
                    >
                      <span>{isEs ? 'Ver Proyecto' : 'View Project'}</span>
                      <ArrowRight size={16} className="ow-card__btn-arrow" />
                    </button>

                    <span className="ow-card__metric-hint">
                      {project.stats[0].value} {project.stats[0].label}
                    </span>
                  </div>
                </div>

                {/* Right Column: Two-Screen Laptop + Smartphone Mockup with tinted background */}
                <div className="ow-card__right">
                  <div className="ow-devices-wrap">
                    {/* Laptop Mockup */}
                    <div className="ow-laptop">
                      <div className="ow-laptop__lid">
                        <span className="ow-laptop__camera" />
                        <div className="ow-laptop__screen">
                          {/* Simulated Browser Top Bar */}
                          <div className="ow-laptop__nav">
                            <span className="ow-laptop__nav-brand">
                              <b>{project.client.toUpperCase()}</b>
                              <span className="ow-laptop__nav-loc">{project.laptopNavLoc || 'ONLINE ▾'}</span>
                            </span>
                            <div className="ow-laptop__nav-links">
                              {project.laptopNavLinks.slice(0, 4).map((link) => (
                                <span key={link}>{link}</span>
                              ))}
                              <span>ENG ▾</span>
                            </div>
                          </div>

                          {/* Laptop Hero Visual */}
                          <div className="ow-laptop__hero-area">
                            <img
                              src={project.laptopHeroImg}
                              alt={project.client}
                              className="ow-laptop__hero-img"
                              style={project.isRealScreenshot ? { objectPosition: 'top center' } : {}}
                              loading="lazy"
                            />
                            {!project.isRealScreenshot && (
                              <div className="ow-laptop__hero-overlay">
                                <h4 className="ow-laptop__hero-title">{project.laptopHeroTitle}</h4>
                                <p className="ow-laptop__hero-sub">{project.laptopHeroSub}</p>
                                <span className="ow-laptop__hero-btn">{project.laptopHeroBtn}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="ow-laptop__base">
                        <div className="ow-laptop__notch" />
                      </div>
                    </div>

                    {/* Smartphone Mockup (Overlapping right edge of laptop) */}
                    <div className="ow-phone">
                      <span className="ow-phone__island" />
                      <div className="ow-phone__screen">
                        {project.phoneRealScreenshot ? (
                          <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
                            <img
                              src={project.phoneRealScreenshot}
                              alt={`${project.client} Mobile`}
                              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                              loading="lazy"
                            />
                            <div
                              style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                padding: '6px 8px',
                                background: 'linear-gradient(180deg, transparent 0%, rgba(10, 16, 12, 0.95) 100%)',
                                fontSize: '8px',
                                fontWeight: 700,
                                color: '#fff',
                                textAlign: 'center',
                              }}
                            >
                              {project.phoneCaption || project.client}
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="ow-phone__nav">
                              <span>{project.client.toUpperCase()}</span>
                              <span>☰</span>
                            </div>
                            <div className="ow-phone__content">
                              <h5 className="ow-phone__title">{project.phoneTitle}</h5>
                              <p className="ow-phone__sub">{project.phoneSub}</p>
                              <div className="ow-phone__cards">
                                {project.phoneItems.map((item, pIdx) => (
                                  <div key={pIdx} className="ow-phone__card-item">
                                    <img src={item.img} alt={item.title} loading="lazy" />
                                    <div className="ow-phone__card-info">
                                      <b>{item.title}</b>
                                      <span>{item.subtitle}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* Load More Button & Footer Controls with "Hatke" (Unique) labels & no remaining count */}
        <div className="ourwork-footer" data-reveal>
          {hasMore ? (
            <button
              type="button"
              className="ow-load-more-btn"
              onClick={handleLoadMore}
              id="ourwork-load-more"
            >
              <span>
                {isEs ? 'Descubrir Más Casos de Éxito' : 'Unveil More Transformations'}
              </span>
              <ChevronDown size={18} />
            </button>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
              <button
                type="button"
                className="ow-load-more-btn"
                style={{ background: 'var(--forest, #234b34)' }}
                onClick={handleShowLess}
              >
                <span>{isEs ? 'Volver al Inicio del Portafolio' : 'Show Initial Showcase'}</span>
                <ChevronUp size={18} />
              </button>
              <span className="ow-status-text">
                <CheckCircle size={14} style={{ display: 'inline', marginRight: 6 }} />
                {isEs
                  ? 'Mostrando la selección completa de transformaciones digitales'
                  : 'Displaying our complete roster of verified digital transformations'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="ow-modal-backdrop"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="ow-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="ow-modal__close"
              onClick={() => setSelectedProject(null)}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <span className={`ow-card__logo-badge ${selectedProject.brandTheme}`}>
                {selectedProject.client}
              </span>
              {selectedProject.subBrand && (
                <span style={{ fontSize: 13, color: 'var(--moss, #2e5e3e)', fontWeight: 600 }}>
                  ({selectedProject.subBrand})
                </span>
              )}
            </div>

            <h3
              style={{
                fontFamily: 'var(--display, serif)',
                fontSize: 'clamp(22px, 3vw, 32px)',
                margin: '12px 0 6px 0',
                color: 'var(--ink, #1b3d2b)',
              }}
            >
              {isEs && selectedProject.headlineEs
                ? selectedProject.headlineEs
                : selectedProject.headline}
            </h3>

            {/* External Links if available */}
            {(selectedProject.liveUrl || selectedProject.agencyUrl) && (
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', margin: '14px 0 8px' }}>
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="ow-card__tag"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '6px 12px',
                      background: 'rgba(46, 94, 62, 0.08)',
                      borderRadius: 6,
                      color: 'var(--forest, #234b34)',
                      fontWeight: 700,
                      textDecoration: 'none',
                    }}
                  >
                    <Globe size={13} />
                    <span>Live Platform: {selectedProject.liveUrl.replace('https://', '').replace('/', '')}</span>
                    <ExternalLink size={12} />
                  </a>
                )}
                {selectedProject.agencyUrl && (
                  <a
                    href={selectedProject.agencyUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="ow-card__tag"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '6px 12px',
                      background: 'rgba(235, 115, 30, 0.1)',
                      borderRadius: 6,
                      color: '#b45309',
                      fontWeight: 700,
                      textDecoration: 'none',
                    }}
                  >
                    <Globe size={13} />
                    <span>Agency Website: {selectedProject.agencyUrl.replace('https://', '').replace('/', '')}</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            )}

            {/* Impact / Results Metrics */}
            <div className="ow-modal__stats">
              {selectedProject.stats.map((s, idx) => (
                <div key={idx} className="ow-modal__stat-item">
                  <b>{s.value}</b>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>

            {/* Bullets & Features */}
            <h4
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: 'var(--forest, #234b34)',
                marginBottom: 12,
              }}
            >
              {isEs ? 'Funcionalidades e integraciones clave:' : 'Key Integrations & Features:'}
            </h4>
            <ul className="ow-card__bullets" style={{ marginBottom: 24 }}>
              {(isEs && selectedProject.bulletsEs
                ? selectedProject.bulletsEs
                : selectedProject.bullets
              ).map((bullet, idx) => (
                <li key={idx} className="ow-card__bullet">
                  <span className="ow-card__dot" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Tech Stack */}
            <h4
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: 'var(--muted, #24432f)',
                marginBottom: 8,
              }}
            >
              {isEs ? 'Tecnologías utilizadas:' : 'Technology Stack:'}
            </h4>
            <div className="ow-modal__tech-tags">
              {selectedProject.tech.map((t) => (
                <span key={t} className="ow-modal__tech-tag">
                  {t}
                </span>
              ))}
            </div>

            {/* CTA action */}
            <div
              style={{
                marginTop: 32,
                display: 'flex',
                gap: 14,
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              <button
                type="button"
                className="ow-card__btn"
                style={{ background: 'var(--ink, #1b3d2b)', color: '#fff' }}
                onClick={() => {
                  setSelectedProject(null)
                  scrollToId('book')
                }}
              >
                <span>{isEs ? 'Solicitar Proyecto Similar' : 'Request A Project Like This'}</span>
                <ArrowRight size={16} />
              </button>
              <button
                type="button"
                className="ow-card__btn"
                onClick={() => setSelectedProject(null)}
              >
                <span>{isEs ? 'Cerrar' : 'Close'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
