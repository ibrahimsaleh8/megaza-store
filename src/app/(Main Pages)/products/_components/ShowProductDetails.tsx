"use client";
import { ShowProductType } from "@/utils/Types";
import AddToCartBtn from "@/components/layoutComponts/product/AddToCartBtn";
import WishListBtn from "@/components/layoutComponts/product/WishListBtn";
import CurrentRoute from "@/components/layoutComponts/CurrentRoute";
import Link from "next/link";
import ReviewSection from "@/components/layoutComponts/Reviews/ReviewSection";
import { useEffect, useState } from "react";
import ProductRate from "./ProductRate";
import ShowRelatedProducts from "./ShowRelatedProducts";
import ProductColorSelection from "./ProductColorSelection";
import ProductSizeSelection from "./ProductSizeSelection";
import Aos from "aos";
import "aos/dist/aos.css";
import ProductDetailsSlider from "@/components/layoutComponts/Sliders/ProductDetailsSlider";

export default function ShowProductDetails({
  ProductInfo,
  token,
}: {
  ProductInfo: ShowProductType;
  token: string;
}) {
  const swiperImages: string[] = [
    ProductInfo.card_image,
    ...ProductInfo.images,
  ];
  const [productRate, setProductRate] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const ProductDetails = {
    id: ProductInfo.id,
    title: ProductInfo.title,
    card_image: ProductInfo.card_image,
    price: ProductInfo.price,
    available: ProductInfo.available,
    hasDiscount: ProductInfo.hasDiscount,
    discount: ProductInfo.discount,
    size: {
      size: selectedSize,
      availabel:
        selectedSize != ""
          ? ProductInfo.sizes.filter((s) => s.size == selectedSize)[0].available
          : 0,
    },
    color: {
      color: selectedColor,
      availabel:
        selectedColor != ""
          ? ProductInfo.colors.filter((s) => s.color == selectedColor)[0]
              .available
          : 0,
    },
  };
  // Aos Animation
  useEffect(() => {
    Aos.init({
      duration: 300,
      once: true,
    });
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2">
        {/* Top Info */}
        <div className="py-4 flex md:justify-between md:gap-10 gap-5 flex-col md:flex-row border-b">
          {/* Slider Side */}
          <div className="md:w-[50%] lg:w-[40%] w-full ">
            <div className="px-5 pb-2">
              <CurrentRoute title={ProductInfo.title} />
            </div>
            <ProductDetailsSlider images={swiperImages} />

            {/* Buttons */}
            <div
              data-aos-delay="500"
              data-aos="fade-up"
              className="buttons mt-5 md:flex flex-col items-center justify-between gap-3 px-2 hidden">
              <div className="w-full ">
                <AddToCartBtn
                  availabel={ProductInfo.available}
                  ProductDetails={ProductDetails}
                />
              </div>

              <WishListBtn floated={false} productId={ProductInfo.id} />
            </div>
          </div>

          {/* Text Side */}
          <div className="w-full md:p-4 p-2 flex flex-col gap-2">
            <p
              data-aos="fade-right"
              className="md:text-2xl text-xl font-medium">
              {ProductInfo.title}
            </p>

            {/* Rate and Avilability */}
            <div className="flex items-center gap-4">
              <ProductRate rate={productRate} />
              {/* Availablity */}
              <div data-aos-delay="200" data-aos="fade-right">
                {ProductInfo.amount == 0 ? (
                  <p className="bg-red-500 text-white px-4 py-1 rounded-sm text-sm w-fit">
                    Out of stock
                  </p>
                ) : (
                  <p className="bg-green-600 text-white px-4 py-1 rounded-sm text-sm w-fit">
                    Availabel
                  </p>
                )}
              </div>
            </div>
            {/* Price */}
            <div data-aos-delay="100" data-aos="fade-right">
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
                    <p className="text-green-600 text-sm pt-1">
                      {ProductInfo.discount}% OFF
                    </p>
                  </div>
                </div>
              ) : (
                <p className="md:text-4xl text-3xl font-bold">
                  ${ProductInfo.price}
                </p>
              )}
            </div>
            {/* Description */}
            <div data-aos-delay="300" data-aos="fade-right">
              <pre className="text-sm font-medium">
                {ProductInfo.description}
              </pre>
            </div>
            {/* Colors */}
            <div data-aos-delay="400" data-aos="fade-right">
              <ProductColorSelection
                colors={ProductInfo.colors}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
              />
            </div>

            {/* Sizes */}
            <div data-aos-delay="400" data-aos="fade-right">
              <ProductSizeSelection
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                sizes={ProductInfo.sizes}
              />
            </div>

            {/* Category */}
            <p
              data-aos-delay="500"
              data-aos="fade-right"
              className="flex justify-between items-center text-secondry_white mt-1">
              Category
              <Link
                href={`/products?category=${ProductInfo.category.name.toLowerCase()}`}
                className="font-bold ">
                {ProductInfo.category.name}
              </Link>
            </p>

            {/* Brand name */}
            <p
              data-aos-delay="500"
              data-aos="fade-right"
              className="flex justify-between items-center text-secondry_white">
              Brand name
              <span className="font-bold ">{ProductInfo.brandName}</span>
            </p>
            {/* Buttons */}
            <div
              data-aos-delay="500"
              data-aos="fade-up"
              className="buttons mt-3 flex flex-col items-center justify-between gap-3 px-2 md:hidden">
              <div className="w-full ">
                <AddToCartBtn
                  availabel={ProductInfo.available}
                  ProductDetails={ProductDetails}
                />
              </div>

              <WishListBtn floated={false} productId={ProductInfo.id} />
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="py-3 px-2 flex flex-col gap-3">
          <div>
            <p className="my-2 text-xl font-bold text-secondry_white">
              Reviews
            </p>
            <ReviewSection
              setProductRate={setProductRate}
              token={token}
              productId={ProductInfo.id}
            />
          </div>
          <ShowRelatedProducts
            Products={ProductInfo.category.products.filter(
              (e) => e.id != ProductInfo.id
            )}
          />
        </div>
      </div>
    </>
  );
}
