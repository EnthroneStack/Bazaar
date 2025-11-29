import gs_logo from "./gs_logo.jpg";
import happy_store from "./happy_store.webp";
import upload_area from "./upload_area.svg";
import hero_model_img from "./hero_model_img.png";
import hero_product_img1 from "./hero_product_img1.png";
import hero_product_img2 from "./hero_product_img2.png";
import product_img1 from "./product_img1.png";
import product_img2 from "./product_img2.png";
import product_img3 from "./product_img3.png";
import product_img4 from "./product_img4.png";
import product_img5 from "./product_img5.png";
import product_img6 from "./product_img6.png";
import product_img7 from "./product_img7.png";
import product_img8 from "./product_img8.png";
import product_img9 from "./product_img9.png";
import product_img10 from "./product_img10.png";
import product_img11 from "./product_img11.png";
import product_img12 from "./product_img12.png";
import { Headset, ClockFading, Send } from "lucide-react";
import profile_pic1 from "./profile_pic1.jpg";
import profile_pic2 from "./profile_pic2.jpg";
import profile_pic3 from "./profile_pic3.jpg";

export const assets = {
  upload_area,
  hero_model_img,
  hero_product_img1,
  hero_product_img2,
  gs_logo,
  product_img1,
  product_img2,
  product_img3,
  product_img4,
  product_img5,
  product_img6,
  product_img7,
  product_img8,
  product_img9,
  product_img10,
  product_img11,
  product_img12,
};

export const categories = [
  "Headphones",
  "Speakers",
  "Watch",
  "Earbuds",
  "Mouse",
  "Decoration",
  "Camera",
  "Pen",
  "Theater",
  "Cleaner",
];

export const stats = [
  { number: "10M+", label: "Happy Customers" },
  { number: "100+", label: "Countries Served" },
  { number: "50K+", label: "Brand Partners" },
  { number: "24/7", label: "Customer Support" },
];

export const milestones = [
  {
    year: "2018",
    event: "Bazaar Founded",
    description: "Started with a vision to revolutionize e-commerce",
  },
  {
    year: "2019",
    event: "1M Customers",
    description: "Reached our first million happy customers",
  },
  {
    year: "2020",
    event: "Global Expansion",
    description: "Launched in 50+ countries worldwide",
  },
  {
    year: "2022",
    event: "Mobile App Launch",
    description: "Award-winning mobile shopping experience",
  },
  {
    year: "2023",
    event: "AI Integration",
    description: "Implemented advanced AI for personalized shopping",
  },
];

export const slides = [
  {
    title: "Redefine your",
    highlight: "style.",
    description:
      "Explore our latest collection designed to merge comfort with modern sophistication. Crafted with premium materials for every occasion.",
    images: [
      assets.hero_product_img1,
      assets.hero_product_img2,
      assets.product_img5,
      assets.product_img6,
    ],
    background: "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100",
    accentColor: "text-blue-600",
    buttonColor: "bg-blue-600 hover:bg-blue-700",
    layout: "text-left",
    badge: "Trending Now",
    pattern:
      "bg-[radial-gradient(circle_at_30%_70%,#3b82f620_0%,transparent_50%)]",
  },
  {
    title: "Elevate your",
    highlight: "look.",
    description:
      "Discover premium accessories that complement your unique style. Quality craftsmanship meets contemporary design.",
    images: [
      assets.product_img5,
      assets.hero_product_img1,
      assets.product_img6,
      assets.hero_product_img2,
    ],
    background: "bg-gradient-to-br from-amber-50 via-orange-50 to-red-100",
    accentColor: "text-amber-600",
    buttonColor: "bg-amber-600 hover:bg-amber-700",
    layout: "text-center",
    badge: "Limited Edition",
    pattern:
      "bg-[linear-gradient(45deg,#f59e0b10_25%,transparent_25%),linear-gradient(-45deg,#f59e0b10_25%,transparent_25%)] bg-[size:20px_20px]",
  },
  {
    title: "Unleash your",
    highlight: "potential.",
    description:
      "Innovative designs that keep you ahead of trends. Experience the perfect blend of functionality and fashion.",
    images: [
      assets.product_img6,
      assets.product_img5,
      assets.hero_product_img2,
      assets.hero_product_img1,
    ],
    background: "bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100",
    accentColor: "text-emerald-600",
    buttonColor: "bg-emerald-600 hover:bg-emerald-700",
    layout: "text-right",
    badge: "Just Launched",
    pattern:
      "bg-[radial-gradient(ellipse_at_70%_20%,#10b98120_0%,transparent_50%)]",
  },
  {
    title: "Discover new",
    highlight: "horizons.",
    description:
      "Step into the future of fashion with cutting-edge designs and sustainable materials that make a statement.",
    images: [
      assets.hero_product_img2,
      assets.product_img6,
      assets.hero_product_img1,
      assets.product_img5,
    ],
    background: "bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-100",
    accentColor: "text-rose-600",
    buttonColor: "bg-rose-600 hover:bg-rose-700",
    layout: "text-left",
    badge: "Exclusive",
    pattern:
      "bg-[conic-gradient(from_90deg_at_50%_50%,#ec489920_0%,transparent_50%)]",
  },
];

