export interface Product {
  id: string;
  name: string;
  fullProductName: string;
  description: string;
  subCategory: string;
  productLine: string;
  variant: string;
  keyFeatures: string[];
  typicalApplications: string[];
  availability: string;
  images: string[];
  videos: string[];
  posters: string[];
  categoryId: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  image?: string;
  products: Product[];
}

export interface Industry {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: "abrasive",
    name: "Abrasive",
    slug: "abrasive",
    description: "High-quality abrasive products for grinding, cutting, and surface preparation. Includes cutting wheels, grinding discs, and specialty abrasives for industrial applications.",
    shortDescription: "Premium abrasives for industrial use",
    products: [
      {
        id: "ultra-thin-wheels-spitfire",
        name: "ULTRA THIN WHEELS SPITFIRE",
        fullProductName: "ULTRA THIN WHEELS SPITFIRE",
        description: "Premium ultra-thin cutting wheels with double net construction for enhanced safety. Offers longest life and fast cutting performance for both stainless steel and mild steel applications. Made in India with oSa & EN12413 safety compliance.",
        subCategory: "ULTRA THIN WHEELS",
        productLine: "Cutting Wheels",
        variant: "SPITFIRE",
        keyFeatures: [
          "Double net construction for enhanced safety",
          "Longest life in its category",
          "Fast cutting performance",
          "Suitable for stainless steel and mild steel"
        ],
        typicalApplications: ["Sheet metal cutting", "Stainless steel fabrication", "Mild steel cutting"],
        availability: "107mm x 1mm; In Stock",
        images: ["/images/additional_images/SPITFIRE.png"],
        videos: [],
        posters: [],
        categoryId: "abrasive"
      }
    ]
  },
  {
    id: "cutting-grinding-wheels",
    name: "Cutting & Grinding Wheels",
    slug: "cutting-grinding-wheels",
    description: "Premium cutting and grinding wheels for industrial applications. Ultra-thin wheels, cut-off wheels, and grinding discs designed for fast cutting, long life, and superior performance on stainless steel, mild steel, and various materials.",
    shortDescription: "Premium cutting & grinding wheels for industrial use",
    products: [
      {
        id: "ultra-thin-wheels-spitfire",
        name: "ULTRA THIN WHEELS SPITFIRE",
        fullProductName: "ULTRA THIN WHEELS SPITFIRE",
        description: "Premium ultra-thin cutting wheels with double net construction for enhanced safety. Offers longest life and fast cutting performance for both stainless steel and mild steel applications. Made in India with oSa & EN12413 safety compliance.",
        subCategory: "ULTRA THIN WHEELS",
        productLine: "Cutting Wheels",
        variant: "SPITFIRE",
        keyFeatures: [
          "Longest life in class",
          "Fast cutting performance",
          "Double net construction for safety",
          "Versatile for SS & MS materials",
          "Made in India",
          "oSa & EN12413 safety compliant"
        ],
        typicalApplications: [
          "Pipe cutting",
          "Angle cutting",
          "Rod cutting",
          "Sheet cutting"
        ],
        availability: "107mm x 1mm",
        images: [
          "/images/images/ULTRA THIN WHEELS SPITFIRE.png"
        ],
        videos: [
          "/videos/videos/ULTRA THIN WHEELS SPITFIRE.mp4",
          "/videos/videos/1. Customer meet - Hindi.mp4"
        ],
        posters: [
          "/images/poster/ULTRA THIN WHEELS SPITFIRE.jpg",
          "/images/poster/ALL Norton.jpg",
          "/images/poster/ALL.jpg"
        ],
        categoryId: "cutting-grinding-wheels"
      }
    ]
  },
  {
    id: "coated-abrasives",
    name: "Coated Abrasives",
    slug: "coated-abrasives",
    description: "High-performance coated abrasives including fibre discs, flap discs, flap wheels, and velcro discs. Engineered for aggressive stock removal, blending, and finishing applications across various industries.",
    shortDescription: "Fibre discs, flap discs, and coated abrasive solutions",
    products: []
  },
  {
    id: "non-woven-abrasives",
    name: "Non-Woven Abrasives",
    slug: "non-woven-abrasives",
    description: "Specialized non-woven abrasives for surface conditioning, cleaning, and finishing. Includes spindle mops, hand pads, and surface finishing products that deliver consistent results without damaging the workpiece.",
    shortDescription: "Surface conditioning and finishing abrasives",
    products: []
  },
  {
    id: "bonded-abrasives",
    name: "Bonded Abrasives",
    slug: "bonded-abrasives",
    description: "Precision bonded grinding wheels for toolroom, mining, saw gumming, and offhand grinding applications. Engineered for accuracy, durability, and superior grinding performance in demanding industrial environments.",
    shortDescription: "Precision grinding wheels for industrial applications",
    products: []
  },
  {
    id: "construction-products",
    name: "Construction Products",
    slug: "construction-products",
    description: "Professional-grade construction tools and accessories including wood cutters, diamond blades, concrete cutters, core bits, chisels, drill bits, and brushes. Built for durability and precision in demanding construction environments.",
    shortDescription: "Professional construction tools and accessories",
    products: [
      {
        id: "wood-cutter-clipper-rapid",
        name: "WOOD CUTTER CLIPPER RAPID",
        fullProductName: "WOOD CUTTER CLIPPER RAPID",
        description: "Premium wood cutter with vent holes on blade for heat dissipation and superior quality tip for smooth cut and long life. Designed for efficient wood and plywood cutting applications.",
        subCategory: "WOOD CUTTER",
        productLine: "Wood Cutting",
        variant: "CLIPPER RAPID",
        keyFeatures: [
          "Vent holes on blade for heat dissipation",
          "Superior quality tip for smooth cut",
          "Long service life",
          "Efficient cutting performance"
        ],
        typicalApplications: [
          "Wood and plywood cutting",
          "MDF cutting"
        ],
        availability: "110mm; 125mm; Teeth: 30, 40",
        images: [
          "/images/images/WOOD CUTTER CLIPPER RAPID.png"
        ],
        videos: [
          "/videos/videos/XPERT RAPID.mp4",
          "/videos/videos/XPERT RAPID 2.mp4"
        ],
        posters: [
          "/images/poster/XPERT RAPID ALL.jpg"
        ],
        categoryId: "construction-products"
      }
    ]
  }
];

