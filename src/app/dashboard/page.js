import Layout from "@/components/dashboard/Layout";
import Image from "next/image";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Link from "next/link";
import albumImage2 from "@/assets/images/dashboard/dashboard-asset-images/albums-cover/album-cover-02.jpg";
import { MdDownloadForOffline } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import albumImage from "@/assets/images/poster/poster-13.jpg";
import ChainIcon from "@/assets/images/dashboard/Chain-icon.svg";
import { getAllAlbums } from "@/lib/albums";
import DashboardIntro from "@/components/dashboard/DashboardIntro";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  const { data: albums } = await getAllAlbums({ token: session?.jwt, page: 1 });

  return (
    <Layout>
      <DashboardIntro albums={albums} />

      <div className="bottom bg-[#F5F6FA] flex justify-between">
        <div className="recent-list w-1/3 px-5 py-3 overflow-hidden shadow-md">
          <div className="tracks">
            <h3 className="font-medium text-base mb-2 border-b-2 border-gray-400">
              Recently Added
            </h3>

            <div className="track flex border-b-2 py-2">
              <div className="image mr-2">
                <Image
                  className="w-[60px]"
                  src={albumImage2}
                  alt="Track Image"
                />
              </div>

              <div className="info w-full flex justify-between">
                <div className="text">
                  <h5 className="text-sm">
                    <Link href="/" className="hover:text-fill">
                      The Four Corners Of Hell
                    </Link>
                  </h5>
                  <h6 className="text-xs">Eleanor MacEoy</h6>
                </div>

                <div className="link flex justify-between space-x-2">
                  <Image
                    src={ChainIcon}
                    alt="Chain Icon"
                    className="text-[#0070D6] w-[15px] h-[20px]"
                  />

                  <MdDownloadForOffline className="text-xl text-[#0070D6]" />
                  <SlOptionsVertical className="text-xl text-[#0070D6]" />
                </div>
              </div>
            </div>

            <div className="track flex border-b-2 mt-4 py-2">
              <div className="image mr-2">
                <Image
                  className="w-[60px]"
                  src={albumImage2}
                  alt="Track Image"
                />
              </div>

              <div className="info w-full flex justify-between">
                <div className="text">
                  <h5 className="text-sm">
                    <Link href="/" className="hover:text-fill">
                      The Four Corners Of Hell
                    </Link>
                  </h5>
                  <h6 className="text-xs">Eleanor MacEoy</h6>
                </div>

                <div className="link flex justify-between space-x-2">
                  <Image
                    src={ChainIcon}
                    alt="Chain Icon"
                    className="text-[#0070D6] w-[15px] h-[20px]"
                  />
                  <MdDownloadForOffline className="text-xl text-[#0070D6]" />
                  <SlOptionsVertical className="text-xl text-[#0070D6]" />
                </div>
              </div>
            </div>

            <div className="track flex border-b-2 mt-4 py-2">
              <div className="image mr-2">
                <Image
                  className="w-[60px]"
                  src={albumImage2}
                  alt="Track Image"
                />
              </div>

              <div className="info w-full flex justify-between">
                <div className="text">
                  <h5 className="text-sm">
                    <Link href="/" className="hover:text-fill">
                      The Four Corners Of Hell
                    </Link>
                  </h5>
                  <h6 className="text-xs">Eleanor MacEoy</h6>
                </div>

                <div className="link flex justify-between space-x-2">
                  <Image
                    src={ChainIcon}
                    alt="Chain Icon"
                    className="text-[#0070D6] w-[15px] h-[20px]"
                  />
                  <MdDownloadForOffline className="text-xl text-[#0070D6]" />
                  <SlOptionsVertical className="text-xl text-[#0070D6]" />
                </div>
              </div>
            </div>

            <div className="track flex border-b-2 mt-4 py-2">
              <div className="image mr-2">
                <Image
                  className="w-[60px]"
                  src={albumImage2}
                  alt="Track Image"
                />
              </div>

              <div className="info w-full flex justify-between">
                <div className="text">
                  <h5 className="text-sm">
                    <Link href="/" className="hover:text-fill">
                      The Four Corners Of Hell
                    </Link>
                  </h5>
                  <h6 className="text-xs">Eleanor MacEoy</h6>
                </div>

                <div className="link flex justify-between space-x-2">
                  <Image
                    src={ChainIcon}
                    alt="Chain Icon"
                    className="text-[#0070D6] w-[15px] h-[20px]"
                  />
                  <MdDownloadForOffline className="text-xl text-[#0070D6]" />
                  <SlOptionsVertical className="text-xl text-[#0070D6]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="track-list w-2/3 px-5 pt-3">
          <h3 className="font-medium text-base mb-2 border-b-2 border-gray-400">
            Track List
          </h3>

          <div className="songs">
            <div className="song bg-white flex mt-4">
              <div className="cover w-[50px]">
                <Image
                  src={albumImage}
                  className="w-full"
                  alt="Album"
                  width={50}
                  height={50}
                />
              </div>

              <div className="right w-[calc(100%-50px)] flex items-center justify-between px-3">
                <div className="name">
                  <h6 className="text-sm font-medium">
                    <a href="/" className="hover:text-fill">
                      Can I Have Forever with You{" "}
                    </a>

                    <a className="text-xs italic hover:text-fill" href="/">
                      - Graham Cotton
                    </a>
                  </h6>

                  <p className="text-[11px] hidden sm:flex sm:justify-between ">
                    Folk, Indie, Song-Songwriter
                  </p>
                </div>

                <div className="count h-4 w-4 items-center justify-center rounded border border-slate-400 text-center text-[10px] font-bold hidden lg:block mx-5">
                  +1
                </div>

                <div className="action flex">
                  <button className="mr-3 rounded-full bg-[#205CA8] px-6 py-1 text-xs font-medium uppercase text-white">
                    <a href="/">Edit</a>
                  </button>

                  <button className="rounded-full bg-[#205CA8] px-6 py-1 text-xs font-medium uppercase text-white">
                    <a href="/">License</a>
                  </button>
                </div>
              </div>
            </div>

            <div className="song bg-white flex mt-2">
              <div className="cover w-[50px]">
                <Image
                  src={albumImage}
                  className="w-full"
                  alt="Album"
                  width={50}
                  height={50}
                />
              </div>

              <div className="right w-[calc(100%-50px)] flex items-center justify-between px-3">
                <div className="name">
                  <h6 className="text-sm font-medium">
                    <a href="/" className="hover:text-fill">
                      Can I Have Forever with You{" "}
                    </a>

                    <a className="text-xs italic hover:text-fill" href="/">
                      - Graham Cotton
                    </a>
                  </h6>

                  <p className="text-[11px] hidden sm:flex sm:justify-between ">
                    Folk, Indie, Song-Songwriter
                  </p>
                </div>

                <div className="count h-4 w-4 items-center justify-center rounded border border-slate-400 text-center text-[10px] font-bold hidden lg:block mx-5">
                  +1
                </div>

                <div className="action flex">
                  <button className="mr-3 rounded-full bg-[#205CA8] px-6 py-1 text-xs font-medium uppercase text-white">
                    <a href="/">Edit</a>
                  </button>

                  <button className="rounded-full bg-[#205CA8] px-6 py-1 text-xs font-medium uppercase text-white">
                    <a href="/">License</a>
                  </button>
                </div>
              </div>
            </div>

            <div className="song bg-white flex mt-2">
              <div className="cover w-[50px]">
                <Image
                  src={albumImage}
                  className="w-full"
                  alt="Album"
                  width={50}
                  height={50}
                />
              </div>

              <div className="right w-[calc(100%-50px)] flex items-center justify-between px-3">
                <div className="name">
                  <h6 className="text-sm font-medium">
                    <a href="/" className="hover:text-fill">
                      Can I Have Forever with You{" "}
                    </a>

                    <a className="text-xs italic hover:text-fill" href="/">
                      - Graham Cotton
                    </a>
                  </h6>

                  <p className="text-[11px] hidden sm:flex sm:justify-between ">
                    Folk, Indie, Song-Songwriter
                  </p>
                </div>

                <div className="count h-4 w-4 items-center justify-center rounded border border-slate-400 text-center text-[10px] font-bold hidden lg:block mx-5">
                  +1
                </div>

                <div className="action flex">
                  <button className="mr-3 rounded-full bg-[#205CA8] px-6 py-1 text-xs font-medium uppercase text-white">
                    <a href="/">Edit</a>
                  </button>

                  <button className="rounded-full bg-[#205CA8] px-6 py-1 text-xs font-medium uppercase text-white">
                    <a href="/">License</a>
                  </button>
                </div>
              </div>
            </div>

            <div className="song bg-white flex mt-2">
              <div className="cover w-[50px]">
                <Image
                  src={albumImage}
                  className="w-full"
                  alt="Album"
                  width={50}
                  height={50}
                />
              </div>

              <div className="right w-[calc(100%-50px)] flex items-center justify-between px-3">
                <div className="name">
                  <h6 className="text-sm font-medium">
                    <a href="/" className="hover:text-fill">
                      Can I Have Forever with You{" "}
                    </a>

                    <a className="text-xs italic hover:text-fill" href="/">
                      - Graham Cotton
                    </a>
                  </h6>

                  <p className="text-[11px] hidden sm:flex sm:justify-between ">
                    Folk, Indie, Song-Songwriter
                  </p>
                </div>

                <div className="count h-4 w-4 items-center justify-center rounded border border-slate-400 text-center text-[10px] font-bold hidden lg:block mx-5">
                  +1
                </div>

                <div className="action flex">
                  <button className="mr-3 rounded-full bg-[#205CA8] px-6 py-1 text-xs font-medium uppercase text-white">
                    <a href="/">Edit</a>
                  </button>

                  <button className="rounded-full bg-[#205CA8] px-6 py-1 text-xs font-medium uppercase text-white">
                    <a href="/">License</a>
                  </button>
                </div>
              </div>
            </div>

            <div className="song bg-white flex mt-2">
              <div className="cover w-[50px]">
                <Image
                  src={albumImage}
                  className="w-full"
                  alt="Album"
                  width={50}
                  height={50}
                />
              </div>

              <div className="right w-[calc(100%-50px)] flex items-center justify-between px-3">
                <div className="name">
                  <h6 className="text-sm font-medium">
                    <a href="/" className="hover:text-fill">
                      Can I Have Forever with You{" "}
                    </a>

                    <a className="text-xs italic hover:text-fill" href="/">
                      - Graham Cotton
                    </a>
                  </h6>

                  <p className="text-[11px] hidden sm:flex sm:justify-between ">
                    Folk, Indie, Song-Songwriter
                  </p>
                </div>

                <div className="count h-4 w-4 items-center justify-center rounded border border-slate-400 text-center text-[10px] font-bold hidden lg:block mx-5">
                  +1
                </div>

                <div className="action flex">
                  <button className="mr-3 rounded-full bg-[#205CA8] px-6 py-1 text-xs font-medium uppercase text-white">
                    <a href="/">Edit</a>
                  </button>

                  <button className="rounded-full bg-[#205CA8] px-6 py-1 text-xs font-medium uppercase text-white">
                    <a href="/">License</a>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="button py-4 flex justify-end items-center">
            <button
              type="button"
              className="px-5 py-1 bg-[#424242] text-white rounded-full text-sm font-medium"
            >
              View All
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
