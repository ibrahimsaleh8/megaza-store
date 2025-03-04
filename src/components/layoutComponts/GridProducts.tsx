import { ProductsShowType } from "@/utils/Types";
import GridShowComponent from "./GridShowComponent";
import ProductCard from "./product/ProductCard";

export default function GridProducts({
  products,
}: {
  products: ProductsShowType[];
}) {
  return (
    <GridShowComponent minWidth={270} classes="gap-3 gap-y-3">
      {products.map((el) => (
        <ProductCard
          key={el.id}
          image={el.card_image}
          price={el.price}
          title={el.title}
          category={el.category}
          id={el.id}
          available={el.available}
          hasDiscount={el.hasDiscount}
          discount={el.discount}
          colors={el.colors}
          sizes={el.sizes}
          amount={el.amount}
        />
      ))}
    </GridShowComponent>
  );
}
