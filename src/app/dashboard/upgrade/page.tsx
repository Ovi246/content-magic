"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Upgrade = () => {
  const router = useRouter();

  const handlePurchase = async () => {
    const response = await axios.post("/api/upgrade");

    router.push(response.data.url);
  };
  return (
    <div className="mx-5 my-2">
      <div className="mt-5 py-6 px-4 rounded bg-white">
        <h2 className="font-medium">Upgrade Credit</h2>
      </div>
      <div className="mt-5 py-6 px-4 rounded flex justify-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>10$ One-Time Purchase</CardTitle>
            <CardDescription>
              Instantly add 10,000 credits to your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <p className="flex my-2 gap-2">
                <Check />
                100,000 words/purchase
              </p>
              <p className="flex my-2 gap-2">
                <Check />
                All template access
              </p>
              <p className="flex my-2 gap-2">
                <Check />
                Retain All History
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={handlePurchase}>Purchase</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Upgrade;
