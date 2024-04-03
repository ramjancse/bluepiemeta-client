import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import EditButton from "@/components/artist/EditButton";
import Footer from "@/components/artist/Footer";
import Header from "@/components/artist/Header";
import Links from "@/components/artist/Links";
import { getAllArtists, getArtistById } from "@/lib/artist";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// export const generateStaticParams = async () => {
//   const { data: artists } = await getAllArtists();
//   return artists.map((artist) => ({ artistId: artist._id }));
// };

const page = async ({ params: { artistId } }) => {
  const session = await getServerSession(authOptions);
  const artistInfo = await getArtistById({ token: session?.jwt, artistId });

  const {
    artistLinks,
    socialMedia,
    artistImage,
    artistName,
    fullName,
    artistType,
    nameOfType,
    sex,
    region,
  } = artistInfo;

  return (
    <>
      <Header />

      <div className="px-3 py-2 md:py-5 xl:px-20 xl:py-10">
        <div className="flex flex-col md:flex-row md:items-start">
          <div className="left flex justify-center md:w-1/4">
            <Image
              className="w-full"
              src={artistImage}
              alt="Profile"
              width={1000}
              height={800}
            />
          </div>

          <div className="right mt-5 md:mt-0 md:ml-3 md:w-3/4">
            <div>
              <h2 className="text-2xl">Artist Information</h2>
              <hr />

              <div className="information flex mt-5">
                <div className="one w-1/2 mr-3">
                  <div className="info border-b py-2">
                    <p className="font-semibold">Artist name</p>
                    <p className="text-sm">{artistName}</p>
                  </div>

                  <div className="info border-b py-2">
                    <p className="font-semibold">Type</p>
                    <p className="text-sm">{artistType}</p>
                  </div>

                  <div className="info border-b py-2">
                    <p className="font-semibold">Gender</p>
                    <p className="text-sm">{sex}</p>
                  </div>
                </div>

                <div className="two w-1/2 ml-3">
                  <div className="info border-b py-2">
                    <p className="font-semibold">Full name</p>
                    <p className="text-sm">{fullName}</p>
                  </div>

                  <div className="info border-b py-2">
                    <p className="font-semibold">Genre</p>
                    <p className="text-sm">
                      {nameOfType
                        .filter((type) => type.status)
                        .map((type) => (
                          <span key={type._id}>{type.name}, </span>
                        ))}
                    </p>
                  </div>

                  <div className="info border-b py-2">
                    <p className="font-semibold">Region</p>
                    <p className="text-sm">{region}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="link mt-10">
              <h2 className="text-xl">Artist Links</h2>
              <hr />

              <div className="overflow-x-auto">
                <table className="w-full mt-2 border-collapse">
                  <thead className="bg-gray-700 text-white">
                    <tr>
                      <th className="border p-2 text-left">Platform name</th>
                      <th className="border p-2 text-left">Link</th>
                      <th className="border p-2 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {artistLinks.length ? (
                      artistLinks.map((artistLink) => {
                        const { _id, name, link } = artistLink;
                        return (
                          <tr className="even:bg-gray-100" key={_id}>
                            <td className="border p-2">{name}</td>
                            <td className="border p-2">
                              <a
                                className="text-sm text-blue-700"
                                href={`${link}`}
                                target="_blank"
                              >
                                {link ? link : "-"}
                              </a>
                            </td>
                            <td className="border p-2 text-center">
                              <EditButton />
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr className="even:bg-gray-100">
                        <td className="border p-2 text-center" colSpan="3">
                          Artist links are not available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="link mt-10">
              <h2 className="text-xl">Social Media Links</h2>
              <hr />

              <div className="overflow-x-auto">
                <table className="w-full mt-2 border-collapse">
                  <thead className="bg-gray-700 text-white">
                    <tr>
                      <th className="border p-2 text-left">Platform name</th>
                      <th className="border p-2 text-left">Link</th>
                      <th className="border p-2 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {socialMedia.length ? (
                      socialMedia.map((artistLink) => {
                        const { _id, name, link } = artistLink;
                        return (
                          <tr className="even:bg-gray-100" key={_id}>
                            <td className="border p-2">{name}</td>
                            <td className="border p-2">
                              <a
                                className="text-sm text-blue-700"
                                href={`${link}`}
                                target="_blank"
                              >
                                {link ? link : "-"}
                              </a>
                            </td>
                            <td className="border p-2 text-center">
                              <EditButton />
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr className="even:bg-gray-100">
                        <td className="border p-2 text-center" colSpan="3">
                          Social media links are not available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div> */}

            <Links
              artistLinks={artistLinks}
              socialMedia={socialMedia}
              artistId={artistId}
              artistInfo={artistInfo}
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default page;
