import Header from "@/components/dashboard/Header";
import Layout from "@/components/dashboard/Layout";
import { getAllArtists } from "@/lib/artist";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import Button from "@/components/artist/Button";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Search from "@/components/artist/Search";

const page = async () => {
  const session = await getServerSession(authOptions);
  const { data: artists = [] } = await getAllArtists(session?.jwt);

  return (
    <Layout>
      <Header name="All Artists" />
      <main className="px-4 py-3">
        <Search />

        <div className="overflow-x-auto mt-5">
          <table className="w-full border-collapse">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="border p-2 text-left">Image</th>
                <th className="border p-2 text-left">Name</th>
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
                    name,
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
                          {name}
                        </Link>
                      </td>

                      <td className="border p-2">{artistType}</td>

                      <td className="border p-2">{sex}</td>

                      <td className="border p-2">{region}</td>

                      <td className="border p-2">
                        <Link
                          className="bg-yellow-300 px-3 py-[7px] rounded text-white"
                          href={`/artists/${_id}/edit`}
                        >
                          Edit
                        </Link>

                        <Button artistId={_id} />
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
