"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import mainBanner from "@/assets/images/main_banner.jpg";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
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
  })
  .required();

const Main = () => {
  const [artistType, setArtistType] = useState("Multiple");
  const [singleTypes, setSingleTypes] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const session = useSession();
  const router = useRouter();

  const getNameOfTypesArr = (data) => {
    let types = [];
    let filteredTypes = [];

    // artists type single selected checkbox make an array here for need DB
    if (artistType === "Single") {
      types = Object.keys(singleTypes);

      types.forEach((type) => {
        if (singleTypes[type]) {
          filteredTypes.push({ name: type });
        }
      });
    } else {
      filteredTypes.push({ name: data.multiTypes });
    }

    return filteredTypes;
  };

  const onSubmit = async (data) => {
    // update artist type field
    setValue("artistType", artistType);

    // updated array in this field
    setValue("nameOfType", getNameOfTypesArr(data));

    // update some field need to be database
    setValue("artistImage", "");
    setValue("artistDiscription", "");
    setValue("artistLinks", []);
    setValue("socialMedia", []);

    try {
      await axiosPrivateInstance(session?.data?.jwt).post("/artists", data);

      // show success message
      toast.success("Artist added successfully");

      // redirect to another route
      router.push("/artists");
    } catch (error) {
      console.log(error, "error in add artist page");

      // show error message
      toast.error("Something went wrong");
    }
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
          <div className="artist mx-10 flex flex-col-reverse items-center bg-gray-200 px-3 py-3 lg:flex-row lg:justify-between lg:p-10 xl:p-16 2xl:px-24 2xl:py-20">
            <div className="input-area mt-5 lg:mt-0">
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

              {/* cover photo upload input */}
              <div className="mt-6 sm:flex">
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
                        onChange={() => {
                          setArtistType("Single");
                          setValue("artistType", "Single");
                        }}
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
                        onChange={() => {
                          setArtistType("Multiple");
                          setValue("artistType", "Multiple");
                        }}
                      />
                      <label
                        htmlFor="Multiple"
                        className="ml-2 cursor-pointer select-none"
                      >
                        Multiple
                      </label>
                    </div>
                  </div>

                  {/* By default selected single and show children */}
                  <div
                    className={`children mt-3 ${
                      artistType === "Single" ? "block" : "hidden"
                    } h-[80px]`}
                  >
                    <div className="flex">
                      <div className="flex">
                        <input
                          type="checkbox"
                          name="indie"
                          id="indie"
                          {...register("indie")}
                          onChange={(e) =>
                            setSingleTypes({
                              ...singleTypes,
                              [e.target.name]: e.target.checked,
                            })
                          }
                        />
                        <label
                          className="ml-1 cursor-pointer select-none"
                          htmlFor="indie"
                        >
                          Indie
                        </label>
                      </div>

                      <div className="flex ml-5">
                        <input
                          type="checkbox"
                          name="singer"
                          id="singer"
                          {...register("singer")}
                          onChange={(e) =>
                            setSingleTypes({
                              ...singleTypes,
                              [e.target.name]: e.target.checked,
                            })
                          }
                        />
                        <label
                          className="ml-1 cursor-pointer select-none"
                          htmlFor="singer"
                        >
                          Singer
                        </label>
                      </div>

                      <div className="flex ml-5">
                        <input
                          type="checkbox"
                          name="artist"
                          id="artist"
                          {...register("artist")}
                          onChange={(e) =>
                            setSingleTypes({
                              ...singleTypes,
                              [e.target.name]: e.target.checked,
                            })
                          }
                        />
                        <label
                          className="ml-1 cursor-pointer select-none"
                          htmlFor="artist"
                        >
                          Artist
                        </label>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex">
                        <input
                          type="checkbox"
                          name="lyricist"
                          id="lyricist"
                          {...register("lyricist")}
                          onChange={(e) =>
                            setSingleTypes({
                              ...singleTypes,
                              [e.target.name]: e.target.checked,
                            })
                          }
                        />
                        <label
                          className="ml-1 cursor-pointer select-none"
                          htmlFor="lyricist"
                        >
                          Lyricist
                        </label>
                      </div>

                      <div className="flex ml-5">
                        <input
                          type="checkbox"
                          name="composer"
                          id="composer"
                          {...register("composer")}
                          onChange={(e) =>
                            setSingleTypes({
                              ...singleTypes,
                              [e.target.name]: e.target.checked,
                            })
                          }
                        />
                        <label
                          className="ml-1 cursor-pointer select-none"
                          htmlFor="composer"
                        >
                          Composer
                        </label>
                      </div>

                      <div className="flex ml-5">
                        <input
                          type="checkbox"
                          name="producer"
                          id="producer"
                          {...register("producer")}
                          onChange={(e) =>
                            setSingleTypes({
                              ...singleTypes,
                              [e.target.name]: e.target.checked,
                            })
                          }
                        />
                        <label
                          className="ml-1 cursor-pointer select-none"
                          htmlFor="producer"
                        >
                          Producer
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* when select multiple then show children */}
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
                  </div>
                </div>
              </div>

              <div className="mt-12 flex justify-center">
                <input
                  type="submit"
                  name="submit"
                  id="submit"
                  value="Submit"
                  className="float-right cursor-pointer rounded bg-gray-700 px-5 py-2 font-semibold tracking-widest text-white"
                />
              </div>
            </div>

            <div className="upload-area p-5 xs:w-[80%] sm:w-[60%] md:w-[50%] lg:w-[30%] lg:p-0 xl:w-[25%]">
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
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Main;
