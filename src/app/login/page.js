"use client";

import Image from "next/image";
import logoImage from "@/assets/images/loginLogo.png";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { axiosPublicInstance } from "@/config/axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const schema = yup
  .object({
    // username: yup.string().trim().required("Username is required").lowercase(),
    email: yup
      .string()
      .trim()
      .email("Must be a valid email")
      .required("Email is required")
      .lowercase(),
    password: yup.string().trim().required("Password is required"),
  })
  .required();

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const res = await axiosPublicInstance.post("/auth/login", data);
      console.log(res, "res");

      // show success message
      toast.success("Login successful");

      // redirect to home page
      router.push("/");
    } catch (error) {
      // show error message
      console.log(error, "error");
      toast.error("Invalid email or password");
    }
  };

  useEffect(() => {
    loginError(errors);
  }, [errors]);

  const loginError = ({ email, password }) => {
    if (email) {
      toast.error(email.message);
      return false;
    }

    if (password) {
      toast.error(password.message);
      return false;
    }
  };

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className="mb-2 text-sm font-medium">
              <label htmlFor="username" className="block cursor-pointer">
                Log in to your account
              </label>
            </p>

            <div className="input">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className={`w-full rounded-t-xl border-l-8 ${
                  errors.email?.message
                    ? "border-t border-r border-b border-red-400"
                    : "border-blue-700"
                } bg-gray-200 px-4 py-2 focus:outline-none`}
                {...register("email")}
              />
            </div>

            <div className="input mt-1">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="w-full rounded-b-xl border-l-8 border-blue-700 bg-gray-200 px-4 py-2 focus:outline-none"
                {...register("password")}
              />
            </div>

            <div className="input mb-3 mt-2 flex">
              <input
                className="bg-pink-700"
                type="checkbox"
                name="check"
                id="check"
              />
              <label
                htmlFor="check"
                className="ml-1 cursor-pointer text-xs font-medium"
              >
                Keep me signed in
              </label>
            </div>

            <div className="submit mt-10 text-center">
              <input
                className="cursor-pointer rounded bg-gray-800 px-10 py-2 font-semibold uppercase tracking-wider text-white"
                type="submit"
                value="Log In"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
