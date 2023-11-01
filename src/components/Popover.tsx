"use client";

import * as React from "react";
import { LucideIcon } from "lucide-react";

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

type ComboboxElement = {
  value: string;
  label: string;
  icon: LucideIcon;
};

interface PopoverProps {
  comboboxElements: ComboboxElement[];
  name: string;
  placeholder: string;
  setSelectedElement: React.Dispatch<React.SetStateAction<string>>;
}

export function ComboboxPopover({
  comboboxElements,
  name,
  placeholder,
  setSelectedElement,
}: PopoverProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] =
    React.useState<ComboboxElement | null>(null);
  console.log(selectedStatus);
  return (
    <div className="flex items-center space-x-4">
      <p className="text-sm text-muted-foreground">{name}</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-[150px] justify-start"
          >
            {selectedStatus ? (
              <>
                <selectedStatus.icon className="mr-2 h-4 w-4 shrink-0" />
                {selectedStatus.label}
              </>
            ) : (
              <>{placeholder}</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput
              placeholder={"Change " + name.toLowerCase() + "..."}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {comboboxElements.map((status) => (
                  <CommandItem
                    key={status.value}
                    onSelect={(value) => {
                      setSelectedStatus(
                        comboboxElements.find(
                          (priority) => priority.value === value
                        ) || null
                      );
                      setSelectedElement(
                        comboboxElements.find(
                          (priority) => priority.value === value
                        )?.label || ""
                      );
                      setOpen(false);
                    }}
                  >
                    <status.icon
                      className={cn(
                        "mr-2 h-4 w-4",
                        status.value === selectedStatus?.value
                          ? "opacity-100"
                          : "opacity-40"
                      )}
                    />
                    <span>{status.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
