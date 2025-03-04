"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MainDomain } from "@/utils/mainDomain";
import { loginSchema } from "@/utils/ZodSchema";
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SmallLoader from "@/components/layoutComponts/Loader/SmallLoader";
import Aos from "aos";
import "aos/dist/aos.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ErrorResponseType } from "@/utils/Types";

type LoginForm = {
  email: string;
  password: string;
};

async function LoginFnDb(data: LoginForm) {
  await axios.post(`${MainDomain}/api/auth/login`, data);
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const { mutate: LoginMutate, isPending } = useMutation({
    mutationFn: (loginCredential: LoginForm) => LoginFnDb(loginCredential),
    onSuccess: () => {
      toast.success("Logged in Success!");
      route.replace("/");
      route.refresh();
    },
    onError: (err: ErrorResponseType) => {
      toast.error(err.response.data.message);
    },
  });

  const route = useRouter();
  const [showPass, setShowPass] = useState(false);

  const HandleLogin: SubmitHandler<LoginForm> = (data) => {
    LoginMutate(data);
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
      onSubmit={handleSubmit(HandleLogin)}
      className="flex overflow-hidden flex-col gap-6 p-5 py-10 flex-1 mx-auto w-full md:w-[60%]">
      {/* Text */}
      <div className="flex flex-col gap-2 items-center justify-center">
        <p data-aos="fade-right" className="sm:text-3xl text-xl  font-bold">
          Welcome Back
        </p>

        <p
          data-aos="fade-right"
          data-aos-delay="100"
          className="text-sm text-secondry_white">
          Enter your email and password to continue
        </p>
      </div>
      {/* Inputs */}

      <div
        data-aos="fade-up"
        data-aos-delay="200"
        className="flex flex-col gap-5 mt-5">
        {/* Email */}
        <div>
          <Input {...register("email")} type="email" placeholder="Email" />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">*{errors.email.message}</p>
          )}
        </div>
        {/* Password */}
        <div>
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="w-full relative flex  items-center rounded-md gap-2 pr-2 bg-white border border-soft_border">
            <Input
              className="border-none focus-visible:ring-0 h-10 text-black"
              {...register("password")}
              type={showPass ? "text" : "password"}
              placeholder="Password"
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
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              *{errors.password.message}
            </p>
          )}
        </div>
        <Button
          data-aos="zoom-in"
          data-aos-delay="400"
          disabled={isPending}
          className="border-0 text-white bg-black hover:bg-black rounded-sm duration-300">
          {isPending ? (
            <span className="flex items-center gap-1">
              <SmallLoader color="white" />
            </span>
          ) : (
            "Login"
          )}
        </Button>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <Link href="/register" className="font-medium my-3 mt-auto px-4">
            <span className="underline">{"Don't"} Have account?</span>
            <span className="text-blue-500 px-1"> Join Now</span>
          </Link>
          <Link
            href="/forgot-password"
            className="font-medium my-3 mt-auto px-4">
            Forgot password?
          </Link>
        </div>
      </div>
    </form>
  );
}
