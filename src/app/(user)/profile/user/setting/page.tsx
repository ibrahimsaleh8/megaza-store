import SettingForm from "../../_components/SettingForm";
import { SlidersHorizontal } from "lucide-react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Setting",
};
export default function SettingPage() {
  return (
    <>
      <h1 className="text-lg text-black flex items-center gap-1">
        <SlidersHorizontal />
        Setting
      </h1>

      <SettingForm />
    </>
  );
}
