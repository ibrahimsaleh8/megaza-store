import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import shlebyImage from "../../../../../public/images/order_Done.jpg";
import Image from "next/image";
import { BsFillBagCheckFill } from "react-icons/bs";
import Link from "next/link";
import { useEffect, useRef } from "react";
export default function SuccessDialog({ success }: { success: boolean }) {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (success) {
      ref.current?.click();
    }
  }, [success]);
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger className="hidden" ref={ref}>
          Open
        </AlertDialogTrigger>
        <AlertDialogContent className="text-black bg-white p-1 overflow-hidden">
          <AlertDialogHeader className="hidden">
            <AlertDialogTitle></AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex flex-col gap-2 justify-center items-center pb-2">
            <Image
              className="w-full h-96 object-cover object-top rounded-md"
              src={shlebyImage}
              alt="order created Success"
            />
            <p className="font-bold text-lg flex items-center gap-2">
              Your order created Success!
              <BsFillBagCheckFill className="text-green-600 w-5 h-5" />
            </p>
            <p className="text-center">
              Admin will check your order and process it please be patient
            </p>
            <Link
              className="w-full py-2 bg-black text-white flex items-center justify-center rounded-md mt-3"
              href={"/"}>
              Back to Home
            </Link>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
