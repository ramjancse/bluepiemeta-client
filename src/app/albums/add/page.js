"use client";

import Footer from "@/components/artist/Footer";
import Header from "@/components/artist/Header";
import React from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import { MdCloudUpload } from "react-icons/md";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "react-toastify";
import { axiosPrivateInstance } from "@/config/axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const schema = yup
  .object({
    type: yup.string().trim().required("Album type is required"),
    albumTitle: yup
      .string()
      .trim()
      .required("Album title is required")
      .min(3, "Album title must be at least 3 character"),
    titleLanguage: yup
      .string()
      .trim()
      .required("Album title language is required")
      .min(2, "Album title language must be at least 2 character"),
    // primaryArtist: yup
    //   .string()
    //   .trim()
    //   .required("Primary artist name is required")
    //   .min(3, "Primary artist name must be at least 3 character"),

    featuringArtist: yup
      .string()
      .trim()
      .required("Featuring artist name is required")
      .min(3, "Featuring artist name must be at least 3 character"),
    trackType: yup
      .string()
      .trim()
      .required("Track type is required")
      .oneOf(
        ["lyrical", "instrumental"],
        "Track type must select lyrical or instrumental"
      ),
    audioLanguage: yup
      .string()
      .trim()
      .required("Audio language is required")
      .min(2, "Audio language must be at least 2 character"),
    genre: yup
      .string()
      .trim()
      .required("Genre is required")
      .oneOf(
        [
          "Indie",
          "Singer",
          "Artist",
          "Lyricist",
          "Composer",
          "Producer",
          "Band",
          "Group",
        ],
        "Genre must be select between fields"
      ),
    releaseDate: yup
      .string()
      .trim()
      .required("Release date is required")
      .min(3, "Release date must be at least 3 character"),
    label: yup
      .string()
      .trim()
      .required("Label is required")
      .min(3, "Label must be at least 3 character"),
    cLine: yup
      .string()
      .trim()
      .required("C Line is required")
      .min(3, "C Line must be at least 3 character"),
    cLineYear: yup
      .string()
      .trim()
      .required("C Line Year is required")
      .min(3, "C Line Year must be at least 3 character"),
    pLine: yup
      .string()
      .trim()
      .required("P Line is required")
      .min(3, "P Line must be at least 3 character"),
    pLineYear: yup
      .string()
      .trim()
      .required("P Line Year is required")
      .min(3, "P Line Year must be at least 3 character"),
    upc: yup
      .string()
      .trim()
      .required("UPC is required")
      .min(3, "UPC must be at least 3 character"),
    isrc: yup
      .string()
      .trim()
      .required("ISRC is required")
      .min(3, "ISRC must be at least 3 character"),
  })
  .required();

const links = [
  { id: 1, label: "Website", name: "website" },
  { id: 2, label: "iTunes", name: "iTunes" },
  { id: 3, label: "Facebook", name: "facebook" },
  { id: 4, label: "Vimeo", name: "vimeo" },
  { id: 4, label: "Youtube", name: "youtube" },
  { id: 4, label: "Deezer", name: "deezer" },
  { id: 4, label: "Instagram", name: "instagram" },
  { id: 4, label: "Spotify", name: "spotify" },
  { id: 4, label: "Twitter", name: "twitter" },
  { id: 4, label: "Daily Motion", name: "dailyMotion" },
  { id: 4, label: "Tiktok", name: "tikTok" },
  { id: 4, label: "Video Rating", name: "videoRating" },
];

