import Container from "@/components/Container";
import ShowSalesProducts from "./_component/ShowSalesProducts";
import WideImage from "./_component/WideImage";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Offers",
};
export default function SalesPage() {
  return (
    <Container>
      <div className="flex flex-col gap-3 py-2">
        <WideImage />
        <ShowSalesProducts />
      </div>
    </Container>
  );
}
