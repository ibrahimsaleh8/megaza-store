import { MainDomain } from "@/utils/mainDomain";
import { transporter } from "@/utils/NodemailerVariabel";
import prisma from "@/utils/PrismaVariable";
import { NextRequest, NextResponse } from "next/server";
export type CheckoutRequestBodyType = {
  userId: number;
  totalAmount: number;
  name: string;
  email: string;
  country: string;
  city: string;
  mobile: string;
  postalCode: string;
  state: string;
  street: string;
  discountCode: string;
  orderItems: {
    productId: string;
    quantity: number;
    size: string;
    color: string;
    price: number;
    subtotal: number;
  }[];
};
export async function POST(request: NextRequest) {
  try {
    const data = (await request.json()) as CheckoutRequestBodyType;
    // Create Order
    const order = await prisma.order.create({
      data: {
        city: data.city,
        country: data.country,
        email: data.email,
        mobile: data.mobile,
        name: data.name,
        postalCode: data.postalCode,
        state: data.state,
        street: data.street,
        totalAmount: data.totalAmount,
        userId: data.userId,
        status: "PENDING",
        items: {
          createMany: { data: data.orderItems },
        },
        isPaid: false,
        orderKind: "PAY_ON_DELEIVER",
        discountCode: data.discountCode,
      },
      select: {
        items: true,
        id: true,
      },
    });

    // Update Product Stock
    for (const itm of order.items) {
      const product = await prisma.product.findUnique({
        where: {
          id: itm.productId,
        },
        select: { amount: true, colors: true, sizes: true },
      });

      if (product) {
        await prisma.product.update({
          where: {
            id: itm.productId,
          },
          data: {
            amount: product.amount - itm.quantity,
          },
        });

        // Update Size and Color Stock
        const sizeId = product.sizes.find((s) => s.size === itm.size)?.id;
        const colorId = product.colors.find((c) => c.color === itm.color)?.id;

        if (sizeId && colorId) {
          const Size = await prisma.productSizes.findUnique({
            where: { id: sizeId },
          });
          const Color = await prisma.productColors.findUnique({
            where: { id: colorId },
          });

          if (Size && Color) {
            await prisma.productSizes.update({
              where: { id: Size.id },
              data: { available: Size.available - itm.quantity },
            });
            await prisma.productColors.update({
              where: { id: Color.id },
              data: { available: Color.available - itm.quantity },
            });
          }
        }
      }
    }
    // Update discount code
    const discount = await prisma.discountCodes.findFirst({
      where: {
        code: data.discountCode,
      },
    });
    if (discount) {
      await prisma.discountCodes.update({
        where: {
          id: discount.id,
        },
        data: {
          used: discount.used + 1,
        },
      });
    }

    // Delete user cart items
    const cart = await prisma.cart.findUnique({
      where: {
        userId: data.userId,
      },
    });

    if (cart) {
      await prisma.cartProduct.deleteMany({
        where: {
          cartId: cart.id,
        },
      });
    }

    // Send Email

    const mailOptions = {
      to: "ebrihm576@gmail.com",
      from: process.env.NODMAILER_EMAIL_USER,
      subject: "New order created",
      html: `
              <div
      style="
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        padding: 20px;
      ">
      <h2 style="color: #000000">
        Hello admin there is a new order created please check it
      </h2>
      <div
        style="
          padding: 10px;
          font-size: 16px;
          border: 2px solid rgb(207, 207, 207);
          border-radius: 10px;
        ">
        <p style="margin-top: 0">Order ID: ${order.id}</p>
        <p>&#129457; User name: ${data.name}</p>
        <p>&#128231; Email: ${data.email}</p>
        <p>&#128084; Items: ${data.orderItems.length} items</p>
        <p>&#128176; Order subtotal: ${data.totalAmount}$</p>
        <p>&#128666; Order type: Pay on Delivery</p>
        <a
          style="
            color: #ffffff;
            background-color: #000000;
            padding: 8px 15px;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
          "
          href="${MainDomain}/profile/admin/orders">
          check order
        </a>
      </div>
      <hr style="margin-top: 20px" />
      <p style="font-size: 14px; color: #777">
        This email was sent from the Megaza website.
      </p>
    </div>
        `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Order Created" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}
