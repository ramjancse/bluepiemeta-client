import Footer from "@/components/artist/Footer";
import Header from "@/components/artist/Header";
import { getAllAlbums } from "@/lib/albums";
import Link from "next/link";
import React from "react";

const page = async () => {
  const { data: albums = [] } = await getAllAlbums();

  return (
    <>
      <Header />
      <main className="px-3 py-2 xs:px-5 xs:py-3 md:px-20 md:py-10">
        <h2 className="text-xl">All Albums</h2>

        <div className="mt-2 overflow-x-auto">
          <table className="w-full mt-2 border-collapse">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="border p-2 text-left">Title/Upc</th>
                <th className="border p-2 text-left">Artist name</th>
                <th className="border p-2 text-left">Genre</th>
                <th className="border p-2 text-left">Type</th>
                <th className="border p-2 text-left">Release Date</th>
                <th className="border p-2 text-left">Updated At</th>
                <th className="border p-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {albums.length ? (
                albums.map((album) => {
                  const {
                    _id,
                    albumCover,
                    albumGenre,
                    albumId,
                    albumName,
                    albumType,
                    artistId,
                    cline,
                    clineYear,
                    distributionDate,
                    featuringArtist,
                    metadataLanguage,
                    originalReleaseDate,
                    pline,
                    plineYear,
                    primaryArtist,
                    recordLabel,
                    tracks,
                    userId,
                    updatedAt,
                  } = album;
                  return (
                    <tr className="even:bg-gray-100" key={_id}>
                      <td className="border p-2">
                        <Link
                          className="flex items-center flex-col xl:flex-row"
                          href={`/albums/${_id}`}
                        >
                          <img
                            src="https://images.othoba.com/images/thumbs/0483187_300-photo-6-slip-in-leather-photo-album-book-image-memory-scrapbook-gift.jpeg"
                            alt="Image"
                            className="w-[40px] h-[40px]"
                          />
                          <span className="ml-2">{albumName}</span>
                        </Link>
                      </td>
                      <td className="border p-2">
                        <Link className="block" href={`/albums/${_id}`}>
                          {primaryArtist}
                        </Link>
                      </td>
                      <td className="border p-2">
                        <Link className="block" href={`/albums/${_id}`}>
                          {albumGenre}
                        </Link>
                      </td>
                      <td className="border p-2">
                        <Link className="block" href={`/albums/${_id}`}>
                          {albumType}
                        </Link>
                      </td>
                      <td className="border p-2">
                        <Link className="block" href={`/albums/${_id}`}>
                          {originalReleaseDate}
                        </Link>
                      </td>

                      <td className="border p-2">
                        <Link className="block" href={`/albums/${_id}`}>
                          {updatedAt}
                        </Link>
                      </td>

                      <td className="border p-2">Edit</td>
                    </tr>
                  );
                })
              ) : (
                <tr className="even:bg-gray-100">
                  <td className="border p-2"></td>
                  <td className="border p-2"></td>
                  <td className="border p-2"></td>
                  <td className="border p-2 text-center">Albums not found</td>
                  <td className="border p-2"></td>
                  <td className="border p-2"></td>
                  <td className="border p-2"></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default page;