// export const dummyRatingsData = [
//   {
//     id: "rat_1",
//     rating: 4.2,
//     review:
//       "I was a bit skeptical at first, but this product turned out to be even better than I imagined. The quality feels premium, it's easy to use, and it delivers exactly what was promised. I've already recommended it to friends and will definitely purchase again in the future.",
//     user: { name: "Kristin Watson", image: profile_pic1 },
//     productId: "prod_1",
//     createdAt: "Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)",
//     updatedAt: "Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)",
//     product: {
//       name: "Bluetooth Speakers",
//       category: "Electronics",
//       id: "prod_1",
//     },
//   },
//   {
//     id: "rat_2",
//     rating: 5.0,
//     review:
//       "This product is great. I love it!  You made it so simple. My new site is so much faster and easier to work with than my old site.",
//     user: { name: "Jenny Wilson", image: profile_pic2 },
//     productId: "prod_2",
//     createdAt: "Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)",
//     updatedAt: "Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)",
//     product: {
//       name: "Bluetooth Speakers",
//       category: "Electronics",
//       id: "prod_1",
//     },
//   },
//   {
//     id: "rat_3",
//     rating: 4.1,
//     review:
//       "This product is amazing. I love it!  You made it so simple. My new site is so much faster and easier to work with than my old site.",
//     user: { name: "Bessie Cooper", image: profile_pic3 },
//     productId: "prod_3",
//     createdAt: "Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)",
//     updatedAt: "Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)",
//     product: {
//       name: "Bluetooth Speakers",
//       category: "Electronics",
//       id: "prod_1",
//     },
//   },
//   {
//     id: "rat_4",
//     rating: 5.0,
//     review:
//       "This product is great. I love it!  You made it so simple. My new site is so much faster and easier to work with than my old site.",
//     user: { name: "Kristin Watson", image: profile_pic1 },
//     productId: "prod_4",
//     createdAt: "Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)",
//     updatedAt: "Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)",
//     product: {
//       name: "Bluetooth Speakers",
//       category: "Electronics",
//       id: "prod_1",
//     },
//   },
//   {
//     id: "rat_5",
//     rating: 4.3,
//     review:
//       "Overall, I'm very happy with this purchase. It works as described and feels durable. The only reason I didn't give it five stars is because of a small issue (such as setup taking a bit longer than expected, or packaging being slightly damaged). Still, highly recommend it for anyone looking for a reliable option.",
//     user: { name: "Jenny Wilson", image: profile_pic2 },
//     productId: "prod_5",
//     createdAt: "Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)",
//     updatedAt: "Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)",
//     product: {
//       name: "Bluetooth Speakers",
//       category: "Electronics",
//       id: "prod_1",
//     },
//   },
//   {
//     id: "rat_6",
//     rating: 5.0,
//     review:
//       "This product is great. I love it!  You made it so simple. My new site is so much faster and easier to work with than my old site.",
//     user: { name: "Bessie Cooper", image: profile_pic3 },
//     productId: "prod_6",
//     createdAt: "Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)",
//     updatedAt: "Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)",
//     product: {
//       name: "Bluetooth Speakers",
//       category: "Electronics",
//       id: "prod_1",
//     },
//   },
// ];

