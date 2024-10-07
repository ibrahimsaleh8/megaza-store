"use client";

import { useParams } from "next/navigation";

export default function Dynamic() {
  const pathName = useParams();
  console.log("path Name ", pathName.dynamic);

  return <div>Dynamic</div>;
}
