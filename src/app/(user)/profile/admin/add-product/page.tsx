"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import axios from "axios";

import { MainDomain } from "@/utils/mainDomain";
import { AddProductType, CategoriesType } from "@/utils/Types";
import { toast } from "react-toastify";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { VscSymbolColor } from "react-icons/vsc";
import { GiClothes } from "react-icons/gi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SizesOfProducts, SizesOShoes } from "@/utils/SizesOfProduct";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import SmallLoader from "@/components/layoutComponts/Loader/SmallLoader";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { UploadImage } from "@/utils/UploadImagefn";

async function FetchCategories(): Promise<CategoriesType[]> {
  const res = await axios.get(`${MainDomain}/api/category`);
  return res.data;
}
async function AddProductFn(data: AddProductType) {
  await axios.post(`${MainDomain}/api/products`, data);
}

export default function AddProduct() {
  const route = useRouter();
  const [loadingUpload, setLoadingUpload] = useState(false);
  const queryclient = useQueryClient();
  const [data, setData] = useState<AddProductType>({
    title: "",
    description: "",
    price: 0,
    brandName: "",
    categoryId: 0,
    card_image: "",
    images: [],
    amount: 0,
    colors: [],
    sizes: [],
    discount: 0,
    hasDiscount: false,
  });
  const [hasDiscount, setHasDiscount] = useState(false);
  const [Ncolors, setNColors] = useState(0);
  const [Nsizes, setNsSizes] = useState(0);
  const [sizes, setSizes] = useState<
    {
      id: number;
      size: string;
      availabel: number;
    }[]
  >([
    {
      id: 0,
      size: "",
      availabel: 0,
    },
  ]);
  // Images states
  const [cardImage, setCardImage] = useState<File | null>();
  const [anotherImages, setAnotherImages] = useState<File[]>([]);

  const cardImgUrl = useMemo(() => {
    if (cardImage) {
      return URL.createObjectURL(cardImage);
    }
    return null;
  }, [cardImage]);

  const anotherImgsUrls = useMemo(() => {
    if (anotherImages) {
      return anotherImages.map((img) => URL.createObjectURL(img));
    }
    return [];
  }, [anotherImages]);

  const { data: cats } = useQuery({
    queryKey: ["categories"],
    queryFn: FetchCategories,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: AddProductType) => AddProductFn(data),
    onSuccess: () => {
      toast.success("Added Success");
      queryclient.refetchQueries({
        queryKey: ["product-edit"],
      });
      route.refresh();
      route.push("/profile/admin/edit-product");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const HandleMultyInput = () => {
    const ColorsInfo = [];
    const SizesInfo = [];
    for (let i = 0; i < Ncolors; i++) {
      const color = (
        document.getElementById(`color-element-${i}`) as HTMLInputElement
      ).value;
      const availabel = (
        document.getElementById(
          `color-availabel-element-${i}`
        ) as HTMLInputElement
      ).value;
      ColorsInfo.push({ available: +availabel, color });
    }
    for (let i = 0; i < Nsizes; i++) {
      const availabel = (
        document.getElementById(
          `size-availabel-element-${i}`
        ) as HTMLInputElement
      ).value;
      SizesInfo.push({ available: +availabel, size: sizes[i].size });
    }

    return { ...data, colors: ColorsInfo, sizes: SizesInfo };
  };

  const UploadImages = async (
    title: string
  ): Promise<{
    card_Image: string;
    imgesUrl: string[];
  } | null> => {
    if (cardImage && anotherImages.length > 0) {
      setLoadingUpload(true);
      const imgesUrl: string[] = [];
      const card_image_formData = new FormData();
      card_image_formData.append("file", cardImage);
      card_image_formData.append("pathName", title);
      const card_Image = (await UploadImage(card_image_formData)) as string;

      for (let i = 0; i < anotherImages.length; i++) {
        const Another_images_formData = new FormData();
        Another_images_formData.append("file", anotherImages[i]);
        Another_images_formData.append("pathName", title);
        const url = (await UploadImage(Another_images_formData)) as string;
        imgesUrl.push(url);
      }
      setLoadingUpload(false);

      return { card_Image, imgesUrl };
    }
    return null;
  };
  const HandleSubmite = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const sendedData = HandleMultyInput();

    const SumAvailabelColor =
      sendedData.colors.length > 0
        ? sendedData.colors.map((s) => s.available).reduce((f, s) => f + s)
        : 0;
    const SumAvailabelSizes =
      sendedData.sizes.length > 0
        ? sendedData.sizes.map((s) => s.available).reduce((f, s) => f + s)
        : 0;

    if (SumAvailabelSizes == 0) {
      toast.warn("Please Selecet Sizes For the Product");
    } else if (SumAvailabelColor == 0) {
      toast.warn("Please Selecet Colors For the Product");
    } else if (SumAvailabelColor != SumAvailabelSizes) {
      toast.warn(
        "Something Wrong in Available quantity in color and sizes their sums must be equals"
      );
    } else if (
      SumAvailabelColor != sendedData.amount ||
      SumAvailabelSizes != sendedData.amount
    ) {
      toast.warn("Available quantity in color and sizes must be equal Stock");
    } else {
      if (!cardImage) {
        toast.warn("Please Upload card image");
        return;
      }
      if (anotherImages.length == 0) {
        toast.warn("Please Upload Product images");
        return;
      }
      const images = await UploadImages(sendedData.title);
      if (images) {
        mutate({
          ...sendedData,
          hasDiscount: hasDiscount,
          card_image: images.card_Image,
          images: images.imgesUrl,
        });
      }
    }
  };

  const showShoesSizes = useMemo(() => {
    if (cats) {
      const index = cats.findIndex((c) => c.id == data.categoryId);
      return (
        index != -1 &&
        (cats[index].name.includes("shoe") ||
          cats[index].name.includes("jeans"))
      );
    }
    return false;
  }, [cats, data.categoryId]);

  return (
    <>
      <h1 className="font-bold mb-2 pl-4">Add New Product</h1>
      <div className="flex md:flex-row-reverse flex-col gap-2 ">
        {/* images */}
        <div className="flex flex-col gap-2 md:w-72 w-full  bg-[#f7f7f7] p-3 h-fit">
          {/* Card Image */}
          <div className="border-b pb-3">
            {cardImgUrl ? (
              <div className="p-1 bg-box_bg w-fit relative mx-auto">
                <img className="w-16" src={cardImgUrl} alt="card image" />
              </div>
            ) : (
              <>
                <Input
                  onChange={(e) =>
                    setCardImage(e.target.files && e.target.files[0])
                  }
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="card-image"
                />
                <label
                  className="cursor-pointer p-2 border-dashed border-2 border-soft_border flex flex-col gap-2 justify-center items-center"
                  htmlFor="card-image">
                  <FaCloudUploadAlt className="w-9 h-9" />
                  <span>Card Image</span>
                </label>
              </>
            )}
          </div>

          {/* Another images */}
          <div className="flex items-center gap-1 flex-wrap">
            {anotherImgsUrls.length > 0 &&
              anotherImgsUrls.map((img, i) => (
                <img
                  className="w-14"
                  src={img}
                  key={i}
                  alt={`Image Number ${i + 1}`}
                />
              ))}

            <div>
              <Input
                onChange={(e) => {
                  if (e.target.files) {
                    setAnotherImages(Array.from(e.target.files));
                  }
                }}
                type="file"
                accept="image/*"
                className="hidden"
                id="another-images"
                multiple={true}
              />
              <label
                className="cursor-pointer w-12 h-12 p-2 border-dashed border-2  border-soft_border flex flex-col gap-2 justify-center items-center"
                htmlFor="another-images">
                <FaPlus className="w-4 h-4" />
              </label>
            </div>
          </div>
          <p className="text-sm">*You can select multiple images</p>
        </div>

        {/* Another Data */}
        <form
          onSubmit={HandleSubmite}
          className="flex flex-col p-4 gap-2 w-full bg-[#f7f7f7] border rounded-lg">
          <div className="grid sm:grid-cols-2 grid-cols-1 items-center gap-2">
            {/* Title */}
            <div>
              <label className="text-sm font-medium" htmlFor="title">
                Title:
              </label>
              <Input
                id="title"
                onChange={(e) => setData({ ...data, title: e.target.value })}
                type="text"
                placeholder="Title"
                required
              />
            </div>

            {/* Brand Name */}
            <div>
              <label className="text-sm font-medium" htmlFor="brand-name">
                Brand name:
              </label>
              <Input
                id="brand-name"
                required
                onChange={(e) =>
                  setData({ ...data, brandName: e.target.value })
                }
                type="text"
                placeholder="BrandName"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium" htmlFor="description">
              Description:
            </label>
            <Textarea
              required
              id="description"
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              className="border-soft_border text-black"
              placeholder="Description"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {/* Price */}
            <div>
              <label className="text-sm font-medium" htmlFor="price">
                Price:
              </label>
              <div className="flex items-center gap-1 border border-soft_border rounded-md px-1 pl-2">
                <span className="font-bold">$</span>
                <Input
                  className="border-0 shadow-none"
                  id="price"
                  required
                  onChange={(e) => setData({ ...data, price: +e.target.value })}
                  type="number"
                  placeholder="Price"
                />
              </div>
            </div>

            {/* Category */}
            <div className="Category">
              <label className="text-sm font-medium" htmlFor="category">
                Category:
              </label>
              <Select
                required
                onValueChange={(e) => setData({ ...data, categoryId: +e })}>
                <SelectTrigger id="category" className="w-44 h-10">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {cats && cats.length > 0 ? (
                      cats.map((el) => (
                        <SelectItem key={el.id} value={`${el.id}`}>
                          {el.name}
                        </SelectItem>
                      ))
                    ) : (
                      <>No categories</>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Stock */}
            <div>
              <label className="text-sm font-medium" htmlFor="quantity">
                Stock:
              </label>
              <Input
                id="quantity"
                required
                onChange={(e) => setData({ ...data, amount: +e.target.value })}
                type="number"
                placeholder="Stock"
              />
            </div>

            {/* Discount Choise */}
            <div>
              <p className="text-sm">Discount ?</p>
              <RadioGroup
                onValueChange={(e) => setHasDiscount(e == "yes")}
                defaultValue={hasDiscount ? "yes" : "no"}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    className="w-5 h-5 overflow-hidden bg-white"
                    value="yes"
                    id="yes-discount"
                  />
                  <label htmlFor="yes-discount" className="font-medium">
                    Yes
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    className="w-5 h-5 overflow-hidden bg-white"
                    value="no"
                    id="no-discount"
                  />
                  <label className="font-medium" htmlFor="no-discount">
                    No
                  </label>
                </div>
              </RadioGroup>
            </div>

            {/* Discount Percent */}
            {hasDiscount && (
              <div>
                <label className="text-sm" htmlFor="product-discount-percent">
                  Discount Percentage
                </label>
                <div className="flex items-center border border-soft_border px-2 rounded-xl">
                  <p>%</p>
                  <Input
                    onChange={(e) =>
                      setData({ ...data, discount: +e.target.value })
                    }
                    min={1}
                    required
                    className="border-0"
                    type="number"
                    id="product-discount-percent"
                    placeholder="Discount Percent"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Colors */}
          <div className="flex flex-col gap-2">
            <p className="my-1 border-b py-1 border-soft_border flex justify-between items-center">
              Colors
              <VscSymbolColor className="text-xl" />
            </p>
            {Array.from({ length: Ncolors }).map((_el, i) => (
              <div id={`element-${i}`} key={i} className="flex gap-2">
                <Input
                  required
                  id={`color-element-${i}`}
                  type="color"
                  className="w-36"
                />
                <Input
                  id={`color-availabel-element-${i}`}
                  type="number"
                  placeholder="Available Quantity"
                  required
                />
              </div>
            ))}
            <div className="flex items-center gap-2">
              <Button
                type="button"
                onClick={() => {
                  setNColors((pre) => pre + 1);
                }}
                className="w-fit bg-white text-main_bg hover:bg-white ">
                <FaPlus />
              </Button>
              <Button
                disabled={Ncolors == 0}
                variant="destructive"
                onClick={() => {
                  setNColors((pre) => pre - 1);
                }}
                type="button">
                <FaMinus />
              </Button>
            </div>
          </div>

          {/* Sizes */}
          <div className="flex flex-col gap-2">
            <p className="my-1 border-b py-1 border-soft_border flex justify-between items-center">
              Sizes
              <GiClothes className="text-xl" />
            </p>

            {Array.from({ length: Nsizes }).map((_el, i) => (
              <div key={i} className="flex gap-2">
                <Select
                  required
                  onValueChange={(e: string) => {
                    const index = sizes.findIndex((f) => f.id == i);
                    if (index == -1) {
                      setSizes([
                        ...sizes,
                        {
                          id: i,
                          availabel: 0,
                          size: e,
                        },
                      ]);
                    } else {
                      const exist = { ...sizes[index], size: e };
                      setSizes([
                        ...sizes.filter((e) => e.id !== exist.id),
                        exist,
                      ]);
                    }
                  }}>
                  <SelectTrigger>
                    <SelectValue id={`size-element-${i}`} placeholder="Size" />
                  </SelectTrigger>
                  <SelectContent>
                    {showShoesSizes
                      ? SizesOShoes.map((s, id) => (
                          <SelectItem
                            disabled={
                              sizes.findIndex((s1) => s1.size == s.size) != -1
                            }
                            key={id}
                            value={s.size}>
                            {s.size}
                          </SelectItem>
                        ))
                      : SizesOfProducts.map((s, id) => (
                          <SelectItem
                            disabled={
                              sizes.findIndex((s1) => s1.size == s.size) != -1
                            }
                            key={id}
                            value={s.size}>
                            {s.size}
                          </SelectItem>
                        ))}
                  </SelectContent>
                </Select>

                <Input
                  id={`size-availabel-element-${i}`}
                  type="number"
                  placeholder="Available Quantity"
                  required
                />
              </div>
            ))}

            <div className="flex items-start gap-2">
              <Button
                type="button"
                onClick={() => {
                  setNsSizes((pre) => pre + 1);
                }}
                className="w-fit bg-white text-main_bg hover:bg-white ">
                <FaPlus />
              </Button>

              <Button
                disabled={Nsizes == 0}
                variant="destructive"
                onClick={() => {
                  setSizes([...sizes.filter((s) => s.id !== Nsizes - 1)]);
                  setNsSizes((pre) => pre - 1);
                }}
                type="button">
                <FaMinus />
              </Button>
            </div>
          </div>

          <Button disabled={loadingUpload || isPending} className="font-bold">
            {loadingUpload ? (
              <>
                <SmallLoader color="white" /> Uploading images....
              </>
            ) : isPending ? (
              <>
                <SmallLoader color="white" /> Adding....
              </>
            ) : (
              "Add New Product"
            )}
          </Button>
        </form>
      </div>
    </>
  );
}
