"use client";
import SmallLoader from "@/components/layoutComponts/Loader/SmallLoader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MainDomain } from "@/utils/mainDomain";
import { ErrorResponseType } from "@/utils/Types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
async function SendResetLink(email: string) {
  await axios.post(`${MainDomain}/api/forgot-pass-link`, {
    email,
  });
}
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const { mutate: sendResetLink, isPending } = useMutation({
    mutationFn: (email: string) => SendResetLink(email),
    onSuccess: () => {
      toast.success("Reset link sent success!");
    },
    onError: (err: ErrorResponseType) => {
      toast.error(err.response.data.message);
    },
  });
  const HandleResetPass = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().length < 5) {
      toast.error("invalid email");
      return;
    }
    sendResetLink(email);
  };

  return (
    <div className="flex overflow-hidden flex-col gap-2 p-5 py-10 flex-1 mx-auto w-full md:w-[60%]">
      <div className="my-2">
        <p>Forgot Password ?</p>
        <p className="text-sm text-[#777]">
          Enter your email and we wil send an email with instructions to reset
          your password
        </p>
      </div>
      <form onSubmit={HandleResetPass} className="flex flex-col gap-2">
        <Input
          required
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <Button disabled={isPending} onClick={HandleResetPass} className="w-32">
          {isPending ? <SmallLoader color="white" /> : "Reset"}
        </Button>
      </form>
    </div>
  );
}
