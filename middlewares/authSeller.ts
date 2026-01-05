import prisma from "@/lib/prisma";

const authSeller = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        store: {
          select: {
            id: true,
            name: true,
            logo: true,
            username: true,
            status: true,
            isActive: true,
          },
        },
      },
    });
    if (!user?.store) return null;
    if (user.store.status !== "APPROVED") return null;
    if (!user.store.isActive) return null;

    return user.store;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default authSeller;
