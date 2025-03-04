import Image from "next/image";
import logo from "../../../public/images/logo_white.webp";
import { FaFacebookSquare, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import Link from "next/link";
import Container from "../Container";
export default function Footer() {
  return (
    <footer className="w-full mt-auto  bg-main_bg text-white ">
      <Container>
        <div className="flex flex-wrap gap-10 justify-between w-full mx-auto p-10 ">
          {/* Logo */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-end">
              <Image className="w-20" src={logo} alt="Megaza logo" />
              <p>Megaza Store</p>
            </div>
            <q className="my-3 text-sm text-secondry_white">
              {"Let's"} Shop Beyond Boundries
            </q>
          </div>

          {/* about site links */}
          <div className="flex flex-col items-start gap-3">
            <p className="mb-2">Company</p>
            <Link
              className="text-low_white text-sm hover:underline"
              href={"/about"}>
              About us
            </Link>
            <Link
              className="text-low_white text-sm hover:underline"
              href={"/contact"}>
              Contact us
            </Link>
            <Link
              className="text-low_white text-sm hover:underline"
              href={"/terms"}>
              Terms & Conditions
            </Link>
            <Link
              className="text-low_white text-sm hover:underline"
              href={"/faqs"}>
              FAQs
            </Link>
          </div>

          {/* navigations links */}
          <div className="flex flex-col items-start gap-3">
            <p className="mb-2">Links</p>
            <Link
              className="text-low_white text-sm hover:underline"
              href={"/products"}>
              Products
            </Link>
            <Link
              className="text-low_white text-sm hover:underline"
              href={"/discounts"}>
              Discounts
            </Link>
            <Link
              className="text-low_white text-sm hover:underline"
              href={"/login"}>
              Login
            </Link>
            <Link
              className="text-low_white text-sm hover:underline"
              href={"/register"}>
              Register
            </Link>
          </div>

          {/* Social links */}
          <div className="flex flex-col items-start gap-3">
            <p className="mb-2">Social links</p>

            <a
              className="flex items-center gap-2 hover:underline"
              href="https://www.facebook.com/ibrahim7saleh/"
              target="_blank">
              <FaFacebookSquare className="w-4 h-4" />
              Facebook
            </a>
            <a
              className="flex items-center gap-2 hover:underline"
              href="https://wa.me/201015405904?text="
              target="_blank">
              <FaWhatsapp className="w-4 h-4" />
              Whatsapp
            </a>
            <a
              className="flex items-center gap-2 hover:underline"
              href="https://t.me/Noyan_71"
              target="_blank">
              <FaTelegramPlane className="w-4 h-4" />
              Telegram
            </a>
            <a
              className="flex items-center gap-2 hover:underline"
              href="https://www.instagram.com/dev_ibrahim_saleh"
              target="_blank">
              <IoLogoInstagram className="w-4 h-4" />
              Instagram
            </a>
          </div>
        </div>
        {/* Lowest section */}
        <div className="w-full mx-auto border-t text-sm border-[#484848] flex items-center justify-center p-3">
          <p>
            @ developed by ❤️{" "}
            <a target="_blank" href="https://wa.me/201015405904?text=">
              Ibrahim Saleh
            </a>
          </p>
          {/* Social */}
        </div>
      </Container>
    </footer>
  );
}