export const reviewData = [
  // Reviews for Product 1 - Modern table lamp
  {
    id: "rev_1",
    productId: "prod_1",
    rating: 4.2,
    comment:
      "Love the design! Perfect for my bedside table. The warm light is very relaxing.",
    user: { name: "Sarah Chen", avatar: profile_pic1 },
    createdAt: "2024-01-15",
  },
  {
    id: "rev_2",
    productId: "prod_1",
    rating: 3.5,
    comment:
      "Good but the light is a bit too warm for reading. Design is nice though.",
    user: { name: "Mike Rodriguez", avatar: profile_pic2 },
    createdAt: "2024-01-20",
  },
  {
    id: "rev_3",
    productId: "prod_1",
    rating: 4.8,
    comment: "Exactly what I was looking for! The build quality is excellent.",
    user: { name: "Emily Watson", avatar: profile_pic3 },
    createdAt: "2024-01-25",
  },

  // Reviews for Product 2 - Smart speaker gray
  {
    id: "rev_4",
    productId: "prod_2",
    rating: 2.5,
    comment:
      "Connectivity issues and sound quality is mediocre. Not worth the price.",
    user: { name: "Alex Kumar", avatar: profile_pic1 },
    createdAt: "2024-01-18",
  },
  {
    id: "rev_5",
    productId: "prod_2",
    rating: 4.0,
    comment:
      "Good for the price, but lacks bass. Voice assistant works well though.",
    user: { name: "Lisa Wang", avatar: profile_pic2 },
    createdAt: "2024-01-22",
  },

  // Reviews for Product 3 - Smart watch white
  {
    id: "rev_6",
    productId: "prod_3",
    rating: 5.0,
    comment: "Best smartwatch I've ever owned! Battery life is incredible.",
    user: { name: "David Kim", avatar: profile_pic3 },
    createdAt: "2024-01-10",
  },
  {
    id: "rev_7",
    productId: "prod_3",
    rating: 4.3,
    comment: "Great features but the band is uncomfortable after long wear.",
    user: { name: "Maria Garcia", avatar: profile_pic1 },
    createdAt: "2024-01-12",
  },
  {
    id: "rev_8",
    productId: "prod_3",
    rating: 4.7,
    comment: "Love the health tracking features. Very accurate step counter.",
    user: { name: "James Wilson", avatar: profile_pic2 },
    createdAt: "2024-01-14",
  },
  {
    id: "rev_9",
    productId: "prod_3",
    rating: 3.8,
    comment: "Good but the app needs improvement. Hardware is solid though.",
    user: { name: "Sophie Martin", avatar: profile_pic3 },
    createdAt: "2024-01-16",
  },

  // Reviews for Product 4 - Wireless headphones
  {
    id: "rev_10",
    productId: "prod_4",
    rating: 4.5,
    comment: "Excellent noise cancellation! Battery life is as advertised.",
    user: { name: "Tom Anderson", avatar: profile_pic1 },
    createdAt: "2024-01-08",
  },
  {
    id: "rev_11",
    productId: "prod_4",
    rating: 3.0,
    comment: "Comfortable but sound quality could be better for the price.",
    user: { name: "Priya Patel", avatar: profile_pic2 },
    createdAt: "2024-01-11",
  },

  // Reviews for Product 5 - Smart watch black
  {
    id: "rev_12",
    productId: "prod_5",
    rating: 4.9,
    comment: "Absolutely love this watch! The black finish looks premium.",
    user: { name: "Chris Lee", avatar: profile_pic3 },
    createdAt: "2024-01-19",
  },
  {
    id: "rev_13",
    productId: "prod_5",
    rating: 4.1,
    comment:
      "Great watch, but the screen scratches easily. Recommend a screen protector.",
    user: { name: "Anna Taylor", avatar: profile_pic1 },
    createdAt: "2024-01-21",
  },

  // Reviews for Product 6 - Security Camera
  {
    id: "rev_14",
    productId: "prod_6",
    rating: 4.6,
    comment: "Easy to set up and the night vision works great!",
    user: { name: "Robert Brown", avatar: profile_pic2 },
    createdAt: "2024-01-07",
  },
  {
    id: "rev_15",
    productId: "prod_6",
    rating: 3.2,
    comment:
      "Motion detection is too sensitive. Gets triggered by small animals.",
    user: { name: "Jennifer Lopez", avatar: profile_pic3 },
    createdAt: "2024-01-09",
  },
  {
    id: "rev_16",
    productId: "prod_6",
    rating: 4.4,
    comment: "Good value for money. Video quality is clear even at night.",
    user: { name: "Daniel Smith", avatar: profile_pic1 },
    createdAt: "2024-01-13",
  },
  {
    id: "rev_17",
    productId: "prod_7",
    rating: 4.7,
    comment: "Great pen for note-taking! Very responsive.",
    user: { name: "Emma Wilson", avatar: profile_pic2 },
    createdAt: "2024-01-17",
  },
  {
    id: "rev_18",
    productId: "prod_8",
    rating: 4.2,
    comment: "Impressive sound quality for a home theater system.",
    user: { name: "Michael Brown", avatar: profile_pic3 },
    createdAt: "2024-01-19",
  },
];

