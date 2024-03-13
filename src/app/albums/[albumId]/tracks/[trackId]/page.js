import Footer from "@/components/artist/Footer";
import Header from "@/components/artist/Header";
import { getAlbumById } from "@/lib/albums";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";

const page = async ({ params: { albumId, trackId } }) => {
  const {
    _id,
    albumCover,
    albumGenre,
    albumName,
    albumType,
    artistId,
    cLine,
    cLineYear,
    metadataLanguage,
    originalReleaseDate,
    pLine,
    pLineYear,
    recordLabel,
    tracks,
    userId,
    upcean,
    updatedAt,
    createdAt,
  } = await getAlbumById(albumId);

  const foundTrack = tracks.find((track) => track._id === trackId);

  const {
    primaryArtist,
    featuringArtist,
    trackType,
    titleOfTrack,
    trackGenre,
    explicitContent,
    lyricist,
    composer,
    producer,
    isrc,
    audioLanguage,
    catalogNumber,
  } = foundTrack || {};

  const filteredGenre = trackGenre.filter((genre) => genre.status);

  return (
    <>
      <Header />
      <div className="px-3 py-2 md:py-5 xl:px-20 xl:py-10">
        <div className="">
          <div className="left flex">
            <div className="img">
              <img
                className="w-[100px] h-[100px]"
                src="https://images.othoba.com/images/thumbs/0483187_300-photo-6-slip-in-leather-photo-album-book-image-memory-scrapbook-gift.jpeg"
                alt="Profile"
              />
            </div>

            <div className="text ml-3 flex flex-col justify-between">
              <h2 className="text-xl font-bold">{primaryArtist[0].name}</h2>
              <h4>
                Album:{" "}
                <Link
                  href={`/albums/${_id}`}
                  className="text-blue-700 font-semibold"
                >
                  {albumName}
                </Link>
              </h4>
              <p>
                Created time: {format(createdAt, "dd-MMMM-yyyy")} | Updated
                time: {format(updatedAt, "dd-MMMM-yyyy")}
              </p>
            </div>
          </div>

          <div className="right mt-5">
            <div className="">
              <h2 className="text-2xl">Basic Information</h2>
              <hr />

              <div className="information flex mt-5">
                <div className="one w-1/2 mr-3">
                  <div className="info border-b py-2">
                    <p className="font-semibold">Title</p>
                    <p className="text-sm">{titleOfTrack}</p>
                  </div>

                  <div className="info border-b py-2">
                    <p className="font-semibold">Type</p>
                    <p className="text-sm">{trackType ?? "-"}</p>
                  </div>

                  <div className="info border-b py-2">
                    <p className="font-semibold">Genre</p>
                    <p className="text-sm space-x-1">
                      {filteredGenre.length
                        ? filteredGenre.map((genre, index, array) => (
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
                    <p className="font-semibold">Performer</p>
                    <p className="text-sm">{primaryArtist[0]?.name || "-"}</p>
                  </div>

                  <div className="info border-b py-2">
                    <p className="font-semibold">Composer</p>
                    <p className="text-sm">{composer[0]?.name || "-"}</p>
                  </div>

                  <div className="info border-b py-2">
                    <p className="font-semibold">Featuring</p>
                    <p className="text-sm">{featuringArtist[0]?.name || "-"}</p>
                  </div>

                  <div className="info border-b py-2">
                    <p className="font-semibold">Explicit</p>
                    <p className="text-sm">{explicitContent || "-"}</p>
                  </div>
                </div>

                <div className="two w-1/2 ml-3">
                  <div className="info border-b py-2">
                    <p className="font-semibold">Version</p>
                    <p className="text-sm">-</p>
                  </div>

                  <div className="info border-b py-2">
                    <p className="font-semibold">ISRC</p>
                    <p className="text-sm">{isrc}</p>
                  </div>

                  <div className="info border-b py-2">
                    <p className="font-semibold">Language</p>
                    <p className="text-sm">{audioLanguage}</p>
                  </div>

                  <div className="info border-b py-2">
                    <p className="font-semibold">Lyricist</p>
                    <p className="text-sm">{lyricist[0]?.name || "-"}</p>
                  </div>

                  <div className="info border-b py-2">
                    <p className="font-semibold">Arranger</p>
                    <p className="text-sm">-</p>
                  </div>

                  <div className="info border-b py-2">
                    <p className="font-semibold">Producer</p>
                    <p className="text-sm">{producer[0]?.name || "-"}</p>
                  </div>

                  <div className="info border-b py-2">
                    <p className="font-semibold">Catalogue Number</p>
                    <p className="text-sm">{catalogNumber}</p>
                  </div>
                </div>
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
