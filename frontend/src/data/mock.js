// Mock data for ArtStop e-commerce
export const categories = [
  {
    id: 1,
    name: "Islamic Art",
    slug: "islamic-art",
    image:"/homepage/islamicart.heic",
   productCount: 45,
    collections: [
      "Asma-ul-Husna Frames",
      "Ayatul Kursi Wall Art",
      "4 Quls Calligraphy",
      "Bismillah Nameplates",
      "Dua Frames",
      "Quran Stands & Tasbih",
    ],
    collectionImages: {
      "Asma-ul-Husna Frames": "https://picsum.photos/300/200?random=1",
      "Ayatul Kursi Wall Art": "https://picsum.photos/300/200?random=2",
      "4 Quls Calligraphy": "https://picsum.photos/300/200?random=3",
      "Bismillah Nameplates": "https://picsum.photos/300/200?random=4",
      "Dua Frames": "https://picsum.photos/300/200?random=5",
      "Quran Stands & Tasbih": "https://picsum.photos/300/200?random=6",
    },
  },
  {
    id: 2,
    name: "Home Decor",
    slug: "home-decor",
    image:"/homepage/homedecor.heic",
    productCount: 32,
    collections: [
      "Resin Nameplates",
      "Geode Wall Art",
      "Clocks",
      "Memory Frames (Wedding, Baby, Family)",
      "Quote Wall Art",
    ],
    collectionImages: {
      "Resin Nameplates": "https://picsum.photos/300/200?random=7",
      "Geode Wall Art": "https://picsum.photos/300/200?random=8",
      "Clocks": "https://picsum.photos/300/200?random=9",
      "Memory Frames (Wedding, Baby, Family)": "https://picsum.photos/300/200?random=10",
      "Quote Wall Art": "https://picsum.photos/300/200?random=11",
    },
  },
  {
    id: 3,
    name: "Gifts",
    slug: "gifts",
    image: "/homepage/gifts.heic",
    productCount: 28,
    collections: [
      "Wedding Gifts",
      "Housewarming Gifts",
      "Corporate Gifts",
      "Budget Mini Items (Keychains, Bookmarks, Coasters)",
    ],
    collectionImages: {
      "Wedding Gifts": "https://picsum.photos/300/200?random=12",
      "Housewarming Gifts": "https://picsum.photos/300/200?random=13",
      "Corporate Gifts": "https://picsum.photos/300/200?random=14",
      "Budget Mini Items (Keychains, Bookmarks, Coasters)":
        "https://picsum.photos/300/200?random=15",
    },
  },
  {
    id: 4,
    name: "Cutouts & Signage",
    slug: "cutouts-signage",
    image:
      "/homepage/cutouts.heic",
    productCount: 18,
    collections: [
      "Acrylic Cutouts",
      "Metal & Steel Artwork",
      "Vinyl Stickers",
      "Custom Shapes for Homes, Offices, Masjids",
    ],
    collectionImages: {
      "Acrylic Cutouts": "https://picsum.photos/300/200?random=16",
      "Metal & Steel Artwork": "https://picsum.photos/300/200?random=17",
      "Vinyl Stickers": "https://picsum.photos/300/200?random=18",
      "Custom Shapes for Homes, Offices, Masjids":
        "https://picsum.photos/300/200?random=19",
    },
  },
  {
    id: 5,
    name: "Frames",
    slug: "frames",
    image: "https://picsum.photos/seed/frames/400/300",
    productCount: 0,
    collections: [
      "Round Frames",
      "Rectangle Frames",
      "Square Frames"
    ],
    collectionImages: {
      "Round Frames": "https://picsum.photos/seed/round-frames/300/200",
      "Rectangle Frames": "https://picsum.photos/seed/rect-frames/300/200",
      "Square Frames": "https://picsum.photos/seed/sq-frames/300/200"
    }
  }
];

