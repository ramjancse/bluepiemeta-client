import Footer from "@/components/artist/Footer";
import Header from "@/components/artist/Header";
import { getAlbumById } from "@/lib/albums";
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
    upcean,
    updatedAt,
    createdAt,
  } = await getAlbumById(albumId);

  const foundTrack = tracks?.find((track) => track._id === trackId);

  const {
    titleOfTrack,
    trackGenre,
    explicitContent,
    version,
    isrc,
    audioLanguage,
    catalogNumber,
  } = foundTrack || {};
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
              <h2 className="text-xl font-bold">{primaryArtist}</h2>
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
                Created time: {createdAt} | Updated time: {updatedAt}
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
                    <p className="font-semibold">Version</p>
                    <p className="text-sm">{version}</p>
                  </div>

                  <div className="info border-b py-2">
                    <p className="font-semibold">Explicit</p>
                    <p className="text-sm">{explicitContent || "-"}</p>
                  </div>

                  <div className="info border-b py-2">
                    <p className="font-semibold">Catalogue Number</p>
                    <p className="text-sm">{catalogNumber}</p>
                  </div>
                </div>

                <div className="two w-1/2 ml-3">
                  <div className="info border-b py-2">
                    <p className="font-semibold">Genre</p>
                    <p className="text-sm">{trackGenre}</p>
                  </div>

                  <div className="info border-b py-2">
                    <p className="font-semibold">Language</p>
                    <p className="text-sm">{audioLanguage}</p>
                  </div>

                  <div className="info border-b py-2">
                    <p className="font-semibold">ISRC</p>
                    <p className="text-sm">{isrc}</p>
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
