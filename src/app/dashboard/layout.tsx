import React from "react";
import Sidebar from "./_components/sidebar";
import AiUsage from "./_components/ai-usage";
import { cn } from "@/lib/utils";

const DashboardLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="bg-gray-50 h-screen">
      <div className="md:w-64 hidden md:block fixed">
        <Sidebar />
        <AiUsage />
      </div>
      <div className="md:ml-64 bg-gray-50 h-fit pb-5">{children}</div>
    </div>
  );
};

export default DashboardLayout;
