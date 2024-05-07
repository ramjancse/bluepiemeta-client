"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useFieldArray, useForm } from "react-hook-form";
import { axiosPrivateInstance } from "@/config/axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEditArtistMutation } from "@/features/artists/artistAPI";

const schema = yup
  .object({
    name: yup
      .string()
      .trim()
      .required("Name is required")
      .min(3, "Name must be at least 3 character"),
    fullName: yup
      .string()
      .trim()
      .required("Full name is required")
      .min(3, "Full name must be at least 3 character"),
    sex: yup
      .string()
      .trim()
      .required("Gender is required")
      .oneOf(["male", "female"], "Gender must select male or female"),
    email: yup
      .string()
      .trim()
      .email("Must be a valid email")
      .required("Email is required")
      .lowercase(),
    areaCode: yup.string().trim().required("Area code is required"),
    phoneNumber: yup.string().trim().required("Phone number is required"),
    address: yup.string().trim().required("Address is required"),
    region: yup.string().trim().required("Region is required"),
    artistImage: yup.string().trim().required("Artist image link is required"),
    artistType: yup
      .string()
      .trim()
      .required("Artist type is required")
      .oneOf(
        ["Single", "Multiple"],
        "Artist type must be select Single or Multiple"
      ),

    singleTypes: yup.array().of(
      yup.object({
        name: yup
          .string()
          .trim()
          .required("Single types name is required")
          .oneOf(
            ["Indie", "Singer", "Artist", "Lyricist", "Composer", "Producer"],
            "Artist single type must be select between fields"
          ),
        status: yup
          .boolean()
          .oneOf([true, false], "Status can only true or false"),
      })
    ),
    multiTypes: yup.string().trim(),
    artistLinks: yup.array().of(
      yup.object({
        name: yup
          .string()
          .trim()
          .required(" Artist link name is required")
          .min(3, "Artist name must be at least 3 characters"),
        link: yup.string().trim(),
      })
    ),
    socialMedia: yup.array().of(
      yup.object({
        name: yup
          .string()
          .trim()
          .required(" Artist social link name is required")
          .min(3, "Artist social link name must be at least 3 characters"),
        link: yup.string().trim(),
      })
    ),
  })
  .transform((originalValue, originalObject) => {
    const { artistType, singleTypes, multiTypes } = originalObject;

    if (artistType === "Single") {
      return {
        ...originalObject,
        nameOfType: singleTypes,
      };
    } else {
      return {
        ...originalObject,
        nameOfType: [{ name: multiTypes, status: true }],
      };
    }
  })
  .required();

