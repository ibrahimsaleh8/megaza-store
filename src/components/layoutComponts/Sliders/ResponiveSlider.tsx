import { ReactNode } from "react";
import RelatedProductsCarousel from "./RelatedProductsCarousel";
type Props = {
  data: ReactNode[];
};
export default function ResponiveSlider({ data }: Props) {
  return (
    <div className="p-2 ">
      <RelatedProductsCarousel data={data} />
    </div>
  );
}
