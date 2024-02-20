import Footer from "@/components/artist/Footer";
import Header from "@/components/artist/Header";
import { getArtistById } from "@/lib/artist";
import Link from "next/link";
import React from "react";

const page = async ({ params: { artistId } }) => {
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
  } = await getArtistById(artistId);

  return (
    <>
      <Header />
      <div className="container px-20 py-10">
        <div className="flex ">
          <div className="left w-1/4 flex justify-center">
            <img
              className="w-[200px] h-[200px]"
              src="https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg="
              alt="Profile"
            />
          </div>
          <div className="right ml-3 w-3/4">
            <div className="">
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
                    <p className="text-sm">{nameOfType}</p>
                  </div>

                  <div className="info border-b py-2">
                    <p className="font-semibold">Region</p>
                    <p className="text-sm">{region}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="link mt-10">
              <h2 className="text-xl">Artist Links</h2>
              <hr />

              <table className="w-full mt-2 border-collapse">
                <thead className="bg-gray-700 text-white">
                  <tr>
                    <th className="border p-2 text-left">Platform name</th>
                    <th className="border p-2 text-left">Link</th>
                    <th className="border p-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="even:bg-gray-100">
                    <td className="border p-2">QQ Music</td>
                    <td className="border p-2">
                      <Link
                        className="text-sm text-blue-700"
                        href={`${artistLinks.qqMusic}`}
                      >
                        {artistLinks.qqMusic}
                      </Link>
                    </td>
                    <td className="border p-2 text-center">Edit</td>
                  </tr>

                  <tr className="even:bg-gray-100">
                    <td className="border p-2">NetEase Music</td>
                    <td className="border p-2">
                      <Link
                        className="text-sm text-blue-700"
                        href={`${artistLinks?.netEaseMusic}`}
                      >
                        {artistLinks?.netEaseMusic}
                      </Link>
                    </td>
                    <td className="border p-2 text-center">Edit</td>
                  </tr>

                  <tr className="even:bg-gray-100">
                    <td className="border p-2">Spotify</td>
                    <td className="border p-2">
                      <Link
                        className="text-sm text-blue-700"
                        href={`${artistLinks?.spotify}`}
                      >
                        {artistLinks?.spotify}
                      </Link>
                    </td>
                    <td className="border p-2 text-center">Edit</td>
                  </tr>

                  <tr className="even:bg-gray-100">
                    <td className="border p-2">Apple Music</td>
                    <td className="border p-2">
                      <Link
                        className="text-sm text-blue-700"
                        href={`${artistLinks?.AppleMusic}`}
                      >
                        {artistLinks?.AppleMusic}
                      </Link>
                    </td>
                    <td className="border p-2 text-center">Edit</td>
                  </tr>
                  <tr className="even:bg-gray-100">
                    <td className="border p-2">SoundCloud</td>
                    <td className="border p-2">
                      <Link
                        className="text-sm text-blue-700"
                        href={`${artistLinks?.soundCloud}`}
                      >
                        {artistLinks?.soundCloud}
                      </Link>
                    </td>
                    <td className="border p-2 text-center">Edit</td>
                  </tr>

                  <tr className="even:bg-gray-100">
                    <td className="border p-2">Beatport</td>
                    <td className="border p-2">
                      <Link
                        className="text-sm text-blue-700"
                        href={`${artistLinks?.beatport}`}
                      >
                        {artistLinks?.beatport}
                      </Link>
                    </td>
                    <td className="border p-2 text-center">Edit</td>
                  </tr>

                  <tr className="even:bg-gray-100">
                    <td className="border p-2">Deezer</td>
                    <td className="border p-2">
                      <Link
                        className="text-sm text-blue-700"
                        href={`${artistLinks?.deezer}`}
                      >
                        {artistLinks?.deezer}
                      </Link>
                    </td>
                    <td className="border p-2 text-center">Edit</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default page;
