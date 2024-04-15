import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import AlbumForm from "@/components/albums/AlbumForm";
import AlbumMain from "@/components/albums/AlbumMain";
import Header from "@/components/dashboard/Header";
import Layout from "@/components/dashboard/Layout";
import { getAlbumById } from "@/lib/albums";
import { getServerSession } from "next-auth";
import React from "react";

const page = async ({ params: { albumId } }) => {
  const session = await getServerSession(authOptions);
  const albumData = await getAlbumById({ token: session?.jwt, albumId });

  return (
    <Layout>
      <AlbumMain albumData={albumData} />
    </Layout>
  );
};

export default page;
