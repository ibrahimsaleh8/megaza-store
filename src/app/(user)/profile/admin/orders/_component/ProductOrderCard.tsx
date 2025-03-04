import React from "react";
type item = {
  item: {
    id: number;
    price: number;
    color: string;
    quantity: number;
    size: string;
    subtotal: number;
    product: {
      id: string;
      card_image: string;
      title: string;
      brandName: string;
    };
  };
};
export default function ProductOrderCard({ item }: item) {
  return (
    <div
      key={item.id}
      className="flex flex-col items-center md:items-start md:justify-normal justify-center md:flex-row w-full gap-2 border border-soft_border p-3 rounded-lg ">
      {/* Image */}
      <div className="p-2 bg-low_white rounded-md md:w-28 w-full h-28 flex items-center justify-center">
        <img
          src={item.product.card_image}
          className="w-20 h-28 object-cover object-center"
          alt={item.product.title}
        />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2 text-start w-fit">
        <p className="line-clamp-2 text-sm font-medium">{item.product.title}</p>
        <p className="text-soft_border">{item.product.brandName}</p>
      </div>

      <div className="md:ml-auto flex flex-col gap-2 w-full md:w-fit">
        <p className="font-medium text-sm flex items-center justify-between">
          Quantity: <span className="font-normal">{item.quantity}</span>
        </p>
        <p className="font-medium text-sm flex items-center justify-between">
          Size: <span className="font-normal">{item.size}</span>
        </p>
        <p className="font-medium text-sm flex items-center justify-between">
          Color:{" "}
          <span
            style={{
              backgroundColor: item.color,
            }}
            className="w-5 h-5 block border rounded-sm"></span>
        </p>
        <p className="font-medium text-sm flex items-center justify-between">
          Subtotal: <span className="font-normal">${item.subtotal}</span>
        </p>
      </div>
    </div>
  );
}
