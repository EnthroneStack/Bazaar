import { clerkClient } from "@clerk/nextjs/server";
import type { User } from "@clerk/nextjs/server";

export const authAdmin = async (userId: string): Promise<User | null> => {
  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);

    return user.privateMetadata?.role === "admin" ? user : null;
  } catch (error) {
    console.error("authAdmin error:", error);
    return null;
  }
};

export default authAdmin;
