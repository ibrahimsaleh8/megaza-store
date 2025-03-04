import Container from "@/components/Container";
import ProductShow from "./_components/ProductShow";
import { Metadata } from "next";
import MainImagesSlider from "@/components/layoutComponts/Home/MainImagesSlider";
export const metadata: Metadata = {
  title: "Products",
};
export default function AllProducts() {
  return (
    <Container>
      <MainImagesSlider />

      <ProductShow />
    </Container>
  );
}
