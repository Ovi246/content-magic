import prisma from "@/lib/db";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { currentUser } from "@clerk/nextjs/server";
import { createColumns, History as Data } from "./columns";
import { DataTable } from "./data-table";
import ServerComponent from "./_components/server-component";

const History = () => {
  return <ServerComponent />;
};

export default History;
