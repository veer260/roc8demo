"use client";
import { FC, ReactNode } from "react";
import { useFormStatus } from "react-dom";
// import action from "@/app/lib";
interface SubmitButtonProps {
  children: ReactNode;
}

const SubmitButton: FC<SubmitButtonProps> = ({ children }) => {
  const status = useFormStatus();
  return (
    <button
      type="submit"
      className="button uppercase  bg-black  text-white rounded-md py-[18.5px]"
      disabled={status.pending}
    >
      {children}
    </button>
  );
};

export default SubmitButton;
