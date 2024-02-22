import Footer from "@/components/artist/Footer";
import Header from "@/components/artist/Header";
import { getAlbumById } from "@/lib/albums";
import Link from "next/link";
import React from "react";

const page = async ({ params: { albumId } }) => {
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
  } = await getAlbumById(albumId);

  return (
    <>
      <Header />
      <div className="px-3 py-2 md:py-5 xl:px-20 xl:py-10">
        <div className="flex flex-col md:flex-row">
          <div className="left md:w-1/4 flex justify-center">
            <img
              className="w-[200px] h-[200px]"
              src="https://images.othoba.com/images/thumbs/0483187_300-photo-6-slip-in-leather-photo-album-book-image-memory-scrapbook-gift.jpeg"
              alt="Profile"
            />
          </div>

          <div className="right mt-5 md:mt-0 md:ml-3 md:w-3/4">
            <div className="">
              <h2 className="text-2xl">Album Information</h2>
              <hr />

              <div className="information flex mt-5">
                <div className="one w-1/2 mr-3">
                  <div className="info border-b py-2">
                    <p className="font-semibold">Artist</p>
                    <p className="text-sm">{primaryArtist}</p>
                  </div>

                  <div className="info border-b py-2">
                    <p className="font-semibold">Language</p>
                    <p className="text-sm">{metadataLanguage}</p>
                  </div>

                  <div className="info border-b py-2">
                    <p className="font-semibold">Area</p>
                    <p className="text-sm">-</p>
                  </div>

                  <div className="info border-b py-2">
                    <p className="font-semibold">Songs</p>
                    <p className="text-sm">{tracks.length}</p>
                  </div>

                  <div className="info border-b py-2">
                    <p className="font-semibold">C Line</p>
                    <p className="text-sm">
                      {clineYear} {cline}
                    </p>
                  </div>
                </div>

                <div className="two w-1/2 ml-3">
                  <div className="info border-b py-2">
                    <p className="font-semibold">Genre</p>
                    <p className="text-sm">{albumGenre}</p>
                  </div>

                  <div className="info border-b py-2">
                    <p className="font-semibold">Release Date</p>
                    <p className="text-sm">{originalReleaseDate}</p>
                  </div>

                  <div className="info border-b py-2">
                    <p className="font-semibold">Distribution Date</p>
                    <p className="text-sm">{distributionDate}</p>
                  </div>

                  <div className="info border-b py-2">
                    <p className="font-semibold">P Line</p>
                    <p className="text-sm">
                      {plineYear} {pline}
                    </p>
                  </div>

                  <div className="info border-b py-2">
                    <p className="font-semibold">UPC/EAN</p>
                    <p className="text-sm">{upcean}</p>
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
                      <th className="border p-2 text-left">Title</th>
                      <th className="border p-2 text-left">Performer</th>
                      <th className="border p-2 text-center">Duration</th>
                      <th className="border p-2 text-center">ISRC</th>
                      <th className="border p-2 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tracks.map((track) => {
                      const {
                        _id,
                        trackId,
                        audioFile,
                        metadataLanguage,
                        titleOfTrack,
                        version,
                        trackGenre,
                        audioLanguage,
                        lyrics,
                        explicitContent,
                        catalogNumber,
                        isrc,
                      } = track;

                      return (
                        <tr className="even:bg-gray-100" key={_id}>
                          <td className="border p-2">{titleOfTrack}</td>
                          <td className="border p-2">{primaryArtist}</td>
                          <td className="border p-2">3.21</td>
                          <td className="border p-2">{isrc}</td>
                          <td className="border p-2 text-center">
                            <Link href={`/tracks/${trackId}`}>Details</Link>
                          </td>
                        </tr>
                      );
                    })}
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
