"use client";
import SmallLoader from "@/components/layoutComponts/Loader/SmallLoader";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/userInfoStore";
import { useMemo } from "react";

import { checkoutDataType, checkoutSchema } from "@/utils/ZodSchema";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { toast } from "react-toastify";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FaCcVisa } from "react-icons/fa6";
import Container from "@/components/Container";
import { TbShoppingBagExclamation, TbTruckDelivery } from "react-icons/tb";
import { CheckoutRequestBodyType } from "@/app/api/checkout/order-pay-on-deliver/route";
import axios from "axios";
import { MainDomain } from "@/utils/mainDomain";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SuccessDialog from "./SuccessDialog";
import { useRouter, useSearchParams } from "next/navigation";
import { ErrorResponseType } from "@/utils/Types";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import DiscountInput from "./DiscountInput";
import ProductCheckoutCard from "./ProductCheckoutCard";
import { CashOnDeliveryFee, ShippingFee } from "@/utils/checkoutVariables";

async function createOrderPayOnDeliver(data: CheckoutRequestBodyType) {
  await axios.post(`${MainDomain}/api/checkout/order-pay-on-deliver`, data);
}

async function createOrderPayNow(
  data: CheckoutRequestBodyType
): Promise<string> {
  const res = await axios.post(`${MainDomain}/api/checkout/payment`, data);
  return res.data.url;
}
const inputFields: {
  label: string;
  id: string;
  inputType: "text" | "email";
  placeholder: string;
  value:
    | "email"
    | "city"
    | "country"
    | "mobile"
    | "postalCode"
    | "state"
    | "street"
    | "name";
}[] = [
  {
    label: "name",
    id: "input-name",
    inputType: "text",
    placeholder: "Name",
    value: "name",
  },
  {
    label: "email",
    id: "input-email",
    inputType: "email",
    placeholder: "Email",
    value: "email",
  },
  {
    label: "city",
    id: "input-city",
    inputType: "text",
    placeholder: "City",
    value: "city",
  },
  {
    label: "country",
    id: "input-country",
    inputType: "text",
    placeholder: "Country",
    value: "country",
  },
  {
    label: "mobile",
    id: "input-mobile",
    inputType: "text",
    placeholder: "Mobile",
    value: "mobile",
  },
  {
    label: "postal code",
    id: "input-postalCode",
    inputType: "text",
    placeholder: "Postal Code",
    value: "postalCode",
  },
  {
    label: "state",
    id: "input-state",
    inputType: "text",
    placeholder: "State",
    value: "state",
  },
  {
    label: "street",
    id: "input-street",
    inputType: "text",
    placeholder: "Street",
    value: "street",
  },
];

