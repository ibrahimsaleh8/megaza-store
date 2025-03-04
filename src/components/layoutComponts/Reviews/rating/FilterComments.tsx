"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dispatch, SetStateAction, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoMdMore } from "react-icons/io";
type FilterCommenttype = "Featured" | "Newest" | "High rate" | "Low Rate";

const filteration: FilterCommenttype[] = [
  "Featured",
  "Newest",
  "High rate",
  "Low Rate",
];

export default function FilterComments({
  setFilterComment,
  filaterComment,
}: {
  setFilterComment: Dispatch<SetStateAction<FilterCommenttype>>;
  filaterComment: FilterCommenttype;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button className="w-10 h-10 " variant="ghost">
            <IoMdMore className="!w-7 !h-7" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[200px] bg-white text-black">
          <DropdownMenuLabel className="text-lg font-bold">
            Sort by
          </DropdownMenuLabel>
          <DropdownMenuGroup className="pl-1">
            {filteration.map((f, i) => (
              <DropdownMenuItem
                className="flex justify-between items-start gap-2 cursor-pointer hover:bg-soft_border"
                onClick={() => setFilterComment(f)}
                key={i}>
                {f}
                {filaterComment == f && <FaCheck />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
