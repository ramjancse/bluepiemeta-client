import Footer from "@/components/artist/Footer";
import Header from "@/components/dashboard/Header";
import Layout from "@/components/dashboard/Layout";
import { getAllArtists } from "@/lib/artist";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

const page = async () => {
  const session = await getServerSession(authOptions);
  const { data: artists = [] } = await getAllArtists(session?.jwt);

  return (
    <Layout>
      <Header name="All Artists" />
      <main className="px-4 py-3">
        <div className="top flex items-center justify-between">
          <h2 className="text-xl mb-3">Artists table</h2>

          <Link href="/artists/add" className="px-10 py-2 rounded bg-gray-200">
            Add artist
          </Link>
        </div>

        <div className="overflow-x-auto mt-5">
          <table className="w-full border-collapse">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="border p-2 text-left">Image</th>
                <th className="border p-2 text-left">Full name</th>
                <th className="border p-2 text-left">Type</th>
                <th className="border p-2 text-left">Gender</th>
                <th className="border p-2 text-left">Region</th>
                <th className="border p-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {artists.length ? (
                artists.map((artist) => {
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
                          <Image
                            src={
                              artistImage ||
                              "https://avatars.githubusercontent.com/u/110802852?v=4"
                            }
                            alt="Image"
                            className="w-[40px] h-[40px]"
                            width={40}
                            height={40}
                          />
                        </Link>
                      </td>

                      <td className="border p-2">
                        <Link
                          className="block text-blue-600"
                          href={`/artists/${_id}`}
                        >
                          {artistName}
                        </Link>
                      </td>

                      <td className="border p-2">{artistType}</td>

                      <td className="border p-2">{sex}</td>

                      <td className="border p-2">{region}</td>

                      <td className="border p-2">
                        <Link
                          className="block text-blue-600"
                          href={`/artists/${_id}`}
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
                  <td className="border p-2 text-center">Artists not found</td>
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
