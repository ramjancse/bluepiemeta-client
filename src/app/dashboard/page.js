"use client";

import Layout from "@/components/dashboard/Layout";
import Image from "next/image";
import mainBanner from "@/assets/images/main_banner.jpg";
import Menu from "@/components/shared/Menu";
import {
  FaAngleLeft,
  FaAngleRight,
  FaBars,
  FaPaperclip,
} from "react-icons/fa6";
import dashboardImage from "@/assets/images/dashboard/dashboard-asset-images/dashboard-cover/dashboard-cover-01.jpg";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Link from "next/link";
import albumImage1 from "@/assets/images/dashboard/dashboard-asset-images/albums-cover/album-cover-01.jpg";
import albumImage2 from "@/assets/images/dashboard/dashboard-asset-images/albums-cover/album-cover-02.jpg";
import albumImage3 from "@/assets/images/dashboard/dashboard-asset-images/albums-cover/album-cover-03.jpg";
import albumImage4 from "@/assets/images/dashboard/dashboard-asset-images/albums-cover/album-cover-04.jpg";
import albumImage5 from "@/assets/images/dashboard/dashboard-asset-images/albums-cover/album-cover-05.jpg";
import albumImage6 from "@/assets/images/dashboard/dashboard-asset-images/albums-cover/album-cover-06.jpg";
import albumImage7 from "@/assets/images/dashboard/dashboard-asset-images/albums-cover/album-cover-07.jpg";
import albumImage8 from "@/assets/images/dashboard/dashboard-asset-images/albums-cover/album-cover-08.jpg";
import albumImage9 from "@/assets/images/dashboard/dashboard-asset-images/albums-cover/album-cover-09.jpg";
import { MdDownloadForOffline } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import albumImage from "@/assets/images/poster/poster-13.jpg";
import musicIcon from "@/assets/images/play_music.png";
import ChainIcon from "@/assets/images/dashboard/Chain-icon.svg";
import { useRef, useState } from "react";

