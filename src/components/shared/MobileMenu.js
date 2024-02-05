import Link from "next/link";
import React from "react";
import { FaAngleRight } from "react-icons/fa6";

const MobileMenu = () => {
  const menus = [
    {
      id: 1,
      name: "Genre",
      link: "/genre",
    },

    {
      id: 2,
      name: "Mood",
      link: "/mood",
    },

    {
      id: 3,
      name: "Country",
      link: "/country",
    },
    {
      id: 4,
      name: "Artist",
      link: "/artist",
    },
    {
      id: 5,
      name: "Year",
      link: "/year",
    },
    {
      id: 6,
      name: "Instrumental",
      link: "/instrumental",
    },
    {
      id: 7,
      name: "Advanced",
      link: "/advanced",
    },
  ];

  return (
    <nav className="">
      <ul className="flex flex-col">
        {menus.map((menu) => (
          <li
            key={menu.id}
            className="border-b-[1px] border-gray-400 px-6 py-2 block"
          >
            <Link
              href={menu.link}
              className="hover:font-medium hover:text-fill flex items-center justify-between"
            >
              <span>{menu.name}</span> <FaAngleRight />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileMenu;
