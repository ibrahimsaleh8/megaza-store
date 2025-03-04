import ProductColorSelection from "@/app/(Main Pages)/products/_components/ProductColorSelection";
import ProductSizeSelection from "@/app/(Main Pages)/products/_components/ProductSizeSelection";
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
import Link from "next/link";
import { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdShoppingBag } from "react-icons/md";
import AddToCartBtn from "./AddToCartBtn";
type Props = {
  ProductInfo: {
    id: string;
    title: string;
    card_image: string;
    price: number;
    available: boolean;
    discount?: number;
    hasDiscount: boolean;
    sizes: {
      available: number;
      size: string;
    }[];
    colors: {
      available: number;
      color: string;
    }[];
  };
  amount: number;
};
export default function CardAddToCard({ ProductInfo, amount }: Props) {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const closeRef = useRef<HTMLButtonElement>(null);
  return (
    <AlertDialog
      onOpenChange={() => {
        setSelectedColor("");
        setSelectedSize("");
      }}>
      <AlertDialogTrigger
        disabled={amount == 0}
        className={`${amount != 0 ? "show-more-info-product" : "show-more-info-product-disabled"} disabled:opacity-50 disabled:cursor-not-allowed rounded-lg`}>
        Add to cart
        <span>
          <MdShoppingBag className="w-5 h-5" />
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent className="text-black bg-white w-[90%]">
        <AlertDialogHeader>
          <AlertDialogTitle>
            <Link
              href={`/products/${ProductInfo.id}`}
              className="text-sm font-medium">
              {ProductInfo.title}
            </Link>
          </AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>

        <div>
          {/* Price */}
          <div>
            {ProductInfo.discount ? (
              <div className="flex flex-col gap-2">
                <p className="md:text-4xl text-3xl font-bold">
                  $
                  {(
                    ProductInfo.price -
                    ProductInfo.price * (ProductInfo.discount / 100)
                  ).toFixed(2)}
                </p>
                <div className="flex gap-2 items-center font-semibold pl-3">
                  <p className="line-through text-red-600 text-lg">
                    ${ProductInfo.price.toFixed(2)}
                  </p>
                  <p className="text-green-600 text-sm pt-3">
                    {ProductInfo.discount}% Off
                  </p>
                </div>
              </div>
            ) : (
              <p className="md:text-4xl text-3xl font-bold">
                ${ProductInfo.price}
              </p>
            )}
          </div>
          {/* Colors */}
          <ProductColorSelection
            colors={ProductInfo.colors}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />

          {/* Sizes */}

          <ProductSizeSelection
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            sizes={ProductInfo.sizes}
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel
            ref={closeRef}
            className="absolute p-2 h-8 w-8 rounded-md  -right-2 -top-2 border-red-500 bg-red-500 text-white hover:bg-red-600 hover:text-white">
            <IoClose />
          </AlertDialogCancel>
          <AddToCartBtn
            onClickFn={() => {
              closeRef.current?.click();
            }}
            ProductDetails={{
              available: ProductInfo.available,
              card_image: ProductInfo.card_image,
              size: {
                size: selectedSize,
                availabel:
                  selectedSize != ""
                    ? ProductInfo.sizes.filter((s) => s.size == selectedSize)[0]
                        .available
                    : 0,
              },
              color: {
                color: selectedColor,
                availabel:
                  selectedColor != ""
                    ? ProductInfo.colors.filter(
                        (s) => s.color == selectedColor
                      )[0].available
                    : 0,
              },
              hasDiscount: ProductInfo.hasDiscount,
              id: ProductInfo.id,
              price: ProductInfo.price,
              title: ProductInfo.title,
              discount: ProductInfo.discount,
            }}
            availabel={ProductInfo.available}
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
