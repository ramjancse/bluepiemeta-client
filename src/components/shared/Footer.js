import React from "react";
import { FaFacebookF } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaSpotify } from "react-icons/fa6";
import { FaCloudflare } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer xs:px-2 xs:py-2 xsm:px-4 xsm:py-3 sm:px-6 sm:py-4 xl:px-8 xl:py-6">
      <div className="flex flex-wrap justify-center xl:items-center">
        <div className="flex flex-wrap w-full xl:w-4/6">
          <div className="services flex flex-col w-1/2 sm:w-1/4">
            <h3 className="mb-3 text-base font-semibold uppercase px-4 py-2">
              <span className="underline">Servic</span>
              <span className="">es</span>
            </h3>

            <nav className="font-ralewayRegular text-xs">
              <ul>
                <li>
                  <a
                    href="/"
                    className="inline-block w-[120px] hover:bg-slate-200 px-4 py-2 duration-500 rounded hover:text-fill"
                  >
                    Song Search
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="inline-block w-[120px] hover:bg-slate-200 px-4 py-2 duration-500 rounded hover:text-fill"
                  >
                    Subscription
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="inline-block w-[120px] hover:bg-slate-200 px-4 py-2 duration-500 rounded hover:text-fill"
                  >
                    Single Use
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="inline-block w-[120px] hover:bg-slate-200 px-4 py-2 duration-500 rounded hover:text-fill"
                  >
                    Custom Music
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="inline-block w-[120px] hover:bg-slate-200 px-4 py-2 duration-500 rounded hover:text-fill"
                  >
                    Cover
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="about flex flex-col w-1/2 sm:w-1/4">
            <h3 className="mb-3 text-base font-semibold uppercase px-4 py-2">
              <span className="underline">Abo</span>
              <span className="">ut</span>
            </h3>
            <nav className="font-ralewayRegular text-xs">
              <ul>
                <li>
                  <a
                    href="/"
                    className="inline-block w-[120px] hover:bg-slate-200 px-4 py-2 duration-500 rounded hover:text-fill"
                  >
                    Our Story
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="inline-block w-[120px] hover:bg-slate-200 px-4 py-2 duration-500 rounded hover:text-fill"
                  >
                    Films
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="inline-block w-[120px] hover:bg-slate-200 px-4 py-2 duration-500 rounded hover:text-fill"
                  >
                    TV
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="inline-block w-[120px] hover:bg-slate-200 px-4 py-2 duration-500 rounded hover:text-fill"
                  >
                    Playlists
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="support flex flex-col w-1/2 sm:w-1/4 mt-4 sm:mt-0">
            <h3 className="mb-3 text-base font-semibold uppercase px-4 py-2">
              <span className="underline">Suppo</span>
              <span className="">rt</span>
            </h3>
            <nav className="font-ralewayRegular text-xs">
              <ul>
                <li>
                  <a
                    href="/"
                    className="inline-block w-[120px] hover:bg-slate-200 px-4 py-2 duration-500 rounded hover:text-fill"
                  >
                    Articles
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="inline-block w-[120px] hover:bg-slate-200 px-4 py-2 duration-500 rounded hover:text-fill"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="inline-block w-[120px] hover:bg-slate-200 px-4 py-2 duration-500 rounded hover:text-fill"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="terms flex flex-col w-1/2 sm:w-1/4 mt-4 sm:mt-0">
            <h3 className="mb-3 text-base font-semibold uppercase px-4 py-2">
              <span className="underline">Ter</span>
              <span className="">ms</span>
            </h3>
            <nav className="font-ralewayRegular text-xs">
              <ul>
                <li>
                  <a
                    href="/"
                    className="inline-block w-[120px] hover:bg-slate-200 px-4 py-2 duration-500 rounded hover:text-fill"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="inline-block w-[120px] hover:bg-slate-200 px-4 py-2 duration-500 rounded hover:text-fill"
                  >
                    Licensing
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="inline-block w-[120px] hover:bg-slate-200 px-4 py-2 duration-500 rounded hover:text-fill"
                  >
                    Terms of Use
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="social flex flex-col mt-6 xl:w-2/6 xl:mt-0">
          <nav>
            <ul className="flex">
              <li>
                <a
                  href="/"
                  className="mx-2 flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 px-2 text-center hover:bg-fill"
                >
                  <FaFacebookF className="text-white" />
                </a>
              </li>

              <li>
                <a
                  href="/"
                  className="mx-2 flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 px-2 text-center hover:bg-fill"
                >
                  <FaTwitter className="text-white" />
                </a>
              </li>

              <li>
                <a
                  href="/"
                  className="mx-2 flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 px-2 text-center hover:bg-fill"
                >
                  <FaSquareInstagram className="text-white" />
                </a>
              </li>

              <li>
                <a
                  href="/"
                  className="mx-2 flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 px-2 text-center hover:bg-fill"
                >
                  <FaYoutube className="text-white" />
                </a>
              </li>
            </ul>

            <ul className="mt-3 flex">
              <li>
                <a
                  href="/"
                  className="mx-2 flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 px-2 text-center hover:bg-fill"
                >
                  <FaLinkedin className="text-white" />
                </a>
              </li>

              <li>
                <a
                  href="/"
                  className="mx-2 flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 px-2 text-center hover:bg-fill"
                >
                  <FaSpotify className="text-white" />
                </a>
              </li>

              <li>
                <a
                  href="/"
                  className="mx-2 flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 px-2 text-center hover:bg-fill"
                >
                  <FaCloudflare className="text-white" />
                </a>
              </li>

              <li>
                <a
                  href="/"
                  className="mx-2 flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 px-2 text-center hover:bg-fill"
                >
                  <FaFacebookF className="text-white" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="help rounded bg-gray-200 px-4 pb-7 pt-4 mt-6 mx-4">
        <h1 className="text-2xl font-semibold uppercase">Need Help?</h1>
        <h3 className="mb-10 text-sm">Let us search the right song for you</h3>
        <form className="relative">
          <input
            className="relative z-10 rounded-full bg-gray-300 px-3 py-1 font-ralewayRegular focus:outline-none focus:ring-2 ring-fill ring-offset-2"
            type="text"
            name="search"
            id="search"
            placeholder="Search Song"
          />
        </form>
      </div>
    </footer>
  );
};

export default Footer;
