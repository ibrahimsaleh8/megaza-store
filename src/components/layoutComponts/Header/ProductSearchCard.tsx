"use client";
import { DialogCustomClose } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

type Props = {
  image: string;
  title: string;
  id: string;
};
export default function ProductSearchCard({ id, title, image }: Props) {
  const router = useRouter();
  return (
    <DialogCustomClose onClick={() => router.push(`/products/${id}`)}>
      <div className="flex items-center bg-low_white text-black group p-2 rounded-md gap-3 z-10">
        <div className="pt-0.5 overflow-hidden bg-white rounded-sm w-16 h-16 flex items-center justify-center">
          <img
            className="w-16 h-16 object-cover object-top mt-auto"
            src={image}
            alt={title}
          />
        </div>
        <p className="text-sm line-clamp-2 group-hover:underline">{title}</p>
      </div>
    </DialogCustomClose>
  );
}
