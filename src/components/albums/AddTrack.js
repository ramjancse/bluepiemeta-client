import Footer from "@/components/artist/Footer";
import Header from "@/components/artist/Header";
import React from "react";
import { FaCirclePlus, FaUpload } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
    primaryArtists: yup.array().of(
      yup.object({
        artistName: yup
          .string()
          .trim()
          .required("Primary Artist name is required")
          .min(3, "Primary Artist name must be at least 3 characters"),
      })
    ),
    featuringArtists: yup.array().of(
      yup.object({
        artistName: yup
          .string()
          .trim()
          .required("Featuring Artist name is required")
          .min(3, "Featuring Artist name must be at least 3 characters"),
      })
    ),
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

const AddTrack = () => {
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

  return (
    <>
      <main className="px-3 py-2 xs:px-5 xs:py-3 md:px-10 md:py-5 lg:px-14 lg:py-7 xl:px-20 xl:py-10">
        <form>
          <div className="asset">
            <h2 className="text-2xl">Asset</h2>

            <div className="input-area mt-2 px-3 py-2 xs:px-5 xs:py-3 md:px-10 md:py-5 lg:px-14 lg:py-7 xl:py-10 border-2">
              <div className="input flex flex-col">
                <label htmlFor="music" className="cursor-pointer">
                  File Upload
                </label>

                <div className="my-1 bg-gray-200 outline-none px-2 py-2 border-l-8 border-blue-700">
                  <label
                    className="bg-white py-[6px] items-center rounded-full cursor-pointer flex justify-center sm:m-auto sm:w-[250px] lg:w-1/2"
                    htmlFor="music"
                  >
                    <FaUpload className="text-blue-700" />
                    <span className="ml-3 text-sm ">Click to upload</span>
                  </label>
                </div>

                <input type="file" name="music" id="music" className="hidden" />
                <p className="text-xs">
                  <span className="text-red-600 font-bold">***</span>Please
                  upload audio file in WAV format.
                </p>
              </div>

              <div className="input mt-4">
                <label htmlFor="title" className="cursor-pointer block">
                  Title
                </label>
                <div className="flex flex-col sm:flex-row">
                  <input
                    type="file"
                    name="title"
                    id="title"
                    className="my-1 bg-gray-200 outline-none px-2 py-2 border-l-8 border-blue-700 text-sm sm:w-3/5 lg:w-5/6 sm:mr-3"
                  />

                  <select
                    name=""
                    id=""
                    className="my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm sm:w-2/5 lg:w-1/6"
                  >
                    <option value="">Title Language</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="contributors mt-8">
            <h2 className="text-2xl">Contributors</h2>

            <div className="input-area border-2 mt-2 px-3 py-2 xs:px-5 xs:py-3 md:px-10 md:py-5 lg:px-14 lg:py-7 grid grid-cols-12 grid-rows-2 gap-3">
              <div className="input col-start-1 col-end-13 sm:col-end-7">
                <label className="cursor-pointer block" htmlFor="primaryArtist">
                  Primary Artist
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    name="primaryArtist"
                    id="primaryArtist"
                    className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                    placeholder="Primary Artist"
                  />
                  <FaCirclePlus className="ml-2 text-blue-700 text-xl cursor-pointer" />
                </div>

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
                <label className="cursor-pointer block" htmlFor="composer">
                  Composer
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    name="composer"
                    id="composer"
                    className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                    placeholder="Composer"
                  />
                  <FaCirclePlus className="ml-2 text-blue-700 text-xl cursor-pointer" />
                </div>

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

              <div className="input col-start-1 col-end-13 sm:col-end-7">
                <label className="cursor-pointer block" htmlFor="lyricist">
                  Lyricist
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    name="lyricist"
                    id="lyricist"
                    className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                    placeholder="Lyricist"
                  />
                  <FaCirclePlus className="ml-2 text-blue-700 text-xl cursor-pointer" />
                </div>

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
                <label className="cursor-pointer block" htmlFor="producer">
                  Producer
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    name="producer"
                    id="producer"
                    className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                    placeholder="Producer"
                  />
                  <FaCirclePlus className="ml-2 text-blue-700 text-xl cursor-pointer" />
                </div>

                <div className="items-center hidden">
                  <input
                    type="text"
                    name=""
                    id=""
                    className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                    placeholder="Producer"
                  />
                  <IoIosCloseCircle className="ml-1 text-red-500 text-2xl cursor-pointer" />
                </div>
              </div>
            </div>
          </div>

          <div className="technical mt-5">
            <h2 className="text-2xl">Technical</h2>

            <div className="input-area border-2 mt-1 px-3 py-2 xs:px-5 xs:py-3 md:px-10 md:py-5 lg:px-14 lg:py-7">
              <div className="top flex mb-4">
                <div className="left">
                  <input
                    type="checkbox"
                    name="lyrical"
                    id="lyrical"
                    className="mr-1"
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
                    type="checkbox"
                    name="instrumental"
                    id="instrumental"
                    className="ml-5 mr-1"
                  />
                  <label
                    htmlFor="instrumental"
                    className="cursor-pointer select-none"
                  >
                    Instrumental
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-12 grid-rows-1 gap-x-6 gap-y-3">
                <div className="input col-start-1 col-end-13 sm:col-end-7">
                  <label htmlFor="language" className="select-none">
                    Language
                  </label>

                  <div className="">
                    <select
                      name="language"
                      id="language"
                      className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                    >
                      <option value="">Select Language</option>
                      <option value="bangla">Bangla</option>
                      <option value="english">English</option>
                      <option value="hindi">Hindi</option>
                    </select>
                  </div>
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
                    >
                      <option value="">Select Genre</option>
                      <option value="bangla">Bangla</option>
                      <option value="english">English</option>
                      <option value="hindi">Hindi</option>
                    </select>
                  </div>
                </div>

                <div className="input col-start-1 col-end-13 sm:col-end-7">
                  <label htmlFor="mood" className="select-none">
                    Mood
                  </label>

                  <div className="">
                    <select
                      name="mood"
                      id="mood"
                      className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                    >
                      <option value="">Select Mood</option>
                      <option value="bangla">Bangla</option>
                      <option value="english">English</option>
                      <option value="hindi">Hindi</option>
                    </select>
                  </div>
                </div>

                <div className="input col-start-1 col-end-13 sm:col-start-7 sm:col-end-13">
                  <label htmlFor="mix" className="select-none">
                    Mix
                  </label>

                  <div className="">
                    <select
                      name="mix"
                      id="mix"
                      className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                    >
                      <option value="">Select Mix</option>
                      <option value="bangla">Bangla</option>
                      <option value="english">English</option>
                      <option value="hindi">Hindi</option>
                    </select>
                  </div>
                </div>

                <div className="input col-start-1 col-end-13 sm:col-end-7">
                  <label htmlFor="instruments" className="select-none">
                    Instruments
                  </label>

                  <div className="">
                    <select
                      name="instruments"
                      id="instruments"
                      className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                    >
                      <option value="">Select Instruments</option>
                      <option value="bangla">Bangla</option>
                      <option value="english">English</option>
                      <option value="hindi">Hindi</option>
                    </select>
                  </div>
                </div>

                <div className="input col-start-1 col-end-13 sm:col-start-7 sm:col-end-13">
                  <label htmlFor="duration" className="select-none">
                    Duration
                  </label>

                  <div className="">
                    <select
                      name="duration"
                      id="duration"
                      className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                    >
                      <option value="">Select Duration</option>
                      <option value="bangla">Bangla</option>
                      <option value="english">English</option>
                      <option value="hindi">Hindi</option>
                    </select>
                  </div>
                </div>

                <div className="input col-start-1 col-end-13 sm:col-end-7">
                  <label htmlFor="bpm" className="select-none">
                    BPM
                  </label>

                  <div className="">
                    <select
                      name="bpm"
                      id="bpm"
                      className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                    >
                      <option value="">Select BPM</option>
                      <option value="bangla">Bangla</option>
                      <option value="english">English</option>
                      <option value="hindi">Hindi</option>
                    </select>
                  </div>
                </div>

                <div className="input col-start-1 col-end-13 sm:col-start-7 sm:col-end-13">
                  <label htmlFor="tags" className="select-none">
                    Tags
                  </label>

                  <div className="">
                    <select
                      name="tags"
                      id="tags"
                      className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                    >
                      <option value="">Select Tags</option>
                      <option value="bangla">Bangla</option>
                      <option value="english">English</option>
                      <option value="hindi">Hindi</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="metadata mt-5">
            <h2 className="text-2xl">Metadata</h2>

            <div className="input-area border-2 mt-1 grid grid-cols-12 grid-rows-2 gap-3 px-3 py-2 xs:px-5 xs:py-3 md:px-10 md:py-5 lg:px-14">
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
                />
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
                />
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
                />
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
                />
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
                />
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
                />
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
                />
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
                />
              </div>
            </div>
          </div>

          <div className="links mt-5">
            <h2 className="text-2xl">Links</h2>

            <div className="border-2 px-3 py-2 xs:px-5 xs:py-3 md:px-10 md:py-5 lg:px-14 lg:py-7">
              <div className="flex flex-wrap gap-y-3">
                {links.map((link, index) => (
                  <div
                    className={`input w-full md:w-1/2 ${
                      index % 2 !== 0 ? "md:pl-5" : "md:pr-5"
                    }`}
                    key={link.id}
                  >
                    <div className="flex">
                      <label
                        className="border-2 py-2 cursor-pointer w-[200px] text-center text-sm"
                        htmlFor={link.name}
                      >
                        {link.label}
                      </label>

                      <input
                        type="text"
                        name={link.name}
                        id={link.name}
                        className="bg-gray-200 pl-2 pr-2 focus:outline-none w-full text-sm"
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bottom mt-10 sm:flex">
            <div className="legal sm:w-1/2 mr-5">
              <h2 className="text-2xl">Legal</h2>

              <div className="input-area border mt-1 px-3 py-2 xs:px-5 xs:py-3 md:px-10 md:py-5 lg:px-14 lg:py-7">
                <div className="contract flex flex-col lg:flex-row">
                  <button className="border-2 py-1 text-center text-sm my-2 lg:w-[200px]">
                    Contract
                  </button>

                  <label
                    className="bg-gray-200 py-[6px] items-center rounded-full cursor-pointer flex justify-center lg:m-auto lg:w-[250px]"
                    htmlFor="contract"
                  >
                    <FaUpload className="text-blue-700" />
                    <span className="ml-3 text-sm ">Click to upload</span>
                  </label>

                  <input
                    className="hidden"
                    type="file"
                    name="contract"
                    id="contract"
                  />
                </div>

                <div className="compilationRights flex flex-col mt-5 lg:flex-row">
                  <button className="border-2 py-1 text-center text-sm my-2 lg:w-[200px]">
                    Compilation Rights
                  </button>

                  <label
                    className="bg-gray-200 py-[6px] items-center rounded-full cursor-pointer flex justify-center lg:m-auto lg:w-[250px]"
                    htmlFor="compilationRights"
                  >
                    <FaUpload className="text-blue-700" />
                    <span className="ml-3 text-sm ">Click to upload</span>
                  </label>

                  <input
                    className="hidden"
                    type="file"
                    name="compilationRights"
                    id="compilationRights"
                  />
                </div>

                <div className="videoRights flex flex-col mt-5 lg:flex-row">
                  <button className="border-2 py-1 text-center text-sm my-2 lg:w-[200px]">
                    Video Rights
                  </button>

                  <label
                    className="bg-gray-200 py-[6px] items-center rounded-full cursor-pointer flex justify-center lg:m-auto lg:w-[250px]"
                    htmlFor="videoRights"
                  >
                    <FaUpload className="text-blue-700" />
                    <span className="ml-3 text-sm ">Click to upload</span>
                  </label>

                  <input
                    className="hidden"
                    type="file"
                    name="videoRights"
                    id="videoRights"
                  />
                </div>

                <div className="audioRights flex flex-col mt-5 lg:flex-row">
                  <button className="border-2 py-1 text-center text-sm my-2 lg:w-[200px]">
                    Audio Rights
                  </button>

                  <label
                    className="bg-gray-200 py-[6px] items-center rounded-full cursor-pointer flex justify-center lg:m-auto lg:w-[250px]"
                    htmlFor="audioRights"
                  >
                    <FaUpload className="text-blue-700" />
                    <span className="ml-3 text-sm ">Click to upload</span>
                  </label>

                  <input
                    className="hidden"
                    type="file"
                    name="audioRights"
                    id="audioRights"
                  />
                </div>

                <div className="promoRights flex flex-col mt-5 lg:flex-row">
                  <button className="border-2 py-1 text-center text-sm my-2 lg:w-[200px]">
                    Promo Rights
                  </button>

                  <label
                    className="bg-gray-200 py-[6px] items-center rounded-full cursor-pointer flex justify-center lg:m-auto lg:w-[250px]"
                    htmlFor="promoRights"
                  >
                    <FaUpload className="text-blue-700" />
                    <span className="ml-3 text-sm ">Click to upload</span>
                  </label>

                  <input
                    className="hidden"
                    type="file"
                    name="promoRights"
                    id="promoRights"
                  />
                </div>
              </div>
            </div>

            <div className="lyrics sm:w-1/2 mt-5 sm:mt-0 sm:ml-5">
              <h2 className="text-2xl">Lyrics</h2>

              <div className="input-area border mt-1 px-3 py-2 xs:px-5 xs:py-3 md:px-10 md:py-5 lg:px-14 lg:py-7 flex flex-col xl:flex-row xl:items-center xl:justify-between">
                <div className="xl:w-2/3">
                  <div className="text">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Consequatur dignissimos minus id praesentium dicta. Nisi
                      sequi autem ea incidunt hic, laborum dolore necessitatibus
                      modi cupiditate error quibusdam delectus at atque dicta
                      earum quo neque eum nobis quae laboriosam. Corrupti neque
                      architecto dolor harum itaque velit officia. Cupiditate
                      iste ipsa reprehenderit porro minus, ex architecto amet
                      rem officiis assumenda quos exercitationem
                    </p>
                  </div>
                </div>

                <div className="button xl:w-1/3 text-center xl:text-right mt-5 xl:mt-0">
                  <button className="bg-gray-200 rounded-full px-5 py-1">
                    View Full
                  </button>
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
    </>
  );
};

export default AddTrack;
