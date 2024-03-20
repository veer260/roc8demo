"use client";
import React, { FC } from "react";
import Digit from "./Digit";
import SubmitButton from "./SubmitButton";
import { Verify } from "crypto";
import { useRouter } from "next/navigation";
import VerifyButton from "./VerifyButton";
import { redirect } from "next/dist/server/api-utils";
interface OtpInputProps {
  length: number;
  email: String;
}

const OtpInput: FC<OtpInputProps> = ({ length, email }) => {
  //idle, loading, success, error
  const [status, setStatus] = React.useState("idle");
  const inputRefs = React.useRef(new Array(length));
  const [otpDigits, setOtpDigits] = React.useState(new Array(length).fill(""));
  const router = useRouter();
  let tempEmail = email.substring(0, 3) + "***@gmail.com";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let otp = "";
    otpDigits.forEach((char) => (otp = otp + char));
    console.log(otp);
    setStatus("loading");
    const res = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();
    if (data.type == "success") {
      setStatus("success");
      router.push("/login");
    } else if (data.type == "error") {
      setStatus("error");
    }
  }
  const handleChange = ({ e, index }: { e: any; index: number }) => {
    console.log("handleChange called");
    if (e.target.value !== "") {
      inputRefs.current[index + 1]?.focus();
      const newDigits = [...otpDigits];

      newDigits[index] = e.target.value.substring(e.target.value.length - 1);
      setOtpDigits(newDigits);
    }
  };

  const setEmpty = ({ index }: { index: number }) => {
    const newDigits = [...otpDigits];
    newDigits[index] = "";
    setOtpDigits(newDigits);
  };

  React.useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const handleKeyDown = ({ e, index }: { e: any; index: number }) => {
    if (e.key == "Backspace") {
      if (e.target.value == "") {
        inputRefs.current[index].value = "";

        inputRefs.current[index - 1]?.focus();
      } else {
        inputRefs.current[index].value = "";
      }
      setEmpty({ index });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-[1px] ml-auto mr-auto mt-10 mb-[270px] border-[#C1C1C1] rounded-md w-fit pt-10 pb-[60px] px-[62px]"
    >
      <h2 className="text-center text-[32px] font-semibold">
        Verify your Email
      </h2>
      <h3 className="text-center mt-8">
        Enter the 8 digit code you have recieved on <br />{" "}
        <span className="font-semibold">{tempEmail}</span>{" "}
      </h3>
      <legend className="mb-2 font-semibold">Code</legend>
      <div className="flex gap-3">
        {otpDigits.map((digit, index) => {
          return (
            <>
              <input
                className="p-4 border-2 border-[#C1C1C1] rounded-md w-[46px] h-12 "
                key={index}
                onKeyDown={(e) => handleKeyDown({ e, index })}
                onChange={(e) => handleChange({ e, index })}
                type="text"
                value={otpDigits[index]}
                ref={(input) => {
                  inputRefs.current[index] = input;
                }}
              />
              <label className="sr-only" htmlFor="">
                {index}
              </label>
            </>
          );
        })}
        {status == "error" && <p>Entered otp is wrong</p>}
      </div>

      {/* <button className="">Submit it</button> */}
      {/* <SubmitButton class>Verify</SubmitButton> */}
      <VerifyButton status={status}>Veirfy</VerifyButton>
    </form>
  );
};

export default OtpInput;
