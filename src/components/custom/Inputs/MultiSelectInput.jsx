import { useCallback, useRef, useState } from "react";
import { X } from "lucide-react";
import { PropTypes } from "prop-types";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

export const MultiSelectInput = ({
  data,
  placeholder,
  valueField,
  labelField,
  onChange = () => {},
  value = [], 
  wrapperClass = "", 
}) => {
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value); 

  const [inputValue, setInputValue] = useState("");

  const handleUnselect = useCallback((item) => {
    setSelected((prev) => {
      const newSelected = prev.filter((s) => s[valueField] !== item[valueField]);
      onChange(newSelected);
      return newSelected;
    });
  }, [onChange, valueField]);

  const handleKeyDown = useCallback((e) => {
    const input = inputRef.current;
    if (input) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (input.value === "") {
          setSelected((prev) => {
            const newSelected = [...prev];
            newSelected.pop();
            onChange(newSelected);
            return newSelected;
          });
        }
      }
      if (e.key === "Escape") {
        input.blur();
      }
    }
  }, []);

  const selectables = data.filter((item) => 
    !selected.some(selectedItem => selectedItem[valueField] === item[valueField])
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible w-full bg-transparent"
    >
      <div className={`px-3 py-2 text-sm rounded-md border group border-input ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ${wrapperClass}`}>
        <div className="flex flex-wrap gap-1">
          {selected.map((item) => {
            return (
              <Badge key={item[valueField]} variant="secondary">
                {item[labelField]}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(item);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => {
                    handleUnselect(item);
                  }}
                >
                  <X className="w-3 h-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          {!!selectables.length && (
            <CommandPrimitive.Input
              ref={inputRef}
              value={inputValue}
              onValueChange={setInputValue}
              onBlur={() => setOpen(false)}
              onFocus={() => setOpen(true)}
              placeholder={placeholder}
              className="flex-1 ml-2 bg-transparent outline-none placeholder:text-muted-foreground"
            />
          )}
        </div>
      </div>
      <div className="relative">
        <CommandList>
          {open && selectables.length > 0 ? (
            <div className="absolute top-0 z-10 w-full rounded-md border shadow-md outline-none bg-popover text-popover-foreground animate-in">
              <CommandGroup className="overflow-auto h-full">
                {selectables.map((item) => {
                  return (
                    <CommandItem
                      key={item[valueField]}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={(value) => {
                        setInputValue("");
                        setSelected((prev) => [...prev, item]);
                        onChange([...selected, item]);
                      }}
                      className={"cursor-pointer"}
                    >
                      {item[labelField]}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
}

MultiSelectInput.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired, 
  placeholder: PropTypes.string,                      
  valueField: PropTypes.string.isRequired,           
  labelField: PropTypes.string.isRequired,             
  onChange: PropTypes.func,                            
  value: PropTypes.arrayOf(PropTypes.object),                            
  wrapperClass: PropTypes.string,                            
};
