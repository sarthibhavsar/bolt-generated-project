import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";

function SplitButton({ options = [], className = "" }) {
  const [primary, setPrimary] = useState({});

  return (
    <div className={`flex ${className}`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="default"
            className="border-r rounded-r-none border-r-primary-foreground w-full"
            onClick={() => {
              if (primary.onClick) primary.onClick();
            }}
          >
            <span className="w-3/4 flex justify-center items-center">{primary.label || "Export"}</span>
            <span className="w-1/4 flex justify-end items-center">
              <ChevronDownIcon className="w-4 h-4" />
            </span>
            <span className="sr-only">More options</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {options.map((option, index) => (
            <DropdownMenuItem
              key={index}
              onClick={() => {
                option.onClick();
                setPrimary(option);
              }}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export { SplitButton };
