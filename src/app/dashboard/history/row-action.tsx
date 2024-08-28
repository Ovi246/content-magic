import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Row, RowData, Table } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import React from "react";

import { CellContext } from "@tanstack/react-table";
import { History } from "./columns";

interface EditCellProps {
  row: Row<History>;
  table: Table<History>;
}

declare module "@tanstack/table-core" {
  interface TableMeta<TData extends RowData> {
    onEdit: (row: History) => void;
    onDelete: (row: History) => void;
  }
}

const DataTableRowActions = ({ row, table }: EditCellProps) => {
  const meta = table.options.meta;
  console.log(meta);
  // const onEdit = (row: any) => {
  //   alert("Pressed");
  //   console.log(row);
  // };
  // const onDelete = (row: any) => {
  //   alert("Pressed");
  // };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            meta && meta.onEdit(row.original);
          }}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            meta && meta.onDelete(row.original);
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DataTableRowActions;
