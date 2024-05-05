"use client";

import Loader from "@/components/shared/Loader";
import useAuthCheck from "@/hooks/useAuthCheck";
import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }) => {
  const isAuth = useAuthCheck();

  if (!isAuth) {
    return <Loader />;
  }

  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
