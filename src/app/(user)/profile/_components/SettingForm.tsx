"use client";
import Image from "next/image";
import ProfileImage from "../../../../../public/images/ProfileAvatar.webp";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PhoneNumberCode from "../_components/PhoneNumberCode";
import { countriesCodes } from "@/utils/CountriesCodes";
import { ErrorResponseType, UpdateUserDetails } from "@/utils/Types";
import axios from "axios";
import { MainDomain } from "@/utils/mainDomain";
import { toast } from "react-toastify";
import SmallLoader from "@/components/layoutComponts/Loader/SmallLoader";
import { useEffect, useState } from "react";
import { useUserDetailsStore } from "@/store/userDetailsStore";
import { userSettingSchema } from "@/utils/ZodSchema";
import SkeletonSettings from "./Skeleton/SkeletonSettings";
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "@/store/userInfoStore";
async function UpdatUserInformation(
  id: number,
  data: UpdateUserDetails
): Promise<UpdateUserDetails> {
  await axios.post(`${MainDomain}/api/user/full-data/${id}`, data);
  return data;
}
export default function SettingForm() {
  const { UpdateUserDetails, userDetails } = useUserDetailsStore();
  const { UpdateUserInfo, userInfo } = useUserStore();

  const [userInformations, setUserInformations] = useState<UpdateUserDetails>({
    userName: userDetails?.username || "",
    street: userDetails?.street || "",
    city: userDetails?.city || "",
    state: userDetails?.state || "",
    postalCode: userDetails?.postalCode || "",
    mobile: userDetails?.mobile || "",
    country: userDetails?.country || "",
  });
  const [country, setCountry] = useState("");
  useEffect(() => {
    if (userDetails) {
      setUserInformations({
        userName: userDetails.username,
        street: userDetails.street || "",
        city: userDetails.city || "",
        state: userDetails.state || "",
        postalCode: userDetails.postalCode || "",
        country: userDetails?.country || "",
        mobile: userDetails.mobile || "",
      });
    }
    if (userDetails?.country) {
      setCountry(userDetails?.country);
    }
  }, [userDetails]);

  // Handle Save Information
  const { mutate, isPending } = useMutation({
    mutationFn: (data: { id: number; data: UpdateUserDetails }) =>
      UpdatUserInformation(data.id, data.data),

    onSuccess: (data) => {
      toast.success("Updated Success");
      if (userDetails) {
        UpdateUserDetails({
          ...userDetails,
          city: data.city,
          country: data.country,
          mobile: data.mobile,
          postalCode: data.postalCode,
          state: data.state,
          street: data.street,
          username: data.userName,
        });
      }
      if (userInfo) {
        UpdateUserInfo({
          ...userInfo,
          city: data.city,
          country: data.country,
          mobile: data.mobile,
          postalCode: data.postalCode,
          state: data.state,
          street: data.street,
          username: data.userName,
        });
      }
    },
    onError: (err: ErrorResponseType) => {
      toast.error(err.response.data.message);
    },
  });

  const HandleSaveInformation = async () => {
    if (userDetails) {
      const data: UpdateUserDetails = { ...userInformations, country };
      const check = userSettingSchema.safeParse(data);
      if (!check.success) {
        toast.error(check.error.errors[0].message);
        return;
      }

      mutate({ id: userDetails.id, data });
    }
  };

  return (
    <>
      {userDetails ? (
        <>
          <div className="flex flex-col gap-2 mt-3 border rounded-xl overflow-hidden border-soft_border bg-[#f4f4f4] pb-5">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center rounded-xl p-4 gap-4 bg-[#15171d]">
              <div className=" relative rounded-full">
                <span className="bg-white block w-20 rounded-full h-20 absolute bottom-[1px] left-0 "></span>
                <Image
                  className="w-20 block rounded-full z-30 relative"
                  src={ProfileImage}
                  alt="Profile Image"
                />
              </div>
              <div className="flex items-center sm:items-start flex-col gap-2">
                <p className="text-main_text">{userDetails?.username}</p>
                <p className="text-white">{userDetails?.email}</p>
              </div>
            </div>
            {/* Inputs */}

            <div className="flex flex-col h-full gap-3 px-4 ">
              <div className="w-full">
                <label htmlFor="username-input" className="text-black text-sm">
                  User name
                </label>
                <Input
                  min={3}
                  defaultValue={userInformations.userName}
                  onChange={(e) =>
                    setUserInformations((pre) => ({
                      ...pre,
                      userName: e.target.value,
                    }))
                  }
                  id="username-input"
                  className="bg-white border-soft_border rounded-lg text-black h-10"
                  type="text"
                  placeholder="User Name"
                />
              </div>

              <div className="flex items-center w-full sm:flex-row flex-col justify-between gap-3">
                <div className="w-full">
                  <label htmlFor="street-input" className="text-black text-sm">
                    Street
                  </label>
                  <Input
                    defaultValue={userInformations.street}
                    onChange={(e) =>
                      setUserInformations((pre) => ({
                        ...pre,
                        street: e.target.value,
                      }))
                    }
                    id="street-input"
                    className="bg-white border-soft_border rounded-lg text-black h-10"
                    type="text"
                    placeholder="street"
                  />
                </div>

                <div className="w-full">
                  <label htmlFor="city-input" className="text-black text-sm">
                    City
                  </label>
                  <Input
                    defaultValue={userInformations.city}
                    onChange={(e) =>
                      setUserInformations((pre) => ({
                        ...pre,
                        city: e.target.value,
                      }))
                    }
                    id="city-input"
                    className="bg-white border-soft_border rounded-lg text-black h-10"
                    type="text"
                    placeholder="city"
                  />
                </div>
              </div>

              <div className="flex items-center w-full sm:flex-row flex-col justify-between gap-3">
                <div className="w-full">
                  <label htmlFor="state-input" className="text-black text-sm">
                    State
                  </label>
                  <Input
                    defaultValue={userInformations.state}
                    onChange={(e) =>
                      setUserInformations((pre) => ({
                        ...pre,
                        state: e.target.value,
                      }))
                    }
                    id="state-input"
                    className="bg-white border-soft_border rounded-lg text-black h-10"
                    type="text"
                    placeholder="state"
                  />
                </div>

                <div className="w-full">
                  <label
                    htmlFor="postalCode-input"
                    className="text-black text-sm">
                    Postal Code
                  </label>
                  <Input
                    defaultValue={userInformations.postalCode}
                    onChange={(e) =>
                      setUserInformations((pre) => ({
                        ...pre,
                        postalCode: e.target.value,
                      }))
                    }
                    id="postalCode-input"
                    className="bg-white border-soft_border rounded-lg text-black h-10"
                    type="text"
                    placeholder="postalCode"
                  />
                </div>
              </div>

              <div className="flex items-center w-full sm:flex-row flex-col justify-between gap-3">
                <div className="w-full flex flex-col gap-1">
                  <label className="text-black text-sm">Country</label>
                  <PhoneNumberCode country={country} setCountry={setCountry} />
                </div>

                <div className="w-full">
                  <label htmlFor="mobile-input" className="text-black text-sm">
                    Mobile
                  </label>
                  <div className="flex items-center gap-1">
                    <p>
                      {country
                        ? "+" +
                          countriesCodes.find(
                            (e) =>
                              e.country.toLowerCase() == country?.toLowerCase()
                          )?.code
                        : ""}
                    </p>
                    <Input
                      defaultValue={userInformations.mobile}
                      onChange={(e) =>
                        setUserInformations((pre) => ({
                          ...pre,
                          mobile: e.target.value,
                        }))
                      }
                      id="mobile-input"
                      className="bg-white border-soft_border rounded-lg text-black h-10"
                      type="number"
                      placeholder="mobile"
                    />
                  </div>
                </div>
              </div>

              <Button
                onClick={HandleSaveInformation}
                disabled={isPending}
                className="bg-black border-0 hover:bg-black rounded-sm mt-4 w-52">
                {isPending ? (
                  <>
                    <SmallLoader color="white" /> Saveing...
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </div>
        </>
      ) : (
        <SkeletonSettings />
      )}
    </>
  );
}
