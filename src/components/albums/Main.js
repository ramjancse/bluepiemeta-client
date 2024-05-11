"use client";

import Header from "@/components/dashboard/Header";
import Layout from "@/components/dashboard/Layout";
import Pagination from "@/components/shared/Pagination";
import { useSearchParams } from "next/navigation";
import { useGetAlbumsQuery } from "@/features/albums/albumAPI";
import { useSelector } from "react-redux";
import Loader from "../shared/Loader";
import TableRow from "./TableRow";
import Search from "./Search";

const Main = () => {
  const { keyword } = useSelector((state) => state.album);
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const {
    data: {
      data: albums = [],
      pagination: { currentPage = 1, totalPages = 1 } = {},
    } = {},
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAlbumsQuery({ page: page ? Number(page) : 1, keyword });

  // decide what to render in UI
  let content = null;
  if (isLoading) {
    content = <Loader />;
  }

  if (isError) {
    content = (
      <div className="bg-red-300 text-white rounded text-center py-5 font-semibold text-xl">
        {error?.message || "Something Went Wrong!"}
      </div>
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

        <Pagination
          route="/albums"
          currentPage={page ? Number(page) : 1}
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
