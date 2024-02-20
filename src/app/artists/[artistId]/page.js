import Footer from "@/components/artist/Footer";
import Header from "@/components/artist/Header";
import { getArtistById } from "@/lib/artist";
import React from "react";

const page = async ({ params: { artistId } }) => {
  const { artistLinks, socialMedia, artistType, artistName, sex, region } =
    await getArtistById(artistId);

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
            <div className="info">
              <h2 className="text-xl">Artist Information</h2>
              <table className="w-full mt-2 border-collapse">
                <thead className="bg-gray-700 text-white">
                  <tr>
                    <th className="border p-2 text-left">Artist name</th>
                    <th className="border p-2 text-left">Type</th>
                    <th className="border p-2 text-left">Gender</th>
                    <th className="border p-2 text-left">Region</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="even:bg-gray-100">
                    <td className="border p-2">{artistName}</td>
                    <td className="border p-2">{artistType}</td>
                    <td className="border p-2">{sex}</td>
                    <td className="border p-2">{region}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="link mt-10">
              <h2 className="text-xl">Artist Social Links</h2>
              <table className="w-full mt-2 border-collapse">
                <thead className="bg-gray-700 text-white">
                  <tr>
                    <th className="border p-2 text-left">Platform name</th>
                    <th className="border p-2 text-left">Link</th>
                    <th className="border p-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="even:bg-gray-100">
                    <td className="border p-2">QQ Music</td>
                    <td className="border p-2">Link</td>
                    <td className="border p-2">Edit/Delete</td>
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
