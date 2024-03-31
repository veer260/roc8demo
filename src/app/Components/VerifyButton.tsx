"use client";

import { ReactNode } from "react";

// import { useFormStatus } from "react-dom";

function VerifyButton({
  children,
  status,
}: {
  children: ReactNode;
  status: string;
}) {
  //   const status = useFormStatus();
  return (
    <button
      className={`${
        status == "loading" ? "cursor-not-allowed opacity-50" : " "
      } uppercase w-full py-[18.5px] mt-[64px]  bg-black  text-white rounded-md`}
      // disabled={status == "loading"}
    >
      {children}
    </button>
  );
}

export default VerifyButton;
