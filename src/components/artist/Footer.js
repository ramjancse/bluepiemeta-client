import React from "react";
import {
  FaCloudflare,
  FaFacebookF,
  FaLinkedin,
  FaSpotify,
  FaSquareInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="left flex flex-wrap px-10 py-6 md:justify-center">
        <div className="services w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/12">
          <h3 className="mb-3 text-base font-semibold uppercase">
            <span className="underline">Servic</span>
            <span className="text-lg">es</span>
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

        <div className="about flex w-1/2 flex-col items-center sm:w-1/3 sm:items-start md:w-1/4 lg:w-1/6 xl:w-1/12">
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

        <div className="support mt-5 w-1/2 sm:mt-0 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/12">
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

        <div className="terms mt-5 flex w-1/2 flex-col items-center sm:w-1/3 sm:items-start md:mt-0 md:w-1/4 lg:w-1/6 xl:w-1/12">
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

        <div className="social mt-7 w-full xs:flex xs:items-center xs:justify-center sm:w-2/3 lg:mt-0 lg:w-2/6 lg:justify-center xl:w-4/12">
          <nav>
            <ul className="flex flex-wrap justify-center">
              <li>
                <a
                  href="/"
                  className="!lg:pl-0 mx-2 flex w-10 h-10 items-center justify-center rounded-full bg-gray-700 px-2 text-center hover:bg-fill"
                >
                  <FaFacebookF className="text-white text-lg" />
                </a>
              </li>

              <li>
                <a
                  href="/"
                  className="mx-2 flex w-10 h-10 items-center justify-center rounded-full bg-gray-700 px-2 text-center hover:bg-fill"
                >
                  <FaTwitter className="text-white text-lg" />
                </a>
              </li>

              <li>
                <a
                  href="/"
                  className="mx-2 flex w-10 h-10 items-center justify-center rounded-full bg-gray-700 text-center hover:bg-fill px-2"
                >
                  <FaSquareInstagram className="text-white text-lg" />
                </a>
              </li>

              <li>
                <a
                  href="/"
                  className="mx-2 flex w-10 h-10 items-center justify-center rounded-full bg-gray-700 px-2 text-center hover:bg-fill"
                >
                  <FaYoutube className="text-white text-lg" />
                </a>
              </li>

              <li>
                <a
                  href="/"
                  className="mx-2 flex w-10 h-10 items-center justify-center rounded-full bg-gray-700 px-2 text-center hover:bg-fill"
                >
                  <FaLinkedin className="text-white text-lg" />
                </a>
              </li>

              <li>
                <a
                  href="/"
                  className="mx-2 flex w-10 h-10 items-center justify-center rounded-full bg-gray-700 px-2 text-center hover:bg-fill"
                >
                  <FaSpotify className="text-white text-lg" />
                </a>
              </li>

              <li>
                <a
                  href="/"
                  className="mx-2 flex w-10 h-10 items-center justify-center rounded-full bg-gray-700 px-2 text-center hover:bg-fill"
                >
                  <FaCloudflare className="text-white text-lg" />
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="help mt-6 w-full rounded bg-gray-200 p-10 xl:mt-0 xl:w-4/12">
          <h1 className="text-2xl font-semibold uppercase">Need Help?</h1>
          <h3 className="mb-10 text-sm">
            Let us search the right song for you
          </h3>
          <form className="relative">
            <input
              className="relative z-10 rounded-full bg-gray-300 px-3 py-1 font-ralewayRegular focus:outline-none"
              type="text"
              name="search"
              id="search"
              placeholder="Search Song"
            />
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
