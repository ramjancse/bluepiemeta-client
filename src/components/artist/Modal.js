"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useFieldArray, useForm } from "react-hook-form";
import { axiosPrivateInstance } from "@/config/axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MdCancel } from "react-icons/md";

const schema = yup
  .object({
    link: yup
      .string()
      .trim()
      .required("Artist link is required")
      .min(3, "Artist link must be at least 3 characters"),
  })
  .required();

const Modal = ({
  link: { artistId, linkData, artistLinks },
  sectionName,
  setShow,
  artistInfo,
}) => {
  const session = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { link: linkData.link },
  });

  const onSubmit = async (data) => {
    const modifiedData = JSON.parse(JSON.stringify(artistInfo));
    if (artistLinks) {
      modifiedData.artistLinks.map((singleLink) => {
        if (singleLink._id.toString() === linkData._id.toString()) {
          return (singleLink.link = data.link);
        } else {
          return singleLink;
        }
      });
    } else {
      modifiedData.socialMedia.map((singleLink) => {
        if (singleLink._id.toString() === linkData._id.toString()) {
          return (singleLink.link = data.link);
        } else {
          return singleLink;
        }
      });
    }

    try {
      // update req
      await axiosPrivateInstance(session?.data?.jwt).put(
        `/artists/${artistId}`,
        modifiedData
      );

      // show success message
      toast.success("Artist updated successfully");

      // close modal
      setShow((prev) => !prev);
    } catch (error) {
      console.log(error, "error in add artist page");

      // show error message
      toast.error("Something went wrong");

      //close modal
      setShow((prev) => !prev);
    }
  };

  return (
    <div className="modal fixed left-1/2 top-1/2 bg-gray-400 rounded p-5 -translate-x-1/2 -translate-y-1/2">
      <div className="top  mb-5 flex justify-between items-center">
        <h4 className="text-xl">{sectionName}</h4>

        <MdCancel
          className="text-lg cursor-pointer"
          onClick={() => setShow((prev) => !prev)}
        />
      </div>

      <div className="links">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* {artistLinksFields.map((artistLink, index) => (
            <div className="mt-6 sm:flex" key={artistLink.id}>
              <div className="label hidden w-1/3 sm:block">
                <label
                  htmlFor={`artistLinks[${index}].name`}
                  className="block cursor-pointer rounded bg-white px-5 py-2 font-semibold"
                >
                  {artistLink.name}
                </label>
              </div>

              <div className="input sm:ml-2 sm:w-2/3">
                <input
                  type="text"
                  name={`artistLinks[${index}].name`}
                  id={`artistLinks[${index}].name`}
                  placeholder={`Enter ${artistLink.name} link`}
                  className="w-full rounded border-none px-5 py-2 focus:outline-none"
                  {...register(`artistLinks.${index}.link`)}
                />

                <p
                  className={`${
                    errors.artistLinks && errors.artistLinks[index]?.name
                      ? "block"
                      : "hidden"
                  } text-sm text-red-500 font-semibold mt-1 ml-5 mb-3`}
                >
                  {errors.artistLinks &&
                    errors.artistLinks[index]?.name?.message}
                </p>
              </div>
            </div>
          ))} */}

          <div className="input flex">
            <label
              htmlFor="link"
              className="block cursor-pointer rounded bg-white px-5 py-2 font-semibold w-[200px] mr-2"
            >
              {linkData.name}
            </label>

            <input
              type="text"
              name="link"
              id="link"
              className="w-full rounded border-none px-5 py-2 focus:outline-none"
              placeholder={`Enter ${linkData.name} link`}
              {...register("link")}
            />
          </div>

          <p
            className={`${
              errors.link?.message ? "block" : "hidden"
            } text-sm text-red-500 font-semibold mt-1 ml-5`}
          >
            {errors.link?.message}
          </p>

          <div className="submit mt-12">
            <input
              type="submit"
              name="submit"
              id="submit"
              value={`Update`}
              className="cursor-pointer rounded bg-gray-700 px-5 py-2 font-semibold tracking-widest text-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
