import React from "react";

//@ts-ignore
const Input = ({ id, label, showBtn = undefined, ...delegated }) => {
  return (
    <div className=" relative flex flex-col mb-8 text-[1rem] ">
      <label className="font-normal" htmlFor={id}>
        {label}
      </label>

      <input
        className="p-3 h-12 w-[456px] border-[1px] border-{#C1C1C1} rounded-md"
        id={id}
        {...delegated}
      ></input>
      {showBtn}
    </div>
  );
};

export default Input;
