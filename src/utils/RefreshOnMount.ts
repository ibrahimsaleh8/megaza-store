"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RefreshOnMount() {
  const route = useRouter();

  useEffect(() => {
    route.refresh();
  }, [route]);
  return null;
}
