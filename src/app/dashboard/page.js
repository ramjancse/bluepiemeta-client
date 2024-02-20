import Intro from "@/components/home/Intro";
import Songs from "@/components/home/Songs";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import React from "react";

const page = () => {
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