export const dummyStoreData = {
  id: "store_1",
  userId: "user_1",
  name: "Happy Shop",
  description:
    "At Happy Shop, we believe shopping should be simple, smart, and satisfying. Whether you're hunting for the latest fashion trends, top-notch electronics, home essentials, or unique lifestyle products — we've got it all under one digital roof.",
  username: "happyshop",
  address:
    "3rd Floor, Happy Shop , New Building, 123 street , c sector , NY, US",
  status: "approved",
  isActive: true,
  logo: happy_store,
  email: "happyshop@example.com",
  contact: "+0 1234567890",
  createdAt: "2025-09-04T09:04:16.189Z",
  updatedAt: "2025-09-04T09:04:44.273Z",
  user: {
    id: "user_31dOriXqC4TATvc0brIhlYbwwc5",
    name: "Great Stack",
    email: "user.greatstack@gmail.com",
    image: gs_logo,
  },
};

// export const productDummyData = [
//   {
//     id: "prod_1",
//     name: "Modern table lamp",
//     description:
//       "Modern table lamp with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty. Enhance your audio experience with this earbuds. Indulge yourself in a world of pure sound with 50 hours of uninterrupted playtime. Equipped with the cutting-edge Zen Mode Tech ENC and BoomX Tech, prepare to be enthralled by a symphony of crystal-clear melodies.",
//     mrp: 40,
//     price: 29,
//     images: [product_img1, product_img2, product_img3, product_img4],
//     category: "Decoration",
//     storeId: "seller_1",
//     inStock: true,
//     store: dummyStoreData,
//     rating: dummyRatingsData,
//     createdAt: "Sat Jul 29 2025 14:51:25 GMT+0530 (India Standard Time)",
//     updatedAt: "Sat Jul 29 2025 14:51:25 GMT+0530 (India Standard Time)",
//   },
//   {
//     id: "prod_2",
//     name: "Smart speaker gray",
//     description:
//       "Smart speaker with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
//     mrp: 50,
//     price: 29,
//     images: [product_img2],
//     storeId: "seller_1",
//     inStock: true,
//     store: dummyStoreData,
//     category: "Speakers",
//     rating: dummyRatingsData,
//     createdAt: "Sat Jul 28 2025 14:51:25 GMT+0530 (India Standard Time)",
//     updatedAt: "Sat Jul 28 2025 14:51:25 GMT+0530 (India Standard Time)",
//   },
//   {
//     id: "prod_3",
//     name: "Smart watch white",
//     description:
//       "Smart watch with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
//     mrp: 60,
//     price: 29,
//     images: [product_img3],
//     storeId: "seller_1",
//     inStock: true,
//     store: dummyStoreData,
//     category: "Watch",
//     rating: dummyRatingsData,
//     createdAt: "Sat Jul 27 2025 14:51:25 GMT+0530 (India Standard Time)",
//     updatedAt: "Sat Jul 27 2025 14:51:25 GMT+0530 (India Standard Time)",
//   },
//   {
//     id: "prod_4",
//     name: "Wireless headphones",
//     description:
//       "Wireless headphones with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
//     mrp: 70,
//     price: 29,
//     images: [product_img4],
//     storeId: "seller_1",
//     inStock: true,
//     store: dummyStoreData,
//     category: "Headphones",
//     rating: dummyRatingsData,
//     createdAt: "Sat Jul 26 2025 14:51:25 GMT+0530 (India Standard Time)",
//     updatedAt: "Sat Jul 26 2025 14:51:25 GMT+0530 (India Standard Time)",
//   },
//   {
//     id: "prod_5",
//     name: "Smart watch black",
//     description:
//       "Smart watch with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
//     mrp: 49,
//     price: 29,
//     images: [product_img5],
//     storeId: "seller_1",
//     inStock: true,
//     store: dummyStoreData,
//     category: "Watch",
//     rating: [...dummyRatingsData, ...dummyRatingsData],
//     createdAt: "Sat Jul 25 2025 14:51:25 GMT+0530 (India Standard Time)",
//     updatedAt: "Sat Jul 25 2025 14:51:25 GMT+0530 (India Standard Time)",
//   },
//   {
//     id: "prod_6",
//     name: "Security Camera",
//     description:
//       "Security Camera with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
//     mrp: 59,
//     price: 29,
//     images: [product_img6],
//     storeId: "seller_1",
//     inStock: true,
//     store: dummyStoreData,
//     category: "Camera",
//     rating: [...dummyRatingsData, ...dummyRatingsData],
//     createdAt: "Sat Jul 25 2025 14:51:25 GMT+0530 (India Standard Time)",
//     updatedAt: "Sat Jul 25 2025 14:51:25 GMT+0530 (India Standard Time)",
//   },
//   {
//     id: "prod_7",
//     name: "Smart Pen for iPad",
//     description:
//       "Smart Pen for iPad with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
//     mrp: 89,
//     price: 29,
//     images: [product_img7],
//     storeId: "seller_1",
//     inStock: true,
//     store: dummyStoreData,
//     category: "Pen",
//     rating: [...dummyRatingsData, ...dummyRatingsData],
//     createdAt: "Sat Jul 24 2025 14:51:25 GMT+0530 (India Standard Time)",
//     updatedAt: "Sat Jul 24 2025 14:51:25 GMT+0530 (India Standard Time)",
//   },
//   {
//     id: "prod_8",
//     name: "Home Theater",
//     description:
//       "Home Theater with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
//     mrp: 99,
//     price: 29,
//     images: [product_img8],
//     storeId: "seller_1",
//     inStock: true,
//     store: dummyStoreData,
//     category: "Theater",
//     rating: [...dummyRatingsData, ...dummyRatingsData],
//     createdAt: "Sat Jul 23 2025 14:51:25 GMT+0530 (India Standard Time)",
//     updatedAt: "Sat Jul 23 2025 14:51:25 GMT+0530 (India Standard Time)",
//   },
//   {
//     id: "prod_9",
//     name: "Apple Wireless Earbuds",
//     description:
//       "Apple Wireless Earbuds with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
//     mrp: 89,
//     price: 29,
//     images: [product_img9],
//     storeId: "seller_1",
//     inStock: true,
//     store: dummyStoreData,
//     category: "Earbuds",
//     rating: [...dummyRatingsData, ...dummyRatingsData],
//     createdAt: "Sat Jul 22 2025 14:51:25 GMT+0530 (India Standard Time)",
//     updatedAt: "Sat Jul 22 2025 14:51:25 GMT+0530 (India Standard Time)",
//   },
//   {
//     id: "prod_10",
//     name: "Apple Smart Watch",
//     description:
//       "Apple Smart Watch with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
//     mrp: 179,
//     price: 29,
//     images: [product_img10],
//     storeId: "seller_1",
//     inStock: true,
//     store: dummyStoreData,
//     category: "Watch",
//     rating: [...dummyRatingsData, ...dummyRatingsData],
//     createdAt: "Sat Jul 21 2025 14:51:25 GMT+0530 (India Standard Time)",
//     updatedAt: "Sat Jul 21 2025 14:51:25 GMT+0530 (India Standard Time)",
//   },
//   {
//     id: "prod_11",
//     name: "RGB Gaming Mouse",
//     description:
//       "RGB Gaming Mouse with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
//     mrp: 39,
//     price: 29,
//     images: [product_img11],
//     storeId: "seller_1",
//     inStock: true,
//     store: dummyStoreData,
//     category: "Mouse",
//     rating: [...dummyRatingsData, ...dummyRatingsData],
//     createdAt: "Sat Jul 20 2025 14:51:25 GMT+0530 (India Standard Time)",
//     updatedAt: "Sat Jul 20 2025 14:51:25 GMT+0530 (India Standard Time)",
//   },
//   {
//     id: "prod_12",
//     name: "Smart Home Cleaner",
//     description:
//       "Smart Home Cleaner with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
//     mrp: 199,
//     price: 29,
//     images: [product_img12],
//     storeId: "seller_1",
//     inStock: true,
//     store: dummyStoreData,
//     category: "Cleaner",
//     rating: [...dummyRatingsData, ...dummyRatingsData],
//     createdAt: "Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)",
//     updatedAt: "Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)",
//   },
// ];

