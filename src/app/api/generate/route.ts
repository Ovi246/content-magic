import prisma from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const { userId } = auth();
    const user = await currentUser();
    const { title, description, templateUsed } = await req.json();

    if (!userId && !user) {
      return NextResponse.json("Unauthorized");
    }

    const newOutput = await prisma.user.upsert({
      where: {
        email: user?.primaryEmailAddress?.emailAddress as string,
      },
      update: {
        history: {
          create: [
            {
              title: title,
              description: description,
              templateUsed: templateUsed.name,
            },
          ],
        },
      },
      create: {
        id: userId!,
        email: user?.primaryEmailAddress?.emailAddress as string,
        name: user?.fullName as string,
        history: {
          create: [
            {
              title: title,
              description: description,
              templateUsed: templateUsed.name,
            },
          ],
        },
      },
    });

    revalidatePath("/");

    return NextResponse.json(newOutput);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
