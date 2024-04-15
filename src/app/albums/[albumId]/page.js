import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Footer from "@/components/artist/Footer";
import Header from "@/components/artist/Header";
import { getAlbumById } from "@/lib/albums";
import dateFormatter from "@/utils/dateFormatter";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async ({ params: { albumId } }) => {
  const session = await getServerSession(authOptions);
  const {
    releasePrimaryArtist,
    tracks,
    releaseCover,
    releaseGenre,
    releaseTitle,
    releaseType,
    formatType,
    originalReleaseDate,
    upcean,
  } = await getAlbumById({ token: session?.jwt, albumId });

  return (
    <>
      <Header />
      <div className="px-3 py-2 md:py-5 xl:px-20 xl:py-10">
        <div className="flex flex-col md:flex-row">
          <div className="left md:w-1/4 flex flex-col">
            <Image
              src={releaseCover || process.env.NEXT_PUBLIC_DEFAULT_IMAGE}
              className="w-full"
              alt="Album Cover Picture"
              width={1000}
              height={1000}
              placeholder="blur"
              blurDataURL={process.env.NEXT_PUBLIC_DEFAULT_IMAGE}
            />

            <h2 className="text-xl mt-3">{releaseTitle || "-"}</h2>
          </div>

          <div className="right mt-5 md:mt-0 md:ml-3 md:w-3/4">
            <div className="">
              <h2 className="text-2xl">Album Information</h2>
              <hr />

              <div className="information flex mt-5">
                <div className="one w-1/2 mr-3">
                  <div className="info border-b py-2">
                    <p className="font-semibold">Artist</p>
                    <p className="text-sm">
                      {releasePrimaryArtist[0]?.name || "-"}
                    </p>
                  </div>

                  <div className="info border-b py-2">
                    <p className="font-semibold">Type</p>
                    <p className="text-sm">{`${formatType || "-"} - ${
                      releaseType || "-"
                    }`}</p>
                  </div>

                  <div className="info border-b py-2">
                    <p className="font-semibold">Total tracks</p>
                    <p className="text-sm">{tracks.length}</p>
                  </div>
                </div>

                <div className="two w-1/2 ml-3">
                  <div className="info border-b py-2">
                    <p className="font-semibold">Genre</p>
                    <p className="text-sm space-x-1">
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
                    </p>
                  </div>

                  <div className="info border-b py-2">
                    <p className="font-semibold">Release Date</p>
                    <p className="text-sm">
                      {dateFormatter(originalReleaseDate, "dd-MMMM-yyyy")}
                    </p>
                  </div>

                  <div className="info border-b py-2">
                    <p className="font-semibold">UPC/EAN</p>
                    <p className="text-sm">{upcean || "-"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="tracks mt-10">
              <h2 className="text-xl">Tracks</h2>
              <hr />

              <div className="overflow-x-auto">
                <table className="w-full mt-2 border-collapse">
                  <thead className="bg-gray-700 text-white">
                    <tr>
                      <th className="border p-2 text-left">SL</th>
                      <th className="border p-2 text-left">Title</th>
                      <th className="border p-2 text-left">Performer</th>
                      <th className="border p-2 text-center">Duration</th>
                      <th className="border p-2 text-center">ISRC</th>
                      <th className="border p-2 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tracks.length ? (
                      tracks.map((track, index) => {
                        const { _id, trackArtist, trackTitle, isrc, duration } =
                          track;

                        return (
                          <tr className="even:bg-gray-100" key={_id}>
                            <td className="border p-2">{index + 1}</td>
                            <td className="border p-2">
                              <Link
                                href={`/albums/${albumId}/tracks/${_id}`}
                                className="block text-blue-600"
                              >
                                {trackTitle || "-"}
                              </Link>
                            </td>

                            <td className="border p-2">
                              {trackArtist[0]?.name || "-"}
                            </td>

                            <td className="border p-2">{duration || "-"}</td>
                            <td className="border p-2">{isrc || "-"}</td>
                            <td className="border p-2 text-center">
                              <Link
                                href={`/albums/${albumId}/tracks/${_id}`}
                                className="text-blue-600"
                              >
                                Details
                              </Link>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr className="even:bg-gray-100">
                        <td className="border p-2 text-center" colSpan={6}>
                          Album tracks are not available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default page;
