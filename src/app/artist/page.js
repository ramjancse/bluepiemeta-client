import Footer from "@/components/artist/Footer";
import Header from "@/components/artist/Header";
import Main from "@/components/artist/Main";
import React from "react";
import { FaTwitter } from "react-icons/fa6";

const page = () => {
  return (
    <div className="font-ralewayRegular">
      <Header />
      <Main />

      <Footer />
    </div>
  );
};

export default page;
