"use client";
import React from "react";
import Input from "./Input";
import Link from "next/link";
import SubmitButton from "./SubmitButton";
import { useFormState } from "react-dom";
import { handleForm } from "../lib/actions";
import Image from "next/image";
// import axios from "axios";
interface InitialStateProps {
  type: string;
  message: string;
}
const initialState: InitialStateProps = {
  type: "",
  message: "",
};

const SignupForm = () => {
  const [state, formAction] = useFormState(handleForm, initialState);
  return (
    <form
      action={formAction}
      className=" mt-10 border-[2px] flex flex-col items-center rounded-[16px] w-fit ml-auto mr-auto pt-10 pb-[120px] mb-8 px-[60px]"
    >
      <fieldset>
        <legend className="text-center text-[32px] font-semibold mb-8">
          Create your Account
        </legend>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="Enter"
          label="Name"
          required={true}
        />
        <Input
          type="Email"
          id="email"
          name="email"
          placeholder="Enter"
          label="Email"
          required={true}
        />
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Enter"
          label="Password"
          required={true}
        />
      </fieldset>
      {/* <button className="button uppercase  bg-black  text-white rounded-md py-[18.5px]">
        create account
      </button> */}
      {state.type == "error" && (
        <p className=" mb-2 text-red-500 font-semibold text-sm ">
          {" "}
          <span>
            <Image
              className=" inline"
              width={20}
              height={20}
              src="https://softr-assets-eu-shared.s3.eu-central-1.amazonaws.com/studio/blocks/assets/warning.svg"
              alt=""
            />
          </span>{" "}
          {state.message}
        </p>
      )}
      <SubmitButton>create account</SubmitButton>

      <h3 className="text-[#333333] mt-12">
        Have an Account?{" "}
        <span>
          {" "}
          <Link href="/login" className="uppercase font-medium text-black">
            Login
          </Link>{" "}
        </span>
      </h3>
    </form>
  );
};

export default SignupForm;
