import Container from "@/components/Container";
import React from "react";
import { MainDomain } from "@/utils/mainDomain";
import { ShowProductType } from "@/utils/Types";
import ShowProductDetails from "../_components/ShowProductDetails";
import { cookies } from "next/headers";

export default async function productWithId(params: {
  params: { id: string };
}) {
  const res = await fetch(`${MainDomain}/api/products/${params.params.id}`, {
    next: { revalidate: 60 },
  });
  const ProductInfo: ShowProductType = await res.json();
  const token = cookies().get("token")?.value as string;
  return (
    <Container>
      <ShowProductDetails token={token} ProductInfo={ProductInfo} />
    </Container>
  );
}