export const productDummyData = [
  {
    id: "prod_1",
    name: "Modern table lamp",
    description:
      "Modern table lamp with a sleek design. It's perfect for any room.",
    mrp: 40,
    price: 29,
    images: [product_img1, product_img2, product_img3, product_img4],
    category: "Decoration",
    storeId: "seller_1",
    inStock: true,
    store: dummyStoreData,
    createdAt: "2024-01-10T09:00:00 GMT+0100 (West Africa Time)",
    updatedAt: "2024-01-10T09:00:00 GMT+0100 (West Africa Time)",
  },
  {
    id: "prod_2",
    name: "Smart speaker gray",
    description:
      "Smart speaker with excellent sound quality and voice assistant.",
    mrp: 50,
    price: 29,
    images: [product_img2],
    category: "Speakers",
    storeId: "seller_1",
    inStock: true,
    store: dummyStoreData,
    createdAt: "2024-01-15T09:00:00 GMT+0100 (West Africa Time)",
    updatedAt: "2024-01-15T09:00:00 GMT+0100 (West Africa Time)",
  },
  {
    id: "prod_3",
    name: "Smart watch white",
    description:
      "Feature-rich smartwatch with health monitoring and long battery life.",
    mrp: 60,
    price: 29,
    images: [product_img3],
    category: "Watch",
    storeId: "seller_1",
    inStock: true,
    store: dummyStoreData,
    createdAt: "2024-01-05T09:00:00 GMT+0100 (West Africa Time)",
    updatedAt: "2024-01-05T09:00:00 GMT+0100 (West Africa Time)",
  },
  {
    id: "prod_4",
    name: "Wireless headphones",
    description: "Premium wireless headphones with noise cancellation.",
    mrp: 70,
    price: 29,
    images: [product_img4],
    category: "Headphones",
    storeId: "seller_1",
    inStock: true,
    store: dummyStoreData,
    createdAt: "2024-01-03T09:00:00 GMT+0100 (West Africa Time)",
    updatedAt: "2024-01-03T09:00:00 GMT+0100 (West Africa Time)",
  },
  {
    id: "prod_5",
    name: "Smart watch black",
    description: "Sleek black smartwatch with advanced fitness tracking.",
    mrp: 49,
    price: 29,
    images: [product_img5],
    category: "Watch",
    storeId: "seller_1",
    inStock: true,
    store: dummyStoreData,
    createdAt: "2024-01-12T09:00:00 GMT+0100 (West Africa Time)",
    updatedAt: "2024-01-12T09:00:00 GMT+0100 (West Africa Time)",
  },
  {
    id: "prod_6",
    name: "Security Camera",
    description: "HD security camera with night vision and motion detection.",
    mrp: 59,
    price: 29,
    images: [product_img6],
    category: "Camera",
    storeId: "seller_1",
    inStock: true,
    store: dummyStoreData,
    createdAt: "2024-01-02T09:00:00 GMT+0100 (West Africa Time)",
    updatedAt: "2024-01-02T09:00:00 GMT+0100 (West Africa Time)",
  },
  {
    id: "prod_7",
    name: "Smart Pen for iPad",
    description:
      "Smart Pen for iPad with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
    mrp: 89,
    price: 29,
    images: [product_img7],
    storeId: "seller_1",
    inStock: true,
    store: dummyStoreData,
    category: "Pen",
    createdAt: "Sat Jul 24 2025 11:21:25 GMT+0100 (West Africa Time)",
    updatedAt: "Sat Jul 24 2025 11:21:25 GMT+0100 (West Africa Time)",
  },
  {
    id: "prod_8",
    name: "Home Theater",
    description:
      "Home Theater with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
    mrp: 99,
    price: 29,
    images: [product_img8],
    storeId: "seller_1",
    inStock: true,
    store: dummyStoreData,
    category: "Theater",
    createdAt: "Sat Jul 23 2025 11:21:25 GMT+0100 (West Africa Time)",
    updatedAt: "Sat Jul 23 2025 11:21:25 GMT+0100 (West Africa Time)",
  },
  {
    id: "prod_9",
    name: "Apple Wireless Earbuds",
    description:
      "Apple Wireless Earbuds with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
    mrp: 89,
    price: 29,
    images: [product_img9],
    storeId: "seller_1",
    inStock: true,
    store: dummyStoreData,
    category: "Earbuds",
    createdAt: "Sat Jul 22 2025 11:21:25 GMT+0100 (West Africa Time)",
    updatedAt: "Sat Jul 22 2025 11:21:25 GMT+0100 (West Africa Time)",
  },
  {
    id: "prod_10",
    name: "Apple Smart Watch",
    description:
      "Apple Smart Watch with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
    mrp: 179,
    price: 29,
    images: [product_img10],
    storeId: "seller_1",
    inStock: true,
    store: dummyStoreData,
    category: "Watch",
    createdAt: "Sat Jul 21 2025 11:21:25 GMT+0100 (West Africa Time)",
    updatedAt: "Sat Jul 21 2025 11:21:25 GMT+0100 (West Africa Time)",
  },
  {
    id: "prod_11",
    name: "RGB Gaming Mouse",
    description:
      "RGB Gaming Mouse with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
    mrp: 39,
    price: 29,
    images: [product_img11],
    storeId: "seller_1",
    inStock: true,
    store: dummyStoreData,
    category: "Mouse",
    createdAt: "Sat Jul 20 2025 11:21:25 GMT+0100 (West Africa Time)",
    updatedAt: "Sat Jul 20 2025 11:21:25 GMT+0100 (West Africa Time)",
  },
  {
    id: "prod_12",
    name: "Smart Home Cleaner",
    description:
      "Smart Home Cleaner with a sleek design. It's perfect for any room. It's made of high-quality materials and comes with a lifetime warranty.",
    mrp: 199,
    price: 29,
    images: [product_img12],
    storeId: "seller_1",
    inStock: true,
    store: dummyStoreData,
    category: "Cleaner",
    createdAt: "Sat Jul 19 2025 11:21:25 GMT+0100 (West Africa Time)",
    updatedAt: "Sat Jul 19 2025 11:21:25 GMT+0100 (West Africa Time)",
  },
];

