"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import mainBanner from "@/assets/images/main_banner.jpg";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useFieldArray, useForm } from "react-hook-form";
import { axiosPrivateInstance } from "@/config/axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const schema = yup
  .object({
    artistName: yup
      .string()
      .trim()
      .required("Artist name is required")
      .min(3, "Artist name must be at least 3 character"),
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
        link: yup.string().trim().required("Artist link is required"),
      })
    ),
    socialMedia: yup.array().of(
      yup.object({
        name: yup
          .string()
          .trim()
          .required(" Artist social link name is required")
          .min(3, "Artist social link name must be at least 3 characters"),
        link: yup.string().trim().required("Artist social link is required"),
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

const Main = () => {
  const session = useSession();
  const router = useRouter();
  const [artistType, setArtistType] = useState("Single");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      artistName: "K. Ahmed",
      fullName: "Kawsar Ahmed",
      sex: "male",
      email: "web.kawsarahmed@gmail.com",
      areaCode: "+880",
      phoneNumber: "1733920943",
      address: "abc 123 Dhaka",
      region: "Bangladesh",
      coverPhoto: "https://www.example.com/image",
      artistType: "Single",
      singleTypes: [
        { name: "Indie", status: true },
        { name: "Singer", status: false },
        { name: "Artist", status: false },
        { name: "Lyricist", status: false },
        { name: "Composer", status: false },
        { name: "Producer", status: false },
      ],
      artistLinks: [
        {
          name: "qq music",
          link: "https://qqmusic.com",
        },
        {
          name: "music",
          link: "https://qqmusic.com",
        },
      ],
      socialMedia: [
        { name: "website", link: "website.com" },
        { name: "facebook", link: "facebook.com" },
        { name: "youtube", link: "youtube.com" },
        { name: "instagram", link: "instagram.com" },
        { name: "twitter", link: "twitter.com" },
        { name: "tiktok", link: "tiktok.com" },
        { name: "iTunes", link: "iTunes.com" },
        { name: "vimeo", link: "vimeo.com" },
        { name: "deezer", link: "deezer.com" },
        { name: "spotify", link: "spotify.com" },
        { name: "dailyMotion", link: "dailyMotion.com" },
      ],
    },
  });

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

  // const getNameOfTypesArr = (data) => {
  //   let types = [];
  //   let filteredTypes = [];

  //   // artists type single selected checkbox make an array here for need DB
  //   if (artistType === "Single") {
  //     types = Object.keys(singleTypes);

  //     types.forEach((type) => {
  //       if (singleTypes[type]) {
  //         filteredTypes.push({ name: type });
  //       }
  //     });
  //   } else {
  //     filteredTypes.push({ name: data.multiTypes });
  //   }

  //   return filteredTypes;
  // };

  const onSubmit = async (data) => {
    console.log(data, "add artist data");

    // update some field need to be database
    setValue("artistDescription", "");

    try {
      await axiosPrivateInstance(session?.data?.jwt).post("/artists", data);

      // show success message
      toast.success("Artist added successfully");

      // redirect to another route
      // router.push("/artists");
    } catch (error) {
      console.log(error, "error in add artist page");

      // show error message
      toast.error("Something went wrong");
    }
  };

  const handleChangeArtistsType = (aType) => {
    setArtistType(aType);
    setValue("artistType", aType);
  };

  return (
    <main>
      <div className="intro">
        <Image
          className="h-36 w-full object-cover sm:h-52 md:h-64 lg:h-72 xl:h-80 2xl:h-96"
          src={mainBanner}
          alt="Intro Image"
          width={1000}
          height={144}
        />
      </div>

      <div className="info">
        <h3 className="py-2 text-center text-xl font-bold">Artist Info</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="artist mx-10 flex flex-col-reverse items-center bg-gray-200 px-3 py-3 lg:flex-row lg:justify-center lg:p-10 xl:p-16 2xl:px-24 2xl:py-20">
            <div className="input-area">
              <div className="sm:flex">
                <div className="label hidden sm:block sm:w-1/3">
                  <label
                    htmlFor="artistName"
                    className="block cursor-pointer rounded bg-white px-5 py-2 font-semibold"
                  >
                    Artist Name
                  </label>
                </div>

                <div className="input mt-2 sm:ml-2 sm:mt-0 sm:w-2/3">
                  <input
                    type="text"
                    name="artistName"
                    id="artistName"
                    placeholder="Artist Name"
                    className="w-full rounded border-none px-5 py-2 focus:outline-none"
                    {...register("artistName")}
                  />

                  <p
                    className={`${
                      errors.artistName?.message ? "block" : "hidden"
                    } text-sm text-red-500 font-semibold mt-1 ml-5`}
                  >
                    {errors.artistName?.message}
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
              {/* <div className="mt-6 sm:flex">
                <div className="label hidden w-1/3 sm:block">
                  <label
                    htmlFor="genre"
                    className="block cursor-pointer rounded bg-white px-5 py-2 font-semibold"
                  >
                    Genre
                  </label>
                </div>

                <div className="input text-gray-500 sm:ml-2 sm:w-2/3">
                  <select
                    name="genre"
                    id="genre"
                    className="block w-full rounded border-none px-5 py-[0.6rem] focus:outline-none"
                  >
                    <option value="">Artist's Music Genre</option>
                    <option value="folk">Folk</option>
                    <option value="indie">Indie Song</option>
                    <option value="abc">Abc Song</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 sm:flex">
                <div className="label hidden w-1/3 sm:block">
                  <label
                    htmlFor="mood"
                    className="block cursor-pointer rounded bg-white px-5 py-2 font-semibold"
                  >
                    Mood
                  </label>
                </div>

                <div className="input text-gray-500 sm:ml-2 sm:w-2/3">
                  <select
                    name="mood"
                    id="mood"
                    className="w-full rounded border-none px-5 py-[0.6rem] focus:outline-none"
                  >
                    <option value="">Artist's Music Mood</option>
                    <option value="folk">Folk</option>
                    <option value="indie">Indie Song</option>
                    <option value="abc">Abc Song</option>
                  </select>
                </div>
              </div> */}
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
              {/* cover photo upload input */}
              {/* <div className="mt-6 sm:flex">
                <div className="label hidden w-1/3 sm:block">
                  <label
                    htmlFor="coverPic"
                    className="block cursor-pointer rounded bg-white px-5 py-2 font-semibold"
                  >
                    Cover Photo
                  </label>
                </div>

                <div className="input sm:ml-2 sm:w-2/3">
                  <label
                    htmlFor="coverPic"
                    className="hidden w-full cursor-pointer rounded bg-fill px-5 py-2 text-center font-semibold tracking-widest text-white sm:block"
                  >
                    Upload File
                  </label>

                  <label
                    htmlFor="coverPic"
                    className="block w-full cursor-pointer rounded bg-fill px-5 py-2 text-center font-semibold tracking-widest text-white sm:hidden"
                  >
                    Upload Cover Photo
                  </label>

                  <input
                    type="file"
                    name="coverPic"
                    id="coverPic"
                    className="hidden"
                    accept="image/png, image/gif, image/jpeg, image/svg, image/jpg"
                  />
                </div>
              </div> */}
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

                  {/* <div
                    className={`children mt-3 ${
                      artistType === "Single" ? "block" : "hidden"
                    } h-[80px]`}
                  >
                    <div className="flex">
                      <div className="flex">
                        <input
                          type="checkbox"
                          name="Indie"
                          id="Indie"
                          {...register("Indie")}
                          onChange={(e) =>
                            setSingleTypes({
                              ...singleTypes,
                              [e.target.name]: e.target.checked,
                            })
                          }
                        />
                        <label
                          className="ml-1 cursor-pointer select-none"
                          htmlFor="Indie"
                        >
                          Indie
                        </label>
                      </div>

                      <div className="flex ml-5">
                        <input
                          type="checkbox"
                          name="Singer"
                          id="Singer"
                          {...register("Singer")}
                          onChange={(e) =>
                            setSingleTypes({
                              ...singleTypes,
                              [e.target.name]: e.target.checked,
                            })
                          }
                        />
                        <label
                          className="ml-1 cursor-pointer select-none"
                          htmlFor="Singer"
                        >
                          Singer
                        </label>
                      </div>

                      <div className="flex ml-5">
                        <input
                          type="checkbox"
                          name="Artist"
                          id="Artist"
                          {...register("Artist")}
                          onChange={(e) =>
                            setSingleTypes({
                              ...singleTypes,
                              [e.target.name]: e.target.checked,
                            })
                          }
                        />
                        <label
                          className="ml-1 cursor-pointer select-none"
                          htmlFor="Artist"
                        >
                          Artist
                        </label>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex">
                        <input
                          type="checkbox"
                          name="Lyricist"
                          id="Lyricist"
                          {...register("Lyricist")}
                          onChange={(e) =>
                            setSingleTypes({
                              ...singleTypes,
                              [e.target.name]: e.target.checked,
                            })
                          }
                        />
                        <label
                          className="ml-1 cursor-pointer select-none"
                          htmlFor="Lyricist"
                        >
                          Lyricist
                        </label>
                      </div>

                      <div className="flex ml-5">
                        <input
                          type="checkbox"
                          name="Composer"
                          id="Composer"
                          {...register("Composer")}
                          onChange={(e) =>
                            setSingleTypes({
                              ...singleTypes,
                              [e.target.name]: e.target.checked,
                            })
                          }
                        />
                        <label
                          className="ml-1 cursor-pointer select-none"
                          htmlFor="Composer"
                        >
                          Composer
                        </label>
                      </div>

                      <div className="flex ml-5">
                        <input
                          type="checkbox"
                          name="Producer"
                          id="Producer"
                          {...register("Producer")}
                          onChange={(e) =>
                            setSingleTypes({
                              ...singleTypes,
                              [e.target.name]: e.target.checked,
                            })
                          }
                        />
                        <label
                          className="ml-1 cursor-pointer select-none"
                          htmlFor="Producer"
                        >
                          Producer
                        </label>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`children mt-3 ${
                      artistType === "Multiple" ? "block" : "hidden"
                    }  h-[80px]`}
                  >
                    <div className="flex">
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
                  </div> */}
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
                      placeholder="Enter qq music link"
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
                      className="block cursor-pointer rounded bg-white px-5 py-2 font-semibold"
                    >
                      {socialLink.name}
                    </label>
                  </div>

                  <div className="input sm:ml-2 sm:w-2/3">
                    <input
                      type="text"
                      name={`socialMedia[${index}].name`}
                      id={`socialMedia[${index}].name`}
                      placeholder="Enter qq music link"
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
                  value="Submit"
                  className="float-right cursor-pointer rounded bg-gray-700 px-5 py-2 font-semibold tracking-widest text-white"
                />
              </div>
            </div>

            {/* <div className="upload-area p-5 xs:w-[80%] sm:w-[60%] md:w-[50%] lg:w-[30%] lg:p-0 xl:w-[25%]">
              <div className="w-full">
                <div className="image">
                  <Image
                    src={mainBanner}
                    className="h-full cursor-pointer rounded"
                    alt="Profile Picture"
                    width={400}
                    height={400}
                  />
                </div>

                <div className="input mt-3">
                  <label
                    htmlFor="profilePic"
                    className="block w-full cursor-pointer rounded bg-fill px-5 py-2 text-center font-semibold tracking-widest text-white"
                  >
                    Upload Profile Photo
                  </label>

                  <input
                    type="file"
                    name="profilePic"
                    id="profilePic"
                    className="hidden"
                    accept="image/png, image/gif, image/jpeg, image/svg, image/jpg"
                  />
                </div>
              </div>
            </div> */}
          </div>
        </form>
      </div>
    </main>
  );
};

export default Main;
