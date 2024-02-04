import Image from "next/image";
import React from "react";

const Songs = () => {
  return (
    <div className="songs border-b-[1px] border-divideColor">
      <div className="album  bg-gray-200 p-3 overflow-hidden m-2">
        <div className="top flex items-center">
          <div className="cover w-[14%] text-center">
            <Image
              src="/images/poster/poster-13.jpg"
              className="w-[45px] h-[45px]"
              alt="Album"
              width={40}
              height={45}
            />
          </div>

          <div className="control w-[60%] mx-3">
            <Image
              src="/images/play_music.png"
              className="h-[45px] w-full"
              alt="Play Music"
              width={400}
              height={40}
            />
          </div>

          <div className="action w-[26%] overflow-hidden">
            <button className="rounded-full bg-[#205CA8] text-[10px] uppercase text-white px-6 py-[2px] tracking-widest">
              <a href="/">Edit</a>
            </button>

            <button className="rounded-full bg-[#205CA8] text-[10px] uppercase text-white px-4 py-[2px] tracking-widest">
              <a href="/">Delete</a>
            </button>
          </div>

          {/* <div className="action w-[20%]">
            <button className="mr-4 rounded-full bg-[#205CA8] px-6 py-1 text-xs font-medium uppercase text-white">
              <a href="/">Edit</a>
            </button>

            <button className="rounded-full bg-[#205CA8] px-6 py-1 text-xs font-medium uppercase text-white">
              <a href="/">License</a>
            </button>
          </div> */}
        </div>

        <div className="bottom mt-2">
          <div className="name flex items-center flex-wrap">
            <h6 className="text-xs font-semibold">
              <a href="/" className="hover:text-fill">
                Can I Have Forever with You -
              </a>
            </h6>

            <p className="text-xs text-[#686868] ml-1">
              {" "}
              <a href="/">Graham Cotton</a>
            </p>

            <div className="count flex h-4 w-4 items-center justify-center rounded border-[1px] border-slate-400 text-center text-[10px] font-bold ml-5">
              +1
            </div>
          </div>

          <div className="genre text-[11px] text-[#686868]">
            Folk, Indie, Song-Songwriter
          </div>
        </div>
      </div>

      <div className="album  bg-gray-200 p-3 overflow-hidden m-2">
        <div className="top flex items-center justify-between">
          <Image
            src="/images/poster/poster-13.jpg"
            className="min-w-[45px] min-h-[45px] xs:w-[55px] xs:h-[55px]"
            alt="Album"
            width={80}
            height={80}
          />

          <Image
            src="/images/play_music.png"
            className="h-[45px] min-w-[100px] mx-2 xs:mx-5"
            alt="Play Music"
            width={400}
            height={40}
          />

          <div className="action overflow-hidden">
            <button className="rounded-full bg-[#205CA8] text-[10px] uppercase text-white px-6 py-[2px] tracking-widest">
              <a href="/">Edit</a>
            </button>

            <button className="rounded-full bg-[#205CA8] text-[10px] uppercase text-white px-4 py-[2px] tracking-widest">
              <a href="/">Delete</a>
            </button>
          </div>
        </div>

        <div className="bottom mt-2">
          <div className="name flex items-center flex-wrap">
            <h6 className="text-xs font-semibold">
              <a href="/" className="hover:text-fill">
                Can I Have Forever with You -
              </a>
            </h6>

            <p className="text-xs text-[#686868] ml-1">
              {" "}
              <a href="/">Graham Cotton</a>
            </p>

            <div className="count flex h-4 w-4 items-center justify-center rounded border-[1px] border-slate-400 text-center text-[10px] font-bold ml-5">
              +1
            </div>
          </div>

          <div className="genre text-[11px] text-[#686868]">
            Folk, Indie, Song-Songwriter
          </div>
        </div>
      </div>

      <div class="album mx-14 my-8 flex items-center justify-between bg-gray-200 p-3">
        <div class="cover">
          <img
            src="/images/poster/poster-13.jpg"
            class="w-[80px]"
            alt="Album"
          />
        </div>

        <div class="name">
          <h6 class="text-sm">
            <a href="/" class="hover:text-fill">
              Can I Have Forever with You
            </a>
          </h6>
          <p class="text-xs text-[#686868]">Graham Cotton</p>
        </div>
        <div class="count flex h-5 w-5 items-center justify-center rounded border-2 border-slate-400 text-center text-xs font-bold">
          +1
        </div>
        <div class="genre text-xs text-[#686868]">
          Folk, Indie, Song-Songwriter
        </div>
        <div class="control w-[200px]">
          <img
            src="/images/play_music.png"
            class="h-max w-fit"
            alt="Play Music"
          />
        </div>
        <div class="action">
          <button class="mr-4 rounded-full bg-[#205CA8] px-6 py-1 text-xs font-medium uppercase text-white">
            <a href="/">Edit</a>
          </button>
          <button class="rounded-full bg-[#205CA8] px-6 py-1 text-xs font-medium uppercase text-white">
            <a href="/">License</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Songs;