export const ourSpecsData = [
  {
    title: "Free Shipping",
    description:
      "Enjoy fast, free delivery on every order no conditions, just reliable doorstep.",
    icon: Send,
    accent: "#0a2744",
  },
  {
    title: "7 Days easy Return",
    description: "Change your mind? No worries. Return any item within 7 days.",
    icon: ClockFading,
    accent: "#0d97d9",
  },
  {
    title: "24/7 Customer Support",
    description:
      "We're here for you. Get expert help with our customer support.",
    icon: Headset,
    accent: "#b3ddf6",
  },
];

export const addressDummyData = {
  id: "addr_1",
  userId: "user_1",
  name: "John Doe",
  email: "johndoe@example.com",
  street: "123 Main St",
  city: "New York",
  state: "NY",
  zip: "10001",
  country: "USA",
  phone: "1234567890",
  createdAt: "Sat Jul 19 2025 14:51:25 GMT+0530 (India Standard Time)",
};

export const couponDummyData = [
  {
    code: "NEW20",
    description: "20% Off for New Users",
    discount: 20,
    forNewUser: true,
    forMember: false,
    isPublic: false,
    expiresAt: "2026-12-31T00:00:00.000Z",
    createdAt: "2025-08-22T08:35:31.183Z",
  },
  {
    code: "NEW10",
    description: "10% Off for New Users",
    discount: 10,
    forNewUser: true,
    forMember: false,
    isPublic: false,
    expiresAt: "2026-12-31T00:00:00.000Z",
    createdAt: "2025-08-22T08:35:50.653Z",
  },
  {
    code: "OFF20",
    description: "20% Off for All Users",
    discount: 20,
    forNewUser: false,
    forMember: false,
    isPublic: false,
    expiresAt: "2026-12-31T00:00:00.000Z",
    createdAt: "2025-08-22T08:42:00.811Z",
  },
  {
    code: "OFF10",
    description: "10% Off for All Users",
    discount: 10,
    forNewUser: false,
    forMember: false,
    isPublic: false,
    expiresAt: "2026-12-31T00:00:00.000Z",
    createdAt: "2025-08-22T08:42:21.279Z",
  },
  {
    code: "PLUS10",
    description: "20% Off for Members",
    discount: 10,
    forNewUser: false,
    forMember: true,
    isPublic: false,
    expiresAt: "2027-03-06T00:00:00.000Z",
    createdAt: "2025-08-22T11:38:20.194Z",
  },
];

