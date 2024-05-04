"use client";

import Header from "@/components/dashboard/Header";
import Layout from "@/components/dashboard/Layout";
import React, { useEffect, useState } from "react";
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
import Loader from "../shared/Loader";
import TableRow from "./TableRow";

const schema = yup
  .object({
    keyword: yup.string().trim(),
  })
  .required();

const Main = () => {
  const session = useSession();
  const searchParams = useSearchParams();
  const queryPage = searchParams.get("page");
  // const [albums, setAlbums] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    queryPage ? Number(queryPage) : 1
  );
  const [totalPages, setTotalPages] = useState(1);

  // rtk query req
  const dispatch = useDispatch();
  const {
    data: { data: albums = {} } = {},
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetAlbumsQuery();

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

    setCurrentPage(currentPage);
    setTotalPages(totalPages);
  };

  useEffect(() => {
    if (session?.data?.jwt) {
      // loadData();
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

  // decide what to render
  let content = null;
  if (isLoading) {
    content = <Loader />;
  }

  if (isError) {
    content = (
      <div className="bg-red-400 text-white font-bold">{error.message}</div>
    );
  }

  if (isSuccess && !albums.length) {
    content = (
      <main className="px-4 py-3">
        <div className="top flex items-center justify-end">
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
              <tr className="text-center">
                <td className="border p-2" colSpan={8}>
                  Albums not found
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <Pagination
          route="/albums"
          currentPage={currentPage}
          totalPage={totalPages}
        />
      </main>
    );
  }

  if (isSuccess && albums.length) {
    content = (
      <main className="px-4 py-3">
        <div className="top flex items-center justify-end">
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
              {albums.map((album) => (
                <TableRow key={album.id} album={album} />
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          route="/albums"
          currentPage={currentPage}
          totalPage={totalPages}
        />
      </main>
    );
  }

  return (
    <Layout>
      <Header name="All Albums" />
      {content}
    </Layout>
  );
};

export default Main;
