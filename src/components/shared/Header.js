"use client";

import Image from "next/image";
import Link from "next/link";
import { FaBars } from "react-icons/fa6";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useState } from "react";
import Menu from "./Menu";
import logo from "@/assets/images/logo.png";
import mainBanner from "@/assets/images/main_banner.jpg";
import LogOut from "../artist/LogOut";

const Header = () => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };
  return (
    <>
      <header className="font-ralewayMedium">
        <div className="top flex  border-b-[1px] border-divideColor">
          <div className="flex w-1/4 sm:w-1/6 flex-col justify-center">
            <a href="/" className="flex flex-col items-center hover:text-fill">
              <Image
                className="-mb-2 w-20"
                src={logo}
                alt="Logo Image"
                width={200}
                height={100}
              />
              <span className="font-ralewayMedium text-[10px]">
                Blue Pie Meta
              </span>
            </a>
          </div>

          <div className="w-full flex h-[87px] items-center justify-between lg:border-l-[1px] lg:border-divideColor">
            <nav>
              <ul className="flex items-center text-lg">
                <li className="text-center">
                  <a
                    href="/artists"
                    className="px-3 py-2 lg:px-4 rounded hover:bg-gray-200 duration-500 hover:text-fill"
                  >
                    Artists
                  </a>
                </li>

                <li className="text-center">
                  <a
                    href="/albums"
                    className="px-3 py-2 lg:px-4 rounded hover:bg-gray-200 duration-500 hover:text-fill"
                  >
                    Albums
                  </a>
                </li>
              </ul>
            </nav>

            {/* this section show only less than 1024 mobile screen */}
            <div className="dashboard mr-2 lg:hidden">
              <a href="/">
                <Image
                  src={mainBanner}
                  className="w-8 rounded-full"
                  alt="Profile Image"
                  width={36}
                  height={36}
                />
              </a>
            </div>

            {/* this section show only large than 1024 screen */}
            <nav className="hidden lg:block">
              <ul className="flex items-center justify-end">
                <li>
                  <span className="relative">
                    <span className="absolute left-2 top-[3px]">
                      <FaMagnifyingGlass className="z-20 text-primary" />
                    </span>

                    <input
                      className="z-10 rounded-full bg-gray-200 px-7 py-1 focus:outline-none focus:ring-2 ring-fill ring-offset-2"
                      type="text"
                      name="search"
                      id="search"
                      placeholder="Search Song"
                      autoComplete="off"
                    />
                  </span>
                </li>

                <li className="mx-2">
                  <a href="/">
                    <Image
                      src={mainBanner}
                      className="w-7 rounded-full"
                      alt="Profile Image"
                      width={28}
                      height={28}
                    />
                  </a>
                </li>

                <li className="mr-4">
                  <Menu side="left" align="start">
                    <button className="outline-none">
                      <FaBars className="text-2xl text-primary" />
                    </button>
                  </Menu>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* this section show only less than 1024 mobile screen */}
        <div className="bottom border-b-[1px] border-divideColor flex items-center px-2 py-2 lg:hidden">
          <div className="w-[20px]">
            <Menu side="right" align="start">
              <button className="outline-none">
                <FaBars className="text-2xl text-primary" />
              </button>
            </Menu>
          </div>

          <div className="search text-center w-full pl-1 pr-[20px]">
            <span className="relative">
              <span className="absolute left-2 top-[3px]">
                <FaMagnifyingGlass className="z-20 text-primary" />
              </span>

              <input
                className="z-10 rounded-full bg-gray-200 px-7 py-1 focus:outline-none w-[70%] focus:ring-2 ring-fill ring-offset-2"
                type="text"
                name="search"
                id="search"
                placeholder="Search Song"
              />
            </span>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
