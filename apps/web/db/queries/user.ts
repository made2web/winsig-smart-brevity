import { db } from "@/db";
import { users } from "@/db/schema";

export async function createUser(userData: any) {
  try {
    const userWithTimestamps = {
      ...userData,
      updatedAt: new Date(),
    };

    const result = await db.insert(users).values(userWithTimestamps);
    return result;
  } catch (error: any) {
    console.error("Failed to create user:", error.message);
    throw error;
  }
}
