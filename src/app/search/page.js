"use client";

import { FaMagnifyingGlass } from "react-icons/fa6";
import Header from "@/components/dashboard/Header";
import Layout from "@/components/dashboard/Layout";
import { axiosPrivateInstance } from "@/config/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

const schema = yup
  .object({
    search: yup.string().trim(),
    artist: yup.string().trim(),
    label: yup.string().trim(),
    display: yup.string().trim(),
    sortBy: yup.string().trim(),
  })
  .required();

const SearchPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      search: "",
      artist: "all",
      label: "all",
      display: "releases",
      sortBy: "aToZ",
    },
  });

  const onSubmit = async (data) => {
    console.log(data, "search data");

    try {
      //   const {
      //     data: {
      //       links: { self },
      //     },
      //   } = await axiosPrivateInstance(session?.data?.jwt).post("/albums", data);
    } catch (error) {
      console.log(error, "error in add album page");

      // show error message
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <Header name="Search" />

      <main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full border-l border-b px-1 py-1">
            <div className="flex">
              <div className="w-1/5 bg-gray-200 min-h-screen">
                <div className="px-5 py-5">
                  <div className="input">
                    <label
                      className="cursor-pointer font-medium"
                      htmlFor="search"
                    >
                      Search
                    </label>

                    <div className="relative">
                      <span className="absolute right-3 top-4">
                        <FaMagnifyingGlass className="z-20 text-primary" />
                      </span>

                      <input
                        className="z-10 w-full my-1 bg-white outline-none px-2 py-2 border-gray-300 text-sm border-2 rounded"
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search Song"
                        autoComplete="off"
                        {...register("search")}
                      />
                    </div>
                  </div>

                  <div className="input mt-2">
                    <label
                      className="cursor-pointer font-medium"
                      htmlFor="artist"
                    >
                      Artist
                    </label>

                    <select
                      name="artist"
                      id="artist"
                      {...register("artist")}
                      className="w-full my-1 bg-white outline-none px-2 py-2 border-gray-300 text-sm border-2 rounded"
                    >
                      <option value="all">All</option>
                      <option value="single">Single</option>
                      <option value="album">Album</option>
                    </select>
                  </div>

                  <div className="input mt-2">
                    <label
                      className="cursor-pointer font-medium"
                      htmlFor="label"
                    >
                      Label
                    </label>

                    <select
                      name="label"
                      id="label"
                      {...register("label")}
                      className="w-full my-1 bg-white outline-none px-2 py-2 border-gray-300 text-sm border-2 rounded"
                    >
                      <option value="all">All</option>
                      <option value="single">Single</option>
                      <option value="album">Album</option>
                    </select>
                  </div>

                  <div className="input mt-2">
                    <label
                      className="cursor-pointer font-medium"
                      htmlFor="display"
                    >
                      Display
                    </label>

                    <select
                      name="display"
                      id="display"
                      {...register("display")}
                      className="w-full my-1 bg-white outline-none px-2 py-2 border-gray-300 text-sm border-2 rounded"
                    >
                      <option value="releases">Releases</option>
                      <option value="single">Single</option>
                      <option value="album">Album</option>
                    </select>
                  </div>

                  <div className="input mt-2">
                    <label
                      className="cursor-pointer font-medium"
                      htmlFor="sortBy"
                    >
                      Sort By
                    </label>

                    <select
                      name="sortBy"
                      id="sortBy"
                      {...register("sortBy")}
                      className="w-full my-1 bg-white outline-none px-2 py-2 border-gray-300 text-sm border-2 rounded"
                    >
                      <option value="aToZ">Artist (A-Z)</option>
                      <option value="single">Single</option>
                      <option value="album">Album</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="w-4/5">
                <div className="w-full flex flex-wrap px-5 py-3">
                  <div className="w-1/3">
                    <div className="album mx-5 my-5 ">
                      <div className="image border-green-500 border-b-4">
                        <Link href="/">
                          <Image
                            src="https://pixlr.com/images/index/ai-image-generator-one.webp"
                            width={200}
                            height={250}
                            alt="Album Image"
                            className="w-full h-[250px] object-cover"
                          />
                        </Link>
                      </div>

                      <div className="content mt-2">
                        <h4 className="font-medium">Never Loose Without</h4>
                        <h6 className="text-sm text-gray-500">Artist 420</h6>
                        <h6 className="text-sm">
                          <Link className="text-blue-300 font-medium" href="/">
                            ABC-001
                          </Link>
                        </h6>
                      </div>
                    </div>
                  </div>

                  <div className="w-1/3">
                    <div className="album mx-5 my-5 ">
                      <div className="image border-green-500 border-b-4">
                        <Link href="/">
                          <Image
                            src="https://pixlr.com/images/index/ai-image-generator-one.webp"
                            width={200}
                            height={250}
                            alt="Album Image"
                            className="w-full h-[250px] object-cover"
                          />
                        </Link>
                      </div>

                      <div className="content mt-2">
                        <h4 className="font-medium">Never Loose Without</h4>
                        <h6 className="text-sm text-gray-500">Artist 420</h6>
                        <h6 className="text-sm">
                          <Link className="text-blue-300 font-medium" href="/">
                            ABC-001
                          </Link>
                        </h6>
                      </div>
                    </div>
                  </div>

                  <div className="w-1/3">
                    <div className="album mx-5 my-5 ">
                      <div className="image border-green-500 border-b-4">
                        <Link href="/">
                          <Image
                            src="https://pixlr.com/images/index/ai-image-generator-one.webp"
                            width={200}
                            height={250}
                            alt="Album Image"
                            className="w-full h-[250px] object-cover"
                          />
                        </Link>
                      </div>

                      <div className="content mt-2">
                        <h4 className="font-medium">Never Loose Without</h4>
                        <h6 className="text-sm text-gray-500">Artist 420</h6>
                        <h6 className="text-sm">
                          <Link className="text-blue-300 font-medium" href="/">
                            ABC-001
                          </Link>
                        </h6>
                      </div>
                    </div>
                  </div>

                  <div className="w-1/3">
                    <div className="album mx-5 my-5 ">
                      <div className="image border-green-500 border-b-4">
                        <Link href="/">
                          <Image
                            src="https://pixlr.com/images/index/ai-image-generator-one.webp"
                            width={200}
                            height={250}
                            alt="Album Image"
                            className="w-full h-[250px] object-cover"
                          />
                        </Link>
                      </div>

                      <div className="content mt-2">
                        <h4 className="font-medium">Never Loose Without</h4>
                        <h6 className="text-sm text-gray-500">Artist 420</h6>
                        <h6 className="text-sm">
                          <Link className="text-blue-300 font-medium" href="/">
                            ABC-001
                          </Link>
                        </h6>
                      </div>
                    </div>
                  </div>

                  <div className="w-1/3">
                    <div className="album mx-5 my-5 ">
                      <div className="image border-green-500 border-b-4">
                        <Link href="/">
                          <Image
                            src="https://pixlr.com/images/index/ai-image-generator-one.webp"
                            width={200}
                            height={250}
                            alt="Album Image"
                            className="w-full h-[250px] object-cover"
                          />
                        </Link>
                      </div>

                      <div className="content mt-2">
                        <h4 className="font-medium">Never Loose Without</h4>
                        <h6 className="text-sm text-gray-500">Artist 420</h6>
                        <h6 className="text-sm">
                          <Link className="text-blue-300 font-medium" href="/">
                            ABC-001
                          </Link>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </Layout>
  );
};

export default SearchPage;
