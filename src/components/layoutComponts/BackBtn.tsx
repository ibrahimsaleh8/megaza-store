"use client";
import { useRouter } from "next/navigation";
import { IoArrowBackCircle } from "react-icons/io5";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export default function BackBtn() {
  const route = useRouter();
  return (
    <>
      <TooltipProvider>
        <Tooltip delayDuration={1}>
          <TooltipTrigger asChild>
            <Button
              className="p-1 bg-transparent text-black shadow-none hover:bg-transparent"
              onClick={() => route.back()}>
              <IoArrowBackCircle className="block !w-6 !h-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Back</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
