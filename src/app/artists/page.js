import Footer from "@/components/artist/Footer";
import Header from "@/components/artist/Header";
import { getAllArtists } from "@/lib/artist";
import Link from "next/link";
import React from "react";

const page = async () => {
  const { data: artists } = await getAllArtists();

  return (
    <>
      <Header />
      <main className="px-20 py-10">
        <h2 className="text-xl">All Artists</h2>

        <table className="w-full mt-2 border-collapse">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="border p-2 text-left">Image</th>
              <th className="border p-2 text-left">Full name</th>
              <th className="border p-2 text-left">Type</th>
              <th className="border p-2 text-left">Gender</th>
              <th className="border p-2 text-left">Region</th>
            </tr>
          </thead>
          <tbody>
            {artists.map((artist) => {
              const {
                _id,
                artistName,
                artistImage,
                artistType,
                fullName,
                region,
                sex,
              } = artist;
              return (
                <tr className="even:bg-gray-100" key={_id}>
                  <td className="border p-2">
                    <Link className="block" href={`/artists/${_id}`}>
                      <img
                        src="https://avatars.githubusercontent.com/u/110802852?v=4"
                        alt="Image"
                        className="w-[40px] h-[40px]"
                      />
                    </Link>
                  </td>
                  <td className="border p-2">
                    <Link className="block" href={`/artists/${_id}`}>
                      {artistName}
                    </Link>
                  </td>
                  <td className="border p-2">
                    <Link className="block" href={`/artists/${_id}`}>
                      {artistType}
                    </Link>
                  </td>
                  <td className="border p-2">
                    <Link className="block" href={`/artists/${_id}`}>
                      {sex}
                    </Link>
                  </td>
                  <td className="border p-2">
                    <Link className="block" href={`/artists/${_id}`}>
                      {region}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
      <Footer />
    </>
  );
};

export default page;