export default function ShowCheckoutInfo({ id }: { id: number | null }) {
  const { userInfo, UpdateUserInfo } = useUserStore();
  const [success, setSuccess] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [percent, setPercent] = useState(0);
  const queryClient = useQueryClient();
  const params = useSearchParams();
  const route = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<
    "pay-on-deliver" | "pay-now"
  >("pay-now");

  const TotalPrice = useMemo(() => {
    if (!userInfo || !userInfo?.cart?.items.length) return 0;
    return userInfo.cart.items.reduce((acc, item) => {
      let discountedPrice =
        item.product.hasDiscount && item.product.discount
          ? item.product.price -
            item.product.price * (item.product.discount / 100)
          : item.product.price;
      if (percent > 0) {
        discountedPrice -= (percent / 100) * discountedPrice;
      }
      return acc + discountedPrice * item.quantity;
    }, 0);
  }, [percent, userInfo]);

  // Create Order Pay On Deliver
  const {
    mutate: HandlePayOnDeliver,
    isPending,
    error,
  } = useMutation({
    mutationFn: (data: CheckoutRequestBodyType) =>
      createOrderPayOnDeliver(data),
    onSuccess: () => {
      if (userInfo) {
        queryClient.refetchQueries({ queryKey: ["orders"] });
        queryClient.refetchQueries({ queryKey: ["user_orders"] });
        queryClient.refetchQueries({ queryKey: ["user_overview"] });
        queryClient.refetchQueries({ queryKey: ["order_chart"] });
        UpdateUserInfo({
          ...userInfo,
          cart: {
            items: [],
            id: userInfo?.cart.id,
          },
        });
      }
      toast.success("Order Completed Success");
      setSuccess(true);
    },
    onError: (err: ErrorResponseType) => {
      toast.error(err.response.data.message);
    },
  });

  // Create Order Pay Now
  const { mutate: HandlePayNow, isPending: pendingPayNow } = useMutation({
    mutationFn: (data: CheckoutRequestBodyType) => createOrderPayNow(data),
    onSuccess: (res: string) => {
      queryClient.refetchQueries({ queryKey: ["orders"] });
      queryClient.refetchQueries({ queryKey: ["user_orders"] });

      window.location.href = res;
    },
    onError: (err: ErrorResponseType) => {
      toast.error(err.response.data.message);
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<checkoutDataType>({
    resolver: zodResolver(checkoutSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (userInfo) {
      setValue("city", userInfo.city);
      setValue("country", userInfo.country);
      setValue("email", userInfo.email);
      setValue("mobile", userInfo.mobile);
      setValue("name", userInfo.username);
      setValue("postalCode", userInfo.postalCode);
      setValue("state", userInfo.state);
      setValue("street", userInfo.street);
    }
  }, [setValue, userInfo]);

  useEffect(() => {
    if (params.get("success")) {
      route.refresh();
      toast.success("Payment Completed");
      setSuccess(true);
    }
    if (params.get("canceled")) {
      route.refresh();
      toast.error("Payment Canceled");
    }
  }, [params, route]);

  const HandleCheckOut: SubmitHandler<checkoutDataType> = (info) => {
    if (userInfo) {
      const orderItems = userInfo?.cart.items.map((itm) => ({
        productId: itm.product.id,
        quantity: itm.quantity,
        size: itm.size,
        color: itm.color,
        price: itm.product.price,
        subtotal:
          itm.product.hasDiscount && itm.product.discount
            ? itm.product.price -
              itm.product.price * (itm.product.discount / 100)
            : itm.product.price,
      }));

      const data: CheckoutRequestBodyType = {
        city: info.city,
        country: info.country,
        mobile: info.mobile,
        postalCode: info.postalCode,
        state: info.state,
        street: info.street,
        name: info.name,
        email: info.email,
        userId: userInfo?.id as number,
        totalAmount:
          paymentMethod == "pay-now"
            ? TotalPrice + ShippingFee
            : TotalPrice + ShippingFee + 10,
        orderItems: orderItems,
        discountCode: percent > 0 ? discountCode : "",
      };

      // Make Order
      if (paymentMethod == "pay-on-deliver") {
        HandlePayOnDeliver(data);
      }
      if (paymentMethod == "pay-now") {
        HandlePayNow(data);
      }
    }
  };

  if (error) throw new Error(error.response.data.message);

  if (!id) {
    return (
      <div className="flex items-center justify-center flex-col gap-2 p-5 text-xl font-medium">
        Please Login First
        <Link
          href={"/login"}
          className="px-4 py-1.5 flex items-center gap-2 text-base rounded-sm bg-black text-white">
          Login
          <FaLongArrowAltRight />
        </Link>
      </div>
    );
  }
  return (
    <Container>
      {userInfo ? (
        <>
          {userInfo.cart && userInfo.cart.items.length > 0 ? (
            <>
              <div className="flex lg:flex-row flex-col gap-3 py-5">
                <form
                  onSubmit={handleSubmit(HandleCheckOut)}
                  className="flex gap-4 flex-col px-1 w-full ">
                  {/* Inputs */}
                  <div className="flex flex-col gap-3 flex-1">
                    <p className="font-medium text-xl">Shipping Information</p>
                    <div className="grid md:grid-cols-2 grid-cols-1 w-full gap-3">
                      {inputFields.map((e, i) => (
                        <div key={i} className="flex flex-col gap-1.5">
                          <label className="text-sm font-medium" htmlFor={e.id}>
                            {e.label}
                          </label>
                          <Input
                            required
                            id={e.id}
                            type={e.inputType}
                            placeholder={e.placeholder}
                            {...register(e.value)}
                          />
                          {errors[e.value] && (
                            <p className="text-red-500 text-sm">
                              *{errors[e.value]?.message}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                    {/* Delivery Option */}
                    <div className="flex flex-col">
                      <RadioGroup
                        onValueChange={(e: "pay-on-deliver" | "pay-now") =>
                          setPaymentMethod(e)
                        }
                        defaultValue="pay-now">
                        <div className="flex items-center border border-soft_border space-x-2 bg-[#ededed] p-3  rounded-sm font-medium ">
                          <RadioGroupItem
                            className="overflow-hidden w-5 h-5 border-soft_border"
                            value="pay-on-deliver"
                            id="pay-on-deliver"
                          />
                          <label
                            className="w-full cursor-pointer flex items-center justify-between"
                            htmlFor="pay-on-deliver">
                            Cash on Delivery + 10$ (
                            {(
                              TotalPrice +
                              ShippingFee +
                              CashOnDeliveryFee
                            ).toFixed(2)}
                            $)
                            <TbTruckDelivery className="w-5 h-5" />
                          </label>
                        </div>
                        <div className="flex items-center space-x-2 border border-soft_border bg-[#ededed] p-3 rounded-sm font-medium ">
                          <RadioGroupItem
                            className="overflow-hidden w-5 h-5 border-soft_border"
                            value="pay-now"
                            id="pay-now"
                          />
                          <label
                            className="w-full flex items-center justify-between cursor-pointer"
                            htmlFor="pay-now">
                            Pay Now ({(TotalPrice + ShippingFee).toFixed(2)}$)
                            <FaCcVisa className="w-5 h-5" />
                          </label>
                        </div>
                      </RadioGroup>
                    </div>

                    <Button
                      disabled={isPending || pendingPayNow}
                      className="bg-black mt-5 text-white px-4 py-2 rounded-lg duration-300 hover:bg-black">
                      {isPending || pendingPayNow ? (
                        <>
                          <SmallLoader color="white" />
                        </>
                      ) : (
                        "Pay"
                      )}
                    </Button>
                  </div>
                </form>

                <div className="flex flex-col lg:w-1/2 w-full">
                  <p className="font-medium text-xl">Your Order</p>
                  {/* Products */}
                  <div className="flex flex-col gap-4 py-3 ">
                    {userInfo &&
                      userInfo.cart.items.map((el) => (
                        <ProductCheckoutCard el={el} key={el.id} />
                      ))}
                  </div>

                  {/* Billing Info */}

                  <p className="flex items-center font-medium text-xl gap-1 py-1">
                    Order Summary
                  </p>

                  <div className="p-3 w-full mt-3 rounded-md flex flex-col gap-4">
                    <p className="flex justify-between items-center gap-2">
                      Total Products <span>{userInfo.cart.items.length}</span>
                    </p>
                    {percent > 0 && (
                      <p className="flex justify-between items-center gap-2">
                        Discount{" "}
                        <span className="text-green-600">{percent}%</span>
                      </p>
                    )}
                    <p className="flex border-b pb-1 justify-between items-center gap-2">
                      Total Price <span>{TotalPrice}$</span>
                    </p>

                    <p className="flex justify-between items-center gap-2">
                      Shipping fee <span>{ShippingFee}$</span>
                    </p>
                    {paymentMethod == "pay-on-deliver" ? (
                      <>
                        <p className="flex justify-between items-center gap-2">
                          Delivery fee <span>{CashOnDeliveryFee}$</span>
                        </p>
                        <p className="flex justify-between items-center gap-2">
                          SubToatal
                          <span>
                            {TotalPrice + ShippingFee + CashOnDeliveryFee}$
                          </span>
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="flex justify-between items-center gap-2">
                          SubToatal <span>{TotalPrice + ShippingFee}$</span>
                        </p>
                      </>
                    )}
                  </div>

                  {/* Discount Code */}
                  <DiscountInput
                    setPercent={setPercent}
                    percent={percent}
                    discount={discountCode}
                    setDiscount={setDiscountCode}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="w-full flex items-center justify-center text-xl flex-col gap-4 py-4">
              <p className="flex items-center gap-2 text-2xl font-bold">
                Your Cart is Empty
                <TbShoppingBagExclamation />
              </p>
              <Link
                href={"/products"}
                className="bg-black text-white rounded-sm font-medium px-5 py-2">
                Go to shop
              </Link>
            </div>
          )}
          <SuccessDialog success={success} />
        </>
      ) : (
        <div className="flex items-start justify-center gap-2 py-4 w-full">
          <SmallLoader color="black" />
          Loading...
        </div>
      )}
      {/* Succes Dialog */}
    </Container>
  );
}
