import React, { FC, ReactNode } from "react";

type LinkProps = {
  children: ReactNode;
};

const LinkButton: FC<LinkProps> = ({ children }) => {
  return (
    <li className="">
      <button>{children}</button>
    </li>
  );
};

export default LinkButton;
