"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Prisma } from "@prisma/client";
import DataTableRowActions from "./row-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type History = Prisma.AIOutputGetPayload<Prisma.AIOutputDefaultArgs>;

interface ColumnProps {
  onDelete: (id: string) => void;
}

export const createColumns = (
  props: ColumnProps
): ColumnDef<History, any>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="whitespace-pre-wrap">{row.original.description}</div>
    ),
  },
  {
    accessorKey: "templateUsed",
    header: "Template",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CreatedAt
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formatted = new Intl.DateTimeFormat("en-GB", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Button onClick={() => props.onDelete(row.original.id)}>Delete</Button>
    ),
  },
];
