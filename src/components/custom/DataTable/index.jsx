import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { plans } from "./mockData";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EyeIcon, MoreVertical, TrashIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { DataTable } from '../../index'

const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
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
    accessorKey: "zctppT_Template_Code",
    header: "Plan Type",
    enableSorting: true,
    cell: ({ row }) => <div className="capitalize">{row.getValue("zctppT_Template_Code")}</div>,
  },
  {
    accessorKey: "gcmP_Part_Number",
    header: "Part Number - Rev",
    enableSorting: true,
    cell: ({ row }) => <div className="capitalize">{row.getValue("gcmP_Part_Number")}</div>,
  },
  {
    accessorKey: "zctppT_Description",
    header: "Description",
    enableSorting: true,
    cell: ({ row }) => <div className="capitalize">{row.getValue("zctppT_Description")}</div>,
  },
  {
    accessorKey: "gcmU_Username",
    header: "Created By",
    cell: ({ row }) => <div className="capitalize">{row.getValue("gcmU_Username")}</div>,
  },
  {
    accessorKey: "zctppT_ZCTPTP_Parameters_Count",
    header: "Number Of Specs",
    enableSorting: true,
    cell: ({ row }) => (
      <div className="px-10 capitalize">{row.getValue("zctppT_ZCTPTP_Parameters_Count")}</div>
    ),
  },
  {
    accessorKey: "zctppT_Status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        className={
          row.getValue("zctppT_Status")
            ? "bg-green-100 text-green-500 hover:bg-green-100"
            : "bg-red-100 text-red-500 hover:bg-red-100"
        }
      >
        {row.getValue("zctppT_Status") ? "Active" : "Inactive"}
      </Badge>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    header: "",
    cell: ({ row }) => {
      return (
        <div className="text-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-8 h-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="flex flex-col items-start justify-center gap-2"
            >
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem className="w-full">
                <Link to={"/plan_parameters/1"}>
                  <div className="flex items-center justify-center gap-2">
                    <EyeIcon className="cursor-pointer size-5" />
                    View
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="w-full ">
                <div className="flex items-center justify-center gap-2">
                  <TrashIcon className="cursor-pointer size-5" />
                  Delete
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

const DataTableDemo = () => {
  return (
    <div className="w-full">
      <CardTitle>
        <div className="pb-2 mt-2 text-3xl font-bold ">Data Table</div>
      </CardTitle>
      <Card className="pt-2">
        <CardContent className="p-0 ">
          <DataTable data={plans} columns={columns} isGlobalSearchFilter />
        </CardContent>
      </Card>
      <br />
      <br />
    </div>
  );
};

export default DataTableDemo;
