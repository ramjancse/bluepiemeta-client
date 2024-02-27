import Image from "next/image";
import logoImage from "@/assets/images/loginLogo.png";
import Login from "@/components/login/Login";
import { Suspense } from "react";

const LoginPage = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-cyan-100 to-blue-500">
      <div
        style={{ boxShadow: "5px 5px 12px 2px rgb(68, 68, 68)" }}
        className="login w-[80%] bg-white p-10 sm:w-[55%] md:w-[50%] lg:px-20 lg:py-14 xl:px-40 xl:py-20 2xl:w-[40%]"
      >
        <div className="flex items-center justify-center">
          <a href="/" className="flex items-center">
            <Image
              className="w-32"
              src={logoImage}
              alt="Logo Image"
              width={128}
              height={80}
            />
          </a>
        </div>

        <div className="input-area mt-12">
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
