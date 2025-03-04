"use client";
import { Check, ChevronsUpDown } from "lucide-react";
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
import { Dispatch, SetStateAction, useState } from "react";
import { countriesCodes } from "@/utils/CountriesCodes";
type Props = {
  setCountry: Dispatch<SetStateAction<string>>;
  country: string;
};
export default function PhoneNumberCode({ setCountry, country }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between text-black">
          {country
            ? countriesCodes.find(
                (item) => item.country.toLowerCase() === country.toLowerCase()
              )?.country
            : "Select country..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full text-black p-0">
        <Command>
          <CommandInput placeholder="Search Country..." />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {countriesCodes.map((item, i) => (
                <CommandItem
                  key={i}
                  value={item.country.toLowerCase()}
                  onSelect={(currentValue) => {
                    setCountry(
                      currentValue.toLowerCase() === country.toLowerCase()
                        ? ""
                        : currentValue
                    );
                    setOpen(false);
                  }}>
                  {item.country}
                  <Check
                    className={cn(
                      "ml-auto",
                      country.toLowerCase() === item.country.toLowerCase()
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
