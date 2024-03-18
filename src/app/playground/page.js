"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import albumImage1 from "@/assets/images/dashboard/dashboard-asset-images/albums-cover/album-cover-01.jpg";
import albumImage2 from "@/assets/images/dashboard/dashboard-asset-images/albums-cover/album-cover-02.jpg";
import albumImage3 from "@/assets/images/dashboard/dashboard-asset-images/albums-cover/album-cover-03.jpg";
import albumImage4 from "@/assets/images/dashboard/dashboard-asset-images/albums-cover/album-cover-04.jpg";
import albumImage5 from "@/assets/images/dashboard/dashboard-asset-images/albums-cover/album-cover-05.jpg";
import albumImage6 from "@/assets/images/dashboard/dashboard-asset-images/albums-cover/album-cover-06.jpg";
import albumImage7 from "@/assets/images/dashboard/dashboard-asset-images/albums-cover/album-cover-07.jpg";
import albumImage8 from "@/assets/images/dashboard/dashboard-asset-images/albums-cover/album-cover-08.jpg";
import albumImage9 from "@/assets/images/dashboard/dashboard-asset-images/albums-cover/album-cover-09.jpg";
import "./play.css";

const PlayGround = () => {
  const nextRef = useRef(null);
  const prevRef = useRef(null);

  const [slides, setSlides] = useState([
    {
      id: 1,
      name: "Slide 1",
      image: albumImage1,
      link: "/albums/1",
      status: true,
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
      link: "/albums/1",
      status: false,
    },
    {
      id: 11,
      name: "Slide 11",
      image: albumImage1,
      link: "/albums/1",
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
    <div>
      <div className="albums px-10 py-3 overflow-hidden bg-[#36045D]">
        <h4 className="text-white tracking-wider text-xl">Albums</h4>

        <div className="py-10 flex items-center">
          <div
            ref={prevRef}
            className="next text-white w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center cursor-pointer select-none"
            onClick={handlePrevClick}
          >
            P
          </div>
          {slides.slice(startIndex, startIndex + 9).map((slide, index) => (
            <div className="single" key={slide.id}>
              <span className="relative">
                <Image
                  src={slide.image}
                  alt="Album image"
                  width={calculateImageSize(index).width}
                  height={calculateImageSize(index).height}
                  className="rounded-full"
                />
                <span className="absolute left-1/2 top-1/2 text-cyan-400">
                  {slide.name}
                </span>
              </span>
            </div>
          ))}

          <div
            ref={nextRef}
            className="next text-white w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center cursor-pointer select-none"
            onClick={handleNextClick}
          >
            N
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayGround;
