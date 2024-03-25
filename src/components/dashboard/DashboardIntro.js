"use client";

import Image from "next/image";
import { FaAngleLeft, FaAngleRight, FaBars } from "react-icons/fa6";
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
import albumImage10 from "@/assets/images/dashboard/dashboard-asset-images/albums-cover/album-cover-10.jpg";
import albumImage11 from "@/assets/images/dashboard/dashboard-asset-images/albums-cover/album-cover-11.jpg";

import mainBanner from "@/assets/images/main_banner.jpg";
import Menu from "@/components/shared/Menu";
import dashboardImage from "@/assets/images/dashboard/dashboard-asset-images/dashboard-cover/dashboard-cover-01.jpg";
import dashboardImage2 from "@/assets/images/dashboard/dashboard-asset-images/dashboard-cover/dashboard-cover-02.jpg";
import Slider from "react-slick";
import { useState } from "react";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const data = [
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
    image: albumImage10,
    link: "/albums/10",
    status: false,
  },
  {
    id: 11,
    name: "Slide 11",
    image: albumImage11,
    link: "/albums/11",
    status: false,
  },
];

const DashboardIntro = ({ albums }) => {
  const [slides, setSlides] = useState(albums);

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

  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
    arrows: false,
  };

  return (
    <>
      <div className="slider-container h-[230px]">
        <Slider {...settings}>
          <div className="top h-[230px] relative overflow-hidden">
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
              <h4 className="text-white tracking-wider text-xl">
                Where words fail
              </h4>
              <h1 className="text-white text-4xl font-bold">
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

          <div className="top h-[230px] relative overflow-hidden">
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
              <h4 className="text-white tracking-wider text-xl">
                Where words fail
              </h4>
              <h1 className="text-white text-4xl font-bold">
                Music sp
                <span className="underline underline-offset-8 decoration-1 text-white">
                  eaks
                </span>
              </h1>
            </div>

            {/* background image  */}
            <Image
              src={dashboardImage2}
              className="absolute left-0 -top-11 -z-10 object-fill"
              alt="Dashboard Image"
              placeholder="blur"
            />
          </div>
        </Slider>
      </div>

      <div className="albums px-10 py-2 overflow-hidden bg-[#36045D]">
        <h4 className="text-white tracking-wider">Albums</h4>

        <div className="py-3 flex items-center justify-center h-[220px]">
          <div
            className="prev text-white rounded-full ring-1 ring-offset-1 flex items-center justify-center cursor-pointer select-none mr-3 w-7 h-7 p-[10px]"
            onClick={handlePrevClick}
          >
            <FaAngleLeft className="text-sm w-8 h-8" />
          </div>

          {slides.slice(startIndex, startIndex + 9).map((album, index) => (
            <div className="single" key={album.id}>
              <Link href={`/albums/${album.id}`} className="">
                <Image
                  src={album.albumCover}
                  alt="Album image"
                  width={calculateImageSize(index).width}
                  height={calculateImageSize(index).height}
                  className="rounded-full duration-700"
                />
              </Link>

              {/* <div className="text text-white">{slide?.text}</div> */}
            </div>
          ))}

          <div
            className="next text-white rounded-full ring-1 ring-offset-1 flex items-center justify-center cursor-pointer select-none ml-3 w-7 h-7 p-[10px]"
            onClick={handleNextClick}
          >
            <FaAngleRight className="text-xl w-8 h-8" />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardIntro;
