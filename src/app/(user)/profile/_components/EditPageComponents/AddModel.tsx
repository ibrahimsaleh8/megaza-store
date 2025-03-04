"use client";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { SizesOfProducts, SizesOShoes } from "@/utils/SizesOfProduct";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductInfoForEditType } from "../../admin/edit-product/[id]/page";
import { toast } from "react-toastify";
type Props = {
  type: "color" | "size" | "image";
  category?: string;
  setData: Dispatch<SetStateAction<ProductInfoForEditType | undefined>>;
  Data: ProductInfoForEditType;
};
export default function AddModel({ type, Data, setData, category }: Props) {
  const CacelBtn = useRef<HTMLButtonElement | null>(null);
  const [newColor, setNewColor] = useState<{
    color: string;
    available: number;
  }>({ color: "", available: 0 });

  const [newSize, setNewSize] = useState<{
    size: string;
    available: number;
  }>({ size: "", available: 0 });

  const AddTheStateInData = () => {
    // Color Handeling
    if (type == "color") {
      if (newColor.available <= 0) {
        toast.error("availabel must be more than 0");
        return;
      }
      if (newColor.color == "") {
        toast.error("Please select the color");
        return;
      } else {
        setData({ ...Data, colors: [...Data.colors, newColor] });
        CacelBtn.current?.click();
      }
    }
    // Size Handeling
    if (type == "size") {
      if (newSize.available <= 0) {
        toast.error("availabel must be more than 0");
        return;
      }
      if (newSize.size == "") {
        toast.error("Please select the Size");
        return;
      } else {
        setData({ ...Data, sizes: [...Data.sizes, newSize] });
        CacelBtn.current?.click();
      }
    }
  };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger className="my-2 text-sm bg-black text-white rounded-sm px-5 py-1.5 w-fit hover:bg-main_bg">
          Add {type}
        </AlertDialogTrigger>

        <AlertDialogContent className="bg-white text-black">
          <AlertDialogHeader>
            <AlertDialogTitle>Add New {type}</AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>

          {/* Color */}
          {type == "color" && (
            <div>
              <label className="text-sm" htmlFor="new-availabel-color">
                Avilabel
              </label>
              <Input
                onChange={(e) =>
                  setNewColor({ ...newColor, available: +e.target.value })
                }
                id="new-availabel-color"
                placeholder="Stock of this color"
                type="number"
              />
              <label className="text-sm" htmlFor="new-color">
                Color
              </label>
              <Input
                onChange={(e) =>
                  setNewColor({ ...newColor, color: e.target.value })
                }
                id="new-color"
                type="color"
              />
            </div>
          )}
          {/* Size */}
          {type == "size" && (
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-sm" htmlFor="new-availabel-size">
                  Avilabel:
                </label>
                <Input
                  onChange={(e) =>
                    setNewSize({ ...newSize, available: +e.target.value })
                  }
                  id="new-availabel-size"
                  placeholder="Stock of this Size"
                  type="number"
                />
              </div>

              <div>
                <p className="text-sm">Size:</p>
                <Select
                  onValueChange={(e) => setNewSize({ ...newSize, size: e })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Size" />
                  </SelectTrigger>
                  <SelectContent>
                    {category &&
                    (category.includes("shoe") || category.includes("jeans"))
                      ? SizesOShoes.map((s, i) => (
                          <SelectItem
                            disabled={
                              Data.sizes.findIndex((el) => el.size == s.size) !=
                              -1
                            }
                            className="hover:bg-soft_border cursor-pointer duration-300"
                            key={i}
                            value={s.size}>
                            {s.size}
                          </SelectItem>
                        ))
                      : SizesOfProducts.map((s, i) => (
                          <SelectItem
                            disabled={
                              Data.sizes.findIndex((el) => el.size == s.size) !=
                              -1
                            }
                            className="hover:bg-soft_border cursor-pointer duration-300"
                            key={i}
                            value={s.size}>
                            {s.size}
                          </SelectItem>
                        ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <AlertDialogFooter>
            <AlertDialogCancel
              ref={CacelBtn}
              className="bg-red-500 hover:bg-red-600 text-white hover:text-white duration-300">
              Cancel
            </AlertDialogCancel>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={AddTheStateInData}>
              Add
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
