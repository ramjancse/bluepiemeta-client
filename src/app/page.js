"use client";

import Search from "@/components/albums/Search";
import TableRow from "@/components/albums/TableRow";
import Header from "@/components/dashboard/Header";
import Layout from "@/components/dashboard/Layout";
import Loader from "@/components/shared/Loader";
import Pagination from "@/components/shared/Pagination";
import { useGetAlbumsQuery } from "@/features/albums/albumAPI";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

// import Layout from "@/components/dashboard/Layout";
// import Image from "next/image";

// import Link from "next/link";
// import { MdDownloadForOffline } from "react-icons/md";
// import { SlOptionsVertical } from "react-icons/sl";
// import ChainIcon from "@/assets/images/dashboard/Chain-icon.svg";
// import { getAllAlbums } from "@/lib/albums";
// import { getServerSession } from "next-auth";
// import { authOptions } from "./api/auth/[...nextauth]/authOptions";
// import Header from "@/components/dashboard/Header";
// import Loader from "@/components/shared/Loader";

const Home = () => {
  // const session = await getServerSession(authOptions);
  // const { data: albums } = await getAllAlbums({ token: session?.jwt, page: 1 });

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
    // <Layout>
    //   <Header name="Home" />
    //   <div className="bottom bg-[#F5F6FA] flex justify-between">
    //     <div className="recent-list w-1/3 px-5 pt-3 overflow-hidden shadow-md">
    //       <div className="tracks">
    //         <h3 className="font-medium text-base mb-2 border-b-2 border-gray-400">
    //           Recently Added
    //         </h3>

    //         {albums
    //           .slice(0, process.env.RECENTLY_ADDED_ALBUMS_SHOW)
    //           .map((album, index) => {
    //             const { _id, releaseTitle, releaseCover, author } = album;
    //             return (
    //               <div
    //                 key={_id}
    //                 className={`track flex border-b-2 py-1 ${
    //                   index === 0 ? "mt-4" : "mt-2"
    //                 }`}
    //               >
    //                 <div className="image mr-2">
    //                   <Image
    //                     className="w-[60px]"
    //                     src={
    //                       releaseCover || process.env.NEXT_PUBLIC_DEFAULT_IMAGE
    //                     }
    //                     alt="Track Image"
    //                     width={60}
    //                     height={60}
    //                   />
    //                 </div>

    //                 <div className="info w-full flex justify-between">
    //                   <div className="text">
    //                     <h5 className="text-sm">
    //                       <Link
    //                         href={`/albums/${_id}`}
    //                         className="hover:text-fill"
    //                       >
    //                         {releaseTitle}
    //                       </Link>
    //                     </h5>

    //                     <h6 className="text-xs">
    //                       <Link
    //                         href={`/albums/${_id}`}
    //                         className="hover:text-fill"
    //                       >
    //                         Eleanor MacEoy
    //                       </Link>
    //                     </h6>
    //                   </div>

    //                   <div className="link flex justify-between space-x-2">
    //                     <Image
    //                       src={ChainIcon}
    //                       alt="Chain Icon"
    //                       className="text-[#0070D6] w-[15px] h-[20px]"
    //                     />

    //                     <MdDownloadForOffline className="text-xl text-[#0070D6]" />
    //                     <SlOptionsVertical className="text-xl text-[#0070D6]" />
    //                   </div>
    //                 </div>
    //               </div>
    //             );
    //           })}
    //       </div>
    //     </div>

    //     <div className="track-list w-2/3 px-5 pt-3">
    //       <h3 className="font-medium text-base mb-2 border-b-2 border-gray-400">
    //         Track List
    //       </h3>

    //       <div className="songs">
    //         {albums
    //           .slice(0, process.env.TRACK_LIST_SHOW)
    //           .map((album, index) => {
    //             const { _id, releaseTitle, releaseCover, tracks } = album;
    //             if (tracks && tracks.length > 0) {
    //               const firstTrack = tracks[0];
    //               return (
    //                 <div
    //                   className={`song bg-white flex  ${
    //                     index === 0 ? "mt-5" : "mt-4"
    //                   }`}
    //                   key={firstTrack._id}
    //                 >
    //                   <div className="cover w-[50px]">
    //                     <Image
    //                       src={
    //                         releaseCover ||
    //                         process.env.NEXT_PUBLIC_DEFAULT_IMAGE
    //                       }
    //                       className="w-full"
    //                       alt="Album"
    //                       width={50}
    //                       height={50}
    //                     />
    //                   </div>

    //                   <div className="right w-[calc(100%-50px)] flex items-center justify-between px-3">
    //                     <div className="name">
    //                       <h6 className="text-sm font-medium">
    //                         <a
    //                           href={`/albums/${_id}/tracks/${firstTrack._id}`}
    //                           className="hover:text-fill"
    //                         >
    //                           {firstTrack.trackTitle}{" "}
    //                         </a>

    //                         <a
    //                           className="text-xs italic hover:text-fill"
    //                           href={`/albums/${_id}/tracks/${firstTrack._id}`}
    //                         >
    //                           - {firstTrack?.trackArtist[0]?.name}
    //                         </a>
    //                       </h6>

    //                       <p className="text-[11px] hidden sm:flex sm:justify-between">
    //                         {firstTrack.trackGenre
    //                           ?.map((genre) => genre.name)
    //                           .join(", ")}
    //                       </p>
    //                     </div>

    //                     <div className="action flex">
    //                       <button className="mr-3 rounded-full bg-[#205CA8] px-6 py-1 text-xs font-medium uppercase text-white">
    //                         <a href="/">Edit</a>
    //                       </button>

    //                       <button className="rounded-full bg-[#205CA8] px-6 py-1 text-xs font-medium uppercase text-white">
    //                         <a href="/">License</a>
    //                       </button>
    //                     </div>
    //                   </div>
    //                 </div>
    //               );
    //             } else {
    //               return null;
    //             }
    //           })}
    //       </div>

    //       <div className="button py-4 flex justify-end items-center">
    //         <Link
    //           href="/albums"
    //           className="px-5 py-1 bg-[#424242] text-white rounded-full text-sm font-medium"
    //         >
    //           View All
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    // </Layout>

    <Layout>
      <Header name="Dashboard" />
      {content}
    </Layout>
  );
};

export default Home;
