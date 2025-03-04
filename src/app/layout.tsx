import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NextTopLoader from "nextjs-toploader";
import HydrateStore from "@/store/HydrateStore";
import { UserInfoType } from "@/store/userInfoStore";
import { MainDomain } from "@/utils/mainDomain";
import { VerifyUserFromToken } from "@/utils/VerifyUserFromToken";
import ReactQueryProvider from "@/components/layoutComponts/ReactQueryProvider";
import { cookies } from "next/headers";

const font = Raleway({
  subsets: ["latin"],
  weight: ["700", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Megaza Store",
    template: "%s | Megaza Store",
  },
  description:
    "Megaza Store – Your ultimate destination for premium men's fashion. Explore the latest trends in clothing, footwear, and accessories with exclusive deals and fast shipping.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = cookies().get("token")?.value as string;
  const user = VerifyUserFromToken();
  let res, data;
  if (user && token) {
    res = await fetch(`${MainDomain}/api/user/info?userId=${user.id}`, {
      cache: "no-store",
      headers: {
        token,
      },
    });
    data = await res.json();
  }
  const UserData: UserInfoType = user ? data : null;
  return (
    <html lang="en">
      <body
        className={`${font.className} w-screen overflow-x-hidden antialiased`}>
        <HydrateStore UserData={UserData}>
          <NextTopLoader
            color="#2299DD"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          />
          <ReactQueryProvider>{children}</ReactQueryProvider>
          <ToastContainer
            theme="dark"
            pauseOnHover
            closeOnClick
            autoClose={3000}
            position="bottom-right"
          />
        </HydrateStore>
      </body>
    </html>
  );
}
