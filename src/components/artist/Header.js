import Image from "next/image";
import React from "react";
import { FaBars, FaMagnifyingGlass } from "react-icons/fa6";
import logoImage from "@/assets/images/logo.png";
import dashboardImage from "@/assets/images/main_banner.jpg";
import Menu from "../shared/Menu";
import Link from "next/link";
import LogOut from "./LogOut";

const Header = () => {
  return (
    <header className="sm:border-b">
      <div className="flex items-center overflow-hidden py-3">
        <div className="flex w-1/6 flex-col items-center">
          <Link href="/" className="flex flex-col items-center hover:text-fill">
            <Image
              className="w-20"
              src={logoImage}
              alt="Logo Image"
              width={80}
              height={80}
            />
          </Link>
        </div>

        <div className="flex w-5/6">
          <nav className="w-full">
            <ul className="font-ralewayMedium flex text-lg text-primary items-center">
              <li className="ml-3 text-center">
                <Link
                  href="/"
                  className="px-3 py-2 lg:px-4 rounded hover:bg-gray-200 duration-500 hover:text-fill"
                >
                  Dashboard
                </Link>
              </li>

              <li className="text-center">
                <Link
                  href="/albums"
                  className="px-3 py-2 lg:px-4 rounded hover:bg-gray-200 duration-500 hover:text-fill"
                >
                  Albums
                </Link>
              </li>

              <li className="text-center">
                <Link
                  href="/artists"
                  className="px-3 py-2 lg:px-4 rounded hover:bg-gray-200 duration-500 hover:text-fill"
                >
                  Artists
                </Link>
              </li>

              <li className="text-center">
                <Link
                  href="/labels"
                  className="px-3 py-2 lg:px-4 rounded hover:bg-gray-200 duration-500 hover:text-fill"
                >
                  Labels
                </Link>
              </li>

              <li className="text-center">
                <Link
                  href="/search"
                  className="px-3 py-2 lg:px-4 rounded hover:bg-gray-200 duration-500 hover:text-fill"
                >
                  Search
                </Link>
              </li>
            </ul>
          </nav>

          <nav className="w-full overflow-hidden">
            <ul className="flex items-center justify-end">
              <li className="relative hidden sm:block">
                <FaMagnifyingGlass className="absolute left-3 top-[9px] z-20 text-primary" />

                <input
                  className="relative z-10 w-full rounded-full bg-gray-200 px-8 py-1 font-ralewayRegular focus:outline-none"
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Search Song"
                />
              </li>

              <li className="ml-4">
                <a href="/">
                  <Image
                    src={dashboardImage}
                    className="w-[28px] rounded-full"
                    alt="Profile Image"
                    width={28}
                    height={28}
                  />
                </a>
              </li>

              <li className="ml-2 mr-1">
                <Menu side="right" align="start">
                  <button className="outline-none">
                    <FaBars className="text-2xl text-primary" />
                  </button>
                </Menu>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* this search input show only for small screen less than 640px */}
      <div className="search mb-3 border-y-[1px] border-divideColor px-5 py-2 sm:hidden">
        <div className="relative w-full">
          <FaMagnifyingGlass className="absolute left-3 top-[9px] z-20 text-primary" />
          <input
            className="relative z-10 w-full rounded-full bg-gray-200 px-8 py-1 font-ralewayRegular focus:outline-none"
            type="text"
            name="search"
            id="search"
            placeholder="Search Song"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