export const dummyUserData = {
  id: "user_31dQbH27HVtovbs13X2cmqefddM",
  name: "GreatStack",
  email: "greatstack@example.com",
  image: gs_logo,
  cart: {},
};

// export const orderDummyData = [
//   {
//     id: "cmemm75h5001jtat89016h1p3",
//     total: 214.2,
//     status: "DELIVERED",
//     userId: "user_31dQbH27HVtovbs13X2cmqefddM",
//     storeId: "cmemkqnzm000htat8u7n8cpte",
//     addressId: "cmemm6g95001ftat8omv9b883",
//     isPaid: false,
//     paymentMethod: "COD",
//     createdAt: "2025-08-22T09:15:03.929Z",
//     updatedAt: "2025-08-22T09:15:50.723Z",
//     isCouponUsed: true,
//     coupon: dummyRatingsData[2],
//     orderItems: [
//       {
//         orderId: "cmemm75h5001jtat89016h1p3",
//         productId: "cmemlydnx0017tat8h3rg92hz",
//         quantity: 1,
//         price: 89,
//         product: productDummyData[0],
//       },
//       {
//         orderId: "cmemm75h5001jtat89016h1p3",
//         productId: "cmemlxgnk0015tat84qm8si5v",
//         quantity: 1,
//         price: 149,
//         product: productDummyData[1],
//       },
//     ],
//     address: addressDummyData,
//     user: dummyUserData,
//   },
//   {
//     id: "cmemm6jv7001htat8vmm3gxaf",
//     total: 421.6,
//     status: "DELIVERED",
//     userId: "user_31dQbH27HVtovbs13X2cmqefddM",
//     storeId: "cmemkqnzm000htat8u7n8cpte",
//     addressId: "cmemm6g95001ftat8omv9b883",
//     isPaid: false,
//     paymentMethod: "COD",
//     createdAt: "2025-08-22T09:14:35.923Z",
//     updatedAt: "2025-08-22T09:15:52.535Z",
//     isCouponUsed: true,
//     coupon: couponDummyData[0],
//     orderItems: [
//       {
//         orderId: "cmemm6jv7001htat8vmm3gxaf",
//         productId: "cmemm1f3y001dtat8liccisar",
//         quantity: 1,
//         price: 229,
//         product: productDummyData[2],
//       },
//       {
//         orderId: "cmemm6jv7001htat8vmm3gxaf",
//         productId: "cmemm0nh2001btat8glfvhry1",
//         quantity: 1,
//         price: 99,
//         product: productDummyData[3],
//       },
//       {
//         orderId: "cmemm6jv7001htat8vmm3gxaf",
//         productId: "cmemlz8640019tat8kz7emqca",
//         quantity: 1,
//         price: 199,
//         product: productDummyData[4],
//       },
//     ],
//     address: addressDummyData,
//     user: dummyUserData,
//   },
// ];

