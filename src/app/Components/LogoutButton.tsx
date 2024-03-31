"use client";
import React from "react";
import { logoutAction } from "../lib/actions";

const LogoutButton = () => {
  return (
    <button
      onClick={async () => {
        await logoutAction();
      }}
      className=" text-purple-600 font-semibold"
    >
      LogoutButton
    </button>
  );
};

export default LogoutButton;
