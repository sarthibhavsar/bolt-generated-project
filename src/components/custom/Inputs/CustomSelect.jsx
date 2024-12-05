import { Check, ChevronsUpDown } from "lucide-react";
import { PropTypes } from "prop-types";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";

export const CustomSelect = ({
  data = [],
  placeholder = "Select...",
  valueField = "id",
  labelField = "name",
  width = "w-full",
  value='',
  typeSearch = true,
  onChange = () => {},
  disabled = false,
}) => {

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);

  useEffect(() => {setSelectedValue(value)}, [value])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className='font-normal'>
        <Button
          variant="outline"
          aria-expanded={open}
          className={`justify-between ${width}`}
          disabled={disabled}
        >
          {selectedValue !== null && selectedValue !== undefined
            ? data?.find((item) => item[valueField] === selectedValue)?.[labelField]
            : placeholder}
          <ChevronsUpDown className="ml-2 w-4 h-4 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`p-0 ${width}`}>
        <Command>
          { typeSearch && <CommandInput placeholder={placeholder} />}
          <CommandList>
            <CommandEmpty>No data found.</CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  key={item[valueField]}
                  value={item[valueField]}
                  onSelect={() => {
                    onChange(item[valueField]);
                    setSelectedValue(item[valueField]);
                    // setSelectedValue(item[valueField] === selectedValue ? "" : item[valueField]);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedValue === item[valueField] ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item[labelField]}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

CustomSelect.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  placeholder: PropTypes.string,
  valueField: PropTypes.any.isRequired,
  value: PropTypes.any,
  labelField: PropTypes.string.isRequired,
  width: PropTypes.string,
  onChange: PropTypes.func,
  typeSearch: PropTypes.bool,
  disabled: PropTypes.bool
};
