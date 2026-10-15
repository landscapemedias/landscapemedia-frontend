const u = (id, w = 1400) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const BRAND = {
  name: 'ABC',
  word: 'Landscape',
  line: 'Tree care & landscape management',
  tagline: 'Healthy trees. Beautiful properties.',
  email: 'nick@aptreescorp.com',
  phone: '+1 (631) 943-2157',
  phoneHref: 'tel:+16319432157',
  address: '133 New York Ave, Huntington, NY 11743',
  city: 'Huntington, New York',
  hours: 'Mon to Fri, 8:00 AM to 6:00 PM EST',
  years: 46,
}

export const IMG = {
  hero: u('1600585154340-be6161a56a0c', 1800),
  path: u('1585320806297-9794b3e4eeae'),
  lake: u('1602941525421-8f8b81d3edbb'),
  crew: u('1605117882932-f9e32b03fea9'),
  lush: u('1598902108854-10e335adac99'),
  pool: u('1564013799919-ab600027ffc6'),
  poolModern: u('1613490493576-7fde63acd811'),
  modern: u('1600566753190-17f0baa2a6c3'),
  hands: u('1622383563227-04401ab4e5ea', 1000),
  seedlings: u('1530836369250-ef72a3f5cda8', 1000),
  forest: u('1441974231531-c6227db76b6e'),
  hills: u('1470071459604-3b5ec3a7fe05'),
  flowers: u('1558293842-c0fd3db86157'),
  garden: u('1591857177580-dc82b9ac4e1e'),
  bonsai: u('1512428813834-c702c7702b78', 1000),
  sprout: u('1457530378978-8bac673b8062', 1000),
  cabin: u('1595521624992-48a59aef95e3'),
}

export const NAV = [
  { id: 'services', label: 'Services' },
  { id: 'industries', label: 'Industries' },
  { id: 'projects', label: 'Projects' },
  { id: 'app', label: 'Client app' },
  { id: 'estimate', label: 'Estimate' },
  { id: 'book', label: 'Book' },
]

export const MARQUEE = [
  'Landscape maintenance',
  'Certified tree care',
  'Commercial grounds',
  'Storm & emergency response',
  'Irrigation management',
  'Plant health & soil',
  'Lawn care & aeration',
  'Seasonal cleanups',
  'Shrub & bed care',
  'Stump grinding',
]

export const HERO_TOASTS = [
  { title: 'Crew arriving at 8:30 AM', sub: 'Weekly maintenance · Huntington', value: 'On time' },
  { title: 'Arborist report ready', sub: 'White oak health evaluation', value: 'View' },
  { title: 'Storm crew dispatched', sub: 'Downed limb · driveway access', value: '24/7' },
  { title: 'New 5 star review', sub: '“They left the yard spotless”', value: '★★★★★' },
]

export const SERVICES = [
  { n: '01', name: 'Landscape Maintenance', tag: 'Year-round service', latin: 'Cura perpetua', season: 'Year-round', freq: 'Weekly', team: 'Grounds crew', items: ['Precision mowing, edging & weed prevention', 'Planting bed care, mulch & soil', 'Shrub pruning & seasonal color', 'Spring cleanups & autumn leaf clearing'] },
  { n: '02', name: 'Professional Tree Care', tag: 'Certified arborists', latin: 'Arbor sana', season: 'All seasons', freq: 'As needed', team: 'ISA arborists', items: ['Crown thinning & deadwood removal', 'Root flare decompaction & feeding', 'Safe removal, rigging & stump grinding', 'Health & storm risk evaluations'] },
  { n: '03', name: 'Commercial Grounds', tag: 'Commercial clients', latin: 'Campus viridis', season: 'Year-round', freq: 'Scheduled', team: 'District manager', items: ['Single point of contact', 'Walkway clearance & sightline safety', 'Irrigation audits & water efficiency', 'Transparent schedule reporting'] },
  { n: '04', name: 'Storm & Emergency Response', tag: '24/7 response', latin: 'Tempestas cito', season: 'Storm season', freq: 'On call 24/7', team: 'Rapid crew', items: ['Downed tree & hanging limb clearance', 'Pre-storm hazard assessments', 'Chippers, grapple loaders & cranes', 'Priority dispatch for clients'] },
  { n: '05', name: 'Lawn Care & Aeration', tag: 'Healthy turf', latin: 'Gramen densum', season: 'Spring & fall', freq: 'Seasonal', team: 'Turf specialists', items: ['Core aeration', 'Overseeding', 'Seasonal nourishment', 'Sustainable weed control'] },
  { n: '06', name: 'Shrub & Garden Bed Care', tag: 'Crisp borders', latin: 'Frutex pulcher', season: 'Growing season', freq: 'Monthly', team: 'Garden crew', items: ['Artful pruning & shearing', 'Organic bark mulch', 'Root protection', 'Crisp border edges'] },
  { n: '07', name: 'Tree Health & Nutrition', tag: 'Plant health care', latin: 'Radix fortis', season: 'Spring to fall', freq: 'Program based', team: 'Plant health team', items: ['Deep-root soil feeding', 'Pest diagnostics', 'Disease management', 'Species specific programs'] },
  { n: '08', name: 'Seasonal Property Cleanup', tag: 'Spotless finish', latin: 'Mundus hortus', season: 'Spring & fall', freq: 'Twice a year', team: 'Cleanup crew', items: ['Spring garden wake-up', 'Leaf clearing', 'Perennial cutbacks', 'Complete debris removal'] },
]

