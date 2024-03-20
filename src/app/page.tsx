import Image from "next/image";
import prisma from "./lib/db";

export default async function Home() {
  return <h1>Hello next</h1>;
}
