import Intro from "@/components/home/Intro";
import Songs from "@/components/home/Songs";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";

const page = async () => {
  const session = await getServerSession(authOptions);
  // console.log(session, "session");

  return (
    <>
      <Header />

      <main className="flex">
        <div className="h-full w-1/6 hidden lg:block">
          <Sidebar />
        </div>

        <div className="w-full lg:border-l-[1px] lg:border-divideColor">
          <Intro />

          <Songs />

          <Footer />
        </div>
      </main>
    </>
  );
};

export default page;
