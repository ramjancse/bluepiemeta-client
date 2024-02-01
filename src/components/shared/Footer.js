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
    <footer className="footer mx-14 my-10 flex items-center justify-between overflow-hidden">
      <div className="left flex justify-between">
        <div className="services mr-8">
          <h3 className="mb-3 text-base font-semibold uppercase">
            <span className="underline">Servic</span>
            <span className="">es</span>
          </h3>
          <nav className="font-ralewayRegular text-xs">
            <ul>
              <li className="py-1">
                <a href="/" className="hover:font-medium hover:text-fill">
                  Song Search
                </a>
              </li>
              <li className="py-1">
                <a href="/" className="hover:font-medium hover:text-fill">
                  Subscription
                </a>
              </li>
              <li className="py-1">
                <a href="/" className="hover:font-medium hover:text-fill">
                  Single Use
                </a>
              </li>
              <li className="py-1">
                <a href="/" className="hover:font-medium hover:text-fill">
                  Custom Music
                </a>
              </li>
              <li className="py-1">
                <a href="/" className="hover:font-medium hover:text-fill">
                  Cover
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="about mr-8">
          <h3 className="mb-3 text-base font-semibold uppercase">
            <span className="underline">Abo</span>
            <span className="">ut</span>
          </h3>
          <nav className="font-ralewayRegular text-xs">
            <ul>
              <li className="py-1">
                <a href="/" className="hover:font-medium hover:text-fill">
                  Our Story
                </a>
              </li>
              <li className="py-1">
                <a href="/" className="hover:font-medium hover:text-fill">
                  Films
                </a>
              </li>
              <li className="py-1">
                <a href="/" className="hover:font-medium hover:text-fill">
                  TV
                </a>
              </li>
              <li className="py-1">
                <a href="/" className="hover:font-medium hover:text-fill">
                  Playlists
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="support mr-8">
          <h3 className="mb-3 text-base font-semibold uppercase">
            <span className="underline">Suppo</span>
            <span className="">rt</span>
          </h3>
          <nav className="font-ralewayRegular text-xs">
            <ul>
              <li className="py-1">
                <a href="/" className="hover:font-medium hover:text-fill">
                  Articles
                </a>
              </li>
              <li className="py-1">
                <a href="/" className="hover:font-medium hover:text-fill">
                  FAQ
                </a>
              </li>
              <li className="py-1">
                <a href="/" className="hover:font-medium hover:text-fill">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="terms">
          <h3 className="mb-3 text-base font-semibold uppercase">
            <span className="underline">Ter</span>
            <span className="">ms</span>
          </h3>
          <nav className="font-ralewayRegular text-xs">
            <ul>
              <li className="py-1">
                <a href="/" className="hover:font-medium hover:text-fill">
                  Privacy Policy
                </a>
              </li>
              <li className="py-1">
                <a href="/" className="hover:font-medium hover:text-fill">
                  Licensing
                </a>
              </li>
              <li className="py-1">
                <a href="/" className="hover:font-medium hover:text-fill">
                  Terms of Use
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="social">
        <nav>
          <ul className="flex">
            <li>
              <a
                href="/"
                className="mx-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 px-3 text-center hover:bg-fill"
              >
                <FaFacebookF className="text-white" />
              </a>
            </li>

            <li>
              <a
                href="/"
                className="mx-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 px-3 text-center hover:bg-fill"
              >
                <FaTwitter className="text-white" />
              </a>
            </li>

            <li>
              <a
                href="/"
                className="mx-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 px-3 text-center hover:bg-fill"
              >
                <FaSquareInstagram className="text-white" />
              </a>
            </li>

            <li>
              <a
                href="/"
                className="mx-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 px-3 text-center hover:bg-fill"
              >
                <FaYoutube className="text-white" />
              </a>
            </li>
          </ul>

          <ul className="mt-3 flex">
            <li>
              <a
                href="/"
                className="mx-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 px-3 text-center hover:bg-fill"
              >
                <FaLinkedin className="text-white" />
              </a>
            </li>

            <li>
              <a
                href="/"
                className="mx-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 px-3 text-center hover:bg-fill"
              >
                <FaSpotify className="text-white" />
              </a>
            </li>

            <li>
              <a
                href="/"
                className="mx-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 px-3 text-center hover:bg-fill"
              >
                <FaCloudflare className="text-white" />
              </a>
            </li>

            <li>
              <a
                href="/"
                className="mx-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 px-3 text-center hover:bg-fill"
              >
                <FaFacebookF className="text-white" />
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="help rounded bg-gray-200 px-4 pb-7 pt-4">
        <h1 className="text-2xl font-semibold uppercase">Need Help?</h1>
        <h3 className="mb-10 text-sm">Let us search the right song for you</h3>
        <form className="relative">
          <input
            className="relative z-10 rounded-full bg-gray-300 px-3 py-1 font-ralewayRegular"
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
