import prisma from "@/lib/prisma";

async function main() {
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
        {
          name: "Laptops",
          slug: "laptops",
          parentId: electronics.id,
        },
        {
          name: "Accessories",
          slug: "accessories",
          parentId: electronics.id,
        },
      ],
      skipDuplicates: true,
    });

    console.log("Electronics subcategories seeded");
  }
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
