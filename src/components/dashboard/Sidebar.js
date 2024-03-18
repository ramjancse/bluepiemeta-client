"use client";

import Image from "next/image";
import logo from "@/assets/images/main-logo.png";
import Link from "next/link";
import Footer from "./Footer";
import MenuItem from "./MenuItem";
import DashboardIcon from "@/assets/images/dashboard/Dashboard.svg";
import ReleaseIcon from "@/assets/images/dashboard/Releases.svg";
import AlbumIcon from "@/assets/images/dashboard/Albums.svg";
import ArtistIcon from "@/assets/images/dashboard/Artist.svg";

const menus = [
  {
    id: 1,
    name: "Dashboard",
    link: "/dashboard",
    icon: DashboardIcon,
    children: [],
  },
  {
    id: 2,
    name: "Releases",
    link: "/releases",
    icon: ReleaseIcon,
    children: [
      {
        id: 1,
        name: "New Releases",
        link: "/releases/new",
        icon: DashboardIcon,
        children: [],
      },
      {
        id: 2,
        name: "New Compilations",
        link: "/compilations/new",
        icon: DashboardIcon,
        children: [],
      },
    ],
  },

  {
    id: 3,
    name: "Albums",
    link: "/albums",
    icon: AlbumIcon,
    children: [],
  },
  {
    id: 4,
    name: "Artists",
    link: "/artists",
    icon: ArtistIcon,
    children: [],
  },
];

const Sidebar = () => {
  return (
    <div className="sidebar flex flex-col h-full">
      <div className="logo h-[88px]">
        <Link href="/">
          <Image src={logo} alt="Logo" className="w-[200px] px-10 py-6" />
        </Link>
      </div>

      <section className="navigation h-full bg-[#F5F6FA]">
        <nav className="menu py-10">
          <ul className="space-y-1">
            {menus.map((menu) => (
              <MenuItem key={menu.id} menu={menu} />
            ))}
          </ul>
        </nav>
      </section>

      <footer className="footer flex items-center justify-center h-[99px]">
        <Footer />
      </footer>
    </div>
  );
};

export default Sidebar;
