"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import axios from "axios";
import { MainDomain } from "@/utils/mainDomain";
import { useMutation } from "@tanstack/react-query";
import { ErrorResponseType } from "@/utils/Types";
import SmallLoader from "@/components/layoutComponts/Loader/SmallLoader";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
async function ResetPasswordDb({
  password,
  token,
}: {
  token: string;
  password: string;
}) {
  await axios.post(`${MainDomain}/api/reset-pass`, {
    password,
    token,
  });
}
export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPss, setShowPass] = useState(false);
  const [showConfirmPss, setShowConfirmPss] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const { mutate, isPending } = useMutation({
    mutationFn: (resPass: { token: string; password: string }) =>
      ResetPasswordDb(resPass),
    onSuccess: () => {
      toast.success("Password reset successful!");
      router.replace("/login");
    },
    onError: (err: ErrorResponseType) => {
      toast.error(err.response.data.message);
    },
  });

  useEffect(() => {
    if (!token) {
      router.replace("/");
    }
  }, [router, token]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword != confirmPass) {
      toast.error("the passwords don't match");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("the passwords must be at least 8 characters");
      return;
    }
    if (!token) {
      toast.error("invalid token");
      return;
    }
    mutate({ password: newPassword, token });
  }

  return (
    <Container>
      <div className="flex overflow-hidden flex-col gap-2 p-5 py-10 flex-1 mx-auto w-full md:w-[60%]">
        <h2>Reset Password</h2>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="border flex items-center pr-2 rounded-md">
            <Input
              className="border-0"
              type={showPss ? "text" : "password"}
              placeholder="New Password"
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            {showPss ? (
              <IoEyeOffSharp
                onClick={() => setShowPass(false)}
                className="w-6 h-6 cursor-pointer"
              />
            ) : (
              <IoEyeSharp
                onClick={() => setShowPass(true)}
                className="w-6 h-6 cursor-pointer"
              />
            )}
          </div>
          <div className="border flex items-center pr-2 rounded-md">
            <Input
              className="border-0"
              type={showConfirmPss ? "text" : "password"}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPass(e.target.value)}
              required
            />
            {showConfirmPss ? (
              <IoEyeOffSharp
                onClick={() => setShowConfirmPss(false)}
                className="w-6 h-6 cursor-pointer"
              />
            ) : (
              <IoEyeSharp
                onClick={() => setShowConfirmPss(true)}
                className="w-6 h-6 cursor-pointer"
              />
            )}
          </div>

          <Button disabled={isPending} type="submit">
            {isPending ? <SmallLoader color="white" /> : "Reset Password"}
          </Button>
        </form>
      </div>
    </Container>
  );
}
