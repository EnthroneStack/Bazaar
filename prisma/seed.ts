import prisma from "./seedClient";

function isNotNull<T>(value: T | null): value is T {
  return value !== null;
}

async function main() {
  // --------------------
  // Tags
  // --------------------
  await prisma.tag.createMany({
    data: [
      { name: "Featured", slug: "featured", isSystem: true },
      { name: "New Arrival", slug: "new-arrival", isSystem: true },
      { name: "Best Seller", slug: "best-seller", isSystem: true },
      { name: "Clearance", slug: "clearance", isSystem: true },
      { name: "Limited Edition", slug: "limited-edition", isSystem: true },
      { name: "Seasonal", slug: "seasonal", isSystem: true },
      { name: "Premium", slug: "premium", isSystem: true },
      { name: "Eco-Friendly", slug: "eco-friendly", isSystem: true },
    ],
    skipDuplicates: true,
  });

  console.log("Tags seeded");

  // --------------------
  // Root Categories
  // --------------------
  await prisma.category.createMany({
    data: [
      { name: "Electronics", slug: "electronics" },
      { name: "Fashion", slug: "fashion" },
      { name: "Home & Kitchen", slug: "home-kitchen" },
      { name: "Beauty & Personal Care", slug: "beauty-personal-care" },
      { name: "Sports & Outdoors", slug: "sports-outdoors" },
    ],
    skipDuplicates: true,
  });

  console.log("Root categories seeded");

  // --------------------
  // Electronics
  // --------------------
  const electronics = await prisma.category.findUnique({
    where: { slug: "electronics" },
    select: { id: true },
  });

  if (electronics) {
    await prisma.category.createMany({
      data: [
        {
          name: "Mobile Phones",
          slug: "mobile-phones",
          parentId: electronics.id,
        },
        { name: "Laptops", slug: "laptops", parentId: electronics.id },
        { name: "Tablets", slug: "tablets", parentId: electronics.id },
        {
          name: "Accessories",
          slug: "electronics-accessories",
          parentId: electronics.id,
        },
        {
          name: "Smart Home Devices",
          slug: "smart-home-devices",
          parentId: electronics.id,
        },
      ],
      skipDuplicates: true,
    });

    console.log("Electronics subcategories seeded");
  }

  // --------------------
  // Fashion
  // --------------------
  const fashion = await prisma.category.findUnique({
    where: { slug: "fashion" },
    select: { id: true },
  });

  if (fashion) {
    await prisma.category.createMany({
      data: [
        { name: "Men's Clothing", slug: "mens-clothing", parentId: fashion.id },
        {
          name: "Women's Clothing",
          slug: "womens-clothing",
          parentId: fashion.id,
        },
        { name: "Shoes", slug: "shoes", parentId: fashion.id },
        { name: "Bags", slug: "bags", parentId: fashion.id },
        {
          name: "Accessories",
          slug: "fashion-accessories",
          parentId: fashion.id,
        },
      ],
      skipDuplicates: true,
    });

    console.log("Fashion subcategories seeded");
  }

  // --------------------
  // Home & Kitchen
  // --------------------
  const homeKitchen = await prisma.category.findUnique({
    where: { slug: "home-kitchen" },
    select: { id: true },
  });

  if (homeKitchen) {
    await prisma.category.createMany({
      data: [
        { name: "Furniture", slug: "furniture", parentId: homeKitchen.id },
        {
          name: "Kitchen Appliances",
          slug: "kitchen-appliances",
          parentId: homeKitchen.id,
        },
        { name: "Cookware", slug: "cookware", parentId: homeKitchen.id },
        { name: "Home Decor", slug: "home-decor", parentId: homeKitchen.id },
        {
          name: "Storage & Organization",
          slug: "storage-organization",
          parentId: homeKitchen.id,
        },
      ],
      skipDuplicates: true,
    });

    console.log("Home & Kitchen subcategories seeded");
  }

  // --------------------
  // Beauty & Personal Care
  // --------------------
  const beauty = await prisma.category.findUnique({
    where: { slug: "beauty-personal-care" },
    select: { id: true },
  });

  if (beauty) {
    await prisma.category.createMany({
      data: [
        { name: "Skincare", slug: "skincare", parentId: beauty.id },
        { name: "Hair Care", slug: "hair-care", parentId: beauty.id },
        { name: "Makeup", slug: "makeup", parentId: beauty.id },
        { name: "Fragrances", slug: "fragrances", parentId: beauty.id },
        {
          name: "Personal Care Tools",
          slug: "personal-care-tools",
          parentId: beauty.id,
        },
      ],
      skipDuplicates: true,
    });

    console.log("Beauty & Personal Care subcategories seeded");
  }

  // --------------------
  // Sports & Outdoors
  // --------------------
  const sports = await prisma.category.findUnique({
    where: { slug: "sports-outdoors" },
    select: { id: true },
  });

  if (sports) {
    await prisma.category.createMany({
      data: [
        {
          name: "Fitness Equipment",
          slug: "fitness-equipment",
          parentId: sports.id,
        },
        { name: "Outdoor Gear", slug: "outdoor-gear", parentId: sports.id },
        { name: "Sportswear", slug: "sportswear", parentId: sports.id },
        { name: "Cycling", slug: "cycling", parentId: sports.id },
        {
          name: "Camping & Hiking",
          slug: "camping-hiking",
          parentId: sports.id,
        },
      ],
      skipDuplicates: true,
    });

    console.log("Sports & Outdoors subcategories seeded");
  }

  const store = await prisma.store.findFirst();
  if (!store) {
    throw new Error("No store found. Seed a store first.");
  }

  const categories = await prisma.category.findMany({
    where: { parentId: { not: null } },
    take: 5,
  });

  const users = await Promise.all(
    Array.from({ length: 5 }).map((_, i) =>
      prisma.user
        .create({
          data: {
            id: `seed-user-${i + 1}`,
            name: `Seed User ${i + 1}`,
            email: `seeduser${i + 1}@example.com`,
            image: "https://i.pravatar.cc/300",
          },
        })
        .catch(() => null),
    ),
  );

  const validUsers = users.filter(isNotNull);
  console.log("Users seeded");

  const addresses = await Promise.all(
    validUsers.map((user, i) =>
      prisma.address.create({
        data: {
          name: user!.name,
          email: user!.email,
          street: `Street ${i + 1}`,
          city: "Lagos",
          state: "Lagos",
          zip: "100001",
          country: "Nigeria",
          phone: `080000000${i}`,
          userId: user!.id,
        },
      }),
    ),
  );

  console.log("Addresses seeded");

  const products = await Promise.all(
    Array.from({ length: 5 }).map((_, i) =>
      prisma.product
        .create({
          data: {
            name: `Sample Product ${i + 1}`,
            slug: `sample-product-${i + 1}`,
            description: "Seeded product description",
            mrp: 200,
            price: 150,
            images: ["https://picsum.photos/400"],
            status: "PUBLISHED",
            storeId: store.id,
            categoryId: categories[i % categories.length].id,
            stockQuantity: 50,
          },
        })
        .catch(() => null),
    ),
  );

  const validProducts = products.filter(isNotNull);

  console.log("Products seeded");

  const orders = await Promise.all(
    validUsers.map((user, i) =>
      prisma.order.create({
        data: {
          orderNumber: `ORD-${Date.now()}-${i}`,
          orderSequence: i + 1,
          total: validProducts[i].price,
          paymentMethod: "COD",
          userId: user!.id,
          storeId: store.id,
          addressId: addresses[i].id,
          orderItems: {
            create: {
              productId: validProducts[i].id,
              quantity: 1,
              price: validProducts[i].price,
            },
          },
        },
      }),
    ),
  );

  console.log("Orders seeded");

  await Promise.all(
    orders.map((order, i) =>
      prisma.rating.create({
        data: {
          rating: 4,
          review: "Great product!",
          userId: validUsers[i].id,
          productId: validProducts[i].id,
          orderId: order.id,
        },
      }),
    ),
  );

  console.log("Ratings seeded");

  await prisma.coupon.createMany({
    data: Array.from({ length: 5 }).map((_, i) => ({
      code: `WELCOME${i + 1}`,
      description: "Seeded coupon",
      discount: 10,
      forNewUser: true,
      isPublic: true,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    })),
    skipDuplicates: true,
  });

  console.log("Coupons seeded");

  await prisma.consent.createMany({
    data: validUsers.map((u) => ({
      subjectType: "USER",
      subjectId: u.id,
      type: "TERMS",
      version: "v1",
      accepted: true,
    })),
  });

  console.log("Consents seeded");
}

main()
  .then(() => {
    console.log("🌱 Database seeding completed");
  })
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
