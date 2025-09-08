// Mock data for ArtStop e-commerce
export const categories = [
  {
    id: 1,
    name: "Islamic Art",
    slug: "islamic-art",
    image: "https://images.unsplash.com/photo-1558114965-eeb97aa84c3b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwYXJ0fGVufDB8fHx8MTc1NzMxNTQxNHww&ixlib=rb-4.1.0&q=85",
    productCount: 45
  },
  {
    id: 2,
    name: "Home Decor",
    slug: "home-decor",
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHxob21lJTIwZGVjb3J8ZW58MHx8fHwxNzU3MjY0NTYwfDA&ixlib=rb-4.1.0&q=85",
    productCount: 32
  },
  {
    id: 3,
    name: "Gifts",
    slug: "gifts",
    image: "https://images.pexels.com/photos/2233416/pexels-photo-2233416.jpeg",
    productCount: 28
  },
  {
    id: 4,
    name: "Cutouts & Signage",
    slug: "cutouts-signage",
    image: "https://images.unsplash.com/photo-1573765727997-e02883182ba7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwyfHxpc2xhbWljJTIwYXJ0fGVufDB8fHx8MTc1NzMxNTQxNHww&ixlib=rb-4.1.0&q=85",
    productCount: 18
  }
];

export const products = [
  {
    id: 1,
    name: "17 Ayatul Kursi Stainless Steel Islamic Wall Art",
    category: "islamic-art",
    price: 8000,
    oldPrice: 9400,
    rating: 4.8,
    reviewCount: 124,
    images: [
      "https://images.unsplash.com/photo-1558114965-eeb97aa84c3b?crop=entropy&cs=srgb&fm=jpg&w=800",
      "https://images.unsplash.com/photo-1573765727997-e02883182ba7?crop=entropy&cs=srgb&fm=jpg&w=800"
    ],
    variants: [
      { name: "Small", value: "small", price: 6000 },
      { name: "Medium", value: "medium", price: 8000 },
      { name: "Large", value: "large", price: 12000 }
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
    price: 7000,
    oldPrice: 8200,
    rating: 4.7,
    reviewCount: 89,
    images: [
      "https://images.unsplash.com/photo-1573765727997-e02883182ba7?crop=entropy&cs=srgb&fm=jpg&w=800",
      "https://images.pexels.com/photos/2233416/pexels-photo-2233416.jpeg"
    ],
    variants: [
      { name: "Medium", value: "medium", price: 7000 },
      { name: "Large", value: "large", price: 10000 }
    ],
    colors: ["Blue", "Gold", "White"],
    description: "Elegant 99 Names of Allah wall art in premium acrylic material",
    features: ["Premium acrylic", "Modern design", "Easy installation", "UV resistant"],
    inStock: true,
    featured: true
  },
  {
    id: 3,
    name: "Modern Islamic Geometric Pattern Canvas",
    category: "home-decor",
    price: 4500,
    oldPrice: 5200,
    rating: 4.6,
    reviewCount: 67,
    images: [
      "https://images.unsplash.com/photo-1615874694520-474822394e73?crop=entropy&cs=srgb&fm=jpg&w=800",
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?crop=entropy&cs=srgb&fm=jpg&w=800"
    ],
    variants: [
      { name: "16x20", value: "16x20", price: 4500 },
      { name: "24x36", value: "24x36", price: 7500 }
    ],
    colors: ["Teal", "Gold", "Black"],
    description: "Modern interpretation of traditional Islamic patterns on premium canvas",
    features: ["High-quality canvas", "Gallery wrap", "Ready to hang", "Fade resistant"],
    inStock: true,
    featured: true
  },
  {
    id: 4,
    name: "Handcrafted Islamic Lantern Set",
    category: "gifts",
    price: 3200,
    oldPrice: 3800,
    rating: 4.9,
    reviewCount: 156,
    images: [
      "https://images.pexels.com/photos/2233416/pexels-photo-2233416.jpeg",
      "https://images.pexels.com/photos/1099816/pexels-photo-1099816.jpeg"
    ],
    variants: [
      { name: "Small Set", value: "small-set", price: 3200 },
      { name: "Large Set", value: "large-set", price: 5500 }
    ],
    colors: ["Brass", "Silver", "Copper"],
    description: "Beautiful handcrafted Islamic lanterns perfect for Ramadan and special occasions",
    features: ["Handcrafted design", "Premium brass", "LED compatible", "Traditional patterns"],
    inStock: true,
    featured: true
  },
  {
    id: 5,
    name: "Custom Arabic Calligraphy Sign",
    category: "cutouts-signage",
    price: 5500,
    oldPrice: 6200,
    rating: 4.8,
    reviewCount: 92,
    images: [
      "https://images.unsplash.com/photo-1558114965-eeb97aa84c3b?crop=entropy&cs=srgb&fm=jpg&w=800",
      "https://images.unsplash.com/photo-1573765727997-e02883182ba7?crop=entropy&cs=srgb&fm=jpg&w=800"
    ],
    variants: [
      { name: "Wood", value: "wood", price: 5500 },
      { name: "Acrylic", value: "acrylic", price: 4800 },
      { name: "Metal", value: "metal", price: 7200 }
    ],
    colors: ["Natural", "Black", "White"],
    description: "Personalized Arabic calligraphy signage for homes and businesses",
    features: ["Custom design", "Multiple materials", "Professional finish", "Fast delivery"],
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
    title: "Ayatul Kursi CUSTOMIZED Size",
    thumbnail: "https://images.unsplash.com/photo-1558114965-eeb97aa84c3b?crop=entropy&cs=srgb&fm=jpg&w=400&h=600&fit=crop",
    videoUrl: "#",
    likes: 1240,
    comments: 56
  },
  {
    id: 2,
    title: "Mandala Design",
    thumbnail: "https://images.unsplash.com/photo-1573765727997-e02883182ba7?crop=entropy&cs=srgb&fm=jpg&w=400&h=600&fit=crop",
    videoUrl: "#",
    likes: 892,
    comments: 34
  },
  {
    id: 3,
    title: "This combo is suitable for your Place",
    thumbnail: "https://images.unsplash.com/photo-1615874694520-474822394e73?crop=entropy&cs=srgb&fm=jpg&w=400&h=600&fit=crop",
    videoUrl: "#",
    likes: 756,
    comments: 28
  },
  {
    id: 4,
    title: "35 Ayatul Kursi Acrylic Islamic Wall Art",
    thumbnail: "https://images.pexels.com/photos/2233416/pexels-photo-2233416.jpeg?w=400&h=600&fit=crop",
    videoUrl: "#",
    likes: 1123,
    comments: 67
  }
];

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