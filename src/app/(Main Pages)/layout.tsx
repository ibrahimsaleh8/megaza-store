import Footer from "@/components/layoutComponts/Footer";
import Navbar from "@/components/layoutComponts/Header/Navbar";
import { MainDomain } from "@/utils/mainDomain";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fetchCats = await fetch(`${MainDomain}/api/category/getall`, {
    next: {
      revalidate: 60,
    },
  });
  const cats: {
    id: number;
    name: string;
  }[] = await fetchCats.json();
  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="bg-black text-white text-sm py-3 flex items-center justify-center">
        Discover offer page to get up to 50% discount
      </div>
      <Navbar cats={cats} />
      <div className="!overflow-x-hidden ">{children}</div>
      <Footer />
    </div>
  );
}
