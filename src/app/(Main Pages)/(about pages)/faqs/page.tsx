import Container from "@/components/Container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "FAQS",
};

const Questions: {
  question: string;
  answer: string;
}[] = [
  {
    question: "What is Megaza?",
    answer:
      "Megaza is an online store specializing in high-quality men’s fashion clothing. We offer a wide range of stylish and trendy apparel, including shirts, pants, jackets, accessories, and more.",
  },
  {
    question: "Where is Megaza based?",
    answer:
      "Megaza is based in Shibin El Kom - Menoufia, but we ship worldwide to bring the latest men’s fashion to your doorstep.",
  },
  {
    question: "Do you have a physical store?",
    answer:
      "Currently, Megaza operates exclusively online. This allows us to offer competitive prices and a wider selection of products.",
  },
  {
    question: "How do I place an order?",
    answer:
      "Simply browse our collection, select your desired items, and add them to your cart. Proceed to checkout, enter your shipping details, and complete your payment.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept major credit/debit cards (Visa, MasterCard, American Express), PayPal, and other secure payment options.",
  },
  {
    question: "Is my payment information secure?",
    answer:
      "Yes, we use SSL encryption and secure payment gateways to ensure your payment information is protected.",
  },
  {
    question: "Can I modify or cancel my order after placing it?",
    answer:
      "If you need to modify or cancel your order, please contact us immediately at support@megaza.com. We can only process changes if your order has not yet been shipped.",
  },
  {
    question: "Where do you ship?",
    answer:
      "We ship worldwide! No matter where you are, we’ll deliver your order to you.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Shipping times vary depending on your location. Typically, orders are delivered within 3–5 business days for local orders and 7–14 business days for international orders.",
  },
  {
    question: "Do you offer free shipping?",
    answer:
      "Yes, we offer free shipping on all orders over [Insert Amount, e.g., $50]. For orders below this amount, a flat shipping fee will apply.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you’ll receive a tracking number via email. You can use this number to track your order on our website or the courier’s website.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy. If you’re not satisfied with your purchase, you can return it within 30 days of delivery for a full refund or exchange. Items must be unused, in their original packaging, and with tags attached.",
  },
  {
    question: "How do I initiate a return or exchange?",
    answer:
      "To initiate a return or exchange, please contact our support team at support@megaza.com with your order number and reason for return. We’ll guide you through the process.",
  },
  {
    question: "Who covers the return shipping costs?",
    answer:
      "If the return is due to a defect or error on our part, we’ll cover the return shipping costs. Otherwise, the customer is responsible for return shipping fees.",
  },
  {
    question: "How do I choose the right size?",
    answer:
      "We provide detailed size charts for each product on our website. Refer to these charts to find the perfect fit. If you’re still unsure, feel free to contact us for assistance.",
  },
  {
    question: "What if the item doesn’t fit?",
    answer:
      "If the item doesn’t fit, you can exchange it for a different size within 30 days of delivery. Please ensure the item is unused and in its original packaging.",
  },
  {
    question: "How do I care for my Megaza clothing?",
    answer:
      "Care instructions are provided on the label of each item. Generally, we recommend washing in cold water, avoiding bleach, and air-drying to maintain the quality of your clothing.",
  },
  {
    question: "How can I contact Megaza?",
    answer:
      "You can reach us via email at support@megaza.com, phone at [Insert Phone Number], or live chat on our website during business hours.",
  },
  {
    question: "What are your customer service hours?",
    answer:
      "Our customer service team is available from [Insert Hours, e.g., 9 AM–6 PM, Monday–Friday]. We aim to respond to all inquiries within 24 hours.",
  },
  {
    question: "Do you offer discounts or promotions?",
    answer:
      "Yes! We regularly run promotions and offer discounts to our loyal customers. Subscribe to our newsletter and follow us on social media to stay updated on the latest deals.",
  },
];

export default function FaqsPage() {
  return (
    <Container>
      <div className="py-4 md:pr-10 pr-3 pl-3">
        {Questions.map((q, i) => (
          <Accordion key={i} type="single" collapsible>
            <AccordionItem value={q.question}>
              <AccordionTrigger>{q.question}</AccordionTrigger>
              <AccordionContent>{q.answer}</AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </Container>
  );
}
