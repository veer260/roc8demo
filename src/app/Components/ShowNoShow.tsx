"use client";
import React from "react";
import Input from "./Input";

const ShowNoShow = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <Input
      type={isVisible ? "text" : "password"}
      id="password"
      name="password"
      placeholder="Enter"
      label="Password"
      required={true}
      //@ts-ignore
      showBtn={
        <span
          className=" absolute right-4 top-9 underline cursor-pointer border-black"
          onClick={() => setIsVisible((prev) => !prev)}
        >
          Show
        </span>
      }
    ></Input>
  );
};

export default ShowNoShow;