export const products = [
  // Already existing Islamic Art products
  {
    id: 1,
    name: "17 Ayatul Kursi Stainless Steel Islamic Wall Art",
    category: "islamic-art",
    collection: "Ayatul Kursi Wall Art",
    price: 8000,
    oldPrice: 9400,
    rating: 4.8,
    reviewCount: 124,
    images: [
      "https://picsum.photos/800/600?random=21",
      "https://picsum.photos/800/600?random=22"
    ],
    variants: [
      { name: "Small", value: "small", price: 6000, dimensions: "12 x 18 inch" },
      { name: "Medium", value: "medium", price: 8000, dimensions: "18 x 24 inch" },
      { name: "Large", value: "large", price: 12000, dimensions: "24 x 36 inch" }
    ],
    colors: ["Gold", "Silver", "Black"],
    description: "Beautiful Ayatul Kursi Islamic wall art made from premium stainless steel",
    features: ["Premium stainless steel", "Laser cut design", "Easy mounting", "Weather resistant"],
    inStock: true,
    featured: true
  },
  {
    id: 2,
    name: "69 Asma ul Husna Acrylic Islamic Wall Art",
    category: "islamic-art",
    collection: "Asma-ul-Husna Frames",
    price: 7000,
    oldPrice: 8200,
    rating: 4.7,
    reviewCount: 89,
    images: [
      "https://picsum.photos/800/600?random=23",
      "https://picsum.photos/800/600?random=24"
    ],
    variants: [
      { name: "Small", value: "small", price: 5000, dimensions: "12 x 18 inch" },
      { name: "Medium", value: "medium", price: 7000, dimensions: "18 x 24 inch" },
      { name: "Large", value: "large", price: 10000, dimensions: "24 x 36 inch" }
    ],
    colors: ["Blue", "Gold", "White"],
    description: "Elegant 99 Names of Allah wall art in premium acrylic material",
    features: ["Premium acrylic", "Modern design", "Easy installation", "UV resistant"],
    inStock: true,
    featured: true
  },
  {
    id: 6,
    name: "4 Quls Calligraphy Canvas",
    category: "islamic-art",
    collection: "4 Quls Calligraphy",
    price: 5200,
    oldPrice: 6000,
    rating: 4.6,
    reviewCount: 65,
    images: [
      "https://picsum.photos/800/600?random=25",
      "https://picsum.photos/800/600?random=26"
    ],
    variants: [
      { name: "Small", value: "small", price: 5200, dimensions: "16 x 20 inch" },
      { name: "Medium", value: "medium", price: 6500, dimensions: "20 x 24 inch" },
      { name: "Large", value: "large", price: 8200, dimensions: "24 x 30 inch" }
    ],
    colors: ["Black", "Gold"],
    description: "Premium canvas featuring the 4 Quls in Arabic calligraphy",
    features: ["Canvas print", "Wooden frame", "Durable ink", "Elegant finish"],
    inStock: true,
    featured: false
  },
  {
    id: 7,
    name: "Bismillah Wooden Nameplate",
    category: "islamic-art",
    collection: "Bismillah Nameplates",
    price: 2500,
    oldPrice: 3000,
    rating: 4.5,
    reviewCount: 42,
    images: [
      "https://picsum.photos/800/600?random=27",
      "https://picsum.photos/800/600?random=28"
    ],
    variants: [
      { name: "Small", value: "small", price: 2000, dimensions: "6 x 8 inch" },
      { name: "Medium", value: "medium", price: 2500, dimensions: "8 x 10 inch" },
      { name: "Large", value: "large", price: 3200, dimensions: "10 x 12 inch" }
    ],
    colors: ["Wood", "Black"],
    description: "Handcrafted wooden Bismillah nameplate for homes",
    features: ["Customizable text", "Wooden base", "Laser engraving"],
    inStock: true,
    featured: false
  },
  {
    id: 8,
    name: "Elegant Dua Frame",
    category: "islamic-art",
    collection: "Dua Frames",
    price: 2800,
    oldPrice: 3400,
    rating: 4.4,
    reviewCount: 58,
    images: [
      "https://picsum.photos/800/600?random=29",
      "https://picsum.photos/800/600?random=30"
    ],
    variants: [
      { name: "Small", value: "small", price: 2200, dimensions: "8 x 10 inch" },
      { name: "Medium", value: "medium", price: 2800, dimensions: "11 x 14 inch" },
      { name: "Large", value: "large", price: 4500, dimensions: "16 x 20 inch" }
    ],
    colors: ["Black", "White"],
    description: "Printed frame with beautiful daily dua",
    features: ["High quality print", "Glass finish", "Ready to hang"],
    inStock: true,
    featured: false
  },
  {
    id: 9,
    name: "Premium Quran Stand with Tasbih",
    category: "islamic-art",
    collection: "Quran Stands & Tasbih",
    price: 3500,
    oldPrice: 4200,
    rating: 4.7,
    reviewCount: 73,
    images: [
      "https://picsum.photos/800/600?random=31",
      "https://picsum.photos/800/600?random=32"
    ],
    variants: [
      { name: "Small", value: "small", price: 3000, dimensions: "8 x 10 inch" },
      { name: "Medium", value: "medium", price: 3500, dimensions: "10 x 12 inch" },
      { name: "Large", value: "large", price: 5000, dimensions: "12 x 15 inch" }
    ],
    colors: ["Brown", "Black"],
    description: "Elegant Quran stand with complimentary tasbih beads",
    features: ["Foldable", "Premium finish", "Lightweight"],
    inStock: true,
    featured: false
  },

  // Home Decor
  {
    id: 10,
    name: "Resin Nameplate with Gold Finish",
    category: "home-decor",
    collection: "Resin Nameplates",
    price: 2800,
    oldPrice: 3500,
    rating: 4.6,
    reviewCount: 50,
    images: [
      "https://picsum.photos/800/600?random=33",
      "https://picsum.photos/800/600?random=34"
    ],
    variants: [
      { name: "Small", value: "small", price: 2200, dimensions: "6 x 8 inch" },
      { name: "Medium", value: "medium", price: 2800, dimensions: "8 x 10 inch" },
      { name: "Large", value: "large", price: 3500, dimensions: "10 x 12 inch" }
    ],
    colors: ["Blue", "Gold"],
    description: "Durable resin nameplate with gold accents",
    features: ["Weatherproof", "UV resistant", "Customizable"],
    inStock: true,
    featured: false
  },
  {
    id: 11,
    name: "Modern Geode Wall Art",
    category: "home-decor",
    collection: "Geode Wall Art",
    price: 6000,
    oldPrice: 7500,
    rating: 4.8,
    reviewCount: 91,
    images: [
      "https://picsum.photos/800/600?random=35",
      "https://picsum.photos/800/600?random=36"
    ],
    variants: [
      { name: "Small", value: "small", price: 4500, dimensions: "12 x 16 inch" },
      { name: "Medium", value: "medium", price: 6000, dimensions: "16 x 20 inch" },
      { name: "Large", value: "large", price: 8500, dimensions: "20 x 24 inch" }
    ],
    colors: ["Purple", "Blue", "Black"],
    description: "Stunning geode-inspired wall art for modern homes",
    features: ["Resin art", "Shiny crystals", "Durable finish"],
    inStock: true,
    featured: false
  },
  {
    id: 12,
    name: "Wall Clock with Minimal Design",
    category: "home-decor",
    collection: "Clocks",
    price: 1500,
    oldPrice: 2200,
    rating: 4.3,
    reviewCount: 33,
    images: [
      "https://picsum.photos/800/600?random=37",
      "https://picsum.photos/800/600?random=38"
    ],
    variants: [
      { name: "Small", value: "small", price: 1200, dimensions: "10 inch diameter" },
      { name: "Medium", value: "medium", price: 1500, dimensions: "12 inch diameter" },
      { name: "Large", value: "large", price: 2000, dimensions: "18 inch diameter" }
    ],
    colors: ["Black", "White"],
    description: "Modern wall clock with silent movement",
    features: ["Battery operated", "Minimalist design", "Durable body"],
    inStock: true,
    featured: false
  },
  {
    id: 13,
    name: "Family Memory Frame",
    category: "home-decor",
    collection: "Memory Frames (Wedding, Baby, Family)",
    price: 3200,
    oldPrice: 4000,
    rating: 4.5,
    reviewCount: 72,
    images: [
      "https://picsum.photos/800/600?random=39",
      "https://picsum.photos/800/600?random=40"
    ],
    variants: [
      { name: "Small", value: "small", price: 2500, dimensions: "8 x 10 inch" },
      { name: "Medium", value: "medium", price: 3200, dimensions: "11 x 14 inch" },
      { name: "Large", value: "large", price: 4200, dimensions: "16 x 20 inch" }
    ],
    colors: ["Brown", "White"],
    description: "Beautiful frame to preserve precious family memories",
    features: ["Customizable", "Glass cover", "Premium wood"],
    inStock: true,
    featured: false
  },
  {
    id: 14,
    name: "Inspirational Quote Wall Art",
    category: "home-decor",
    collection: "Quote Wall Art",
    price: 2200,
    oldPrice: 2800,
    rating: 4.6,
    reviewCount: 46,
    images: [
      "https://picsum.photos/800/600?random=41",
      "https://picsum.photos/800/600?random=42"
    ],
    variants: [
      { name: "Small", value: "small", price: 1800, dimensions: "11 x 14 inch" },
      { name: "Medium", value: "medium", price: 2200, dimensions: "16 x 20 inch" },
      { name: "Large", value: "large", price: 3000, dimensions: "20 x 24 inch" }
    ],
    colors: ["Black", "White"],
    description: "Modern typography wall art with inspirational quotes",
    features: ["High quality print", "Matte finish", "Ready to hang"],
    inStock: true,
    featured: false
  },

  // Gifts
  {
    id: 15,
    name: "Elegant Wedding Gift Set",
    category: "gifts",
    collection: "Wedding Gifts",
    price: 4200,
    oldPrice: 5000,
    rating: 4.7,
    reviewCount: 82,
    images: [
      "https://picsum.photos/800/600?random=43",
      "https://picsum.photos/800/600?random=44"
    ],
    variants: [
      { name: "Small", value: "small", price: 3500, dimensions: "8 x 6 x 4 inch" },
      { name: "Medium", value: "medium", price: 4200, dimensions: "10 x 8 x 5 inch" },
      { name: "Large", value: "large", price: 5500, dimensions: "12 x 10 x 6 inch" }
    ],
    colors: ["White", "Gold"],
    description: "Perfect wedding gift with elegant packaging",
    features: ["Gift-ready", "Premium quality", "Customizable"],
    inStock: true,
    featured: false
  },
  {
    id: 16,
    name: "Housewarming Gift Basket",
    category: "gifts",
    collection: "Housewarming Gifts",
    price: 3600,
    oldPrice: 4400,
    rating: 4.6,
    reviewCount: 56,
    images: [
      "https://picsum.photos/800/600?random=45",
      "https://picsum.photos/800/600?random=46"
    ],
    variants: [
      { name: "Small", value: "small", price: 2800, dimensions: "8 x 6 x 4 inch" },
      { name: "Medium", value: "medium", price: 3600, dimensions: "10 x 8 x 5 inch" },
      { name: "Large", value: "large", price: 4800, dimensions: "12 x 10 x 6 inch" }
    ],
    colors: ["Mixed"],
    description: "Thoughtful housewarming gift basket",
    features: ["Custom items", "Decorative basket", "Ready to gift"],
    inStock: true,
    featured: false
  },
  {
    id: 17,
    name: "Corporate Gift Set",
    category: "gifts",
    collection: "Corporate Gifts",
    price: 4800,
    oldPrice: 5800,
    rating: 4.5,
    reviewCount: 44,
    images: [
      "https://picsum.photos/800/600?random=47",
      "https://picsum.photos/800/600?random=48"
    ],
    variants: [
      { name: "Small", value: "small", price: 3800, dimensions: "8 x 6 x 4 inch" },
      { name: "Medium", value: "medium", price: 4800, dimensions: "10 x 8 x 5 inch" },
      { name: "Large", value: "large", price: 6200, dimensions: "12 x 10 x 6 inch" }
    ],
    colors: ["Black", "Silver"],
    description: "Premium gift set for corporate clients",
    features: ["Custom branding", "Premium packaging", "High quality"],
    inStock: true,
    featured: false
  },
  {
    id: 18,
    name: "Budget Mini Keychain Set",
    category: "gifts",
    collection: "Budget Mini Items (Keychains, Bookmarks, Coasters)",
    price: 800,
    oldPrice: 1200,
    rating: 4.3,
    reviewCount: 38,
    images: [
      "https://picsum.photos/800/600?random=49",
      "https://picsum.photos/800/600?random=50"
    ],
    variants: [
      { name: "Small", value: "small", price: 600, dimensions: "Set of 2" },
      { name: "Medium", value: "medium", price: 800, dimensions: "Set of 3" },
      { name: "Large", value: "large", price: 1200, dimensions: "Set of 5" }
    ],
    colors: ["Mixed"],
    description: "Budget-friendly mini gift items set",
    features: ["Affordable", "Useful items", "Compact size"],
    inStock: true,
    featured: false
  },

  // Cutouts & Signage
  {
    id: 19,
    name: "Acrylic Wall Cutout",
    category: "cutouts-signage",
    collection: "Acrylic Cutouts",
    price: 2700,
    oldPrice: 3500,
    rating: 4.5,
    reviewCount: 51,
    images: [
      "https://picsum.photos/800/600?random=51",
      "https://picsum.photos/800/600?random=52"
    ],
    variants: [
      { name: "Small", value: "small", price: 2000, dimensions: "12 x 12 inch" },
      { name: "Medium", value: "medium", price: 2700, dimensions: "18 x 18 inch" },
      { name: "Large", value: "large", price: 3800, dimensions: "24 x 24 inch" }
    ],
    colors: ["Transparent", "Black"],
    description: "Durable acrylic wall cutout design",
    features: ["Laser cut", "Durable material", "Smooth finish"],
    inStock: true,
    featured: false
  },
  {
    id: 20,
    name: "Steel Islamic Artwork",
    category: "cutouts-signage",
    collection: "Metal & Steel Artwork",
    price: 6200,
    oldPrice: 7500,
    rating: 4.7,
    reviewCount: 68,
    images: [
      "https://picsum.photos/800/600?random=53",
      "https://picsum.photos/800/600?random=54"
    ],
    variants: [
      { name: "Small", value: "small", price: 4800, dimensions: "12 x 18 inch" },
      { name: "Medium", value: "medium", price: 6200, dimensions: "18 x 24 inch" },
      { name: "Large", value: "large", price: 8200, dimensions: "24 x 36 inch" }
    ],
    colors: ["Silver", "Black"],
    description: "Premium steel artwork with Islamic calligraphy",
    features: ["Rust-proof", "Elegant design", "Laser cut"],
    inStock: true,
    featured: false
  },
  {
    id: 21,
    name: "Vinyl Wall Sticker Set",
    category: "cutouts-signage",
    collection: "Vinyl Stickers",
    price: 1200,
    oldPrice: 1800,
    rating: 4.4,
    reviewCount: 40,
    images: [
      "https://picsum.photos/800/600?random=55",
      "https://picsum.photos/800/600?random=56"
    ],
    variants: [
      { name: "Small", value: "small", price: 800, dimensions: "Set of 3 (6 x 6 inch each)" },
      { name: "Medium", value: "medium", price: 1200, dimensions: "Set of 5 (8 x 8 inch each)" },
      { name: "Large", value: "large", price: 1800, dimensions: "Set of 8 (10 x 10 inch each)" }
    ],
    colors: ["Black", "White"],
    description: "Vinyl wall stickers for decoration",
    features: ["Easy peel", "Durable", "Removable"],
    inStock: true,
    featured: false
  },
  {
    id: 22,
    name: "Custom Arabic Shape Cutout",
    category: "cutouts-signage",
    collection: "Custom Shapes for Homes, Offices, Masjids",
    price: 5000,
    oldPrice: 5800,
    rating: 4.6,
    reviewCount: 60,
    images: [
      "https://picsum.photos/800/600?random=57",
      "https://picsum.photos/800/600?random=58"
    ],
    variants: [
      { name: "Small", value: "small", price: 3800, dimensions: "12 x 12 inch" },
      { name: "Medium", value: "medium", price: 5000, dimensions: "18 x 18 inch" },
      { name: "Large", value: "large", price: 6800, dimensions: "24 x 24 inch" }
    ],
    colors: ["Black", "White"],
    description: "Custom Arabic calligraphy shapes for interior/exterior",
    features: ["Customizable design", "Durable material", "Fast delivery"],
    inStock: true,
    featured: false
  },
  {
    id: 23,
    name: "Round Frames",
    category: "frames",
    collection: "Round Frames",
    price: 2000,
    rating: 4.5,
    reviewCount: 0,
    images: [
      "https://picsum.photos/seed/round-frames-1/800/600",
      "https://picsum.photos/seed/round-frames-2/800/600"
    ],
    variants: [
      { name: "Small", value: "small", price: 2000, dimensions: "6 inch", label: "Small: 6 inch - 2000" },
      { name: "Medium", value: "medium", price: 4500, dimensions: "12 inch", label: "Medium: 12 inch - 4500" },
      { name: "Large", value: "large", price: 8000, dimensions: "24 inch", label: "Large: 24 inch - 8000" }
    ],
    colors: ["Black", "White"],
    description: "Premium round frames in multiple sizes.",
    features: ["High quality finish", "Wall mount ready", "Multiple size options"],
    inStock: true,
    featured: false
  },
  {
    id: 24,
    name: "Rectangle Frames",
    category: "frames",
    collection: "Rectangle Frames",
    price: 5000,
    rating: 4.5,
    reviewCount: 0,
    images: [
      "https://picsum.photos/seed/rect-frames-1/800/600",
      "https://picsum.photos/seed/rect-frames-2/800/600"
    ],
    variants: [
      { name: "Small", value: "small", price: 5000, dimensions: "12 x 18 inch", label: "Small: 12 x 18 inch - 5000" },
      { name: "Medium", value: "medium", price: 7000, dimensions: "18 x 24 inch", label: "Medium: 18 x 24 inch - 7000" },
      { name: "Large", value: "large", price: 12000, dimensions: "24 x 36 inch", label: "Large: 24 x 36 inch - 12000" }
    ],
    colors: ["Black", "White"],
    description: "Classic rectangle frames suitable for posters and portraits.",
    features: ["Glass protection", "Sturdy build", "Multiple size options"],
    inStock: true,
    featured: true
  },
  {
    id: 25,
    name: "Square Frames",
    category: "frames",
    collection: "Square Frames",
    price: 5000,
    rating: 4.5,
    reviewCount: 0,
    images: [
      "https://picsum.photos/seed/square-frames-1/800/600",
      "https://picsum.photos/seed/square-frames-2/800/600"
    ],
    variants: [
      { name: "Small", value: "small", price: 5000, dimensions: "12 x 12 inch", label: "Small: 12 x 12 inch - 5000" },
      { name: "Medium", value: "medium", price: 6500, dimensions: "18 x 18 inch", label: "Medium: 18 x 18 inch - 6500" },
      { name: "Large", value: "large", price: 8000, dimensions: "24 x 24 inch", label: "Large: 24 x 24 inch - 8000" }
    ],
    colors: ["Black", "White"],
    description: "Elegant square frames for a balanced look.",
    features: ["Ready to hang", "Smooth edges", "Multiple size options"],
    inStock: true,
    featured: false
  }
];


