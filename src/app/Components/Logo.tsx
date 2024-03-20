import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div className="flex-1">
      <Link href={"/"} className=" text font-bold text-[36px] capitalize ">
        ECOMMERCE
      </Link>
    </div>
  );
};

export default Logo;
