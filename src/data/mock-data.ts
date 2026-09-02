export interface Artwork {
  id: string;
  slug: string;
  title: string;
  type: "ORIGINAL" | "PRINT";
  medium: string;
  dimensions: string;
  price: number;
  status: "available" | "sold" | "edition_available";
  year: number;
  image: string;
  description: string;
  shortDescription: string;
  galleryImages: string[];
  editionInfo?: string;
  featured?: boolean;
}

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  category: "coding" | "webdev" | "graphic-design" | "fine-art";
  categoryLabel: string;
  summary: string;
  description: string;
  client?: string;
  year: number;
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  metrics?: { label: string; value: string }[];
  deliverables?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  comment: string;
  rating: number;
  avatarText: string;
  project: string;
}

export const ARTWORKS: Artwork[] = [
  {
    id: "art-1",
    slug: "cosmic-weaver",
    title: "Cosmic Weaver",
    type: "ORIGINAL",
    medium: "Oil, 24K Liquid Gold Leaf, & Embedded Fiber Optics on Linen",
    dimensions: "48\" × 36\" (122 × 91 cm)",
    price: 3800,
    status: "available",
    year: 2024,
    image: "/images/hero-art.jpg",
    shortDescription: "A fusion of classical renaissance drape studies with glowing luminescent circuitry and hand-applied 24k gold leaf.",
    description: "Cosmic Weaver explores the intersection of sacred geometry, classical devotional iconography, and the fiber-optic neural fabrics of our digital future. Layers of heavy oil glaze meet genuine 24-karat gold leaf that refracts dynamic gallery lighting throughout the day.",
    galleryImages: ["/images/hero-art.jpg"],
    featured: true,
  },
  {
    id: "art-2",
    slug: "ephemeral-resonance",
    title: "Ephemeral Resonance",
    type: "ORIGINAL",
    medium: "Impasto Oil, Crushed Quartz & Liquid Copper on Canvas",
    dimensions: "40\" × 40\" (101 × 101 cm)",
    price: 4200,
    status: "sold",
    year: 2024,
    image: "/images/art-ephemeral.jpg",
    shortDescription: "Textured impasto vortex featuring crystalline raw quartz formations bathed in metallic copper and emerald hues.",
    description: "An evocative study in geological time versus fleeting organic light. Commissioned for private collector in Zurich, featuring raw Brazilian quartz crystals seamlessly embedded into heavy oil medium.",
    galleryImages: ["/images/art-ephemeral.jpg"],
    featured: true,
  },
  {
    id: "art-3",
    slug: "cybernetic-bloom",
    title: "Cybernetic Bloom",
    type: "PRINT",
    medium: "Archival UltraChrome Pigment on 310gsm Hahnemühle Photo Rag",
    dimensions: "24\" × 24\" (61 × 61 cm)",
    price: 240,
    status: "edition_available",
    year: 2025,
    image: "/images/art-cyberbloom.jpg",
    shortDescription: "Museum-grade archival print with hand-deckled edges. Limited edition of 50, hand-signed and numbered.",
    description: "Synthesizing generative botanical fractals and electronic diode structures into a luminous orchid bloom that seems to breathe in low light conditions.",
    galleryImages: ["/images/art-cyberbloom.jpg"],
    editionInfo: "Limited Edition of 50 (14 remaining)",
    featured: true,
  },
  {
    id: "art-4",
    slug: "neural-topography",
    title: "Neural Topography № 7",
    type: "PRINT",
    medium: "Fine Art Metallic Print under 4mm Polished Acrylic Glass",
    dimensions: "30\" × 45\" (76 × 114 cm)",
    price: 480,
    status: "edition_available",
    year: 2024,
    image: "/images/hero-art.jpg",
    shortDescription: "Floating acrylic glass print with frameless aluminum rail mount, high saturation depth.",
    description: "Generative mathematical vectors translated into tactile topographic strata, exploring human memory synapses.",
    galleryImages: ["/images/hero-art.jpg"],
    editionInfo: "Limited Edition of 25 (8 remaining)",
    featured: false,
  },
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "proj-1",
    slug: "genesis-3d-visualizer",
    title: "Genesis 3D Procedural Engine",
    category: "coding",
    categoryLabel: "Creative Coding & WebGL",
    summary: "Real-time browser-based node editor and GLSL shader compiler for generative 3D sculptures.",
    description: "Built for digital artists and creative technologists. Provides interactive node graph routing, procedural noise modulators, and instantaneous WebGL rendering with 144 FPS target performance.",
    client: "Open Source / Independent",
    year: 2025,
    tags: ["Next.js", "Three.js", "TypeScript", "GLSL Shaders", "Tailwind CSS"],
    image: "/images/project-code.jpg",
    liveUrl: "https://artistrygigs.com/demo/genesis",
    githubUrl: "https://github.com/artistrygigs/genesis-3d",
    featured: true,
    metrics: [
      { label: "Render Target", value: "144 FPS" },
      { label: "Community Stars", value: "1.4k+" },
      { label: "Node Modules", value: "48 Presets" },
    ],
    deliverables: ["Custom WebGL Pipeline", "Node Graph UI", "Preset Library", "Export to GLTF & MP4"],
  },
  {
    id: "proj-2",
    slug: "atelier-lumina-ecommerce",
    title: "Atelier Lumina Experience",
    category: "webdev",
    categoryLabel: "Full-Stack Web Development",
    summary: "Bespoke digital storefront and interactive gallery with custom 3D model viewer and instant checkout.",
    description: "End-to-end luxury e-commerce experience designed for modern couture and rare objets d'art. Features server-side rendering, sub-second page transitions, and fluid micro-interactions.",
    client: "Lumina Haute Couture",
    year: 2024,
    tags: ["Next.js App Router", "Stripe Connect", "PostgreSQL", "Framer Motion", "Tailwind CSS"],
    image: "/images/art-cyberbloom.jpg",
    liveUrl: "https://artistrygigs.com/demo/lumina",
    featured: true,
    metrics: [
      { label: "Conversion Lift", value: "+38%" },
      { label: "Lighthouse Score", value: "99/100" },
      { label: "Avg Page Load", value: "0.4s" },
    ],
    deliverables: ["Custom Design System", "Stripe Payment Flow", "CMS Admin Panel", "Micro-animations"],
  },
  {
    id: "proj-3",
    slug: "synesthetic-type-specimen",
    title: "Synesthetic Identity & Specimen",
    category: "graphic-design",
    categoryLabel: "Brand Identity & Typography",
    summary: "Complete visual identity, custom display typeface, and risograph catalog design for an avant-garde music festival.",
    description: "Crafted visual language bridging tactile print craftsmanship with brutalist digital design. Includes responsive vector logos, custom font ligatures, and limited-edition promotional collateral.",
    client: "Sonik Festival Berlin",
    year: 2024,
    tags: ["Typography", "Brand System", "Editorial Design", "Packaging"],
    image: "/images/art-ephemeral.jpg",
    featured: true,
    metrics: [
      { label: "Event Attendance", value: "12,000+" },
      { label: "Print Run", value: "5,000 Copies" },
    ],
    deliverables: ["Brand Identity Book", "Custom OTF Font", "Risograph Posters", "Event Signage"],
  },
  {
    id: "proj-4",
    slug: "monolith-spatial-gallery",
    title: "Monolith Virtual Exhibition",
    category: "fine-art",
    categoryLabel: "Fine Art & Digital Installation",
    summary: "Immersive architectural digital exhibition space hosting curated physical sculptures translated into high-poly photogrammetry.",
    description: "An architectural exploration into how physical brushstrokes and stone chiseling translate into spatial web canvases.",
    client: "Venice Biennale Satellite",
    year: 2024,
    tags: ["Spatial Web", "Photogrammetry", "Curatorial", "Sound Design"],
    image: "/images/hero-art.jpg",
    featured: false,
    metrics: [
      { label: "Virtual Visitors", value: "45,000+" },
      { label: "Avg Session", value: "8.4 min" },
    ],
    deliverables: ["3D Virtual Pavilion", "Audio Soundscapes", "Collector Catalog"],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Eleanor Vance",
    role: "Private Art Collector",
    company: "Vance Contemporary, NYC",
    comment: "The Cosmic Weaver painting is the undisputed centerpiece of our living gallery. The transition from daylight to ambient evening lighting completely transforms the golden leaf depth. Truly transcendent work.",
    rating: 5,
    avatarText: "EV",
    project: "Cosmic Weaver Original",
  },
  {
    id: "test-2",
    name: "Marcus Thorne",
    role: "Head of Product",
    company: "Aetheria Labs",
    comment: "Rarely do you find someone with equal mastery of fine arts and robust full-stack software engineering. The web application built for us is both a high-converting product and a work of digital art.",
    rating: 5,
    avatarText: "MT",
    project: "Genesis 3D Engine",
  },
  {
    id: "test-3",
    name: "Dr. Simone Aris",
    role: "Curator",
    company: "Digital Arts Foundation",
    comment: "The custom commission process was seamless. Clear milestones, moodboards, and delivery in museum-grade packaging with complete provenance documentation.",
    rating: 5,
    avatarText: "SA",
    project: "Custom Commission Canvas",
  },
];

