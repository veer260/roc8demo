import Image from "next/image";
import prisma from "./lib/db";
import Link from "next/link";

export default async function Home() {
  const str = `${process.env.BASE_URL}/api/signup`;
  // console.log({ str });
  return (
    <h1>
      <Link
        href="/signup"
        className="px-4 py-2 font-bold hover:bg-slate-700 bg-slate-900 rounded-md text-white"
      >
        Sign Up
      </Link>
    </h1>
  );
}
