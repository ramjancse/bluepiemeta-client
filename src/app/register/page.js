"use client";

import Image from "next/image";
import Link from "next/link";
import logoImage from "@/assets/images/loginLogo.png";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { axiosPublicInstance } from "@/config/axios";
import { useRouter } from "next/navigation";
import { FaCircleInfo } from "react-icons/fa6";

const schema = yup
  .object({
    username: yup.ref("name"),
    name: yup
      .string()
      .trim()
      .required("Full name is required")
      .min(3, "Full name must be at least 3 character"),
    email: yup
      .string()
      .trim()
      .email("Must be a valid email")
      .required("Email is required")
      .lowercase(),
    password: yup
      .string()
      .trim()
      .required("Password is required")
      .matches(/[a-z0-9]{6}/, "Must contain letter and number"),
    confirmPassword: yup
      .string()
      .trim()
      .required("Confirm password is required")
      .oneOf([yup.ref("password")], "Confirm password don't match"),
  })
  .required();

const RegisterPage = () => {
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
      const res = await axiosPublicInstance.post("/auth/register", data);

      // show success message
      toast.success("Registration successful");

      // redirect to another route
      router.push("/login");
    } catch (error) {
      // show error message
      console.log(error, "error in register");
      toast.error("Something went wrong");
    }
  };

  return (
    <main className="flex h-screen items-center justify-center bg-gradient-to-r from-cyan-100 to-blue-500">
      <div
        style={{ boxShadow: "5px 5px 12px 2px rgb(68, 68, 68)" }}
        className="w-[80%] bg-white p-10 sm:w-[55%] md:w-[50%] lg:px-20 lg:py-14 xl:px-40 xl:py-20 2xl:w-[40%]"
      >
        <div className="logo flex items-center justify-center">
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

        <div className="input-area mt-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className="mb-2 text-sm font-medium">
              <label htmlFor="fullName" className="block cursor-pointer">
                Create your Blue Pie Account
              </label>
            </p>

            <div className="input relative">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Full Name"
                className={`w-full rounded-t-xl border-l-8 ${
                  errors.name?.message
                    ? "border-t border-r border-b border-red-500"
                    : "border-t-[0.5px] border-r border-b border-blue-700"
                } bg-gray-200 px-4 py-2 focus:outline-none`}
                {...register("name")}
              />

              <div
                className={`absolute right-0 -top-6 ${
                  errors.name?.message ? "block" : "hidden"
                }`}
              >
                <span
                  className={`w-[180px] text-xs  bg-gray-300 rounded px-2 py-1 flex items-center`}
                >
                  <FaCircleInfo className="text-red-600 mr-1" />
                  {errors.name?.message}
                </span>
              </div>
            </div>

            <div className="input mt-1 relative">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className={`w-full border-l-8 ${
                  errors.email?.message
                    ? "border-t border-r border-b border-red-500"
                    : "border-t-[0.5px] border-r border-b border-blue-700"
                } bg-gray-200 px-4 py-2 focus:outline-none`}
                {...register("email")}
              />

              <div
                className={`absolute right-0 -top-6 ${
                  errors.email?.message ? "block" : "hidden"
                }`}
              >
                <span
                  className={`w-[180px] text-xs  bg-gray-300 rounded px-2 py-1 flex items-center`}
                >
                  <FaCircleInfo className="text-red-600 mr-1" />
                  {errors.email?.message}
                </span>
              </div>
            </div>

            <div className="input mt-1 relative">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className={`w-full border-l-8 ${
                  errors.password?.message
                    ? "border-t border-r border-b border-red-500"
                    : "border-t-[0.5px] border-r border-b border-blue-700"
                } bg-gray-200 px-4 py-2 focus:outline-none`}
                {...register("password")}
              />

              <div
                className={`absolute right-0 -top-6 ${
                  errors.password?.message ? "block" : "hidden"
                }`}
              >
                <span
                  className={`w-[180px] text-xs  bg-gray-300 rounded px-2 py-1 flex items-center`}
                >
                  <FaCircleInfo className="text-red-600 mr-1" />
                  {errors.password?.message}
                </span>
              </div>
            </div>

            <div className="input mt-1 relative">
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                className={`w-full rounded-b-xl border-l-8 ${
                  errors.email?.message
                    ? "border-t border-r border-b border-red-500"
                    : "border-t-[0.5px] border-r border-b border-blue-700"
                } bg-gray-200 px-4 py-2 focus:outline-none`}
                {...register("confirmPassword")}
              />

              <div
                className={`absolute right-0 -top-6 ${
                  errors.confirmPassword?.message ? "block" : "hidden"
                }`}
              >
                <span
                  className={`w-[180px] text-xs  bg-gray-300 rounded px-2 py-1 flex items-center`}
                >
                  <FaCircleInfo className="text-red-600 mr-1" />
                  {errors.confirmPassword?.message}
                </span>
              </div>
            </div>

            <div className="input mb-3 mt-2">
              <p className="text-center text-xs">
                By creating account, I agree to Blue Pie's <br />
                <Link href="/terms" className="font-semibold">
                  Terms
                </Link>{" "}
                &{" "}
                <Link href="/privacy" className="font-semibold">
                  Privacy Policy
                </Link>
              </p>
            </div>

            <div className="mt-10 text-center">
              <input
                className="cursor-pointer rounded bg-gray-800 px-10 py-2 font-semibold uppercase tracking-wider text-white"
                type="submit"
                value="Create"
              />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
