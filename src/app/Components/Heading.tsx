import React from "react";
import LinkButton from "./LinkButton";
import LogoutButton from "./LogoutButton";
import { cookies } from "next/headers";

const Heading = () => {
  const cookieStore = cookies();
  const isLoggedIn = cookieStore.get("authorization");
  // if (theme) {
  //   console.log("cookie present");
  // }
  return (
    <div>
      <ul className="flex justify-end gap-5 text-sm py-3 mx-10">
        <LinkButton>Help</LinkButton>
        <LinkButton>Orders and Returns</LinkButton>
        <li>Hi, John</li>
        {isLoggedIn && <LogoutButton />}
      </ul>
    </div>
  );
};

export default Heading;
