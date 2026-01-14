// await prisma.$transaction(async (tx) => {
//   const product = await tx.product.findUnique({
//     where: { id: productId },
//   });

//   if (!product) throw new Error("Product not found");

//   if (product.trackInventory) {
//     if (product.stockQuantity < quantity) {
//       throw new Error("Out of stock");
//     }

//     await tx.product.update({
//       where: { id: productId },
//       data: {
//         stockQuantity: { decrement: quantity },
//       },
//     });
//   }

//   await tx.orderItem.create({
//     data: {
//       productId,
//       orderId,
//       quantity,
//       price: product.price,
//     },
//   });
// });
