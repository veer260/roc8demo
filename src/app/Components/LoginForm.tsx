"use client";
import React from "react";
import Input from "./Input";
import Link from "next/link";
import SubmitButton from "./SubmitButton";
import { useFormState } from "react-dom";
import { loginAction } from "@/app/lib/actions";
import ShowNoShow from "./ShowNoShow";

interface InitialStateProps {
  type: string;
  message: string;
}

const initialState: InitialStateProps = {
  type: "",
  message: "",
};

const LoginForm = () => {
  // const [state, formAction] = useFormState(loginAction, initialState);
  const [state, formAction] = useFormState(loginAction, initialState);

  return (
    <form
      action={formAction}
      className=" mt-10 border-[2px] flex flex-col items-center rounded-[16px] px-[60px] w-fit ml-auto mr-auto pt-10 pb-[120px]  mb-8"
    >
      <h1 className="text-center text-[32px] font-semibold mb-8">Login</h1>
      <h2 className="text-[24px] font-medium">Welcome back to ECOMMERCE</h2>
      <h3 className="mt-3 mb-8">The next gen business market place</h3>
      <fieldset>
        <Input
          type="Email"
          id="email"
          name="email"
          placeholder="Enter"
          label="Email"
          required={true}
          // showBtn=""
        />
        <ShowNoShow />
      </fieldset>
      {state?.type == "error" && <p>{(state as InitialStateProps).message}</p>}

      <SubmitButton>login</SubmitButton>
      <hr className="border-b-[1px] border-[#C1C1C1] mt-7 w-full" />

      <h3 className="text-[#333333] mt-8">
        Don:&apost have an Account?{" "}
        <span>
          {" "}
          <Link href="/signup" className="uppercase font-medium text-black">
            Sign up
          </Link>{" "}
        </span>
      </h3>
    </form>
  );
};

export default LoginForm;