export const reviews = [
  {
    id: 1,
    productId: 1,
    userName: "Ahmed Hassan",
    rating: 5,
    comment: "Absolutely beautiful piece! The craftsmanship is exceptional and it looks stunning on my wall.",
    date: "2025-01-10",
    verified: true
  },
  {
    id: 2,
    productId: 1,
    userName: "Fatima Ali",
    rating: 4,
    comment: "Great quality and fast shipping. Exactly as described.",
    date: "2025-01-08",
    verified: true
  },
  {
    id: 3,
    productId: 2,
    userName: "Muhammad Khan",
    rating: 5,
    comment: "Perfect addition to our living room. The acrylic quality is top-notch.",
    date: "2025-01-05",
    verified: true
  }
];

export const instagramReels = [
  {
    id: 1,
    title: "Artstop Resin School — Episode 1",
    url: "https://www.instagram.com/reel/DLUpidKze2C/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    videoSrc: "/reeslsection/get.mp4"
  },
  {
    id: 2,
    title: "Art Stop Resin School — Episode 2",
    url: "https://www.instagram.com/reel/DNu1wfA3g-M/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    videoSrc: "/reeslsection/🎨 Art Stop Resin School — Episode 2 😅The mistake that cost♦️♦️♦️SAVE IT ♦️ ♦️ ♦️ 🚫 What I did.mp4"
  },
  {
    id: 3,
    title: "This isn’t just art—it’s a part of me",
    url: "https://www.instagram.com/reel/DNfP7sjzyFp/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    videoSrc: "/reeslsection/“This isn’t just art—it’s a part of me. A piece of my dream, poured in layers.”I’ve always belie.mp4"
  },
  {
    id: 4,
    title: "Resin School — Pricing your art",
    url: "https://www.instagram.com/reel/DI5vgi0zEDJ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    videoSrc: "/reeslsection/🎨Artstop Resin School - Episode 3“How much should you REALLY charge for resin art”💡 Want me to.mp4"
  }
];