const AddAlbumPage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      primaryArtists: [{ artistName: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "primaryArtists",
    control,
  });
  const session = useSession();
  const router = useRouter();

  const onSubmit = async (data) => {
    console.log(data, "data");

    try {
      await axiosPrivateInstance(session?.data?.jwt).post("/albums", data);

      // show success message
      toast.success("Album added successfully");

      // redirect to another route
      router.push("/albums");
    } catch (error) {
      console.log(error, "error in add album page");

      // show error message
      toast.error("Something went wrong");
    }
  };

  const handleAdd = () => {};

  return (
    <>
      <Header />
      <main className="px-3 py-2 xs:px-5 xs:py-3 md:px-10 md:py-5 lg:px-14 lg:py-7 xl:px-20 xl:py-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="asset">
            <h2 className="text-2xl">Album</h2>

            <div className="input-area mt-2 px-3 py-2 xs:px-5 xs:py-3 md:px-10 md:py-5 lg:px-14 lg:py-7 xl:py-10 border-2 flex flex-col lg:flex-row lg:justify-between lg:items-center">
              <div className="left lg:w-1/2">
                <h3>Type</h3>
                <hr />

                <div className="top mt-2 mb-4">
                  <div className="flex">
                    <div className="left">
                      <input
                        type="radio"
                        name="type"
                        id="albumEpisode"
                        className="mr-1"
                        value="albumOrEpisode"
                        {...register("type")}
                        defaultChecked
                      />
                      <label
                        htmlFor="albumEpisode"
                        className="cursor-pointer select-none"
                      >
                        Album/Episode
                      </label>
                    </div>

                    <div className="right flex items-center">
                      <input
                        type="radio"
                        name="type"
                        id="single"
                        className="ml-5 mr-1"
                        value="single"
                        {...register("type")}
                      />
                      <label
                        htmlFor="single"
                        className="cursor-pointer select-none"
                      >
                        Single
                      </label>
                    </div>
                  </div>

                  <p
                    className={`${
                      errors.type?.message ? "block" : "hidden"
                    } text-sm text-red-500 font-semibold mt-1 ml-5`}
                  >
                    {errors.type?.message}
                  </p>
                </div>

                <div className="input">
                  <label
                    htmlFor="albumTitle"
                    className="cursor-pointer select-none"
                  >
                    Album Title
                  </label>

                  <input
                    type="text"
                    name="albumTitle"
                    id="albumTitle"
                    placeholder="Album name"
                    className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                    {...register("albumTitle")}
                  />

                  <p
                    className={`${
                      errors.albumTitle?.message ? "block" : "hidden"
                    } text-sm text-red-500 font-semibold mt-1 ml-5`}
                  >
                    {errors.albumTitle?.message}
                  </p>
                </div>

                <div className="input mt-3">
                  <label
                    htmlFor="titleLanguage"
                    className="cursor-pointer select-none"
                  >
                    Title Language
                  </label>

                  <select
                    name="titleLanguage"
                    id="titleLanguage"
                    className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                    {...register("titleLanguage")}
                  >
                    <option value="">Select Title Language</option>
                    <option value="bangla">Bangla</option>
                    <option value="english">English</option>
                    <option value="hindi">Hindi</option>
                  </select>

                  <p
                    className={`${
                      errors.titleLanguage?.message ? "block" : "hidden"
                    } text-sm text-red-500 font-semibold mt-1 ml-5`}
                  >
                    {errors.titleLanguage?.message}
                  </p>
                </div>
              </div>

              <div className="right lg:w-1/2 text-center lg:flex lg:justify-end mt-5 lg:mt-0">
                <div className="file bg-gray-200 lg:w-[220px] h-[220px] flex items-center justify-center cursor-pointer rounded">
                  <MdCloudUpload className="text-[40px]" />
                </div>
              </div>
            </div>
          </div>

          <div className="albumArtists mt-8">
            <h2 className="text-2xl">Album Artists</h2>

            <div className="input-area border-2 mt-2 px-3 py-2 xs:px-5 xs:py-3 md:px-10 md:py-5 lg:px-14 lg:py-7 grid grid-cols-12 grid-rows-1 gap-3">
              <div className="input col-start-1 col-end-13 sm:col-end-7">
                <label className="cursor-pointer block" htmlFor="primaryArtist">
                  Primary Artist
                </label>

                {fields.map((filed, index) => (
                  <div className="flex items-center" key={filed.id}>
                    <input
                      type="text"
                      name="primaryArtist"
                      id="primaryArtist"
                      className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                      placeholder="Primary Artist"
                      {...register(`primaryArtists.${index}.artistName`)}
                    />

                    {!index > 0 && (
                      <FaCirclePlus
                        onClick={() => append({ artistName: "" })}
                        className="ml-2 text-blue-700 text-xl cursor-pointer"
                      />
                    )}

                    {index > 0 && (
                      <IoIosCloseCircle
                        onClick={() => remove(index)}
                        className="ml-1 text-red-500 text-2xl cursor-pointer"
                      />
                    )}
                  </div>
                ))}

                <div className="hidden items-center">
                  <input
                    type="text"
                    name=""
                    id=""
                    className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                    placeholder="Primary Artist"
                  />
                  <IoIosCloseCircle className="ml-1 text-red-500 text-2xl cursor-pointer" />
                </div>
              </div>

              <div className="input col-start-1 col-end-13 sm:col-start-7 sm:col-end-13">
                <label
                  className="cursor-pointer block"
                  htmlFor="featuringArtist"
                >
                  Featuring Artist
                </label>

                <div className="flex items-center">
                  <input
                    type="text"
                    name="featuringArtist"
                    id="featuringArtist"
                    className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                    placeholder="Featuring Artist"
                    {...register("featuringArtist")}
                  />
                  <FaCirclePlus className="ml-2 text-blue-700 text-xl cursor-pointer" />
                </div>

                <p
                  className={`${
                    errors.featuringArtist?.message ? "block" : "hidden"
                  } text-sm text-red-500 font-semibold mt-1 ml-5`}
                >
                  {errors.featuringArtist?.message}
                </p>

                <div className="items-center hidden">
                  <input
                    type="text"
                    name=""
                    id=""
                    className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                    placeholder="Primary Artist"
                  />
                  <IoIosCloseCircle className="ml-1 text-red-500 text-2xl cursor-pointer" />
                </div>
              </div>
            </div>
          </div>

          <div className="metadata mt-5">
            <h2 className="text-2xl">Metadata</h2>

            <div className="input-area border-2 mt-1 px-3 py-2 xs:px-5 xs:py-3 md:px-10 md:py-5 lg:px-14">
              <div className="top mb-4">
                <div className="flex">
                  <div className="left">
                    <input
                      type="radio"
                      name="trackType"
                      id="lyrical"
                      className="mr-1"
                      value="lyrical"
                      {...register("trackType")}
                      defaultChecked
                    />
                    <label
                      htmlFor="lyrical"
                      className="cursor-pointer select-none"
                    >
                      Lyrical
                    </label>
                  </div>

                  <div className="right">
                    <input
                      type="radio"
                      name="trackType"
                      id="instrumental"
                      className="ml-5 mr-1"
                      value="instrumental"
                      {...register("trackType")}
                    />
                    <label
                      htmlFor="instrumental"
                      className="cursor-pointer select-none"
                    >
                      Instrumental
                    </label>
                  </div>
                </div>

                <p
                  className={`${
                    errors.trackType?.message ? "block" : "hidden"
                  } text-sm text-red-500 font-semibold mt-1 ml-5`}
                >
                  {errors.trackType?.message}
                </p>
              </div>

              <div className="grid grid-cols-12 grid-rows-2 gap-3">
                <div className="input col-start-1 col-end-13 sm:col-end-7">
                  <label htmlFor="audioLanguage" className="select-none">
                    Audio Language
                  </label>

                  <div>
                    <select
                      name="audioLanguage"
                      id="audioLanguage"
                      className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                      {...register("audioLanguage")}
                    >
                      <option value="">Select Audio Language</option>
                      <option value="bangla">Bangla</option>
                      <option value="english">English</option>
                      <option value="hindi">Hindi</option>
                    </select>
                  </div>

                  <p
                    className={`${
                      errors.audioLanguage?.message ? "block" : "hidden"
                    } text-sm text-red-500 font-semibold mt-1 ml-5`}
                  >
                    {errors.audioLanguage?.message}
                  </p>
                </div>

                <div className="input col-start-1 col-end-13 sm:col-start-7 sm:col-end-13">
                  <label htmlFor="genre" className="select-none">
                    Genre
                  </label>

                  <div className="">
                    <select
                      name="genre"
                      id="genre"
                      className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                      {...register("genre")}
                    >
                      <option value="">Select Genre</option>
                      <option value="Indie">Indie</option>
                      <option value="Singer">Singer</option>
                      <option value="Artist">Artist</option>
                      <option value="Lyricist">Lyricist</option>
                      <option value="Composer">Composer</option>
                      <option value="Producer">Producer</option>
                      <option value="Band">Band</option>
                      <option value="Group">Group</option>
                    </select>
                  </div>
                  <p
                    className={`${
                      errors.genre?.message ? "block" : "hidden"
                    } text-sm text-red-500 font-semibold mt-1 ml-5`}
                  >
                    {errors.genre?.message}
                  </p>
                </div>

                <div className="input col-start-1 col-end-13 sm:col-end-7">
                  <label
                    htmlFor="releaseDate"
                    className="cursor-pointer select-none"
                  >
                    Release date
                  </label>

                  <input
                    type="text"
                    name="releaseDate"
                    id="releaseDate"
                    className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                    {...register("releaseDate")}
                  />

                  <p
                    className={`${
                      errors.releaseDate?.message ? "block" : "hidden"
                    } text-sm text-red-500 font-semibold mt-1 ml-5`}
                  >
                    {errors.releaseDate?.message}
                  </p>
                </div>

                <div className="input col-start-1 col-end-13 sm:col-start-7 sm:col-end-13">
                  <label htmlFor="label" className="cursor-pointer select-none">
                    Label
                  </label>

                  <input
                    type="text"
                    name="label"
                    id="label"
                    className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                    {...register("label")}
                  />

                  <p
                    className={`${
                      errors.label?.message ? "block" : "hidden"
                    } text-sm text-red-500 font-semibold mt-1 ml-5`}
                  >
                    {errors.label?.message}
                  </p>
                </div>

                <div className="input col-start-1 col-end-13 sm:col-end-7">
                  <label htmlFor="cLine" className="cursor-pointer select-none">
                    C Line
                  </label>

                  <input
                    type="text"
                    name="cLine"
                    id="cLine"
                    className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                    {...register("cLine")}
                  />

                  <p
                    className={`${
                      errors.cLine?.message ? "block" : "hidden"
                    } text-sm text-red-500 font-semibold mt-1 ml-5`}
                  >
                    {errors.cLine?.message}
                  </p>
                </div>

                <div className="input col-start-1 col-end-13 sm:col-start-7 sm:col-end-13">
                  <label
                    htmlFor="cLineYear"
                    className="cursor-pointer select-none"
                  >
                    C Line Year
                  </label>

                  <input
                    type="text"
                    name="cLineYear"
                    id="cLineYear"
                    className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                    {...register("cLineYear")}
                  />

                  <p
                    className={`${
                      errors.cLineYear?.message ? "block" : "hidden"
                    } text-sm text-red-500 font-semibold mt-1 ml-5`}
                  >
                    {errors.cLineYear?.message}
                  </p>
                </div>

                <div className="input col-start-1 col-end-13 sm:col-end-7">
                  <label htmlFor="pLine" className="cursor-pointer select-none">
                    P Line
                  </label>

                  <input
                    type="text"
                    name="pLine"
                    id="pLine"
                    className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                    {...register("pLine")}
                  />

                  <p
                    className={`${
                      errors.pLine?.message ? "block" : "hidden"
                    } text-sm text-red-500 font-semibold mt-1 ml-5`}
                  >
                    {errors.pLine?.message}
                  </p>
                </div>

                <div className="input col-start-1 col-end-13 sm:col-start-7 sm:col-end-13">
                  <label
                    htmlFor="pLineYear"
                    className="cursor-pointer select-none"
                  >
                    P Line Year
                  </label>

                  <input
                    type="text"
                    name="pLineYear"
                    id="pLineYear"
                    className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                    {...register("pLineYear")}
                  />

                  <p
                    className={`${
                      errors.pLineYear?.message ? "block" : "hidden"
                    } text-sm text-red-500 font-semibold mt-1 ml-5`}
                  >
                    {errors.pLineYear?.message}
                  </p>
                </div>

                <div className="input col-start-1 col-end-13 sm:col-end-7">
                  <label htmlFor="upc" className="cursor-pointer select-none">
                    UPC
                  </label>

                  <input
                    type="text"
                    name="upc"
                    id="upc"
                    className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                    {...register("upc")}
                  />

                  <p
                    className={`${
                      errors.upc?.message ? "block" : "hidden"
                    } text-sm text-red-500 font-semibold mt-1 ml-5`}
                  >
                    {errors.upc?.message}
                  </p>
                </div>

                <div className="input col-start-1 col-end-13 sm:col-start-7 sm:col-end-13">
                  <label htmlFor="isrc" className="cursor-pointer select-none">
                    ISRC
                  </label>

                  <input
                    type="text"
                    name="isrc"
                    id="isrc"
                    className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                    {...register("isrc")}
                  />

                  <p
                    className={`${
                      errors.isrc?.message ? "block" : "hidden"
                    } text-sm text-red-500 font-semibold mt-1 ml-5`}
                  >
                    {errors.isrc?.message}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="submit mt-7">
            <input
              type="submit"
              value="Submit"
              className="text-center bg-green-600 px-14 py-2 font-semibold rounded-full text-white cursor-pointer"
            />
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default AddAlbumPage;
