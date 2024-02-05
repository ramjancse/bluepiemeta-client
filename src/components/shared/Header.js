import Image from "next/image";
import Link from "next/link";
import { FaBars } from "react-icons/fa6";
import { FaMagnifyingGlass } from "react-icons/fa6";

const Header = () => {
  return (
    <>
      {/* <header className="border-b-[1px] border-divideColor">
        <div className="flex items-center overflow-hidden">
          <div className="flex w-1/6 flex-col items-center">
            <a
              href="/"
              className="flex flex-col items-center hover:font-medium hover:text-fill"
            >
              <Image
                className="-mb-2 w-20"
                src="/images/logo.png"
                alt="Logo Image"
                width={200}
                height={100}
              />
              <span className="font-ralewayMedium text-[10px]">
                Blue Pie Meta
              </span>
            </a>
          </div>

          <div className="flex h-[87px] w-5/6 items-center border-l-[1px] border-divideColor">
            <nav className="w-3/5">
              <ul className="font-ralewayMedium flex text-lg text-primary">
                <li className="ml-3 text-center">
                  <Link
                    href="/songs"
                    className="px-3 hover:font-medium hover:text-fill"
                  >
                    Songs
                  </Link>
                </li>

                <li className="text-center">
                  <a
                    href="/projects"
                    className="px-3 hover:font-medium hover:text-fill"
                  >
                    Projects
                  </a>
                </li>

                <li className="text-center">
                  <a
                    href="/artist"
                    className="px-3 hover:font-medium hover:text-fill"
                  >
                    Artist
                  </a>
                </li>

                <li className="text-center">
                  <a
                    href="/login"
                    className="px-3 hover:font-medium hover:text-fill"
                  >
                    Login
                  </a>
                </li>

                <li className="text-center">
                  <a
                    href="/register"
                    className="px-3 hover:font-medium hover:text-fill"
                  >
                    Register
                  </a>
                </li>
              </ul>
            </nav>

            <nav className="w-2/5">
              <ul className="flex justify-end">
                <li className="relative">
                  <FaMagnifyingGlass className="absolute left-3 top-[9px] z-20 text-primary" />

                  <input
                    className="relative z-10 rounded-full bg-gray-200 px-8 py-1 font-ralewayRegular"
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search Song"
                  />
                </li>

                <li className="ml-4">
                  <a href="/dist/index.html">
                    <img
                      src="/images/main_banner.jpg"
                      className="w-7 rounded-full"
                      alt="Profile Image"
                    />
                  </a>
                </li>

                <li className="ml-2 mr-4">
                  <a href="/dist/index.html">
                    <FaBars className="text-2xl text-primary" />
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header> */}

      <header className="font-ralewayMedium">
        <div className="top flex justify-between items-center border-b-[1px] border-divideColor">
          <nav>
            <ul className="flex items-center text-lg text-primary">
              <li className="text-center">
                <a
                  href="/"
                  className="flex flex-col items-center hover:font-medium hover:text-fill"
                >
                  <Image
                    className="-mb-2 w-20"
                    src="/images/logo.png"
                    alt="Logo Image"
                    width={200}
                    height={100}
                  />
                  <span className="text-[10px]">Blue Pie Meta</span>
                </a>
              </li>

              <li className="text-center">
                <Link
                  href="/songs"
                  className="px-3 hover:font-medium hover:text-fill"
                >
                  Songs
                </Link>
              </li>

              <li className="text-center">
                <a
                  href="/projects"
                  className="px-3 hover:font-medium hover:text-fill"
                >
                  Projects
                </a>
              </li>

              <li className="text-center">
                <a
                  href="/artist"
                  className="px-3 hover:font-medium hover:text-fill"
                >
                  Artist
                </a>
              </li>
            </ul>
          </nav>

          {/* this section show only less than 768 mobile screen */}
          <div className="dashboard mr-2 md:hidden">
            <a href="/">
              <Image
                src="/images/main_banner.jpg"
                className="w-8 rounded-full"
                alt="Profile Image"
                width={36}
                height={36}
              />
            </a>
          </div>

          {/* this section show only large than 768 screen */}
          <nav className="hidden md:block">
            <ul className="flex items-center justify-end">
              <li>
                <span className="relative">
                  <span className="absolute left-2 top-[3px]">
                    <FaMagnifyingGlass className="z-20 text-primary" />
                  </span>

                  <input
                    className="z-10 rounded-full bg-gray-200 px-7 py-1 focus:outline-none"
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search Song"
                  />
                </span>
              </li>

              <li className="mx-2">
                <a href="/">
                  <Image
                    src="/images/main_banner.jpg"
                    className="w-7 rounded-full"
                    alt="Profile Image"
                    width={28}
                    height={28}
                  />
                </a>
              </li>

              <li className="mr-4">
                <a href="/">
                  <FaBars className="text-[26px] text-primary" />
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* this section show only less than 768 mobile screen */}
        <div className="bottom border-b-[1px] border-divideColor flex items-center px-2 py-2 md:hidden">
          <div className="w-[20px]">
            <a href="/">
              <FaBars className="text-2xl text-primary" />
            </a>
          </div>

          <div className="search text-center w-full pl-1 pr-[20px]">
            <span className="relative">
              <span className="absolute left-2 top-[3px]">
                <FaMagnifyingGlass className="z-20 text-primary" />
              </span>

              <input
                className="z-10 rounded-full bg-gray-200 px-7 py-1 focus:outline-none"
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
