import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Footer from "@/components/artist/Footer";
import Header from "@/components/dashboard/Header";
import Layout from "@/components/dashboard/Layout";
import { getAlbumById } from "@/lib/albums";
import dateFormatter from "@/utils/dateFormatter";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async ({ params: { albumId, trackId } }) => {
  const session = await getServerSession(authOptions);
  const {
    cLineCompany,
    cLineYear,
    originalReleaseDate,
    pLineCompany,
    pLineYear,
    recordLabel,
    tracks,
  } = await getAlbumById({ token: session?.jwt, albumId });

  const foundTrack = tracks?.find((track) => track._id === trackId);

  const {
    trackTitle,
    trackVersion,
    duration,
    trackGenre,
    trackMood,
    audioLanguage,
    trackArtist,
    composer,
    lyricist,
    producer,
    remixer,
    isrc,
  } = foundTrack || {};

  // const filteredGenre = trackGenre.filter((genre) => genre.status);

  return (
    <Layout>
      <Header name="Track Basic Info" />
      <div className="px-4 py-3 border-l">
        <div className="new space-y-7">
          <div className="assets flex items-center">
            <div className="name px-5 w-1/6">
              <h4 className="text-right">Assets</h4>
            </div>

            <div className="information flex border-l-2 border-gray-400 px-3 w-full">
              <div className="one w-1/2 mr-3">
                <div className="info border-b py-2 ">
                  <p className="font-semibold">Title</p>
                  <p className="text-sm">{trackTitle || "-"}</p>
                </div>

                <div className="info border-b py-2">
                  <p className="font-semibold">Track Artist</p>
                  <p className="text-sm">
                    {trackArtist.length
                      ? trackArtist.map((artist, index, array) => (
                          <span
                            key={artist._id}
                            className={
                              index !== array.length - 1
                                ? 'after:content-[","]'
                                : ""
                            }
                          >
                            {artist.name}
                          </span>
                        ))
                      : "-"}
                  </p>
                </div>
              </div>

              <div className="two w-1/2 ml-3">
                <div className="info border-b py-2">
                  <p className="font-semibold">Language</p>
                  <p className="text-sm">{audioLanguage || "-"}</p>
                </div>

                <div className="info border-b py-2">
                  <p className="font-semibold">Composer</p>
                  <p className="text-sm">
                    {composer.length
                      ? composer.map((artist, index, array) => (
                          <span
                            key={artist._id}
                            className={
                              index !== array.length - 1
                                ? 'after:content-[","]'
                                : ""
                            }
                          >
                            {artist.name}
                          </span>
                        ))
                      : "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="contributors flex items-center">
            <div className="name px-5 w-1/6">
              <h4 className="text-right">Contributors</h4>
            </div>

            <div className="information flex border-l-2 border-gray-400 px-3 w-full">
              <div className="one w-1/2 mr-3">
                <div className="info border-b py-2">
                  <p className="font-semibold">Lyricist</p>
                  <p className="text-sm">
                    {lyricist.length
                      ? lyricist.map((artist, index, array) => (
                          <span
                            key={artist._id}
                            className={
                              index !== array.length - 1
                                ? 'after:content-[","]'
                                : ""
                            }
                          >
                            {artist.name}
                          </span>
                        ))
                      : "-"}
                  </p>
                </div>

                <div className="info border-b py-2">
                  <p className="font-semibold">Producer</p>
                  <p className="text-sm">
                    {producer.length
                      ? producer.map((artist, index, array) => (
                          <span
                            key={artist._id}
                            className={
                              index !== array.length - 1
                                ? 'after:content-[","]'
                                : ""
                            }
                          >
                            {artist.name}
                          </span>
                        ))
                      : "-"}
                  </p>
                </div>
              </div>

              <div className="two w-1/2 ml-3">
                <div className="info border-b py-2">
                  <p className="font-semibold">Remixer</p>
                  <p className="text-sm">
                    {remixer.length
                      ? remixer.map((artist, index, array) => (
                          <span
                            key={artist._id}
                            className={
                              index !== array.length - 1
                                ? 'after:content-[","]'
                                : ""
                            }
                          >
                            {artist.name}
                          </span>
                        ))
                      : "-"}
                  </p>
                </div>

                {/* <div className="info border-b py-2">
                  <p className="font-semibold">Arranger</p>
                  <p className="text-sm">
                    {arranger.length
                      ? arranger.map((artist, index, array) => (
                          <span
                            key={artist._id}
                            className={
                              index !== array.length - 1
                                ? 'after:content-[","]'
                                : ""
                            }
                          >
                            {artist.name}
                          </span>
                        ))
                      : "-"}
                  </p>
                </div> */}
              </div>
            </div>
          </div>

          <div className="technical flex items-center">
            <div className="name px-5 w-1/6">
              <h4 className="text-right">Technical</h4>
            </div>

            <div className="information flex border-l-2 border-gray-400 px-3 w-full">
              <div className="one w-1/2 mr-3">
                <div className="info border-b py-2">
                  <p className="font-semibold">Genre</p>
                  <p className="text-sm space-x-1">
                    {trackGenre.length
                      ? trackGenre.map((genre, index, array) => (
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

                {/* <div className="info border-b py-2">
                  <p className="font-semibold">Mix</p>
                  <p className="text-sm">-</p>
                </div> */}
              </div>

              <div className="two w-1/2 ml-3">
                {/* <div className="info border-b py-2">
                  <p className="font-semibold">Mood</p>
                  <p className="text-sm">
                    {trackMood.length
                      ? trackMood.map((artist, index, array) => (
                          <span
                            key={artist._id}
                            className={
                              index !== array.length - 1
                                ? 'after:content-[","]'
                                : ""
                            }
                          >
                            {artist.name}
                          </span>
                        ))
                      : "-"}
                  </p>
                </div> */}

                <div className="info border-b py-2">
                  <p className="font-semibold">Duration</p>
                  <p className="text-sm">{duration || "-"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="metadata flex items-center">
            <div className="name px-5 w-1/6">
              <h4 className="text-right">Metadata</h4>
            </div>

            <div className="information flex border-l-2 border-gray-400 px-3 w-full">
              <div className="one w-1/2 mr-3">
                <div className="info border-b py-2">
                  <p className="font-semibold">Release Date</p>
                  <p className="text-sm">
                    {dateFormatter(originalReleaseDate, "dd-MMMM-yyyy")}
                  </p>
                </div>

                <div className="info border-b py-2">
                  <p className="font-semibold">Version</p>
                  <p className="text-sm">{trackVersion || "-"}</p>
                </div>

                <div className="info border-b py-2">
                  <p className="font-semibold">P Line Company</p>
                  <p className="text-sm">
                    {pLineCompany || "-"} {dateFormatter(pLineYear, "yyyy")}
                  </p>
                </div>
              </div>

              <div className="two w-1/2 ml-3">
                <div className="info border-b py-2">
                  <p className="font-semibold">Label</p>
                  <p className="text-sm">{recordLabel || "-"}</p>
                </div>

                <div className="info border-b py-2">
                  <p className="font-semibold">ISRC</p>
                  <p className="text-sm">{isrc || "-"}</p>
                </div>

                <div className="info border-b py-2">
                  <p className="font-semibold">C Line Company</p>
                  <p className="text-sm">
                    {cLineCompany || "-"} {dateFormatter(cLineYear, "yyyy")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="others flex items-center">
            <div className="name px-5 w-1/6">
              <h4 className="text-right">Others</h4>
            </div>

            <div className="information border-l-2 border-gray-400 px-3 w-full">
              <div className="lyrics flex">
                <p className="font-semibold w-[100px]">Lyrics</p>
                <button
                  type="button"
                  className="bg-gray-400 rounded-full px-3 text-white mx-3"
                >
                  View
                </button>

                <button
                  type="button"
                  className="bg-gray-400 rounded-full px-3 text-white"
                >
                  Download
                </button>
              </div>

              <div className="contracts flex mt-5">
                <p className="font-semibold w-[100px]">Contracts</p>
                <button
                  type="button"
                  className="bg-gray-400 rounded-full px-3 text-white mx-3"
                >
                  View
                </button>

                <button
                  type="button"
                  className="bg-gray-400 rounded-full px-3 text-white"
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default page;
