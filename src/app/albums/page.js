import Header from "@/components/dashboard/Header";
import Layout from "@/components/dashboard/Layout";
import { getAllAlbums } from "@/lib/albums";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import dateFormatter from "@/utils/dateFormatter";

const page = async () => {
  const session = await getServerSession(authOptions);
  const { data: albums = [] } = await getAllAlbums(session?.jwt);

  return (
    <Layout>
      <Header name="All Albums" />
      <main className="px-4 py-3">
        <div className="top flex items-center justify-between">
          <h2 className="text-xl mb-3">Album table</h2>
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

                      <td className="border p-2">
                        <Link
                          className="bg-yellow-300 px-3 py-[7px] rounded text-white"
                          href={`/albums/${_id}/edit`}
                        >
                          Edit
                        </Link>
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
      </main>
    </Layout>
  );
};

export default page;