export const SEASONS = [
  {
    key: 'spring', name: 'Spring', months: 'Mar to May', title: 'Wake the garden up.',
    lead: 'We clear winter debris, feed the soil and prepare every bed, lawn and tree for a strong growing season.',
    plays: [
      { k: 'Spring cleanup', v: 'Leaf and debris removal, perennial cutbacks and fresh bed edges.' },
      { k: 'Lawn aeration', v: 'Core aeration and overseeding for thick, resilient turf.' },
      { k: 'Mulch & planting', v: 'Clean organic mulch and seasonal color rotation.' },
    ],
    metric: { n: 3, unit: 'wks', label: 'typical spring program from first visit to finish' },
    sky: ['#cfe9d6', '#f3efe3'], leaf: ['#9ad66a', '#c9f08a', '#f6b8c9'],
  },
  {
    key: 'summer', name: 'Summer', months: 'Jun to Aug', title: 'Keep it green in the heat.',
    lead: 'Weekly crews, smart irrigation and careful pruning keep properties healthy and sharp through the hottest months.',
    plays: [
      { k: 'Weekly maintenance', v: 'Mowing at the right height, edging and weed prevention.' },
      { k: 'Irrigation audits', v: 'Smart meters and water efficiency checks across every zone.' },
      { k: 'Shrub shaping', v: 'Pruning that keeps sightlines clear and plants healthy.' },
    ],
    metric: { n: 52, unit: 'visits', label: 'scheduled maintenance visits a year on weekly plans' },
    sky: ['#bfe3f5', '#fff7d6'], leaf: ['#2f7d3c', '#4f8a4b', '#76b852'],
  },
  {
    key: 'fall', name: 'Fall', months: 'Sep to Nov', title: 'Prepare for the cold.',
    lead: 'Leaf clearing, root feeding and hazard checks protect your trees and lawn before winter weather arrives.',
    plays: [
      { k: 'Leaf clearing', v: 'Full property leaf removal on a reliable schedule.' },
      { k: 'Deep-root feeding', v: 'Nutrients that help trees store energy for winter.' },
      { k: 'Pre-storm assessments', v: 'Canopy hazard checks and limb stabilization.' },
    ],
    metric: { n: 150, unit: 'yrs', label: 'age of the heritage oak we preserved with crown cabling' },
    sky: ['#f6d7b0', '#f3efe3'], leaf: ['#d9822b', '#c4532b', '#f4c35a'],
  },
  {
    key: 'winter', name: 'Winter', months: 'Dec to Feb', title: 'Prune, protect, respond.',
    lead: 'Dormant season pruning, storm response and planning for next year keep your property safe all winter.',
    plays: [
      { k: 'Dormant pruning', v: 'The best time for structural pruning on most species.' },
      { k: '24/7 storm response', v: 'Rapid clearance when high winds bring trees down.' },
      { k: 'Next season plan', v: 'A clear care plan and budget for the year ahead.' },
    ],
    metric: { n: 24, unit: '/7', label: 'emergency response for existing property clients' },
    sky: ['#dfe7ee', '#f7f9fb'], leaf: ['#ffffff', '#e8f0f5', '#cfdde6'],
  },
]

export const INDUSTRIES = [
  { k: 'Residential homes', short: 'Residential', img: IMG.pool, lead: 'Your home deserves a landscape that is safe, healthy and beautiful year-round. Our residential teams bring certified expertise and personal attention to every property.', points: ['Certified arborists', 'Year-round programs', 'Family-safe methods', 'Dedicated support'], stat: ['Family-safe', 'Methods on every visit'] },
  { k: 'Corporate HQ & office parks', short: 'Corporate', img: IMG.modern, lead: 'Immaculate corporate business parks designed to enhance brand prestige and welcome visitors safely.', points: ['Dedicated local district manager', 'Electronic photo audit reports', '24/7 priority emergency dispatch', 'COI & safety compliance'], stat: ['45 acres', 'Largest campus we manage'] },
  { k: 'HOA communities & associations', short: 'HOA', img: IMG.lake, lead: 'Master landscape maintenance and safety management for residential communities, clubhouses and tree-lined boulevards.', points: ['Board-ready reporting', 'Common area maintenance', 'Boulevard tree care', 'Resident-friendly scheduling'], stat: ['350 lots', 'In one planned community'] },
  { k: 'Retail centers & plazas', short: 'Retail', img: IMG.path, lead: 'Clean, safe and welcoming grounds that bring customers in and keep tenants happy.', points: ['Curb appeal programs', 'Parking lot island care', 'Sightline safety', 'After-hours service'], stat: ['After-hours', 'Zero shopper disruption'] },
  { k: 'Hospitality, resorts & clubs', short: 'Hospitality', img: IMG.poolModern, lead: 'Resort-quality grounds that guests remember, maintained quietly around your events and peak seasons.', points: ['Seasonal color displays', 'Event-ready grounds', 'Quiet commercial equipment', 'Pool and patio surrounds'], stat: ['Event-ready', 'Every weekend'] },
  { k: 'Healthcare & education campuses', short: 'Campuses', img: IMG.garden, lead: 'Safe, accessible and calming outdoor spaces for patients, students and staff.', points: ['Walkway clearance', 'Accessible routes', 'Compliance documentation', 'Scheduled around operations'], stat: ['Compliance', 'Documents in 24 hours'] },
]

