import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/utils/stripe";
import Stripe from "stripe";
import { CheckoutRequestBodyType } from "../order-pay-on-deliver/route";
import prisma from "@/utils/PrismaVariable";
import { MainDomain } from "@/utils/mainDomain";
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CheckoutRequestBodyType;
    const productIds = body.orderItems.map((itm) => itm.productId);

    if (!productIds || productIds.length == 0) {
      return NextResponse.json(
        { message: "Product Id is required" },
        { status: 400 }
      );
    }

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    products.forEach((product) => {
      const discountRate = (product.discount ?? 0) / 100;
      const finalPrice = product.hasDiscount
        ? product.price - product.price * discountRate
        : product.price;

      line_items.push({
        quantity:
          body.orderItems.find((itm) => itm.productId === product.id)
            ?.quantity || 1,

        price_data: {
          currency: "USD",
          product_data: {
            name: product.title,
          },
          unit_amount: Math.round(finalPrice * 100),
        },
      });
    });
    // Create Order
    const order = await prisma.order.create({
      data: {
        city: body.city,
        country: body.country,
        email: body.email,
        mobile: body.mobile,
        name: body.name,
        postalCode: body.postalCode,
        state: body.state,
        street: body.street,
        totalAmount: body.totalAmount,
        userId: body.userId,
        status: "PENDING",
        discountCode: body.discountCode,
        items: {
          createMany: { data: body.orderItems },
        },
        isPaid: false,
        orderKind: "PAY_CREDIT_CARD",
      },
    });

    // Create Session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${MainDomain}/checkout?success=1`,
      cancel_url: `${MainDomain}/checkout?canceled=1`,
      metadata: {
        orderId: order.id,
      },
    });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}
