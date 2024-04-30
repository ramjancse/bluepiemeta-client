"use client";

import Header from "@/components/dashboard/Header";
import Layout from "@/components/dashboard/Layout";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import dateFormatter from "@/utils/dateFormatter";
import Pagination from "@/components/shared/Pagination";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { getAllAlbums } from "@/lib/albums";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { axiosPrivateInstance } from "@/config/axios";
import { useGetAlbumsQuery } from "@/features/albums/albumAPI";
import { useDispatch } from "react-redux";


const schema = yup
  .object({
    keyword: yup.string().trim(),
  })
  .required();

const Main = () => {
  const session = useSession();
  const searchParams = useSearchParams();
  const queryPage = searchParams.get("page");
  const [albums, setAlbums] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    queryPage ? Number(queryPage) : 1
  );
  const [totalPages, setTotalPages] = useState(1);

  const dispatch = useDispatch();
  const { data, isLoading, isSuccess, isError, error, refetch } =
    useGetAlbumsQuery(queryPage ? Number(queryPage) : 1);

    if(isSuccess) {

      console.log(data, "data in albums rtk query");
    }


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const loadData = async () => {
    const {
      data,
      pagination: { currentPage, totalPages },
    } = await getAllAlbums({
      token: session?.data?.jwt,
      page: queryPage ? Number(queryPage) : 1,
    });

    setAlbums(data);
    setCurrentPage(currentPage);
    setTotalPages(totalPages);
  };

  useEffect(() => {
    if (session?.data?.jwt) {
      loadData();
    }
  }, [queryPage, session]);

  const onSubmit = async (data) => {
    if (data.keyword === "" || data.keyword === " ") {
      loadData();
      return false;
    }

    try {
      const encoded = encodeURI(data.keyword);
      const {
        data: { data: albums, pagination },
      } = await axiosPrivateInstance(session?.data?.jwt).get(
        `/albums?search=${encoded}`
      );
      // console.log(albums, "search res");
      // console.log(pagination, "search res");

      setAlbums(albums);
      // setCurrentPage(currentPage);
      // setTotalPages(totalPages);

      // show success message
      // toast.success("Album added successfully");
    } catch (error) {
      console.log(error, "error in search page");

      // show error message
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (albumId) => {
    try {
      const res = await axiosPrivateInstance(session?.data?.jwt).delete(
        `/albums/${albumId}`
      );

      console.log(res, "res");

      // show success message
      toast.success("Album delete successfully");
    } catch (error) {
      console.log(error, "error in search page");

      // show error message
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <Header name="All Albums" />
      <main className="px-4 py-3">
        <div className="top flex items-center justify-between">
          <h2 className="text-xl mb-3">Album table</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative">
              <span className="absolute left-3 top-4">
                <FaMagnifyingGlass className="z-20 text-primary" />
              </span>

              <input
                className="z-10 w-full my-1 bg-white outline-none pl-8 pr-3 py-2 border-gray-300 text-sm border-2 rounded-full"
                type="text"
                name="keyword"
                id="keyword"
                placeholder="Search album"
                autoComplete="off"
                {...register("keyword")}
              />
            </div>
          </form>

          <Link href="/albums/add" className="px-10 py-2 rounded bg-gray-200">
            Add album
          </Link>
        </div>

        <div className="mt-2 overflow-x-auto">
          <table className="w-full mt-2 border-collapse">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="border p-2 text-left">Title</th>
                <th className="border p-2 text-left">UPC</th>
                <th className="border p-2 text-left">Artist Name</th>
                <th className="border p-2 text-left">Genre</th>
                <th className="border p-2 text-left">Type</th>
                <th className="border p-2 text-left">Release Date</th>
                <th className="border p-2 text-left">Total Tracks</th>
                <th className="border p-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {albums?.length ? (
                albums.map((album) => {
                  const {
                    _id,
                    releaseCover,
                    releaseGenre,
                    releaseTitle,
                    formatType,
                    artistId,
                    originalReleaseDate,
                    releasePrimaryArtist,
                    tracks,
                    upcean,
                  } = album;

                  return (
                    <tr className="even:bg-gray-100" key={_id}>
                      <td className="border p-2">
                        <Link
                          className="flex items-center flex-col xl:flex-row"
                          href={`/albums/${_id}`}
                        >
                          <Image
                            src={
                              releaseCover ||
                              process.env.NEXT_PUBLIC_DEFAULT_IMAGE
                            }
                            alt="Image"
                            className="w-[40px] h-[40px]"
                            width={40}
                            height={40}
                          />
                          <span className="ml-2 text-blue-600">
                            {releaseTitle || "-"}
                          </span>
                        </Link>
                      </td>

                      <td className="border p-2">{upcean}</td>

                      <td className="border p-2">
                        <Link className="block text-blue-600" href={`/artists`}>
                          {releasePrimaryArtist[0]?.name || "-"}
                        </Link>
                      </td>

                      <td className="border p-2 space-x-1">
                        {releaseGenre.length
                          ? releaseGenre
                              .filter((genre) => genre.status)
                              .map((genre, index, array) => (
                                <span
                                  key={genre._id}
                                  className={
                                    index !== array.length - 1
                                      ? 'after:content-[","]'
                                      : ""
                                  }
                                >
                                  {genre.name}
                                </span>
                              ))
                          : "-"}
                      </td>

                      <td className="border p-2">{formatType || "-"}</td>

                      <td className="border p-2">
                        {dateFormatter(originalReleaseDate, "dd-MMM-yyyy")}
                      </td>

                      <td className="border p-2">{tracks?.length}</td>

                      <td className="border p-2 flex">
                        <Link
                          className="bg-yellow-300 px-3 py-[7px] rounded text-white"
                          href={`/albums/${_id}/edit`}
                        >
                          Edit
                        </Link>

                        <button
                          className="bg-red-400 px-3 py-[5px] rounded text-white ml-1"
                          onClick={() => handleDelete(_id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className="even:bg-gray-100">
                  <td className="border p-2"></td>
                  <td className="border p-2"></td>
                  <td className="border p-2"></td>
                  <td className="border p-2"></td>
                  <td className="border p-2 text-center">Albums not found</td>
                  <td className="border p-2"></td>
                  <td className="border p-2"></td>
                  <td className="border p-2"></td>
                  <td className="border p-2"></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          route="/albums"
          currentPage={currentPage}
          totalPage={totalPages}
        />
      </main>
    </Layout>
  );
};

export default Main;
