"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
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

import "./play.css";

const data = [
  {
    id: 1,
    name: "Slide 1",
    albumCover: albumImage1,
    link: "/albums/1",
    text: "Dear Ladies and Gentleman, We are floating in space",
  },
  {
    id: 2,
    name: "Slide 2",
    albumCover: albumImage2,
    link: "/albums/2",
    status: true,
  },
  {
    id: 3,
    name: "Slide 3",
    albumCover: albumImage3,
    link: "/albums/3",
    status: true,
  },
  {
    id: 4,
    name: "Slide 4",
    albumCover: albumImage4,
    link: "/albums/4",
    status: true,
  },
  {
    id: 5,
    name: "Slide 5",
    albumCover: albumImage5,
    link: "/albums/5",
    status: true,
  },
  {
    id: 6,
    name: "Slide 6",
    albumCover: albumImage6,
    link: "/albums/6",
    status: true,
  },
  {
    id: 7,
    name: "Slide 7",
    albumCover: albumImage7,
    link: "/albums/7",
    status: true,
  },
  {
    id: 8,
    name: "Slide 8",
    albumCover: albumImage8,
    link: "/albums/8",
    status: true,
  },
  {
    id: 9,
    name: "Slide 9",
    albumCover: albumImage9,
    link: "/albums/9",
    status: true,
  },
  {
    id: 10,
    name: "Slide 10",
    albumCover: albumImage10,
    link: "/albums/10",
    status: false,
  },
  {
    id: 11,
    name: "Slide 11",
    albumCover: albumImage11,
    link: "/albums/11",
    status: false,
  },
];

const PlayGround = () => {
  const [slides, setSlides] = useState(data);

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

  const startIndex = 0;

  const handlePrevClick = () => {
    const newSlides = [...slides];
    const lastSlide = newSlides.pop();
    newSlides.unshift(lastSlide);
    setSlides(newSlides);
  };

  const handleNextClick = () => {
    const newSlides = [...slides];
    const firstSlide = newSlides.shift();
    newSlides.push(firstSlide);
    setSlides(newSlides);
  };

  return (
    <div className="">
      <h1>Playground</h1>

      <div className="test">
        {[...Array(3)].map((p, index) => (
          <button
            key={index}
            type="button"
            className="px-5 rounded-full bg-blue-400 text-white"
          >
            1
          </button>
        ))}
      </div>

      <div className="albums px-10 py-2 overflow-hidden bg-[#36045D] mt-10">
        <h4 className="text-white tracking-wider">Albums</h4>

        <div className="py-3 flex items-center justify-center h-screen">
          <div
            className="prev text-white rounded-full ring-1 ring-offset-1 flex items-center justify-center cursor-pointer select-none mr-3 w-7 h-7 p-[10px]"
            onClick={handlePrevClick}
          >
            <FaAngleLeft className="text-sm w-8 h-8" />
          </div>

          {slides.slice(startIndex, startIndex + 9).map((album, index) => (
            <div className={`single`} key={album.id}>
              <Link href={`/albums/${album.id}`} className="">
                <Image
                  src={album.albumCover}
                  alt="Album image"
                  width={calculateImageSize(index).width}
                  height={calculateImageSize(index).height}
                  className="rounded-full duration-1000"
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
    </div>
  );
};

export default PlayGround;
