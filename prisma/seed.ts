// import prisma from "@/lib/prisma";

// async function main() {
//   await prisma.tag.createMany({
//     data: [
//       { name: "Featured", slug: "featured", isSystem: true },
//       { name: "New Arrival", slug: "new-arrival", isSystem: true },
//       { name: "Best Seller", slug: "best-seller", isSystem: true },
//       { name: "Clearance", slug: "clearance", isSystem: true },
//       { name: "Limited Edition", slug: "limited-edition", isSystem: true },
//       { name: "Seasonal", slug: "seasonal", isSystem: true },
//       { name: "Premium", slug: "premium", isSystem: true },
//       { name: "Eco-Friendly", slug: "eco-friendly", isSystem: true },
//     ],
//     skipDuplicates: true,
//   });

//   console.log("Tags seeded");

//   await prisma.category.createMany({
//     data: [
//       { name: "Electronics", slug: "electronics" },
//       { name: "Fashion", slug: "fashion" },
//       { name: "Home & Kitchen", slug: "home-kitchen" },
//       { name: "Beauty & Personal Care", slug: "beauty-personal-care" },
//       { name: "Sports & Outdoors", slug: "sports-outdoors" },
//     ],
//     skipDuplicates: true,
//   });

//   console.log("Root categories seeded");

//   const electronics = await prisma.category.findUnique({
//     where: { slug: "electronics" },
//     select: { id: true },
//   });

//   if (electronics) {
//     await prisma.category.createMany({
//       data: [
//         {
//           name: "Mobile Phones",
//           slug: "mobile-phones",
//           parentId: electronics.id,
//         },
//         {
//           name: "Laptops",
//           slug: "laptops",
//           parentId: electronics.id,
//         },
//         {
//           name: "Accessories",
//           slug: "accessories",
//           parentId: electronics.id,
//         },
//       ],
//       skipDuplicates: true,
//     });

//     console.log("Electronics subcategories seeded");
//   }
// }

// main()
//   .then(() => {
//     console.log("🌱 Database seeding completed");
//   })
//   .catch((error) => {
//     console.error("Seeding failed:", error);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

//     // ===============================
//   // SEED ORDERS (15 ORDERS)
//   // ===============================

//   const user = await prisma.user.findFirst();
//   const store = await prisma.store.findFirst({
//     include: { orderSequence: true },
//   });
//   const address = await prisma.address.findFirst({
//     where: { userId: user?.id },
//   });
//   const products = await prisma.product.findMany({
//     where: { storeId: store?.id },
//     take: 3,
//   });

//   if (!user || !store || !address || products.length === 0) {
//     console.log("⚠️ Orders seed skipped (missing user/store/address/product)");
//   } else {
//     // Ensure store order sequence exists
//     const sequence =
//       store.orderSequence ??
//       (await prisma.storeOrderSequence.create({
//         data: { storeId: store.id },
//       }));

//     for (let i = 1; i <= 15; i++) {
//       const nextSeq = sequence.lastValue + i;

//       const statusPool = [
//         "ORDER_PLACED",
//         "PROCESSING",
//         "DELIVERED",
//       ] as const;

//       const status = statusPool[i % statusPool.length];
//       const isPaid = status === "DELIVERED" || i % 2 === 0;

//       const items = products.map((product) => ({
//         productId: product.id,
//         quantity: 1,
//         price: product.price,
//       }));

//       const total = items.reduce(
//         (sum, item) => sum + item.price * item.quantity,
//         0,
//       );

//       await prisma.order.create({
//         data: {
//           orderNumber: `ORD-${store.slug.toUpperCase()}-${nextSeq}`,
//           orderSequence: nextSeq,
//           total,
//           status,
//           isPaid,
//           paymentMethod: isPaid ? "STRIPE" : "COD",
//           userId: user.id,
//           storeId: store.id,
//           addressId: address.id,
//           orderItems: {
//             create: items,
//           },
//         },
//       });
//     }

//     await prisma.storeOrderSequence.update({
//       where: { storeId: store.id },
//       data: { lastValue: sequence.lastValue + 15 },
//     });

//     console.log("📦 15 orders seeded successfully");
//   }

import prisma from "@/lib/prisma";

async function main() {
  // ===============================
  // TAGS
  // ===============================
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

  console.log("✅ Tags seeded");

  // ===============================
  // ROOT CATEGORIES
  // ===============================
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

  console.log("✅ Root categories seeded");

  // ===============================
  // SUBCATEGORIES
  // ===============================
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
        { name: "Accessories", slug: "accessories", parentId: electronics.id },
      ],
      skipDuplicates: true,
    });

    console.log("✅ Electronics subcategories seeded");
  }

  // ===============================
  // ORDERS (15)
  // ===============================
  const user = await prisma.user.findFirst();
  const store = await prisma.store.findFirst({
    include: { orderSequence: true },
  });

  if (!user || !store) {
    console.log("⚠️ Orders skipped (no user or store)");
    return;
  }

  const address = await prisma.address.findFirst({
    where: { userId: user.id },
  });

  const products = await prisma.product.findMany({
    where: { storeId: store.id },
    take: 3,
  });

  if (!address || products.length === 0) {
    console.log("⚠️ Orders skipped (missing address or products)");
    return;
  }

  // Ensure order sequence exists
  const sequence =
    store.orderSequence ??
    (await prisma.storeOrderSequence.create({
      data: { storeId: store.id },
    }));

  const statusCycle = [
    "ORDER_PLACED",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
  ] as const;

  for (let i = 1; i <= 15; i++) {
    const nextSequence = sequence.lastValue + i;
    const status = statusCycle[i % statusCycle.length];
    const isPaid = status === "DELIVERED";

    const orderItems = products.map((p) => ({
      productId: p.id,
      quantity: 1,
      price: p.price,
    }));

    const total = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    await prisma.order.create({
      data: {
        orderNumber: `ORD-${store.slug.toUpperCase()}-${nextSequence}`,
        orderSequence: nextSequence,
        total,
        status,
        isPaid,
        paymentMethod: isPaid ? "STRIPE" : "COD",
        userId: user.id,
        storeId: store.id,
        addressId: address.id,
        orderItems: {
          create: orderItems,
        },
      },
    });
  }

  await prisma.storeOrderSequence.update({
    where: { storeId: store.id },
    data: { lastValue: sequence.lastValue + 15 },
  });

  console.log("📦 15 orders seeded successfully");
}

main()
  .then(() => console.log("🌱 Database seeding completed"))
  .catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
