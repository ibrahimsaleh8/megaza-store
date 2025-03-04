"use client";
import { MainDomain } from "@/utils/mainDomain";
import axios from "axios";
import { useRef } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { IoMdClose } from "react-icons/io";
import { Button } from "@/components/ui/button";
import SmallLoader from "@/components/layoutComponts/Loader/SmallLoader";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type DeleteProductBtnProps = {
  id: string;
  token: string;
};

async function DeleteProductFn(id: string, token: string): Promise<void> {
  await axios.delete(`${MainDomain}/api/products/edit?id=${id}`, {
    headers: { token },
  });
}

export default function DeleteProductBtn({ id, token }: DeleteProductBtnProps) {
  const closeDialogRef = useRef<HTMLButtonElement | null>(null);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: { id: string; token: string }) =>
      DeleteProductFn(data.id, data.token),
    onSuccess: () => {
      toast.success("Product Deleted");
      closeDialogRef.current?.click();
      queryClient.refetchQueries({ queryKey: ["product-edit"] });
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "An error occurred");
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <MdDelete className="text-white w-5 h-5" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="text-black bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Will you delete this Product?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            product from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            ref={closeDialogRef}
            className="absolute top-1 w-6 h-6 border-red-500 rounded-full p-1 right-1 text-white bg-red-500 hover:bg-red-600 hover:text-white">
            <IoMdClose />
          </AlertDialogCancel>
          <Button disabled={isPending} onClick={() => mutate({ id, token })}>
            {isPending ? (
              <>
                <SmallLoader color="white" />
                <span className="sr-only">Deleting product...</span>
              </>
            ) : (
              "Delete Product"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
