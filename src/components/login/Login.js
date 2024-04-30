"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FaCircleInfo } from "react-icons/fa6";
import { getSession, signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "@/features/auth/authAPI";
import { userLoggedIn } from "@/features/auth/authSlice";

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

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [login, { data, isLoading, isSuccess, isError, error }] =
    useLoginMutation();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      console.log(result, "login result");

      if (!result.error && result.ok) {

        // set data to redux store
        const {jwt, user} = await getSession();
        dispatch(
          userLoggedIn({
            user,
            accessToken: jwt
          })
        );

        // show success message
        toast.success("Login success!");
        router.push(callbackUrl ? callbackUrl : "/");
      } else {
        // show error message
        toast.error("Something went wrong!");
      }
    } catch (error) {
      // show error message
      console.log(error, "error in login submit response");
      toast.error(
        error?.response?.data?.error?.message ?? "Something went wrong!"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="mb-2 text-sm font-medium">
        <label htmlFor="username" className="block cursor-pointer">
          Log in to your account
        </label>
      </p>

      <div className="input relative">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className={`w-full rounded-t-xl border-l-8 ${
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
          className={`w-full rounded-b-xl border-l-8 ${
            errors.password?.message
              ? "border-t border-r border-b border-red-500"
              : "border-t border-r border-b border-blue-700"
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
  );
};

export default Login;
