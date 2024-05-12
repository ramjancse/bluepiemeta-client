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
    link: "/",
    icon: DashboardIcon,
    children: [],
  },
  {
    id: 2,
    name: "Albums",
    link: "/albums",
    icon: AlbumIcon,
    children: [
      {
        id: 1,
        name: "Add Album",
        link: "/albums/add",
        icon: DashboardIcon,
        children: [],
      },
      {
        id: 2,
        name: "All Album",
        link: "/albums",
        icon: DashboardIcon,
        children: [],
      },
    ],
  },
  {
    id: 3,
    name: "Artists",
    link: "/artists",
    icon: ArtistIcon,
    children: [
      {
        id: 1,
        name: "Add Artist",
        link: "/artists/add",
        icon: DashboardIcon,
        children: [],
      },
      {
        id: 2,
        name: "All Artist",
        link: "/artists",
        icon: DashboardIcon,
        children: [],
      },
    ],
  },
  {
    id: 5,
    name: "Label",
    link: "/labels",
    icon: DashboardIcon,
    children: [
      {
        id: 1,
        name: "Add Label",
        link: "/labels/add",
        icon: DashboardIcon,
        children: [],
      },
      {
        id: 2,
        name: "All Label",
        link: "/labels",
        icon: DashboardIcon,
        children: [],
      },
    ],
  },
  {
    id: 6,
    name: "Logs",
    link: "/logs",
    icon: DashboardIcon,
    children: [],
  },
  {
    id: 7,
    name: "Search",
    link: "/search",
    icon: DashboardIcon,
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

      <section className="navigation h-full">
        <nav className="menu py-10">
          <ul className="space-y-1">
            {menus.map((menu) => (
              <MenuItem key={menu.id} menu={menu} />
            ))}
          </ul>
        </nav>
      </section>
    </div>
  );
};

export default Sidebar;