const Dashboard = () => {
  const [slides, setSlides] = useState([
    {
      id: 1,
      name: "Slide 1",
      image: albumImage1,
      link: "/albums/1",
      text: "Dear Ladies and Gentleman, We are floating in space",
    },
    {
      id: 2,
      name: "Slide 2",
      image: albumImage2,
      link: "/albums/2",
      status: true,
    },
    {
      id: 3,
      name: "Slide 3",
      image: albumImage3,
      link: "/albums/3",
      status: true,
    },
    {
      id: 4,
      name: "Slide 4",
      image: albumImage4,
      link: "/albums/4",
      status: true,
    },
    {
      id: 5,
      name: "Slide 5",
      image: albumImage5,
      link: "/albums/5",
      status: true,
    },
    {
      id: 6,
      name: "Slide 6",
      image: albumImage6,
      link: "/albums/6",
      status: true,
    },
    {
      id: 7,
      name: "Slide 7",
      image: albumImage7,
      link: "/albums/7",
      status: true,
    },
    {
      id: 8,
      name: "Slide 8",
      image: albumImage8,
      link: "/albums/8",
      status: true,
    },
    {
      id: 9,
      name: "Slide 9",
      image: albumImage9,
      link: "/albums/9",
      status: true,
    },
    {
      id: 10,
      name: "Slide 10",
      image: albumImage1,
      link: "/albums/10",
      status: false,
    },
    {
      id: 11,
      name: "Slide 11",
      image: albumImage1,
      link: "/albums/11",
      status: false,
    },
  ]);

  const calculateImageSize = (index) => {
    switch (index) {
      case 0:
      case 8:
        return { width: 100, height: 100 };
      case 1:
      case 7:
        return { width: 120, height: 120 };
      case 2:
      case 6:
        return { width: 140, height: 140 };
      case 3:
      case 5:
        return { width: 160, height: 160 };
      case 4:
        return { width: 200, height: 200 };
      default:
        return { width: 100, height: 100 }; // Default size
    }
  };

  const handlePrevClick = () => {
    const newSlides = [...slides];
    const lastSlide = newSlides.pop(); // Remove the last slide
    newSlides.unshift(lastSlide); // Add the removed last slide to the beginning
    setSlides(newSlides);
  };

  const handleNextClick = () => {
    const newSlides = [...slides];
    const firstSlide = newSlides.shift(); // Remove the first slide
    newSlides.push(firstSlide); // Add the removed first slide to the end
    setSlides(newSlides);
  };

  const startIndex = 0;

  return (
    <Layout>
      <div className="top h-[350px] relative overflow-hidden">
        <div className="header">
          <nav className="menu px-4 py-5">
            <ul className="flex items-center justify-end">
              <li className="mx-2">
                <a href="/">
                  <Image
                    src={mainBanner}
                    className="w-7 h-7 rounded-full"
                    alt="Profile Image"
                  />
                </a>
              </li>

              <li className="">
                <Menu side="left" align="start">
                  <button className="outline-none">
                    <FaBars className="text-2xl text-primary" />
                  </button>
                </Menu>
              </li>
            </ul>
          </nav>
        </div>

        <div className="content pl-7">
          <h4 className="text-white tracking-wider text-2xl">
            Where words fail
          </h4>
          <h1 className="text-white text-5xl font-bold">
            Music sp
            <span className="underline underline-offset-8 decoration-1 text-white">
              eaks
            </span>
          </h1>
        </div>

        {/* background image  */}
        <Image
          src={dashboardImage}
          className="absolute left-0 -top-11 -z-10 object-fill"
          alt="Dashboard Image"
          placeholder="blur"
        />
      </div>

      <div className="albums px-10 py-3 overflow-hidden bg-[#36045D]">
        <h4 className="text-white tracking-wider text-xl">Albums</h4>

        <div className="py-10 flex items-center">
          <div
            className="prev text-white rounded-full ring-1 ring-offset-1 flex items-center justify-center cursor-pointer select-none mr-3 w-11 h-8"
            onClick={handlePrevClick}
          >
            <FaAngleLeft className="text-lg" />
          </div>

          {slides.slice(startIndex, startIndex + 9).map((slide, index) => (
            <div className="single duration-500" key={slide.id}>
              <Link href={slide.link} className="">
                <Image
                  src={slide.image}
                  alt="Album image"
                  width={calculateImageSize(index).width}
                  height={calculateImageSize(index).height}
                  className="rounded-full"
                />
              </Link>

              {/* <div className="text text-white">{slide?.text}</div> */}
            </div>
          ))}

          <div
            className="next text-white rounded-full ring-1 ring-offset-1 flex items-center justify-center cursor-pointer select-none ml-3 w-11 h-8"
            onClick={handleNextClick}
          >
            <FaAngleRight className="text-xl" />
          </div>
        </div>
      </div>

      <div className="bottom bg-[#F5F6FA] flex justify-between">
        <div className="recent-list w-1/3 px-5 py-3 border-2 overflow-hidden">
          <div className="tracks h-[calc(100%-80px)]">
            <h3 className="font-medium text-xl mb-2">Recently Added</h3>

            <div className="track flex border-b-2 py-2">
              <div className="image mr-2">
                <Image
                  className="w-[60px]"
                  src={albumImage2}
                  alt="Track Image"
                />
              </div>

              <div className="info w-full flex justify-between">
                <div className="text">
                  <h5 className="text-sm">
                    <Link href="/" className="hover:text-fill">
                      The Four Corners Of Hell
                    </Link>
                  </h5>
                  <h6 className="text-xs">Eleanor MacEoy</h6>
                </div>

                <div className="link flex justify-between space-x-2">
                  <Image
                    src={ChainIcon}
                    alt="Chain Icon"
                    className="text-[#0070D6] w-[15px] h-[20px]"
                  />

                  <MdDownloadForOffline className="text-xl text-[#0070D6]" />
                  <SlOptionsVertical className="text-xl text-[#0070D6]" />
                </div>
              </div>
            </div>

            <div className="track flex border-b-2 mt-4 py-2">
              <div className="image mr-2">
                <Image
                  className="w-[60px]"
                  src={albumImage2}
                  alt="Track Image"
                />
              </div>

              <div className="info w-full flex justify-between">
                <div className="text">
                  <h5 className="text-sm">
                    <Link href="/" className="hover:text-fill">
                      The Four Corners Of Hell
                    </Link>
                  </h5>
                  <h6 className="text-xs">Eleanor MacEoy</h6>
                </div>

                <div className="link flex justify-between space-x-2">
                  <Image
                    src={ChainIcon}
                    alt="Chain Icon"
                    className="text-[#0070D6] w-[15px] h-[20px]"
                  />
                  <MdDownloadForOffline className="text-xl text-[#0070D6]" />
                  <SlOptionsVertical className="text-xl text-[#0070D6]" />
                </div>
              </div>
            </div>

            <div className="track flex border-b-2 mt-4 py-2">
              <div className="image mr-2">
                <Image
                  className="w-[60px]"
                  src={albumImage2}
                  alt="Track Image"
                />
              </div>

              <div className="info w-full flex justify-between">
                <div className="text">
                  <h5 className="text-sm">
                    <Link href="/" className="hover:text-fill">
                      The Four Corners Of Hell
                    </Link>
                  </h5>
                  <h6 className="text-xs">Eleanor MacEoy</h6>
                </div>

                <div className="link flex justify-between space-x-2">
                  <Image
                    src={ChainIcon}
                    alt="Chain Icon"
                    className="text-[#0070D6] w-[15px] h-[20px]"
                  />
                  <MdDownloadForOffline className="text-xl text-[#0070D6]" />
                  <SlOptionsVertical className="text-xl text-[#0070D6]" />
                </div>
              </div>
            </div>
          </div>

          <div className="button h-[80px] flex justify-end items-center">
            <button
              type="button"
              className="px-5 py-1 bg-[#424242] text-white rounded-full"
            >
              View All
            </button>
          </div>
        </div>

        <div className="track-list w-2/3 px-5 py-3">
          <h3 className="font-medium text-xl mb-2">Track List</h3>

          <div className="songs">
            <div className="song bg-white flex">
              <div className="cover w-[50px]">
                <Image
                  src={albumImage}
                  className="w-full"
                  alt="Album"
                  width={50}
                  height={50}
                />
              </div>

              <div className="right w-[calc(100%-50px)] flex items-center justify-between px-3">
                <div className="name">
                  <h6 className="text-sm font-medium">
                    <a href="/" className="hover:text-fill">
                      Can I Have Forever with You{" "}
                    </a>

                    <a className="text-xs italic hover:text-fill" href="/">
                      - Graham Cotton
                    </a>
                  </h6>

                  <p className="text-[11px] hidden sm:flex sm:justify-between ">
                    Folk, Indie, Song-Songwriter
                  </p>
                </div>

                <div className="count h-4 w-4 items-center justify-center rounded border border-slate-400 text-center text-[10px] font-bold hidden lg:block mx-5">
                  +1
                </div>

                <div className="action flex">
                  <button className="mr-3 rounded-full bg-[#205CA8] px-6 py-1 text-xs font-medium uppercase text-white">
                    <a href="/">Edit</a>
                  </button>

                  <button className="rounded-full bg-[#205CA8] px-6 py-1 text-xs font-medium uppercase text-white">
                    <a href="/">License</a>
                  </button>
                </div>
              </div>
            </div>

            <div className="song bg-white flex mt-2">
              <div className="cover w-[50px]">
                <Image
                  src={albumImage}
                  className="w-full"
                  alt="Album"
                  width={50}
                  height={50}
                />
              </div>

              <div className="right w-[calc(100%-50px)] flex items-center justify-between px-3">
                <div className="name">
                  <h6 className="text-sm font-medium">
                    <a href="/" className="hover:text-fill">
                      Can I Have Forever with You{" "}
                    </a>

                    <a className="text-xs italic hover:text-fill" href="/">
                      - Graham Cotton
                    </a>
                  </h6>

                  <p className="text-[11px] hidden sm:flex sm:justify-between ">
                    Folk, Indie, Song-Songwriter
                  </p>
                </div>

                <div className="count h-4 w-4 items-center justify-center rounded border border-slate-400 text-center text-[10px] font-bold hidden lg:block mx-5">
                  +1
                </div>

                <div className="action flex">
                  <button className="mr-3 rounded-full bg-[#205CA8] px-6 py-1 text-xs font-medium uppercase text-white">
                    <a href="/">Edit</a>
                  </button>

                  <button className="rounded-full bg-[#205CA8] px-6 py-1 text-xs font-medium uppercase text-white">
                    <a href="/">License</a>
                  </button>
                </div>
              </div>
            </div>

            <div className="song bg-white flex mt-2">
              <div className="cover w-[50px]">
                <Image
                  src={albumImage}
                  className="w-full"
                  alt="Album"
                  width={50}
                  height={50}
                />
              </div>

              <div className="right w-[calc(100%-50px)] flex items-center justify-between px-3">
                <div className="name">
                  <h6 className="text-sm font-medium">
                    <a href="/" className="hover:text-fill">
                      Can I Have Forever with You{" "}
                    </a>

                    <a className="text-xs italic hover:text-fill" href="/">
                      - Graham Cotton
                    </a>
                  </h6>

                  <p className="text-[11px] hidden sm:flex sm:justify-between ">
                    Folk, Indie, Song-Songwriter
                  </p>
                </div>

                <div className="count h-4 w-4 items-center justify-center rounded border border-slate-400 text-center text-[10px] font-bold hidden lg:block mx-5">
                  +1
                </div>

                <div className="action flex">
                  <button className="mr-3 rounded-full bg-[#205CA8] px-6 py-1 text-xs font-medium uppercase text-white">
                    <a href="/">Edit</a>
                  </button>

                  <button className="rounded-full bg-[#205CA8] px-6 py-1 text-xs font-medium uppercase text-white">
                    <a href="/">License</a>
                  </button>
                </div>
              </div>
            </div>

            <div className="song bg-white flex mt-2">
              <div className="cover w-[50px]">
                <Image
                  src={albumImage}
                  className="w-full"
                  alt="Album"
                  width={50}
                  height={50}
                />
              </div>

              <div className="right w-[calc(100%-50px)] flex items-center justify-between px-3">
                <div className="name">
                  <h6 className="text-sm font-medium">
                    <a href="/" className="hover:text-fill">
                      Can I Have Forever with You{" "}
                    </a>

                    <a className="text-xs italic hover:text-fill" href="/">
                      - Graham Cotton
                    </a>
                  </h6>

                  <p className="text-[11px] hidden sm:flex sm:justify-between ">
                    Folk, Indie, Song-Songwriter
                  </p>
                </div>

                <div className="count h-4 w-4 items-center justify-center rounded border border-slate-400 text-center text-[10px] font-bold hidden lg:block mx-5">
                  +1
                </div>

                <div className="action flex">
                  <button className="mr-3 rounded-full bg-[#205CA8] px-6 py-1 text-xs font-medium uppercase text-white">
                    <a href="/">Edit</a>
                  </button>

                  <button className="rounded-full bg-[#205CA8] px-6 py-1 text-xs font-medium uppercase text-white">
                    <a href="/">License</a>
                  </button>
                </div>
              </div>
            </div>

            <div className="song bg-white flex mt-2">
              <div className="cover w-[50px]">
                <Image
                  src={albumImage}
                  className="w-full"
                  alt="Album"
                  width={50}
                  height={50}
                />
              </div>

              <div className="right w-[calc(100%-50px)] flex items-center justify-between px-3">
                <div className="name">
                  <h6 className="text-sm font-medium">
                    <a href="/" className="hover:text-fill">
                      Can I Have Forever with You{" "}
                    </a>

                    <a className="text-xs italic hover:text-fill" href="/">
                      - Graham Cotton
                    </a>
                  </h6>

                  <p className="text-[11px] hidden sm:flex sm:justify-between ">
                    Folk, Indie, Song-Songwriter
                  </p>
                </div>

                <div className="count h-4 w-4 items-center justify-center rounded border border-slate-400 text-center text-[10px] font-bold hidden lg:block mx-5">
                  +1
                </div>

                <div className="action flex">
                  <button className="mr-3 rounded-full bg-[#205CA8] px-6 py-1 text-xs font-medium uppercase text-white">
                    <a href="/">Edit</a>
                  </button>

                  <button className="rounded-full bg-[#205CA8] px-6 py-1 text-xs font-medium uppercase text-white">
                    <a href="/">License</a>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="button h-[80px] flex justify-end items-center">
            <button
              type="button"
              className="px-5 py-1 bg-[#424242] text-white rounded-full"
            >
              View All
            </button>
          </div>
        </div>
      </div>

      <footer className="h-[85px]"></footer>
    </Layout>
  );
};

export default Dashboard;