const EditForm = ({ artist }) => {
  const session = useSession();
  const router = useRouter();
  const [artistType, setArtistType] = useState(artist.artistType);

  const singleTypes = [
    { name: "Indie", status: false },
    { name: "Singer", status: false },
    { name: "Artist", status: false },
    { name: "Lyricist", status: false },
    { name: "Composer", status: false },
    { name: "Producer", status: false },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...artist,
      singleTypes:
        artist.artistType === "Single" ? artist?.nameOfType : singleTypes,
      multiTypes:
        artist.artistType === "Multiple" ? artist?.nameOfType[0]?.name : "",
    },
  });

  const [editArtist, { isLoading, isSuccess, isError, error }] =
    useEditArtistMutation();

  const { fields, append, remove } = useFieldArray({
    name: "singleTypes",
    control,
  });

  const {
    fields: artistLinksFields,
    append: artistAppend,
    remove: artistRemove,
  } = useFieldArray({
    name: "artistLinks",
    control,
  });

  const {
    fields: socialMediaFields,
    append: socialMediaAppend,
    remove: socialMediaRemove,
  } = useFieldArray({
    name: "socialMedia",
    control,
  });

  const onSubmit = async (data) => {
    editArtist({ artistId: artist.id, data })
      .then((res) => {
        // show success message
        toast.success("Artist edited successfully");

        // redirect to another route
        router.push(`/artists`);
      })
      .catch((error) => {
        console.log(error, "edit artist error");

        // show error message
        toast.error("Something went wrong");
      });
  };

  const handleChangeArtistsType = (aType) => {
    setArtistType(aType);
    setValue("artistType", aType);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="artist mx-10 flex flex-col-reverse items-center bg-gray-200 px-3 py-3 lg:flex-row lg:justify-center lg:p-10 xl:p-16 2xl:px-24 2xl:py-20">
        <div className="input-area">
          <div className="sm:flex">
            <div className="label hidden sm:block sm:w-1/3">
              <label
                htmlFor="name"
                className="block cursor-pointer rounded bg-white px-5 py-2 font-semibold"
              >
                Artist Name
              </label>
            </div>

            <div className="input mt-2 sm:ml-2 sm:mt-0 sm:w-2/3">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                className="w-full rounded border-none px-5 py-2 focus:outline-none"
                {...register("name")}
              />

              <p
                className={`${
                  errors.name?.message ? "block" : "hidden"
                } text-sm text-red-500 font-semibold mt-1 ml-5`}
              >
                {errors.name?.message}
              </p>
            </div>
          </div>

          <div className="mt-6 sm:flex">
            <div className="label hidden w-1/3 sm:block">
              <label
                htmlFor="fullName"
                className="block cursor-pointer rounded bg-white px-5 py-2 font-semibold"
              >
                Full Name
              </label>
            </div>

            <div className="input sm:ml-2 sm:w-2/3">
              <input
                type="text"
                name="fullName"
                id="fullName"
                placeholder="Full Name"
                className="w-full rounded border-none px-5 py-2 focus:outline-none"
                {...register("fullName")}
              />

              <p
                className={`${
                  errors.fullName?.message ? "block" : "hidden"
                } text-sm text-red-500 font-semibold mt-1 ml-5`}
              >
                {errors.fullName?.message}
              </p>
            </div>
          </div>

          <div className="mt-6 sm:flex">
            <div className="label hidden w-1/3 sm:block">
              <label
                htmlFor="sex"
                className="block cursor-pointer rounded bg-white px-5 py-2 font-semibold"
              >
                Gender
              </label>
            </div>

            <div className="input sm:ml-2 sm:w-2/3">
              <select
                name="sex"
                id="sex"
                className="w-full rounded border-none px-5 py-2 focus:outline-none"
                {...register("sex")}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <p
                className={`${
                  errors.gender?.message ? "block" : "hidden"
                } text-sm text-red-500 font-semibold mt-1 ml-5`}
              >
                {errors.gender?.message}
              </p>
            </div>
          </div>

          <div className="mt-6 sm:flex">
            <div className="label hidden w-1/3 sm:block">
              <label
                htmlFor="email"
                className="block cursor-pointer rounded bg-white px-5 py-2 font-semibold"
              >
                Email
              </label>
            </div>

            <div className="input sm:ml-2 sm:w-2/3">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="w-full rounded border-none px-5 py-2 focus:outline-none"
                {...register("email")}
              />

              <p
                className={`${
                  errors.email?.message ? "block" : "hidden"
                } text-sm text-red-500 font-semibold mt-1 ml-5`}
              >
                {errors.email?.message}
              </p>
            </div>
          </div>

          <div className="mt-6 sm:flex">
            <div className="label hidden w-1/3 sm:block">
              <label
                htmlFor="phoneNumber"
                className="block cursor-pointer rounded bg-white px-5 py-2 font-semibold"
              >
                Phone Number
              </label>
            </div>

            <div className="input sm:ml-2 sm:w-2/3">
              <div className="flex">
                <div className="leftSide w-[30%]">
                  <input
                    type="text"
                    name="areaCode"
                    id="areaCode"
                    placeholder="Area Code"
                    className="w-full rounded border-none px-2 py-2 focus:outline-none"
                    {...register("areaCode")}
                  />
                </div>

                <div className="rightSide ml-1 w-[70%]">
                  <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="Phone Number"
                    className="w-full rounded border-none px-5 py-2 focus:outline-none"
                    {...register("phoneNumber")}
                  />
                </div>
              </div>

              <p
                className={`${
                  errors.areaCode?.message || errors.phoneNumber?.message
                    ? "block"
                    : "hidden"
                } text-sm text-red-500 font-semibold mt-1 ml-5`}
              >
                {errors.areaCode?.message || errors.phoneNumber?.message}
              </p>
            </div>
          </div>

          <div className="mt-6 sm:flex">
            <div className="label hidden w-1/3 sm:block">
              <label
                htmlFor="address"
                className="block cursor-pointer rounded bg-white px-5 py-2 font-semibold"
              >
                Address
              </label>
            </div>

            <div className="input sm:ml-2 sm:w-2/3">
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Address"
                className="w-full rounded border-none px-5 py-2 focus:outline-none"
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

          <div className="mt-6 sm:flex">
            <div className="label hidden w-1/3 sm:block">
              <label
                htmlFor="region"
                className="block cursor-pointer rounded bg-white px-5 py-2 font-semibold"
              >
                Region
              </label>
            </div>

            <div className="input sm:ml-2 sm:w-2/3">
              <input
                type="text"
                name="region"
                id="region"
                placeholder="Region"
                className="w-full rounded border-none px-5 py-2 focus:outline-none"
                {...register("region")}
              />
              <p
                className={`${
                  errors.region?.message ? "block" : "hidden"
                } text-sm text-red-500 font-semibold mt-1 ml-5`}
              >
                {errors.region?.message}
              </p>
            </div>
          </div>

          <div className="mt-6 sm:flex">
            <div className="label hidden w-1/3 sm:block">
              <label
                htmlFor="artistImage"
                className="block cursor-pointer rounded bg-white px-5 py-2 font-semibold"
              >
                Artist Image
              </label>
            </div>

            <div className="input sm:ml-2 sm:w-2/3">
              <input
                type="text"
                name="artistImage"
                id="artistImage"
                placeholder="Enter cover photo link"
                className="w-full rounded border-none px-5 py-2 focus:outline-none"
                {...register("artistImage")}
              />

              <p
                className={`${
                  errors.artistImage?.message ? "block" : "hidden"
                } text-sm text-red-500 font-semibold mt-1 ml-5`}
              >
                {errors.artistImage?.message}
              </p>
            </div>
          </div>

          <div className="mt-6 sm:flex">
            <div className="label hidden w-1/3 sm:block">
              <label className="block cursor-pointer rounded bg-white px-5 py-2 font-semibold">
                Artist Type
              </label>
            </div>

            <div className="input sm:ml-2 sm:w-2/3">
              <div className="flex">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="artistType"
                    id="Single"
                    value="Single"
                    defaultChecked={artistType === "Single"}
                    onChange={() => handleChangeArtistsType("Single")}
                  />
                  <label
                    htmlFor="Single"
                    className="ml-2 cursor-pointer select-none"
                  >
                    Single
                  </label>
                </div>

                <div className="flex items-center ml-5">
                  <input
                    type="radio"
                    name="artistType"
                    id="Multiple"
                    value="Multiple"
                    defaultChecked={artistType === "Multiple"}
                    onChange={() => handleChangeArtistsType("Multiple")}
                  />
                  <label
                    htmlFor="Multiple"
                    className="ml-2 cursor-pointer select-none"
                  >
                    Multiple
                  </label>
                </div>
              </div>

              {artistType === "Single" ? (
                <div
                  className={`inputs border border-white py-2 flex flex-wrap mt-3`}
                >
                  {fields.map((field, index) => (
                    <div className="input pl-3 py-1 w-1/3" key={field.id}>
                      <input
                        type="checkbox"
                        name={`singleTypes[${index}].name`}
                        id={`singleTypes[${index}].name`}
                        {...register(`singleTypes.${index}.status`)}
                        className="cursor-pointer"
                      />

                      <label
                        htmlFor={`singleTypes[${index}].name`}
                        className="ml-1 cursor-pointer select-none text-sm"
                      >
                        {field.name}
                      </label>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`flex border border-white py-2 mt-3 px-3`}>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="multiTypes"
                      id="band"
                      value="Band"
                      {...register("multiTypes")}
                    />
                    <label
                      className="ml-1 cursor-pointer select-none"
                      htmlFor="band"
                    >
                      Band
                    </label>
                  </div>

                  <div className="flex ml-5 items-center">
                    <input
                      type="radio"
                      name="multiTypes"
                      id="group"
                      value="Group"
                      {...register("multiTypes")}
                      defaultChecked
                    />
                    <label
                      className="ml-1 cursor-pointer select-none"
                      htmlFor="group"
                    >
                      Group
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          <hr />
          <h4> Artist Links</h4>

          {artistLinksFields.map((artistLink, index) => (
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
          ))}

          <hr className="mt-5" />
          <h4> Social Media Links</h4>

          {socialMediaFields.map((socialLink, index) => (
            <div className="mt-6 sm:flex" key={socialLink.id}>
              <div className="label hidden w-1/3 sm:block">
                <label
                  htmlFor={`socialMedia[${index}].name`}
                  className="block cursor-pointer rounded bg-white px-5 py-2 font-semibold capitalize"
                >
                  {socialLink.name}
                </label>
              </div>

              <div className="input sm:ml-2 sm:w-2/3">
                <input
                  type="text"
                  name={`socialMedia[${index}].name`}
                  id={`socialMedia[${index}].name`}
                  placeholder={`Enter ${socialLink.name} link`}
                  className="w-full rounded border-none px-5 py-2 focus:outline-none"
                  {...register(`socialMedia.${index}.link`)}
                />

                <p
                  className={`${
                    errors.socialMedia && errors.socialMedia[index]?.name
                      ? "block"
                      : "hidden"
                  } text-sm text-red-500 font-semibold mt-1 ml-5 mb-3`}
                >
                  {errors.socialMedia &&
                    errors.socialMedia[index]?.name?.message}
                </p>
              </div>
            </div>
          ))}

          <div className="submit mt-12 flex justify-center">
            <input
              type="submit"
              name="submit"
              id="submit"
              value="Update"
              className="float-right cursor-pointer rounded bg-gray-700 px-5 py-2 font-semibold tracking-widest text-white"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditForm;