export const instagramProfileUrl = "https://www.instagram.com/artstop.affaa?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";

export const testimonials = [
  {
    id: 1,
    name: "Sarah Abdullah",
    location: "Dubai, UAE",
    rating: 5,
    comment: "ArtStop transformed my home with their beautiful Islamic art pieces. The quality is outstanding and customer service is exceptional.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?crop=faces&fit=crop&w=150&h=150"
  },
  {
    id: 2,
    name: "Omar Rashid",
    location: "London, UK",
    rating: 5,
    comment: "Perfect customization service! They created exactly what I envisioned for my office space.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=faces&fit=crop&w=150&h=150"
  },
  {
    id: 3,
    name: "Aisha Mohamed",
    location: "Toronto, Canada",
    rating: 5,
    comment: "Fast shipping and beautiful packaging. The wall art exceeded my expectations!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=faces&fit=crop&w=150&h=150"
  }
];

// Mock Orders Data
export const mockOrders = [
  {
    id: "ORD-001",
    date: "2025-01-15",
    status: "delivered",
    total: 12500,
    items: [
      {
        id: 1,
        name: "17 Ayatul Kursi Stainless Steel Islamic Wall Art",
        price: 8000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1558114965-eeb97aa84c3b?crop=entropy&cs=srgb&fm=jpg&w=200"
      },
      {
        id: 4,
        name: "Handcrafted Islamic Lantern Set",
        price: 3200,
        quantity: 1,
        image: "https://images.pexels.com/photos/2233416/pexels-photo-2233416.jpeg?w=200"
      }
    ]
  },
  {
    id: "ORD-002",
    date: "2025-01-12",
    status: "processing",
    total: 7000,
    items: [
      {
        id: 2,
        name: "69 Asma ul Husna Acrylic Islamic Wall Art",
        price: 7000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1573765727997-e02883182ba7?crop=entropy&cs=srgb&fm=jpg&w=200"
      }
    ]
  },
  {
    id: "ORD-003",
    date: "2025-01-08",
    status: "shipped",
    total: 4500,
    items: [
      {
        id: 3,
        name: "Modern Islamic Geometric Pattern Canvas",
        price: 4500,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1615874694520-474822394e73?crop=entropy&cs=srgb&fm=jpg&w=200"
      }
    ]
  }
];