export const SKILL_DOMAINS = [
  {
    id: "coding",
    title: "Engineering & Code",
    tagline: "High-performance full-stack architectures & WebGL",
    description: "React, Next.js App Router, TypeScript, Node.js, WebGL/Three.js, PostgreSQL, Stripe integrations, and high-frequency UI state.",
    icon: "Code2",
    stats: "8+ Yrs Experience",
    color: "from-cyan-500/20 to-blue-500/10",
    border: "group-hover:border-cyan-500/40",
    accent: "text-cyan-400",
  },
  {
    id: "art",
    title: "Fine Art & Mixed Media",
    tagline: "Large-scale physical oils, gold leaf & sculpture",
    description: "Classical glazing techniques, 24k genuine gold leaf, impasto textures, crushed mineral pigments, and archival limited editions.",
    icon: "Palette",
    stats: "30+ Works Collected",
    color: "from-amber-500/20 to-yellow-600/10",
    border: "group-hover:border-amber-500/40",
    accent: "text-amber-400",
  },
  {
    id: "design",
    title: "Visual & Graphic Design",
    tagline: "Brand identities, typography & luxury packaging",
    description: "Editorial layouts, bespoke typography design, interactive design systems, and tactile print collateral with risograph and foil finishes.",
    icon: "Layers",
    stats: "40+ Brand Systems",
    color: "from-purple-500/20 to-pink-500/10",
    border: "group-hover:border-purple-500/40",
    accent: "text-purple-400",
  },
  {
    id: "commissions",
    title: "Bespoke Commissions",
    tagline: "Made-to-order artwork tailored to your space",
    description: "Custom original paintings, site-specific installations, and tailored digital experiences with personalized collector consultation.",
    icon: "Sparkles",
    stats: "100% Client Delight",
    color: "from-emerald-500/20 to-teal-500/10",
    border: "group-hover:border-emerald-500/40",
    accent: "text-emerald-400",
  },
];
