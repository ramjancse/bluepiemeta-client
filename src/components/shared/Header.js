import Image from "next/image";
import Link from "next/link";
import { FaBars } from "react-icons/fa6";
import { FaMagnifyingGlass } from "react-icons/fa6";

const Header = () => {
  return (
    <header class="border-b-[1px] border-divideColor">
      <div class="flex items-center overflow-hidden">
        <div class="flex w-1/6 flex-col items-center">
          <a
            href="/"
            class="flex flex-col items-center hover:font-medium hover:text-fill"
          >
            <Image
              class="-mb-2 w-20"
              src="/images/logo.png"
              alt="Logo Image"
              width={200}
              height={100}
            />
            <span class="font-ralewayMedium text-[10px]">Blue Pie Meta</span>
          </a>
        </div>

        <div class="flex h-[87px] w-5/6 items-center border-l-[1px] border-divideColor">
          <nav class="w-3/5">
            <ul class="font-ralewayMedium flex text-lg text-primary">
              <li class="ml-3 text-center">
                <Link
                  href="/songs"
                  class="px-3 hover:font-medium hover:text-fill"
                >
                  Songs
                </Link>
              </li>

              <li class="text-center">
                <a
                  href="/projects"
                  class="px-3 hover:font-medium hover:text-fill"
                >
                  Projects
                </a>
              </li>

              <li class="text-center">
                <a
                  href="/artists/1"
                  class="px-3 hover:font-medium hover:text-fill"
                >
                  Artist
                </a>
              </li>

              <li class="text-center">
                <a href="/login" class="px-3 hover:font-medium hover:text-fill">
                  Login
                </a>
              </li>

              <li class="text-center">
                <a
                  href="/register"
                  class="px-3 hover:font-medium hover:text-fill"
                >
                  Register
                </a>
              </li>
            </ul>
          </nav>

          <nav class="w-2/5">
            <ul class="flex justify-end">
              <li class="relative">
                <FaMagnifyingGlass class="absolute left-3 top-[9px] z-20 text-primary" />

                <input
                  class="relative z-10 rounded-full bg-gray-200 px-8 py-1 font-ralewayRegular"
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Search Song"
                />
              </li>

              <li class="ml-4">
                <a href="/dist/index.html">
                  <img
                    src="/images/main_banner.jpg"
                    class="w-7 rounded-full"
                    alt="Profile Image"
                  />
                </a>
              </li>

              <li class="ml-2 mr-4">
                <a href="/dist/index.html">
                  <FaBars class="text-2xl text-primary" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
