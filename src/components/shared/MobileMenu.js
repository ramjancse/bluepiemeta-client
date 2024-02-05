import Link from "next/link";
import React from "react";

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
          <li key={menu.id} className="border-2 border-black block m-1">
            <Link
              href={menu.link}
              className="p-2 hover:font-medium hover:text-fill"
            >
              {/* <div className="circle relative mr-3 h-3 w-3 rounded-full border-2 border-blue-400">
                <div className="fill absolute left-[2px] h-3 w-3 rounded-full bg-fill"></div>
              </div> */}
              {menu.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileMenu;
