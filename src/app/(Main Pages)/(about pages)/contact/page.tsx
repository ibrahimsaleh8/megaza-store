"use client";
import { ContactUsFormDataType } from "@/app/api/contact/route";
import Container from "@/components/Container";
import SmallLoader from "@/components/layoutComponts/Loader/SmallLoader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MainDomain } from "@/utils/mainDomain";
import { ErrorResponseType } from "@/utils/Types";
import { EmailSchema } from "@/utils/ZodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { FiPhoneCall } from "react-icons/fi";
import { GrMapLocation } from "react-icons/gr";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { SiMinutemailer } from "react-icons/si";
import { toast } from "react-toastify";
async function SendMessageApi(data: ContactUsFormDataType) {
  await axios.post(`${MainDomain}/api/contact`, data);
}
export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ContactUsFormDataType>({
    resolver: zodResolver(EmailSchema),
    mode: "onBlur",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ContactUsFormDataType) => SendMessageApi(data),
    onSuccess: () => {
      toast.success("Message sent successfully!");
      setValue("email", "");
      setValue("message", "");
      setValue("subject", "");
    },
    onError: (err: ErrorResponseType) => {
      toast.error(err.response.data.message);
    },
  });
  const SendEmail: SubmitHandler<ContactUsFormDataType> = (data) => {
    mutate(data);
  };
  return (
    <Container>
      <div className="py-7 flex flex-col lg:flex-row gap-8">
        {/* Left */}
        <div className="flex lg:flex-col flex-row flex-wrap gap-7 lg:w-1/4 w-full">
          {/* Card */}
          <div className="flex gap-3 items-start">
            <p className="p-2 border w-fit rounded-lg">
              <HiOutlineChatBubbleLeftRight className="w-5 h-5" />
            </p>
            <div className="flex flex-col">
              <p className="text-lg">Chat to us</p>
              <p className="text-[0.8rem] text-[#777]">
                Our Friendly team is here to help.
              </p>
              <p className="text-[0.8rem] mt-2">ebrihm576@gmail.com</p>
            </div>
          </div>

          {/* Card */}
          <div className="flex gap-3 items-start">
            <p className="p-2 border w-fit rounded-lg">
              <GrMapLocation className="w-5 h-5" />
            </p>
            <div className="flex flex-col">
              <p className="text-lg">Visit us</p>
              <p className="text-[0.8rem] text-[#777]">
                Come say hello at our office HQ.
              </p>
              <p className="text-[0.8rem] mt-2">Shibin El Kom - Menoufia</p>
            </div>
          </div>

          {/* Card */}
          <div className="flex gap-3 items-start">
            <p className="p-2 border w-fit rounded-lg">
              <FiPhoneCall className="w-5 h-5" />
            </p>
            <div className="flex flex-col">
              <p className="text-lg">Call us</p>
              <p className="text-[0.8rem] text-[#777]">
                Mon-Fri from 8am to 5pm.
              </p>
              <p className="text-[0.8rem] mt-2">+(20) 1015405904</p>
            </div>
          </div>
        </div>
        {/* Right */}
        <div className="relative w-full bg-main_bg rounded-lg text-white md:p-10 p-5 md:px-16 px-5">
          <p className="md:text-xl text-lg md:mt-1 mt-3">
            If you have any questions about your order status, shipping, or
            returns, please visit our [FAQ Page] or send message to us
          </p>
          <form
            onSubmit={handleSubmit(SendEmail)}
            className="pt-5 flex flex-col gap-3">
            {/* Email */}
            <div>
              <label htmlFor="email" className="text-sm">
                Your email
              </label>
              <Input
                className="bg-white"
                type="text"
                placeholder="Email"
                id="email"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
            {/* Subject */}
            <div>
              <label htmlFor="subject" className="text-sm">
                Subject
              </label>
              <Input
                className="bg-white"
                type="text"
                placeholder="Subject"
                {...register("subject")}
                id="subject"
              />
            </div>
            {errors.subject && (
              <p className="text-sm text-red-500">{errors.subject.message}</p>
            )}

            {/* Message */}
            <div>
              <label htmlFor="message" className="text-sm">
                Message
              </label>
              <Textarea
                className="bg-white"
                placeholder="Message"
                id="message"
                {...register("message")}
              />
            </div>
            {errors.message && (
              <p className="text-sm text-red-500">{errors.message.message}</p>
            )}

            <Button
              disabled={isPending}
              className="bg-white text-black w-24 mt-3 hover:bg-white hover:text-black">
              {isPending ? <SmallLoader color="black" /> : "Send"}
            </Button>
          </form>
          <div className="w-14 h-14 text-white p-1 flex items-center justify-center bg-main_bg absolute left-1/2 -top-5 rounded-full -translate-x-1/2">
            <SiMinutemailer className="w-7 h-7" />
          </div>
        </div>
      </div>
    </Container>
  );
}
