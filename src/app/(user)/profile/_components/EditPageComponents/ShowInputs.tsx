"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProductInfoForEditType } from "../../admin/edit-product/[id]/page";
import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { MainDomain } from "@/utils/mainDomain";
import { useRouter } from "next/navigation";
import AddModel from "./AddModel";
import ProductComments from "./ProductComments";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import SmallLoader from "@/components/layoutComponts/Loader/SmallLoader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AddNewImage from "./AddNewImage";
import { UploadImage } from "@/utils/UploadImagefn";
import { ErrorResponseType } from "@/utils/Types";
type Props = {
  token: string;
  id: string;
};

async function fetchProductInfo(id: string): Promise<ProductInfoForEditType> {
  const res = await axios.get(`${MainDomain}/api/products/edit?id=${id}`);
  return res.data;
}

async function UpdateProductInfo(
  finalData: ProductInfoForEditType,
  token: string
) {
  axios.post(`${MainDomain}/api/products/edit`, finalData, {
    headers: {
      token: token,
    },
  });
}

async function FetchCategories(): Promise<{ id: number; name: string }[]> {
  const res = await axios.get(`${MainDomain}/api/category/getall`);
  return res.data;
}

export default function ShowInputs({ token, id }: Props) {
  const [UploadingImages, setUploadingImages] = useState(false);
  // Fetch Product Info
  const { data: Product, isFetching } = useQuery({
    queryKey: ["edit-current-product", id],
    queryFn: () => fetchProductInfo(id),
    refetchOnMount: true,
  });

  const queryClient = useQueryClient();
  const route = useRouter();
  const StockRef = useRef<HTMLInputElement | null>(null);
  const DiscountRef = useRef<HTMLDivElement | null>(null);
  const [Data, setData] = useState<ProductInfoForEditType | undefined>(
    undefined
  );

  useEffect(() => {
    if (Product) {
      setData(Product);
    }
  }, [Product]);

  // New Images
  const [newImages, setNewImages] = useState<File[] | null>([]);
  const [newCardImage, setNewCardImage] = useState<File[] | null>([]);
  const UploadNewImages = async (title: string): Promise<string[] | null> => {
    if (newImages && newImages.length > 0) {
      setUploadingImages(true);
      const imgesUrl: string[] = [];
      for (let i = 0; i < newImages.length; i++) {
        const img_formData = new FormData();
        img_formData.append("file", newImages[i]);
        img_formData.append("pathName", title);
        const url = (await UploadImage(img_formData)) as string;
        imgesUrl.push(url);
      }
      setUploadingImages(false);
      return imgesUrl;
    }
    return null;
  };
  const UploadNewCardImage = async (
    title: string
  ): Promise<string[] | null> => {
    if (newCardImage && newCardImage.length > 0) {
      setUploadingImages(true);
      const imgesUrl: string[] = [];
      for (let i = 0; i < newCardImage.length; i++) {
        const img_formData = new FormData();
        img_formData.append("file", newCardImage[i]);
        img_formData.append("pathName", title);
        const url = (await UploadImage(img_formData)) as string;
        imgesUrl.push(url);
      }
      setUploadingImages(false);
      return imgesUrl;
    }
    return null;
  };

  // Functions
  const UpdateProduct = async () => {
    if (Data) {
      const SumColors = Data?.colors
        .map((e) => e.available)
        .reduce((f, s) => f + s);
      const SumSizes = Data?.sizes
        .map((e) => e.available)
        .reduce((f, s) => f + s);

      if (SumSizes !== Data?.amount) {
        toast.error("Stock must be equal Sum Stock in Size section");
        StockRef.current?.classList.toggle("border-red-500");
        StockRef.current?.focus();
        return;
      }

      if (Data.discount <= 0 && Data.hasDiscount) {
        toast.error("Discount Must be more than 0");
        DiscountRef.current?.classList.toggle("border-red-500");
        return;
      }

      if (SumColors !== Data.amount) {
        toast.error("Stock must be equal Sum Stock in Color section");
        StockRef.current?.classList.toggle("border-red-500");
        StockRef.current?.focus();
        return;
      }

      if (Data.card_image == "" && !newCardImage) {
        toast.error("Upload new card image");
        return;
      }
      if (Data.images.length == 0 && newImages?.length == 0) {
        toast.error("Product images must be more than 1");
        return;
      } else {
        StockRef.current?.classList.remove("border-red-500");
        DiscountRef.current?.classList.remove("border-red-500");
        let finalData: ProductInfoForEditType = { ...Data };

        if (!Data.hasDiscount) {
          finalData = { ...Data, discount: 0 };
        }
        if (newImages) {
          const newImgsUrls = await UploadNewImages(finalData.title);
          if (newImgsUrls) {
            finalData = {
              ...finalData,
              images: [...finalData.images, ...newImgsUrls],
            };

            setData(finalData);
          }
        }

        if (newCardImage) {
          const newCardImageUrl = await UploadNewCardImage(Data.title);

          if (newCardImageUrl) {
            finalData = {
              ...finalData,
              card_image: newCardImageUrl[0],
            };
          }
        }
        setData(finalData);
        mutate({ finalData, token });
      }
    }
  };
  // Apply Upadte
  const { mutate, isPending: loadingUpdate } = useMutation({
    mutationFn: (data: { finalData: ProductInfoForEditType; token: string }) =>
      UpdateProductInfo(data.finalData, data.token),
    onSuccess: () => {
      toast.success("Product Edited Success");
      queryClient.refetchQueries({ queryKey: ["product-edit"] }).then(() => {
        route.replace("/profile/admin/edit-product");
      });
    },
    onError: (err: ErrorResponseType) => {
      toast.error(err.response.data.message);
    },
  });

  //   Fetch All Categories
  const { data: allCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: FetchCategories,
  });

  //   Dates
  const ProductCreatedAt = Data
    ? `${new Date(Data.created_at).getUTCDate()}/${
        new Date(Data.created_at).getUTCMonth() + 1
      }/${new Date(Data.created_at).getUTCFullYear()}`
    : "";
  const ProductUpdatedAt = Data
    ? `${new Date(Data.updated_at).getUTCDate()}/${
        new Date(Data.updated_at).getUTCMonth() + 1
      }/${new Date(Data.updated_at).getUTCFullYear()}`
    : "";
  const choosedCategory = useMemo(() => {
    if (Data) {
      return Data.category.name;
    }
    return "";
  }, [Data]);

  return (
    <>
      {Data && !isFetching ? (
        <>
          <div className="flex pb-20 relative gap-2 items-start flex-col lg:flex-row">
            {/* Basic Information */}
            <div className="w-full rounded-md bg-[#f5f5f5] flex flex-col gap-2 p-2">
              <p className="text-lg font-medium">Basic information</p>
              {/* Title */}
              <div>
                <label className="text-sm" htmlFor="product-title">
                  Title
                </label>
                <Input
                  required
                  defaultValue={Data.title}
                  onChange={(e) => setData({ ...Data, title: e.target.value })}
                  id="product-title"
                  type="text"
                  placeholder="Title"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-sm" htmlFor="product-desc">
                  Description
                </label>
                <Textarea
                  required
                  defaultValue={Data.description}
                  onChange={(e) =>
                    setData({ ...Data, description: e.target.value })
                  }
                  id="product-desc"
                  placeholder="Description"
                />
              </div>

              {/* Price And Stock And Discount and Brand Name And Category */}
              <div className="flex items-center w-full gap-5 flex-wrap">
                {/* Brand Name */}
                <div>
                  <label className="text-sm" htmlFor="product-brand-name">
                    Brand Name
                  </label>
                  <Input
                    required
                    defaultValue={Data.brandName}
                    onChange={(e) =>
                      setData({ ...Data, brandName: e.target.value })
                    }
                    type="text"
                    id="product-brand-name"
                    placeholder="Brand Name"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="text-sm" htmlFor="product-price">
                    Price
                  </label>
                  <div className="flex items-center border border-soft_border px-2 rounded-xl">
                    <p>$</p>
                    <Input
                      required
                      defaultValue={Data.price}
                      onChange={(e) =>
                        setData({ ...Data, price: +e.target.value })
                      }
                      className="border-0"
                      type="number"
                      id="product-price"
                      placeholder="Price"
                    />
                  </div>
                </div>

                {/* Amount */}
                <div>
                  <label className="text-sm" htmlFor="product-amount">
                    Stock
                  </label>
                  <Input
                    required
                    ref={StockRef}
                    defaultValue={Data.amount}
                    onChange={(e) =>
                      setData({ ...Data, amount: +e.target.value })
                    }
                    id="product-amount"
                    type="number"
                    placeholder="Stock"
                  />
                </div>

                {/* Discount Choise */}
                <div>
                  <p className="text-sm">Discount ?</p>
                  <RadioGroup
                    onValueChange={(e) =>
                      setData({ ...Data, hasDiscount: e == "yes" })
                    }
                    defaultValue={Data.hasDiscount ? "yes" : "no"}>
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
                {Data.hasDiscount && (
                  <div>
                    <label
                      className="text-sm"
                      htmlFor="product-discount-percent">
                      Discount Percentage
                    </label>
                    <div
                      ref={DiscountRef}
                      className="flex items-center border border-soft_border px-2 rounded-xl">
                      <p>%</p>
                      <Input
                        min={1}
                        required
                        defaultValue={Data.discount}
                        onChange={(e) =>
                          setData({ ...Data, discount: +e.target.value })
                        }
                        className="border-0"
                        type="number"
                        id="product-discount-percent"
                        placeholder="Discount Percent"
                      />
                    </div>
                  </div>
                )}

                {/* Category */}
                <div>
                  <label className="text-sm" htmlFor="product-category">
                    Category
                  </label>
                  <Select
                    onValueChange={(e) => {
                      if (allCategories) {
                        setData({
                          ...Data,
                          category: {
                            name: e,
                            id: allCategories.filter((ca) => ca.name == e)[0]
                              .id,
                          },
                        });
                      }
                    }}
                    defaultValue={Data.category.name}>
                    <SelectTrigger id="product-category" className="w-[180px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {allCategories && allCategories.length > 0 ? (
                        allCategories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.name}>
                            {cat.name}
                          </SelectItem>
                        ))
                      ) : (
                        <p>No Categories</p>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Colors */}
              <div className="flex flex-col gap-2">
                {/* Colors Header */}
                <div className="flex items-center gap-2">
                  <span className="w-1/3 h-[1px] bg-soft_border block"></span>
                  <p>Colors</p>
                  <span className="w-full h-[1px] bg-soft_border block"></span>
                </div>

                {/* colors Containers  */}

                <div className="flex gap-5 items-center flex-wrap">
                  {Data.colors.map((c, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div
                        style={{
                          backgroundColor: c.color,
                        }}
                        className="w-5 h-5 rounded-sm mt-4 border border-black"></div>
                      <div>
                        <label className="text-sm" htmlFor={`color-stock-${i}`}>
                          Color Stock
                        </label>
                        <Input
                          required
                          min={0}
                          onChange={(e) => {
                            setData({
                              ...Data,
                              colors: Data.colors.map((c) => {
                                if (c.color == Data.colors[i].color) {
                                  return {
                                    available: +e.target.value,
                                    color: Data.colors[i].color,
                                    id: Data.colors[i].id,
                                  };
                                } else {
                                  return c;
                                }
                              }),
                            });
                          }}
                          defaultValue={c.available}
                          id={`color-stock-${i}`}
                          placeholder="Color Stock"
                          type="Number"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <AddModel Data={Data} setData={setData} type="color" />
              </div>

              {/* Sizes */}
              <div className="flex flex-col gap-2">
                {/* Sizes Header */}
                <div className="flex items-center gap-2">
                  <span className="w-1/3 h-[1px] bg-soft_border block"></span>
                  <p>Sizes</p>
                  <span className="w-full h-[1px] bg-soft_border block"></span>
                </div>

                {/* Sizes Containers  */}

                <div className="flex gap-5 items-center flex-wrap">
                  {Data.sizes.map((s, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <p className="bg-soft_border mt-6 text-black px-2 py-1 rounded-sm font-medium">
                        {s.size}
                      </p>
                      <div>
                        <label className="text-sm" htmlFor={`size-stock-${i}`}>
                          Size Stock
                        </label>
                        <Input
                          required
                          min={0}
                          onChange={(e) => {
                            setData({
                              ...Data,
                              sizes: Data.sizes.map((siz) => {
                                if (siz.size == s.size) {
                                  return {
                                    size: s.size,
                                    available: +e.target.value,
                                    id: s.id,
                                  };
                                } else {
                                  return siz;
                                }
                              }),
                            });
                          }}
                          defaultValue={s.available}
                          id={`size-stock-${i}`}
                          placeholder="Color Stock"
                          type="Number"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <AddModel
                  category={choosedCategory}
                  Data={Data}
                  setData={setData}
                  type="size"
                />
              </div>

              {/* Commetns */}
              <div>
                {/* Comments Header */}
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-1/3 h-[1px] bg-soft_border block"></span>
                  <p>Comments</p>
                  <span className="w-full h-[1px] bg-soft_border block"></span>
                </div>
                {/* Comments Container */}
                <div className="flex flex-col gap-4">
                  {Data.comments.length > 0 ? (
                    Data.comments.map((c, i) => (
                      <ProductComments
                        token={token}
                        Data={Data}
                        setData={setData}
                        key={i}
                        CommentData={c}
                      />
                    ))
                  ) : (
                    <div className="p-4 font-medium">
                      No comments found in this Product!
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Images & another Information */}
            <div className="md:w-96 w-full flex flex-col gap-4 ">
              {/* Images */}
              <div className="bg-[#f5f5f5] p-2 rounded-md">
                <p className="text-lg font-medium mb-3">Product Images</p>
                <div className="flex flex-col items-center gap-3">
                  {/* Card Image */}
                  {Data.card_image && Data.card_image != "" ? (
                    <>
                      <div className="bg-white p-3  relative rounded-sm">
                        <div
                          onClick={() => {
                            setData({
                              ...Data,
                              card_image: "",
                            });
                          }}
                          className="w-5 cursor-pointer text-white flex items-center justify-center h-5 p-1 bg-red-500 absolute right-0 top-0 rounded-full">
                          <MdDelete />
                        </div>
                        <img
                          className="w-40 rounded-sm"
                          src={Data.card_image}
                          alt={Data.title}
                        />
                      </div>
                    </>
                  ) : (
                    <AddNewImage
                      newImages={newCardImage}
                      setNewimg={setNewCardImage}
                      title="Add new Card image"
                    />
                  )}

                  {/* Another Images */}
                  <div className="flex flex-wrap items-center gap-1">
                    {Data.images.map((img, i) => (
                      <div
                        key={i}
                        className="p-2 w-32 relative rounded-md bg-white">
                        <div
                          onClick={() => {
                            setData({
                              ...Data,
                              images: Data.images.filter((im) => im !== img),
                            });
                          }}
                          className="w-5 cursor-pointer text-white flex items-center justify-center h-5 p-1 bg-red-500 absolute right-0 top-0 rounded-full">
                          <MdDelete />
                        </div>

                        <img
                          className="rounded-md w-28 object-cover object-center"
                          src={img}
                        />
                      </div>
                    ))}

                    {/* Add Image */}
                    <AddNewImage
                      newImages={newImages}
                      setNewimg={setNewImages}
                      title="Add new images"
                    />
                  </div>
                </div>
              </div>

              {/* Another Information */}
              <div className="bg-[#f5f5f5] p-2 py-4 rounded-md flex px-1 gap-3 flex-col !items-start justify-start w-full">
                <p className="font-medium text-lg mb-3">Another Informations</p>

                {/* Created At */}
                <div className="flex justify-between gap-2 text-sm w-full">
                  <p>Availabel:</p>
                  <p className="font-medium text-green-600">
                    {Data.amount > 0 ? "Yes" : "No"}
                  </p>
                </div>

                {/* Created At */}
                <div className="flex justify-between gap-2 text-sm w-full">
                  <p>Created at:</p>
                  <p className="font-medium">{ProductCreatedAt}</p>
                </div>

                {/* Created At */}
                <div className="flex justify-between gap-2 text-sm w-full">
                  <p>Last Update:</p>
                  <p className="font-medium">{ProductUpdatedAt}</p>
                </div>
              </div>
            </div>

            {/* Saving Buttons */}
            <div className="bg-white border-t flex items-center justify-end h-20 gap-2 w-full py-5 px-3 fixed bottom-0 left-0">
              <Button
                onClick={() => route.replace("/profile/admin/edit-product")}
                className="bg-red-600 hover:bg-red-700">
                Cancel
              </Button>

              <Button
                disabled={loadingUpdate || UploadingImages}
                onClick={UpdateProduct}
                className="bg-green-600 hover:bg-green-700">
                {loadingUpdate ? (
                  <>
                    Loading..
                    <SmallLoader color="white" />
                  </>
                ) : UploadingImages ? (
                  <>
                    Uploading new images ...
                    <SmallLoader color="white" />
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </div>
        </>
      ) : (
        isFetching && (
          <div className="flex w-full items-center justify-center gap-2">
            <SmallLoader color="black" />
            Loading...
          </div>
        )
      )}
    </>
  );
}
