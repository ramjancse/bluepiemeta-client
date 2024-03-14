"use client";

import Layout from "@/components/dashboard/Layout";
import Image from "next/image";
import mainBanner from "@/assets/images/main_banner.jpg";
import Menu from "@/components/shared/Menu";
import { FaBars, FaPaperclip } from "react-icons/fa6";
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
import { IoDownloadSharp } from "react-icons/io5";
import { SlOptionsVertical } from "react-icons/sl";
import albumImage from "@/assets/images/poster/poster-13.jpg";
import musicIcon from "@/assets/images/play_music.png";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "transparent" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}

const page = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 9,
    slidesToScroll: 1,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
  };

  const slides = [
    { id: 1, name: "Slide 1", image: albumImage1, link: "/albums/1" },
    { id: 2, name: "Slide 2", image: albumImage2, link: "/albums/2" },
    { id: 3, name: "Slide 3", image: albumImage3, link: "/albums/3" },
    { id: 4, name: "Slide 4", image: albumImage4, link: "/albums/4" },
    { id: 5, name: "Slide 5", image: albumImage5, link: "/albums/5" },
    { id: 6, name: "Slide 6", image: albumImage6, link: "/albums/6" },
    { id: 7, name: "Slide 7", image: albumImage7, link: "/albums/7" },
    { id: 8, name: "Slide 8", image: albumImage8, link: "/albums/8" },
    { id: 9, name: "Slide 9", image: albumImage9, link: "/albums/9" },
  ];

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

        <div className="slider-container py-10">
          <Slider {...settings}>
            {slides.map((slide) => (
              <div className="single" key={slide.id}>
                <Link href="/">
                  <Image
                    src={slide.image}
                    alt="Album image"
                    className="w-[100px] h-[100px] rounded-full"
                  />
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="bottom bg-[#F5F6FA] flex justify-between">
        <div className="recent-list w-1/3 pr-5 py-3">
          <h3 className="font-medium text-xl mb-2">Recently Added</h3>

          <div className="tracks">
            <div className="track flex border-b-2 py-1">
              <div className="image mr-2">
                <Image
                  className="w-[60px]"
                  src={albumImage2}
                  alt="Track Image"
                />
              </div>

              <div className="info w-full flex justify-between">
                <div className="text">
                  <h5 className="text-sm">The Four Corners Of Hell</h5>
                  <h6 className="text-xs">Eleanor MacEoy</h6>
                </div>

                <div className="link flex justify-between space-x-2">
                  <FaPaperclip className="text-xl text-blue-600" />
                  <IoDownloadSharp className="text-xl text-blue-600" />
                  <SlOptionsVertical className="text-xl text-blue-600" />
                </div>
              </div>
            </div>

            <div className="track flex border-b-2 mt-3 py-1">
              <div className="image mr-2">
                <Image
                  className="w-[60px]"
                  src={albumImage2}
                  alt="Track Image"
                />
              </div>

              <div className="info w-full flex justify-between">
                <div className="text">
                  <h5 className="text-sm">The Four Corners Of Hell</h5>
                  <h6 className="text-xs">Eleanor MacEoy</h6>
                </div>

                <div className="link flex justify-between space-x-2">
                  <FaPaperclip className="text-xl text-blue-600" />
                  <IoDownloadSharp className="text-xl text-blue-600" />
                  <SlOptionsVertical className="text-xl text-blue-600" />
                </div>
              </div>
            </div>

            <div className="track flex border-b-2 mt-3 py-1">
              <div className="image mr-2">
                <Image
                  className="w-[60px]"
                  src={albumImage2}
                  alt="Track Image"
                />
              </div>

              <div className="info w-full flex justify-between">
                <div className="text">
                  <h5 className="text-sm">The Four Corners Of Hell</h5>
                  <h6 className="text-xs">Eleanor MacEoy</h6>
                </div>

                <div className="link flex justify-between space-x-2">
                  <FaPaperclip className="text-xl text-blue-600" />
                  <IoDownloadSharp className="text-xl text-blue-600" />
                  <SlOptionsVertical className="text-xl text-blue-600" />
                </div>
              </div>
            </div>

            <div className="track flex border-b-2 mt-3 py-1">
              <div className="image mr-2">
                <Image
                  className="w-[60px]"
                  src={albumImage2}
                  alt="Track Image"
                />
              </div>

              <div className="info w-full flex justify-between">
                <div className="text">
                  <h5 className="text-sm">The Four Corners Of Hell</h5>
                  <h6 className="text-xs">Eleanor MacEoy</h6>
                </div>

                <div className="link flex justify-between space-x-2">
                  <FaPaperclip className="text-xl text-blue-600" />
                  <IoDownloadSharp className="text-xl text-blue-600" />
                  <SlOptionsVertical className="text-xl text-blue-600" />
                </div>
              </div>
            </div>

            <div className="track flex border-b-2 mt-3 py-1">
              <div className="image mr-2">
                <Image
                  className="w-[60px]"
                  src={albumImage2}
                  alt="Track Image"
                />
              </div>

              <div className="info w-full flex justify-between">
                <div className="text">
                  <h5 className="text-sm">The Four Corners Of Hell</h5>
                  <h6 className="text-xs">Eleanor MacEoy</h6>
                </div>

                <div className="link flex justify-between space-x-2">
                  <FaPaperclip className="text-xl text-blue-600" />
                  <IoDownloadSharp className="text-xl text-blue-600" />
                  <SlOptionsVertical className="text-xl text-blue-600" />
                </div>
              </div>
            </div>

            <div className="track flex border-b-2 mt-3 py-1">
              <div className="image mr-2">
                <Image
                  className="w-[60px]"
                  src={albumImage2}
                  alt="Track Image"
                />
              </div>

              <div className="info w-full flex justify-between">
                <div className="text">
                  <h5 className="text-sm">The Four Corners Of Hell</h5>
                  <h6 className="text-xs">Eleanor MacEoy</h6>
                </div>

                <div className="link flex justify-between space-x-2">
                  <FaPaperclip className="text-xl text-blue-600" />
                  <IoDownloadSharp className="text-xl text-blue-600" />
                  <SlOptionsVertical className="text-xl text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="button mt-5 text-right">
            <button
              type="button"
              className="px-5 py-2 bg-black text-white rounded-full"
            >
              View All
            </button>
          </div>
        </div>

        <div className="track-list w-2/3 border-l-2 px-5 py-3">
          <h3 className="font-medium text-xl mb-2">Track List</h3>

          <div className="songs">
            <div className="song bg-white p-3 flex">
              <div className="cover mr-2 xs:mr-3 w-[50px]">
                <Image
                  src={albumImage}
                  className="w-full"
                  alt="Album"
                  width={50}
                  height={50}
                />
              </div>

              <div className="right w-[calc(100%-50px)] flex items-center justify-between">
                <div className="name">
                  <h6 className="text-sm font-medium">
                    <a href="/" className="hover:text-fill">
                      Can I Have Forever with You
                    </a>
                  </h6>

                  <p className="text-[11px] hidden sm:flex sm:justify-between italic">
                    Folk, Indie, Song-Songwriter
                  </p>

                  <p className="text-[11px] text-[#686868] block">
                    Graham Cotton
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

            <div className="song bg-white p-3 mt-2 flex">
              <div className="cover mr-2 xs:mr-3 w-[50px]">
                <Image
                  src={albumImage}
                  className="w-full"
                  alt="Album"
                  width={50}
                  height={50}
                />
              </div>

              <div className="right w-[calc(100%-50px)] flex items-center justify-between">
                <div className="name">
                  <h6 className="text-sm font-medium">
                    <a href="/" className="hover:text-fill">
                      Can I Have Forever with You
                    </a>
                  </h6>

                  <p className="text-[11px] hidden sm:flex sm:justify-between italic">
                    Folk, Indie, Song-Songwriter
                  </p>

                  <p className="text-[11px] text-[#686868] block">
                    Graham Cotton
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

            <div className="song bg-white p-3 mt-2 flex">
              <div className="cover mr-2 xs:mr-3 w-[50px]">
                <Image
                  src={albumImage}
                  className="w-full"
                  alt="Album"
                  width={50}
                  height={50}
                />
              </div>

              <div className="right w-[calc(100%-50px)] flex items-center justify-between">
                <div className="name">
                  <h6 className="text-sm font-medium">
                    <a href="/" className="hover:text-fill">
                      Can I Have Forever with You
                    </a>
                  </h6>

                  <p className="text-[11px] hidden sm:flex sm:justify-between italic">
                    Folk, Indie, Song-Songwriter
                  </p>

                  <p className="text-[11px] text-[#686868] block">
                    Graham Cotton
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

            <div className="song bg-white p-3 mt-2 flex">
              <div className="cover mr-2 xs:mr-3 w-[50px]">
                <Image
                  src={albumImage}
                  className="w-full"
                  alt="Album"
                  width={50}
                  height={50}
                />
              </div>

              <div className="right w-[calc(100%-50px)] flex items-center justify-between">
                <div className="name">
                  <h6 className="text-sm font-medium">
                    <a href="/" className="hover:text-fill">
                      Can I Have Forever with You
                    </a>
                  </h6>

                  <p className="text-[11px] hidden sm:flex sm:justify-between italic">
                    Folk, Indie, Song-Songwriter
                  </p>

                  <p className="text-[11px] text-[#686868] block">
                    Graham Cotton
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

            <div className="song bg-white p-3 mt-2 flex">
              <div className="cover mr-2 xs:mr-3 w-[50px]">
                <Image
                  src={albumImage}
                  className="w-full"
                  alt="Album"
                  width={50}
                  height={50}
                />
              </div>

              <div className="right w-[calc(100%-50px)] flex items-center justify-between">
                <div className="name">
                  <h6 className="text-sm font-medium">
                    <a href="/" className="hover:text-fill">
                      Can I Have Forever with You
                    </a>
                  </h6>

                  <p className="text-[11px] hidden sm:flex sm:justify-between italic">
                    Folk, Indie, Song-Songwriter
                  </p>

                  <p className="text-[11px] text-[#686868] block">
                    Graham Cotton
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

          <div className="button mt-5 text-right">
            <button
              type="button"
              className="px-5 py-2 bg-black text-white rounded-full"
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

export default page;
