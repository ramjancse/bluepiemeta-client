"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const Auth = ({ children }) => {
  const router = useRouter();

  const session = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/login");
    },
  });

  console.log(session, "session in auth");

  return <>{children}</>;
};

export default Auth;
