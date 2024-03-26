"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { axiosPrivateInstance } from "@/config/axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const schema = yup
  .object({
    labelName: yup
      .string()
      .trim()
      .required("Label name is required")
      .min(3, "Label name must be at least 3 character"),
    website: yup
      .string()
      .trim()
      .required("Website address is required")
      .min(3, "Website address must be at least 3 character"),

    country: yup
      .string()
      .trim()
      .required("Country is required")
      .min(3, "Country name must be at least 3 character"),

    address: yup
      .string()
      .trim()
      .required("Address is required")
      .min(3, "Address must be at least 3 character"),

    state: yup
      .string()
      .trim()
      .required("State is required")
      .min(3, "State must be at least 3 character"),
  })
  .required();

const AddLabel = () => {
  const session = useSession();
  const router = useRouter();

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

      // redirect labels page
      router.push("/labels");
    } catch (error) {
      console.log(error, "error in add label submit");

      // show error message
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="border-l border-b px-5 pt-3 pb-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap">
          <div className="input w-1/2 pr-2">
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

          <div className="input w-1/2 pl-2">
            <label htmlFor="website" className="cursor-pointer select-none">
              Website
            </label>

            <input
              type="text"
              name="website"
              id="website"
              placeholder="Enter website address"
              className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
              {...register("website")}
            />

            <p
              className={`${
                errors.website?.message ? "block" : "hidden"
              } text-sm text-red-500 font-semibold mt-1 ml-5`}
            >
              {errors.website?.message}
            </p>
          </div>

          <div className="input w-1/2 pr-2 mt-3">
            <label htmlFor="state" className="cursor-pointer select-none">
              State
            </label>

            <input
              type="text"
              name="state"
              id="state"
              placeholder="Enter state"
              className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
              {...register("state")}
            />

            <p
              className={`${
                errors.state?.message ? "block" : "hidden"
              } text-sm text-red-500 font-semibold mt-1 ml-5`}
            >
              {errors.state?.message}
            </p>
          </div>

          <div className="input w-1/2 pl-2 mt-3">
            <label htmlFor="country" className="cursor-pointer select-none">
              Country
            </label>

            <input
              type="text"
              name="country"
              id="country"
              placeholder="Enter country"
              className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
              {...register("country")}
            />

            <p
              className={`${
                errors.country?.message ? "block" : "hidden"
              } text-sm text-red-500 font-semibold mt-1 ml-5`}
            >
              {errors.country?.message}
            </p>
          </div>

          <div className="input w-1/2 pr-2 mt-3">
            <label htmlFor="address" className="cursor-pointer select-none">
              Address
            </label>

            <input
              type="text"
              name="address"
              id="address"
              placeholder="Enter address"
              className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
              {...register("address")}
            />

            <p
              className={`${
                errors.address?.message ? "block" : "hidden"
              } text-sm text-red-500 font-semibold mt-1 ml-5`}
            >
              {errors.address?.message}
            </p>
          </div>
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
