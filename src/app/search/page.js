"use client";

import Header from "@/components/dashboard/Header";
import Layout from "@/components/dashboard/Layout";
import Album from "@/components/search/Album";
import Sidebar from "@/components/search/Sidebar";
import Loader from "@/components/shared/Loader";
import { useGetAlbumsQuery } from "@/features/albums/albumAPI";

const SearchPage = () => {
  const {
    data: {
      data: albums = [],
      pagination: { currentPage = 1, totalPages = 1 } = {},
    } = {},
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAlbumsQuery({ keyword: "", page: 1, limit: 6 });

  // decide what to render
  let content = null;
  if (isLoading) {
    content = <Loader />;
  }

  if (isError) {
    content = (
      <div>
        <Header name="Edit Album" />
        <div className="bg-red-300 text-white rounded text-center py-5 font-semibold text-xl">
          {error.message || "Something Went Wrong!"}
        </div>
      </div>
    );
  }

  if (isSuccess) {
    content = albums.map((album) => <Album album={album} key={album.id} />);
  }

  return (
    <Layout>
      <Header name="Search" />

      <main>
        <div className="w-full border-l border-b px-1 py-1">
          <div className="flex">
            <Sidebar />

            <div className="w-4/5">
              <div className="w-full flex flex-wrap px-5 py-3">{content}</div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default SearchPage;
