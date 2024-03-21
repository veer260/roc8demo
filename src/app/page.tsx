import Image from "next/image";
import prisma from "./lib/db";

export default async function Home() {
  const str = `${process.env.BASE_URL}/api/signup`;
  console.log({ str });
  return <h1>{str}</h1>;
}
