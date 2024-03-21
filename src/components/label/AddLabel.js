"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { axiosPrivateInstance } from "@/config/axios";
import { useSession } from "next-auth/react";

const schema = yup
  .object({
    labelName: yup
      .string()
      .trim()
      .required("Label name is required")
      .min(3, "Label name must be at least 3 character"),
  })
  .required();

const AddLabel = () => {
  const session = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await axiosPrivateInstance(session?.data?.jwt).post(
        "/labels",
        data
      );

      // show success message
      toast.success("Label added successfully");

      // reset input field
      reset({ labelName: "" });

      // refresh for show updated list
      window.location.reload();
    } catch (error) {
      console.log(error, "error in add label submit");

      // show error message
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="pr-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input ">
          <label htmlFor="labelName" className="cursor-pointer select-none">
            Label name
          </label>

          <input
            type="text"
            name="labelName"
            id="labelName"
            placeholder="Type name"
            className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
            {...register("labelName")}
          />

          <p
            className={`${
              errors.labelName?.message ? "block" : "hidden"
            } text-sm text-red-500 font-semibold mt-1 ml-5`}
          >
            {errors.labelName?.message}
          </p>
        </div>

        <div className="submit mt-6 flex">
          <input
            type="submit"
            value="Add"
            className="text-center bg-blue-600 px-5 py-1 font-semibold rounded-full text-white cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default AddLabel;
