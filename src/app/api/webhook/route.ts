import { MainDomain } from "@/utils/mainDomain";
import { transporter } from "@/utils/NodemailerVariabel";
import prisma from "@/utils/PrismaVariable";
import { stripe } from "@/utils/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = headers().get("Stripe-Signature") as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_KEY!
    );
  } catch (error) {
    return NextResponse.json(
      { message: "WebHook Erorr: " + error },
      { status: 400 }
    );
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type == "checkout.session.completed") {
    const order = await prisma.order.findUnique({
      where: {
        id: Number(session?.metadata?.orderId),
      },
      select: {
        id: true,
        userId: true,
        discountCode: true,
        items: {
          select: {
            productId: true,
            size: true,
            color: true,
            quantity: true,
          },
        },
        email: true,
        name: true,
        totalAmount: true,
      },
    });
    if (order) {
      if (order.discountCode != "") {
        const discountCode = await prisma.discountCodes.findFirst({
          where: {
            code: order.discountCode,
          },
        });
        if (discountCode) {
          await prisma.discountCodes.update({
            where: {
              id: discountCode.id,
            },
            data: {
              used: discountCode.used + 1,
            },
          });
        }
      }
      await prisma.order.update({
        where: {
          id: order.id,
        },
        data: {
          isPaid: true,
        },
      });
      const cart = await prisma.cart.findUnique({
        where: { userId: order.userId },
      });
      await prisma.cartProduct.deleteMany({
        where: {
          cartId: cart?.id,
        },
      });

      for (const itm of order.items) {
        const product = await prisma.product.findUnique({
          where: { id: itm.productId },
          select: {
            amount: true,
            colors: true,
            sizes: true,
          },
        });
        if (product) {
          const sizeId = product.sizes.find((s) => s.size == itm.size)?.id;
          const colorId = product.colors.find((c) => c.color == itm.color)?.id;

          if (sizeId && colorId) {
            const Size = await prisma.productSizes.findUnique({
              where: { id: sizeId },
            });
            const Color = await prisma.productColors.findUnique({
              where: { id: colorId },
            });
            if (Color && Size) {
              //  Update Amount Of Sizes
              await prisma.productSizes.update({
                where: {
                  id: Size?.id,
                },
                data: {
                  available: Size?.available - itm.quantity,
                },
              });
              //  Update Amount Of Colors
              await prisma.productColors.update({
                where: {
                  id: Color?.id,
                },
                data: {
                  available: Color?.available - itm.quantity,
                },
              });
            }
          }

          //  Update Amount Of Product
          await prisma.product.update({
            where: {
              id: itm.productId,
            },
            data: {
              amount: product?.amount - itm.quantity,
            },
          });
        }
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
        <p>&#129457; User name: ${order.name}</p>
        <p>&#128231; Email: ${order.email}</p>
        <p>&#128084; Items: ${order.items.length} items</p>
        <p>&#128176; Order subtotal: ${order.totalAmount}$</p>
        <p>&#128666; Order type: Payment online</p>
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
    }
  }
  if (
    event.type === "checkout.session.expired" ||
    event.type === "checkout.session.async_payment_failed"
  ) {
    // Delete order if payment was canceled or expired
    await prisma.order.delete({
      where: { id: Number(session?.metadata?.orderId) },
    });
  }
  return NextResponse.json(null, { status: 200 });
}
