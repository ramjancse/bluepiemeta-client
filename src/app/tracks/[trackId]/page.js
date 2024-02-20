import Footer from "@/components/artist/Footer";
import Header from "@/components/artist/Header";
import React from "react";
import { FaCirclePlus } from "react-icons/fa6";

const page = () => {
  return (
    <>
      <Header />
      <main className="px-20 py-8">
        <div className="asset">
          <h2>Asset</h2>
          <div className="input-area px-14 py-10 border-2">
            <div className="input flex flex-col">
              <label htmlFor="music">File Upload</label>
              <input
                type="file"
                name="music"
                id="music"
                className="my-1 bg-gray-200 outline-none cursor-pointer px-2 py-1 border-l-8 border-blue-700"
              />
              <p>***Please upload audio file in WAV format.</p>
            </div>

            <div className="input flex flex-col mt-4">
              <label htmlFor="title">Title</label>
              <div className="flex">
                <input
                  type="file"
                  name="music"
                  id="music"
                  className="w-3/4 my-1 bg-gray-200 outline-none cursor-pointer px-2 py-1 border-l-8 border-blue-700"
                />

                <select
                  name=""
                  id=""
                  className="w-1/4 my-1 ml-2 bg-gray-200 outline-none cursor-pointer px-2 py-1 "
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

        <div className="contributors mt-5">
          <h2>Contributors</h2>

          <div className="input-area px-14 py-10 border-2 mt-1 ">
            <div className="one flex">
              <div className="input flex flex-col w-1/2">
                <label htmlFor="title">Primary/Artist</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    name="primaryArtist"
                    id="primaryArtist"
                    className="w-full my-1 bg-gray-200 outline-none cursor-pointer px-2 py-1 border-l-8 border-blue-700"
                    placeholder="Primary Artist"
                  />
                  <FaCirclePlus className="ml-2 text-blue-700 text-xl" />
                </div>
              </div>

              <div className="input flex flex-col ml-2 w-1/2">
                <label htmlFor="title">Composer</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    name="composer"
                    id="composer"
                    className="w-full my-1 bg-gray-200 outline-none cursor-pointer px-2 py-1 border-l-8 border-blue-700"
                    placeholder="Composer"
                  />
                  <FaCirclePlus className="ml-2 text-blue-700 text-xl" />
                </div>
              </div>
            </div>

            <div className="two flex mt-3">
              <div className="input flex flex-col w-1/2">
                <label htmlFor="title">Primary/Artist</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    name="primaryArtist"
                    id="primaryArtist"
                    className="w-full my-1 bg-gray-200 outline-none cursor-pointer px-2 py-1 border-l-8 border-blue-700"
                    placeholder="Primary Artist"
                  />
                  <FaCirclePlus className="ml-2 text-blue-700 text-xl" />
                </div>
              </div>

              <div className="input flex flex-col ml-2 w-1/2">
                <label htmlFor="title">Composer</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    name="composer"
                    id="composer"
                    className="w-full my-1 bg-gray-200 outline-none cursor-pointer px-2 py-1 border-l-8 border-blue-700"
                    placeholder="Composer"
                  />
                  <FaCirclePlus className="ml-2 text-blue-700 text-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="technical mt-5">
          <h2>Technical</h2>

          <div className="input-area px-14 py-10 border-2 mt-1 ">
            <div className="top flex mb-4">
              <div className="left">
                <input
                  type="checkbox"
                  name="lyrical"
                  id="lyrical"
                  className="mr-1"
                />
                <label htmlFor="lyrical" className="cursor-pointer select-none">
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

            <div className="one flex">
              <div className="input flex flex-col w-1/2">
                <label
                  htmlFor="language"
                  className="cursor-pointer select-none"
                >
                  Language
                </label>
                <div className="flex items-center">
                  <select
                    name="language"
                    id="language"
                    className="w-full my-1 bg-gray-200 outline-none cursor-pointer px-2 py-2 border-l-8 border-blue-700 text-xs"
                  >
                    <option value="">Select Language</option>
                    <option value="bangla">Bangla</option>
                    <option value="english">English</option>
                    <option value="hindi">Hindi</option>
                  </select>
                </div>
              </div>

              <div className="input flex flex-col w-1/2 ml-2">
                <label htmlFor="genre" className="cursor-pointer select-none">
                  Genre
                </label>

                <div className="flex items-center">
                  <select
                    name="genre"
                    id="genre"
                    className="w-full my-1 bg-gray-200 outline-none cursor-pointer px-2 py-2 border-l-8 border-blue-700 text-xs"
                  >
                    <option value="">Select Genre</option>
                    <option value="bangla">Bangla</option>
                    <option value="english">English</option>
                    <option value="hindi">Hindi</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="two flex mt-3">
              <div className="input flex flex-col w-1/2">
                <label
                  htmlFor="language"
                  className="cursor-pointer select-none"
                >
                  Language
                </label>
                <div className="flex items-center">
                  <select
                    name="language"
                    id="language"
                    className="w-full my-1 bg-gray-200 outline-none cursor-pointer px-2 py-2 border-l-8 border-blue-700 text-xs"
                  >
                    <option value="">Select Language</option>
                    <option value="bangla">Bangla</option>
                    <option value="english">English</option>
                    <option value="hindi">Hindi</option>
                  </select>
                </div>
              </div>

              <div className="input flex flex-col w-1/2 ml-2">
                <label htmlFor="genre" className="cursor-pointer select-none">
                  Genre
                </label>

                <div className="flex items-center">
                  <select
                    name="genre"
                    id="genre"
                    className="w-full my-1 bg-gray-200 outline-none cursor-pointer px-2 py-2 border-l-8 border-blue-700 text-xs"
                  >
                    <option value="">Select Genre</option>
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
          <h2>Metadata</h2>

          <div className="input-area px-14 py-10 border-2 mt-1 flex">
            <div className="input w-1/2">
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
                className="w-full my-1 bg-gray-200 outline-none cursor-pointer px-2 py-2 border-l-8 border-blue-700 text-xs"
              />
            </div>

            <div className="input w-1/2 ml-2">
              <label htmlFor="label" className="cursor-pointer select-none">
                Label
              </label>

              <input
                type="text"
                name="label"
                id="label"
                className="w-full my-1 bg-gray-200 outline-none cursor-pointer px-2 py-2 border-l-8 border-blue-700 text-xs"
              />
            </div>
          </div>
        </div>

        <div className="links mt-5">
          <h2>Links</h2>

          <div className="input-area px-14 py-10 border-2 mt-1 flex">
            <div className="input w-1/2 flex">
              <button className="border-2 px-10 py-1">Website</button>
              <input
                type="text"
                name="website"
                id="website"
                className="bg-gray-200 pl-10 pr-2 focus:outline-none w-full"
                placeholder="https://example.com"
              />
            </div>

            <div className="input w-1/2 flex ml-2">
              <button className="border-2 px-10 py-1">Website</button>
              <input
                type="text"
                name="website"
                id="website"
                className="bg-gray-200 pl-10 pr-2 focus:outline-none w-full"
                placeholder="https://example.com"
              />
            </div>
          </div>
        </div>

        <div className="uploads mt-5">
          <h2>Uploads</h2>

          <div className="input-area px-14 py-10 border-2 mt-1 flex h-[250px]"></div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default page;
