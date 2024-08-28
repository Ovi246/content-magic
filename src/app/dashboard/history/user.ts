// server/user.ts
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

export const fetchUserData = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      email: user.primaryEmailAddress?.emailAddress as string,
    },
    include: {
      history: true,
    },
  });

  return dbUser;
};
