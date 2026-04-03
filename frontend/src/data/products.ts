export interface Product {
  id?: string;
  _id?: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  subcategory: string;
  subSubcategory?: string;
  sizes: string[];
  badge?: string;
  colors?: (string | { name: string; code: string })[];
  fabric?: string;
  sleeveType?: string;
  sportType?: string;
  stock: number;
  fit?: string;
  description?: string;
}

export interface CartItem extends Product {
  selectedSize: string;
  selectedColor?: string | { name: string; code: string };
  quantity: number;
}

export const categories = [
  {
    id: "1",
    name: "Men",
    subcategories: [
      { name: "T-shirts", subcategories: ["Oversized", "Full Sleeve", "Polo", "Zipper"] },
      { name: "Shirts", subcategories: ["Linen", "Viscose", "Back Print", "Party Wear", "Half Sleeve", "Plus Size"] },
      { name: "Pants", subcategories: ["Jeans", "Linen Pants", "Formal Pants", "Track Pants"] },
      { name: "Sportswear", subcategories: ["Active T-Shirts", "Jerseys", "Active Shorts", "Sleeveless", "Track Pants"] },
      { name: "Hoodies & Jackets", subcategories: ["Zip-up", "Pullover"] },
      { name: "Innerwear", subcategories: ["Trunks", "Briefs", "Upper"] }
    ]
  },
  {
    id: "2",
    name: "Sports",
    subcategories: [
      { name: "Cricket", subcategories: ["Cricket Bats", "Cricket Balls", "Accessories"] },
      { name: "Football", subcategories: ["Football", "Accessories"] },
      { name: "Badminton", subcategories: ["Rackets", "Shuttle"] },
      { name: "Other Sports", subcategories: [] }
    ]
  },
  {
    id: "3",
    name: "Combo Offers",
    subcategories: [
      { name: "T-shirt Combos", subcategories: ["Pack of 3", "Pack of 5"] },
      { name: "Shirt Combos", subcategories: [] },
      { name: "Sportswear Combos", subcategories: [] },
      { name: "Seasonal Offers", subcategories: [] }
    ]
  },
  {
    id: "4",
    name: "Custom Printing",
    subcategories: [
      { name: "Custom Jerseys", subcategories: [] },
      { name: "Custom T-shirt", subcategories: [] },
      { name: "Team Kits", subcategories: [] }
    ]
  }
];

export const API_BASE_URL = "http://localhost:5000";
