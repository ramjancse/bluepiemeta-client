"use client";

import Header from "@/components/dashboard/Header";
import Layout from "@/components/dashboard/Layout";
import React, { useEffect, useState } from "react";
import Pagination from "@/components/shared/Pagination";

import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { getAllAlbums } from "@/lib/albums";

import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { axiosPrivateInstance } from "@/config/axios";
import { useGetAlbumsQuery } from "@/features/albums/albumAPI";
import { useDispatch } from "react-redux";
import Loader from "../shared/Loader";
import TableRow from "./TableRow";
import Search from "./Search";

const Main = () => {
  const searchParams = useSearchParams();
  const queryPage = searchParams.get("page");

  // rtk query req
  const [page, setPage] = useState(queryPage ? Number(queryPage) : 1);
  const {
    data: {
      data: albums = [],
      pagination: { currentPage = 1, totalPages = 1 } = {},
    } = {},
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAlbumsQuery(page);

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
        <Search />

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
        <Search />

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

        <Pagination route="/albums" currentPage={page} totalPage={totalPages} />
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