// Cart mock data (will be stored in localStorage)
export const getCartItems = () => {
  const stored = localStorage.getItem('artstop_cart');
  return stored ? JSON.parse(stored) : [];
};

export const saveCartItems = (items) => {
  localStorage.setItem('artstop_cart', JSON.stringify(items));
  // Trigger a custom event to update cart count immediately
  window.dispatchEvent(new CustomEvent('cartUpdated'));
};

// Wishlist mock data (will be stored in localStorage)
export const getWishlistItems = () => {
  const stored = localStorage.getItem('artstop_wishlist');
  return stored ? JSON.parse(stored) : [];
};

export const saveWishlistItems = (items) => {
  localStorage.setItem('artstop_wishlist', JSON.stringify(items));
  // Trigger a custom event to update wishlist count
  window.dispatchEvent(new CustomEvent('wishlistUpdated'));
};

// Orders mock data (will be stored in localStorage)
export const getOrders = () => {
  const stored = localStorage.getItem('artstop_orders');
  return stored ? JSON.parse(stored) : mockOrders;
};

export const saveOrders = (orders) => {
  localStorage.setItem('artstop_orders', JSON.stringify(orders));
};

// Catalog data persistence (Categories & Products)
export const getCategories = () => {
  try {
    const stored = localStorage.getItem('artstop_categories');
    return stored ? JSON.parse(stored) : categories;
  } catch {
    return categories;
  }
};

export const saveCategories = (items) => {
  localStorage.setItem('artstop_categories', JSON.stringify(items));
  // Trigger a custom event so listeners can react (optional)
  window.dispatchEvent(new CustomEvent('catalogUpdated', { detail: { type: 'categories' } }));
};

export const getProducts = () => {
  try {
    const stored = localStorage.getItem('artstop_products');
    return stored ? JSON.parse(stored) : products;
  } catch {
    return products;
  }
};

export const saveProducts = (items) => {
  localStorage.setItem('artstop_products', JSON.stringify(items));
  // Trigger a custom event so listeners can react (optional)
  window.dispatchEvent(new CustomEvent('catalogUpdated', { detail: { type: 'products' } }));
};

