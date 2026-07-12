import { sql } from "drizzle-orm";

import { db, users } from "@/db";

type ClerkUserForSync = {
  id: string;
  fullName: string | null;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string;
  primaryEmailAddress: {
    emailAddress: string;
  } | null;
};

export async function syncClerkUser(user: ClerkUserForSync) {
  const email = user.primaryEmailAddress?.emailAddress;

  if (!email) {
    throw new Error("Cannot sync Clerk user without a primary email address.");
  }

  const name =
    user.fullName ||
    [user.firstName, user.lastName].filter(Boolean).join(" ") ||
    null;

  await db
    .insert(users)
    .values({
      clerkId: user.id,
      email,
      name,
      imageUrl: user.imageUrl,
    })
    .onConflictDoUpdate({
      target: users.clerkId,
      set: {
        email,
        name,
        imageUrl: user.imageUrl,
        updatedAt: sql`now()`,
      },
    });
}
