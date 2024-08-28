import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import React from "react";
import AiChart from "./ai-chart";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const AiUsage = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId!,
    },
    include: {
      history: true,
    },
  });

  const history = user?.history;
  let availableCredit;
  let totalUsage: number = 0;

  if (history && history?.length > 0) {
    history?.forEach((output) => {
      totalUsage = totalUsage + Number(output.description?.length);
    });

    revalidatePath("/");
  }

  availableCredit = user?.total_credit!;

  return (
    <div className="bg-white">
      <AiChart totalUsage={totalUsage} availableCredit={availableCredit} />
    </div>
  );
};

export default AiUsage;
