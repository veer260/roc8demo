import React from "react";
import OtpInput from "../Components/OtpInput";
import { cookies } from "next/headers";

async function page({ searchParams }: { searchParams: URLSearchParams }) {
  // console.log({ searchParams });
  // let index = searchParams.email.indexOf("@");
  // console.log({ index });

  // console.log({ tempEmail });

  // let i = 3;

  // while (i > 0) {
  //   tempEmail[index] = "*";
  //   index--;
  //   // index--;
  //   i--;
  // }
  // for(let i = 0; i < i)

  // const email = cookies().get("email");
  // console.log({ email });
  // console.log();
  // console.log({ searchParams });
  //@ts-ignore
  const email = searchParams?.email || "";
  return (
    <div>
      <OtpInput email={email} length={8} />
    </div>
  );
}

export default page;
