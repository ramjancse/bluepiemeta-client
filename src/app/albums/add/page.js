import Footer from "@/components/artist/Footer";
import Header from "@/components/artist/Header";
import React from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import { MdCloudUpload } from "react-icons/md";

const page = () => {
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
      <Header />
      <main className="px-3 py-2 xs:px-5 xs:py-3 md:px-10 md:py-5 lg:px-14 lg:py-7 xl:px-20 xl:py-10">
        <form>
          <div className="asset">
            <h2 className="text-2xl">Album</h2>

            <div className="input-area mt-2 px-3 py-2 xs:px-5 xs:py-3 md:px-10 md:py-5 lg:px-14 lg:py-7 xl:py-10 border-2 flex flex-col lg:flex-row lg:justify-between lg:items-center">
              <div className="left lg:w-1/2">
                <h3>Type</h3>
                <hr />

                <div className="top flex mt-2 mb-4">
                  <div className="left">
                    <input
                      type="radio"
                      name="type"
                      id="albumEpisode"
                      className="mr-1"
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
                    />
                    <label
                      htmlFor="single"
                      className="cursor-pointer select-none"
                    >
                      Single
                    </label>
                  </div>
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
                  />
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
                  >
                    <option value="">Select Title Language</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
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
            </div>
          </div>

          <div className="metadata mt-5">
            <h2 className="text-2xl">Metadata</h2>

            <div className="input-area border-2 mt-1 px-3 py-2 xs:px-5 xs:py-3 md:px-10 md:py-5 lg:px-14">
              <div className="top flex mb-4">
                <div className="left">
                  <input
                    type="radio"
                    name="metadata"
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

                <div className="middle">
                  <input
                    type="radio"
                    name="metadata"
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

                <div className="right">
                  <input
                    type="radio"
                    name="metadata"
                    id="mixed"
                    className="ml-5 mr-1"
                  />
                  <label htmlFor="mixed" className="cursor-pointer select-none">
                    Mixed
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-12 grid-rows-2 gap-3">
                <div className="input col-start-1 col-end-13 sm:col-end-7">
                  <label htmlFor="audioLanguage" className="select-none">
                    Audio Language
                  </label>

                  <div className="">
                    <select
                      name="audioLanguage"
                      id="audioLanguage"
                      className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                    >
                      <option value="">Select Audio Language</option>
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

export default page;
