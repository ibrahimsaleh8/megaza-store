"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ErrorResponseType, registerBodyType } from "@/utils/Types";
import { RegisterFormSchema } from "@/utils/ZodSchema";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { MainDomain } from "@/utils/mainDomain";
import { toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import SmallLoader from "@/components/layoutComponts/Loader/SmallLoader";
import Aos from "aos";
import "aos/dist/aos.css";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

type RegisterDataType = {
  user_name: string;
  email: string;
  password: string;
  confirm_password: string;
};

async function RegisterFnDb(data: registerBodyType) {
  await axios.post(`${MainDomain}/api/auth/register`, data);
}

async function welcomeMsg({ email, name }: { email: string; name: string }) {
  await axios.post(`${MainDomain}/api/welcome-email`, { email, name });
}

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDataType>({
    resolver: zodResolver(RegisterFormSchema),
    mode: "onBlur",
  });

  const { mutate: welcomeMassage } = useMutation({
    mutationFn: ({ email, name }: { email: string; name: string }) =>
      welcomeMsg({ email, name }),
    onError: (err: ErrorResponseType) => {
      console.log(err);
      toast.error(err.response.data.message);
    },
  });

  const route = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [showRepass, setShowRepass] = useState(false);
  const [msgData, setmsgData] = useState<{
    email: string;
    name: string;
  }>({ email: "", name: "" });
  const { mutate: registerMutate, isPending } = useMutation({
    mutationFn: (data: registerBodyType) => RegisterFnDb(data),
    onSuccess: () => {
      route.refresh();
      welcomeMassage(msgData);
      toast.success("Register Completed");
    },
    onError: (err: ErrorResponseType) => {
      console.log(err);
      toast.error(err.response.data.message);
    },
  });

  const handleRegisterForm: SubmitHandler<RegisterDataType> = async (data) => {
    setmsgData({
      email: data.email,
      name: data.user_name,
    });
    registerMutate({
      username: data.user_name,
      email: data.email,
      password: data.password,
    });
  };

  // Aos Animation
  useEffect(() => {
    Aos.init({
      duration: 300,
      once: true,
    });
  }, []);
  return (
    <form
      onSubmit={handleSubmit(handleRegisterForm)}
      className="flex flex-col gap-5 p-5 md:w-[60%] w-full mx-auto ">
      {/* Text */}
      <div className="flex flex-col gap-1 items-center justify-center">
        <p data-aos="fade-right" className="text-xl sm:text-3xl font-bold">
          Create New Account
        </p>
        <p
          data-aos="fade-right"
          data-aos-delay="100"
          className="text-sm text-secondry_white">
          Please enter your details
        </p>
      </div>

      {/* Inputs */}

      <div className="flex flex-col gap-5 mt-5">
        {/* Username and email */}
        <div>
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="flex gap-2 items-start">
            <Input
              type="text"
              placeholder="User Name"
              {...register("user_name")}
            />
            <Input {...register("email")} type="email" placeholder="Email" />
          </div>

          {/* Errors */}
          <div className="flex flex-col gap-1 mt-1">
            {errors.user_name && (
              <p className="text-red-500 text-sm">
                *{errors.user_name.message}
              </p>
            )}
            {errors.email && (
              <p className="text-red-500 text-sm">*{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Password */}
        <div>
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="flex items-center gap-2 bg-white border border-soft_border pr-2 rounded-md">
            <Input
              type={showPass ? "text" : "password"}
              {...register("password")}
              placeholder="Password"
              className="h-10 text-black rounded-md focus-visible:ring-0 border-0 "
            />
            {showPass ? (
              <AiFillEyeInvisible
                onClick={() => setShowPass(false)}
                className="text-2xl w-6 h-6 cursor-pointer text-black"
              />
            ) : (
              <AiFillEye
                onClick={() => setShowPass(true)}
                className="text-2xl w-6 h-6 cursor-pointer text-black"
              />
            )}
          </div>
          {/* Error */}
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              *{errors.password.message}
            </p>
          )}
        </div>

        {/* Repeate Password */}
        <div>
          <div
            data-aos="fade-up"
            data-aos-delay="400"
            className="flex items-center gap-2 bg-white border border-soft_border pr-2 rounded-md">
            <Input
              {...register("confirm_password")}
              type={showRepass ? "text" : "password"}
              placeholder="Confirm Password"
              className="h-10 text-black rounded-md focus-visible:ring-0 border-0 "
            />

            {showRepass ? (
              <AiFillEyeInvisible
                onClick={() => setShowRepass(false)}
                className="text-2xl w-6 h-6 cursor-pointer text-black"
              />
            ) : (
              <AiFillEye
                onClick={() => setShowRepass(true)}
                className="text-2xl w-6 h-6 cursor-pointer text-black"
              />
            )}
          </div>
          {/* Error */}
          {errors.confirm_password && (
            <p className="text-red-500 text-sm mt-1">
              *{errors.confirm_password.message}
            </p>
          )}
        </div>

        <Button
          data-aos="zoom-in"
          disabled={isPending}
          className="border-0 rounded-sm text-white bg-black hover:bg-black">
          {isPending ? (
            <span className="flex items-center gap-2">
              <SmallLoader color="white" />
            </span>
          ) : (
            "Register"
          )}
        </Button>

        <Link href="/login" className="my-3 font-medium px-4">
          <span className="underline">Already Have account?</span>
          <span className="text-blue-600 px-1"> Login Now</span>
        </Link>
      </div>
    </form>
  );
}
