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
              className="flex items-center p-2 hover:font-medium hover:text-fill"
            >
              <div className="circle relative mr-3 h-3 w-3 rounded-full border-2 border-blue-400">
                <div className="fill absolute left-[2px] h-3 w-3 rounded-full bg-fill"></div>
              </div>
              {menu.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
