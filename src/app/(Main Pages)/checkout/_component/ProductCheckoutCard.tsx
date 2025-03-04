import { CartItemType } from "@/store/userInfoStore";

type Props = {
  el: CartItemType;
};
export default function ProductCheckoutCard({ el }: Props) {
  return (
    <div className="flex gap-2 items-start rounded-md bg-[#FAFAFA] w-full p-2">
      <div className=" bg-white">
        <img
          className="w-28 h-36 object-cover"
          src={el.product.card_image}
          alt={el.product.title}
        />
      </div>

      <div className="flex flex-col gap-1 w-full">
        <p className="line-clamp-2 lg:text-lg font-medium ">
          {el.product.title}
        </p>

        <p className="text-sm">Amount: {el.quantity}</p>
        <p className="text-sm">
          Size: <span className="uppercase">{el.size}</span>
        </p>

        {/* Price */}
        <div className="flex items-center justify-between mt-auto ">
          <p className="text-sm flex items-center gap-2">
            Color:
            <span
              style={{
                backgroundColor: el.color,
              }}
              className="block w-5 h-5 rounded-sm border border-soft_border"></span>
          </p>
          {el.product.hasDiscount && el.product.discount ? (
            <p className="font-bold text-xl">
              $
              {el.product.price -
                el.product.price * (el.product.discount / 100)}
            </p>
          ) : (
            <p className="font-bold text-xl">${el.product.price}</p>
          )}
        </div>
      </div>
    </div>
  );
}
