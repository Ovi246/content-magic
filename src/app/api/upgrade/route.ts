import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { auth, currentUser } from "@clerk/nextjs/server";
import { fetchUserData } from "@/app/dashboard/history/user";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export async function POST(req: Request, res: Response) {
  try {
    const { userId } = auth();
    const user = await fetchUserData();

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const stripeCustomer = await stripe.customers.create({
      email: user.email,
    });

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        Customer: {
          upsert: {
            create: {
              stripe_customerId: stripeCustomer.id,
              Purchase: {
                create: {
                  credit: 10000,
                },
              },
            },
            update: {
              Purchase: {
                create: {
                  credit: 10000,
                },
              },
            },
          },
        },
      },
      include: {
        Customer: true,
      },
    });

    const session: Stripe.Checkout.Session =
      await stripe?.checkout.sessions.create({
        customer: updatedUser.Customer?.stripe_customerId,
        success_url: `http://localhost:3000/dashboard`,
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: "usd",
              unit_amount: 1000,
              product_data: {
                name: "10,000 AI Credit",
                description: "10$ worth ai credits",
              },
            },
          },
        ],
        mode: "payment",
        cancel_url: `http://localhost:3000`,
        metadata: {
          userId: userId,
        },
      });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Detailed error:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
