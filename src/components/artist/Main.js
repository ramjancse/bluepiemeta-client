import React from "react";

const Main = () => {
  return (
    <main>
      <div className="intro">
        <img
          className="h-36 w-full object-cover sm:h-52 md:h-64 lg:h-72 xl:h-80 2xl:h-96"
          src="/images/main_banner.jpg"
          alt="Intro Image"
        />
      </div>

      <div className="info">
        <h3 className="py-2 text-center text-xl font-bold">Artist Info</h3>

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
                />
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
                />
              </div>
            </div>

            <div className="mt-6 sm:flex">
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
                />
              </div>
            </div>

            <div className="mt-6 sm:flex">
              <div className="label hidden w-1/3 sm:block">
                <label
                  htmlFor="country"
                  className="block cursor-pointer rounded bg-white px-5 py-2 font-semibold"
                >
                  Country
                </label>
              </div>

              <div className="input sm:ml-2 sm:w-2/3">
                <input
                  type="text"
                  name="country"
                  id="country"
                  placeholder="Country"
                  className="w-full rounded border-none px-5 py-2 focus:outline-none"
                />
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

              <div className="input flex sm:ml-2 sm:w-2/3">
                <div className="leftSide w-[30%]">
                  <input
                    type="text"
                    name="areaCode"
                    id="areaCode"
                    placeholder="Area Code"
                    className="w-full rounded border-none px-2 py-2 focus:outline-none"
                  />
                </div>

                <div className="rightSide ml-1 w-[70%]">
                  <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="Phone Number"
                    className="w-full rounded border-none px-5 py-2 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 sm:flex">
              <div className="label hidden w-1/3 sm:block">
                <label
                  htmlFor="email"
                  className="block cursor-pointer rounded bg-white px-5 py-2 font-semibold"
                >
                  Email Address
                </label>
              </div>

              <div className="input sm:ml-2 sm:w-2/3">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="w-full rounded border-none px-5 py-2 focus:outline-none"
                />
              </div>
            </div>

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
            <form>
              <div className="w-full">
                <div className="image">
                  <img
                    src="/images/main_banner.jpg"
                    className="h-full cursor-pointer rounded"
                    alt="Profile Picture"
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
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
