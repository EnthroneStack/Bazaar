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
}

main()
  .then(() => {
    console.log("Tags seeded");
  })
  .catch(console.error);
