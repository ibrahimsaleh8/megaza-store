import Link from "next/link";

export default function Header() {
  return (
    <div className="bg-slate-900 font-bold px-5 py-5 flex justify-center items-center">
      <ul className="flex gap-10 text-xl">
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/about"}>About</Link>
        </li>
      </ul>
    </div>
  );
}
