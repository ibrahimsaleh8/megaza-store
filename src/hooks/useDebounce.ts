"use client";
import { useEffect, useState } from "react";

export default function useDebounce(v: string) {
  const [Dvalue, setDvalue] = useState(v);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDvalue(v);
    }, 500);

    return () => {
      clearTimeout(timeOut);
    };
  }, [v, Dvalue]);
  return Dvalue;
}
