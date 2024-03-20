import React from "react";
import LinkButton from "./LinkButton";

const Heading = () => {
  return (
    <div>
      <ul className="flex justify-end gap-5 text-sm py-3 mx-10">
        <LinkButton>Help</LinkButton>
        <LinkButton>Orders and Returns</LinkButton>
        <li>Hi, John</li>
      </ul>
    </div>
  );
};

export default Heading;
