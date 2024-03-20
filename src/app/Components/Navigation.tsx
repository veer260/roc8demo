import React from "react";
import LinkButton from "./LinkButton";
import Logo from "./Logo";
import Icon from "./IconButton";
import { Search, ShoppingCart } from "react-feather";
import IconButton from "./IconButton";

const Navigation = () => {
  return (
    <div className="flex h-[64px] px-9 border-b-2 items-baseline">
      <Logo />

      <ul className=" flex  justify-center items-baseline gap-8 text-[1rem] font-semibold">
        <LinkButton>Categories</LinkButton>
        <LinkButton>Sales</LinkButton>
        <LinkButton>Clearance</LinkButton>
        <LinkButton>New Stock</LinkButton>
        <LinkButton>Trending</LinkButton>
      </ul>

      <div className="flex-1">
        <ul className="flex justify-end items-baseline gap-9">
          <IconButton icon={<Search size="24px" strokeWidth={2} />} />
          <IconButton icon={<ShoppingCart size="24px" strokeWidth={2} />} />
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
