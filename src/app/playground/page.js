"use client";

import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const schema = yup
  .object({
    fullName: yup
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
  })
  .required();

const PlayGround = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data, "data");
  };

  return (
    <div>
      <h2>Welcome to Playground</h2>
      <br />

      <div className="form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="first">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              placeholder="Full Name"
              name="fullName"
              id="fullName"
              className="px-10 py-1 focus:outline-none ring-2 ring-offset-2 ring-blue-400 rounded"
              {...register("fullName")}
            />
          </div>

          <div className="second mt-3">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Last Name"
              className="px-10 py-1 focus:outline-none ring-2 ring-offset-2 ring-blue-400 rounded"
              {...register("email")}
            />
          </div>

          <input
            type="submit"
            value="Submit"
            className="px-4 py-1 rounded bg-blue-400 text-white cursor-pointer mt-5"
          />
        </form>
      </div>
    </div>
  );
};

export default PlayGround;