export const storesDummyData = [
  {
    id: "cmemkb98v0001tat8r1hiyxhn",
    userId: "user_31dOriXqC4TATvc0brIhlYbwwc5",
    name: "GreatStack",
    description:
      "GreatStack is the education marketplace where you can buy goodies related to coding and tech",
    username: "greatstack",
    address: "123 Maplewood Drive Springfield, IL 62704 USA",
    status: "approved",
    isActive: true,
    logo: gs_logo,
    email: "greatstack@example.com",
    contact: "+0 1234567890",
    createdAt: "2025-08-22T08:22:16.189Z",
    updatedAt: "2025-08-22T08:22:44.273Z",
    user: dummyUserData,
  },
  {
    id: "cmemkqnzm000htat8u7n8cpte",
    userId: "user_31dQbH27HVtovbs13X2cmqefddM",
    name: "Happy Shop",
    description:
      "At Happy Shop, we believe shopping should be simple, smart, and satisfying. Whether you're hunting for the latest fashion trends, top-notch electronics, home essentials, or unique lifestyle products — we've got it all under one digital roof.",
    username: "happyshop",
    address:
      "3rd Floor, Happy Shop , New Building, 123 street , c sector , NY, US",
    status: "approved",
    isActive: true,
    logo: happy_store,
    email: "happyshop@example.com",
    contact: "+0 123456789",
    createdAt: "2025-08-22T08:34:15.155Z",
    updatedAt: "2025-08-22T08:34:47.162Z",
    user: dummyUserData,
  },
];

export const dummyAdminDashboardData = {
  orders: 6,
  stores: 2,
  products: 12,
  revenue: "959.10",
  allOrders: [
    { createdAt: "2025-08-20T08:46:58.239Z", total: 145.6 },
    { createdAt: "2025-08-22T08:46:21.818Z", total: 97.2 },
    { createdAt: "2025-08-22T08:45:59.587Z", total: 54.4 },
    { createdAt: "2025-08-23T09:15:03.929Z", total: 214.2 },
    { createdAt: "2025-08-23T09:14:35.923Z", total: 421.6 },
    { createdAt: "2025-08-23T11:44:29.713Z", total: 26.1 },
    { createdAt: "2025-08-24T09:15:03.929Z", total: 214.2 },
    { createdAt: "2025-08-24T09:14:35.923Z", total: 421.6 },
    { createdAt: "2025-08-24T11:44:29.713Z", total: 26.1 },
    { createdAt: "2025-08-24T11:56:29.713Z", total: 36.1 },
    { createdAt: "2025-08-25T11:44:29.713Z", total: 26.1 },
    { createdAt: "2025-08-25T09:15:03.929Z", total: 214.2 },
    { createdAt: "2025-08-25T09:14:35.923Z", total: 421.6 },
    { createdAt: "2025-08-25T11:44:29.713Z", total: 26.1 },
    { createdAt: "2025-08-25T11:56:29.713Z", total: 36.1 },
    { createdAt: "2025-08-25T11:30:29.713Z", total: 110.1 },
  ],
};

// export const dummyStoreDashboardData = {
//   ratings: dummyRatingsData,
//   totalOrders: 2,
//   totalEarnings: 636,
//   totalProducts: 5,
// };
