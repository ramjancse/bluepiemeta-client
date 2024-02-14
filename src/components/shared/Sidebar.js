import Link from "next/link";
import React from "react";

const Sidebar = () => {
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
    <nav className="flex justify-center pt-5">
      <ul className="flex flex-col">
        {menus.map((menu) => (
          <li key={menu.id}>
            <Link
              href={menu.link}
              className="flex items-center px-4 py-2 rounded hover:text-fill hover:bg-gray-200 duration-500"
            >
              {menu.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
