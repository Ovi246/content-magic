import prisma from "@/lib/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
const endpointSecret =
  "whsec_b4b1b8cd30bd44ac184ab10a0bcd4c1b4c08fd57fc325c8c329b8b55771f45a7";

export async function POST(req: Request) {
  const stripe = new Stripe(
    process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string,
    {
      apiVersion: "2024-06-20",
    }
  );
  const sig = headers().get("stripe-signature");
  const body = await req.text();
  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig!, endpointSecret);

    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session?.metadata?.userId;

    if (event.type === "checkout.session.completed") {
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }

      const customer = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          total_credit: {
            increment: 10000,
          },
        },
      });

      return new NextResponse("Success", { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
