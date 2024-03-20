import React, { FC, ReactNode } from "react";

interface BannerProps {
  children: ReactNode; // ReactNode represents any valid JSX
}

const Banner: FC<BannerProps> = ({ children }) => {
  return (
    <div className="banner text-center py-2 text-[14px] font-semibold bg-[#F4F4F4]">
      {children}
    </div>
  );
};

export default Banner;
