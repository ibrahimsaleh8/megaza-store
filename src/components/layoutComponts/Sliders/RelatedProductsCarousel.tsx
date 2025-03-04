import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ReactNode } from "react";
type Props = {
  data: ReactNode[];
};
export default function RelatedProductsCarousel({ data }: Props) {
  return (
    <Carousel>
      <div className="flex items-center justify-end">
        <CarouselPrevious className="bg-black text-white" />
        <CarouselNext className="bg-black text-white" />
      </div>

      <CarouselContent>
        {data.map((el, i) => (
          <CarouselItem
            key={i}
            className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
            {el}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
