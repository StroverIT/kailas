"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";

const CATEGORIES = [
  "Новини",
  "Йога практики",
  "Видове йога",
  "Знания",
  "Събития",
  "Uncategorized",
] as const;

type CategoriesMultiSelectProps = {
  value: string[];
  onChange: (categories: string[]) => void;
};

export function CategoriesMultiSelect({
  value,
  onChange,
}: CategoriesMultiSelectProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (category: string) => {
    if (value.includes(category)) {
      onChange(value.filter((c) => c !== category));
    } else {
      if (category === "Uncategorized") {
        onChange(["Uncategorized"]);
      } else if (value.includes("Uncategorized")) {
        onChange([category]);
      } else {
        onChange([...value, category]);
      }
    }
  };

  const handleRemove = (category: string) => {
    onChange(value.filter((c) => c !== category));
  };

  return (
    <div className="flex flex-col gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "justify-between",
              !value.length && "text-muted-foreground",
            )}
          >
            {value.length > 0
              ? `Избрани ${value.length} категории`
              : "Изберете категории..."}
            <X className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Търсене категории..." />
            <CommandEmpty>Не намерих категория.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                {CATEGORIES.map((category) => (
                  <CommandItem
                    key={category}
                    value={category}
                    onSelect={() => handleSelect(category)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value.includes(category) ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {category}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((category) => (
            <Badge key={category} variant="secondary">
              {category}
              <button
                onClick={() => handleRemove(category)}
                className="ml-1 rounded-full opacity-70 hover:opacity-100"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