export const INDUSTRIES: Industry[] = [
  {
    id: "construction",
    name: "Construction",
    description: "Structural steel, reinforcement, and infrastructure welding solutions for building and civil engineering projects."
  },
  {
    id: "infrastructure",
    name: "Infrastructure",
    description: "High-quality welding products for bridges, dams, power plants, and public infrastructure projects."
  },
  {
    id: "fabrication",
    name: "Fabrication",
    description: "Complete range of welding consumables and materials for general and specialized fabrication shops."
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    description: "Industrial welding solutions for automotive, machinery, and equipment manufacturing industries."
  },
  {
    id: "engineering",
    name: "Engineering",
    description: "Precision welding products and custom components for engineering and technical applications."
  }
];

export const WHY_CHOOSE_US = [
  {
    title: "High-Quality Products",
    description: "All our products undergo rigorous quality testing to ensure they meet international standards and exceed customer expectations."
  },
  {
    title: "Reliable Performance",
    description: "Our welding consumables and products deliver consistent, reliable performance in demanding industrial environments."
  },
  {
    title: "Industry Expertise",
    description: "With years of experience in welding and fabrication, we provide expert guidance and technical support for your projects."
  },
  {
    title: "Customer-Focused Approach",
    description: "We work closely with our customers to understand their needs and provide tailored solutions that match their requirements."
  },
  {
    title: "Timely Delivery",
    description: "Our efficient logistics and supply chain management ensure your products reach you on time, every time."
  }
];

export const COMPANY_INFO = {
  name: "SuperWeld Sources Pvt Ltd",
  tagline: "Leading Manufacturer & Supplier of Industrial Welding Products",
  description: "We are a leading manufacturer and supplier of high-quality industrial welding products. We focus on precision, durability, and performance, serving multiple industries with reliable solutions.",
  whatWeDo: "We manufacture and supply a wide range of industrial welding and related products designed for high performance in demanding environments. Our products ensure strength, consistency, and long service life.",
  vision: "To be the most trusted partner for industrial welding solutions, recognized for quality, innovation, and customer satisfaction.",
  mission: "To deliver high-quality welding products that enable our customers to achieve excellence in their fabrication and manufacturing operations.",
  established: "1999",
  headquarters: "India"
};

// Featured categories with icons for home page and products page
export const FEATURED_CATEGORIES = [
  { id: "abrasive", name: "Abrasive", icon: "Circle", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80" },
  { id: "welding-electrodes", name: "Welding Electrodes", icon: "Zap", image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80" },
  { id: "oxy-fuel", name: "Oxy Fuel Products", icon: "Flame", image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80" },
  { id: "arc-welding", name: "Arc Welding Equipment", icon: "Wrench", image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80" },
  { id: "safety", name: "Safety Equipment", icon: "Shield", image: "https://images.unsplash.com/photo-1581093458891-9f302e26d265?w=600&q=80" },
  { id: "filler-metals", name: "Filler Metals", icon: "Layers", image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&q=80" },
  { id: "gas-cutting", name: "Gas Cutting", icon: "Scissors", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80" },
  { id: "industrial-valves", name: "Industrial Valves", icon: "Settings", image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80" },
];