export const WHY = [
  { t: 'Experienced professionals', k: 'Certified arborists', d: 'People who understand trees, landscapes and the properties they care for. Our field leaders hold credentials in arboriculture and horticulture.' },
  { t: 'Safety comes first', k: 'Zero-incident goal', d: 'Daily safety briefings, strict PPE and modern crane rigging protocols protect your property and our people on every site.' },
  { t: 'Local service', k: 'Regional knowledge', d: 'Deep familiarity with local soil profiles, regional climate patterns and native tree species across Long Island and New York.' },
  { t: 'Long-term care', k: 'Sustainable health', d: 'Proactive care that protects your property value and tree canopy health for decades to come.' },
]

export const PROJECTS = [
  { k: 'Commercial property maintenance', t: 'Corporate campus landscape & canopy revitalization', d: 'A 45-acre multi-facility campus needing complete turf rejuvenation, perimeter shade tree safety pruning and zero disruption to workday operations.', img: IMG.modern, stat: '45 acres' },
  { k: 'Mature tree care', t: 'Century-old heritage white oak canopy preservation', d: 'Health evaluation, micro-nutrient feeding and non-invasive crown cabling for a 150-year-old landmark specimen tree.', img: IMG.forest, stat: '150 years' },
  { k: 'Community landscape', t: 'Planned residential community grounds & parkways', d: 'Master landscape maintenance and safety management across 350 residential lots, two clubhouses and tree-lined boulevards.', img: IMG.lake, stat: '350 lots' },
  { k: 'Storm recovery & cleanup', t: 'Rapid post-storm clearing & hazardous tree removal', d: 'Immediate 24-hour response after 70 mph winds brought down mature limbs across main parking access corridors.', img: IMG.hills, stat: '24 hours' },
]

export const PROCESS = [
  { n: '01', t: 'Tell us about your property', s: 'Request', d: 'Call, book online or use the client app. Tell us what you need, from a single tree to full grounds management.' },
  { n: '02', t: 'In-person site visit', s: 'Assess', d: 'A local specialist walks the property, checks tree health and talks through your goals and schedule.' },
  { n: '03', t: 'Clear care plan & quote', s: 'Plan', d: 'A written plan with scope, timing and price. No surprises and no pressure.' },
  { n: '04', t: 'Certified crews get to work', s: 'Care', d: 'Insured, trained teams with modern equipment, lawn protection and complete site cleanup.' },
  { n: '05', t: 'Ongoing care & reports', s: 'Grow', d: 'Photo reports after every visit and a dedicated supervisor who knows your grounds.' },
]

export const FAQ = [
  { q: 'Which areas do you serve?', a: 'We serve residential estates and commercial properties across Long Island and the greater New York region, with dedicated local district teams.' },
  { q: 'Are your crews certified and insured?', a: 'Yes. Our work follows ISA standards (ANSI A300) and OSHA 1910.269, and we carry full liability coverage. Insurance documents are provided within 24 hours.' },
  { q: 'Do you offer emergency storm response?', a: 'Yes. Our storm crews respond 24/7, with priority scheduling for existing property clients.' },
  { q: 'How do I get a quote?', a: 'Book a free site visit below or call us. A specialist visits the property and you receive a clear written plan and price.' },
  { q: 'Do you work with HOAs and commercial properties?', a: 'Yes. We manage office parks, HOAs, retail centers, hospitality, healthcare, education, industrial and municipal properties.' },
  { q: 'Will you protect my lawn and driveway?', a: 'Always. Lawn and driveway protection and a complete site cleanup are included on every job.' },
]

export const ESTIMATE_SERVICES = [
  { k: 'mow', label: 'Lawn maintenance', rate: 95 },
  { k: 'beds', label: 'Bed & shrub care', rate: 60 },
  { k: 'tree', label: 'Tree health program', rate: 70 },
  { k: 'irr', label: 'Irrigation management', rate: 35 },
  { k: 'clean', label: 'Seasonal cleanups', rate: 40 },
]
