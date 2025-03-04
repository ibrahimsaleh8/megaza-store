import ProductCard from "@/components/layoutComponts/product/ProductCard";
import ResponiveSlider from "@/components/layoutComponts/Sliders/ResponiveSlider";

export default function ShowRelatedProducts({
  Products,
}: {
  Products: {
    id: string;
    title: string;
    price: number;
    card_image: string;
    discount: number;
    amount: number;
    hasDiscount: boolean;
    colors: {
      available: number;
      color: string;
    }[];
    sizes: {
      available: number;
      size: string;
    }[];
    available: boolean;
  }[];
}) {
  const Data = Products.map((el) => (
    <ProductCard
      classess="!w-full"
      animation={true}
      amount={el.amount}
      colors={el.colors}
      sizes={el.sizes}
      available={el.available}
      hasDiscount={el.hasDiscount}
      id={el.id}
      image={el.card_image}
      price={el.price}
      title={el.title}
      discount={el.discount}
      key={el.id}
    />
  ));
  return <div>{Data.length > 0 && <ResponiveSlider data={Data} />}</div>;
}
