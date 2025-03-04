import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function ProductDetailsSlider({ images }: { images: string[] }) {
  return (
    <Carousel>
      <CarouselContent>
        {images.map((image, i) => (
          <CarouselItem
            className=" bg-[#efefef]  overflow-hidden rounded-xl md:w-96 w-full pt-2 flex items-center justify-center"
            key={i}>
            <img className="w-96 h-96 object-cover" src={image} alt={image} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex items-center sm:justify-start justify-center my-2 gap-3">
        <CarouselPrevious className="bg-black text-white w-16" />
        <CarouselNext className="bg-black text-white w-16" />
      </div>
    </Carousel>
  );
}
