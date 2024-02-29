"use client";

import { signOut } from "next-auth/react";

const LogOut = () => {
  return (
    <button
      className="px-3 py-1 lg:px-4 rounded hover:bg-gray-200 duration-500 hover:text-fill"
      onClick={() => signOut()}
    >
      Log out
    </button>
  );
};

export default LogOut;
