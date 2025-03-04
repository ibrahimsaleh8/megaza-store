import Container from "@/components/Container";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Terms and Conditions",
};

export default function TermsPage() {
  return (
    <Container>
      <div className="py-2">
        <h2 className="text-xl font-semibold mt-4">1. Introduction</h2>
        <p className="text-sm">
          Megaza is an online store specializing in {"men's"} fashion clothing.
          By using our website, you agree to comply with these Terms and
          Conditions.
        </p>

        <h2 className="text-xl font-semibold mt-4">2. Account Registration</h2>
        <ul className="list-disc pl-6">
          <li className="text-sm">
            You must be at least 18 years old to create an account and make
            purchases.
          </li>
          <li className="text-sm">
            You are responsible for maintaining the confidentiality of your
            account credentials.
          </li>
          <li className="text-sm">
            Any activity conducted under your account is your responsibility.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-4">3. Orders and Payments</h2>
        <ul className="list-disc pl-6">
          <li className="text-sm">
            All orders are subject to availability and confirmation of payment.
          </li>
          <li className="text-sm">
            Prices are listed in [Insert Currency] and may be subject to change.
          </li>
          <li className="text-sm">
            We accept payments via [Credit/Debit Cards, PayPal, etc.].
          </li>
          <li className="text-sm">
            If a payment is declined, the order will not be processed.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-4">4. Shipping and Delivery</h2>
        <p className="text-sm">
          We offer shipping to selected regions. Delivery times may vary.
          Shipping costs and estimated delivery times are provided at checkout.
          We are not responsible for delays due to external factors (e.g.,
          customs, weather conditions).
        </p>

        <h2 className="text-xl font-semibold mt-4">5. Returns and Refunds</h2>
        <ul className="list-disc pl-6 text-sm">
          <li>
            Customers can return products within [Insert Return Period] days of
            delivery.
          </li>
          <li>
            Items must be unworn, unused, and in their original packaging.
          </li>
          <li>
            Refunds will be processed within [X] business days after receiving
            the returned item.
          </li>
          <li>
            Certain items (e.g., undergarments, sale items) may not be eligible
            for return.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-4">6. Intellectual Property</h2>
        <p className="text-sm">
          All content on Megaza, including images, logos, and text, is our
          property and may not be used without permission. Unauthorized use of
          our intellectual property may result in legal action.
        </p>

        <h2 className="text-xl font-semibold mt-4">7. User Conduct</h2>
        <ul className="list-disc pl-6 text-sm">
          <li>
            You agree not to use our website for any fraudulent or unlawful
            activity.
          </li>
          <li>
            You must not distribute viruses, spam, or any harmful content.
          </li>
          <li>
            We reserve the right to terminate accounts that violate these terms.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-4">
          8. Limitation of Liability
        </h2>
        <p className="text-sm">
          Megaza is not responsible for any indirect, incidental, or
          consequential damages arising from the use of our services. We make no
          guarantees regarding the accuracy or reliability of website content.
        </p>

        <h2 className="text-xl font-semibold mt-4">9. Privacy Policy</h2>
        <p className="text-sm">
          Your personal information is collected and used in accordance with our
          Privacy Policy. We do not share customer data with third parties
          without consent.
        </p>

        <h2 className="text-xl font-semibold mt-4">10. Changes to Terms</h2>
        <p className="text-sm">
          We reserve the right to modify these Terms and Conditions at any time.
          Any updates will be posted on this page with a revised date.
        </p>

        <h2 className="text-xl font-semibold mt-4">11. Contact Us</h2>
        <p className="text-sm">
          If you have any questions about these Terms and Conditions, please
          contact us at:
        </p>
        <ul className="list-disc pl-6 text-sm">
          <li>
            <strong>Email:</strong> ebrihm576@gmail.com
          </li>
          <li>
            <strong>Phone:</strong> +(20)01015405904
          </li>
          <li>
            <strong>Address:</strong> Shibin El Kom - Menoufia
          </li>
        </ul>
      </div>
    </Container>
  );
}
