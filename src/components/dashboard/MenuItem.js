import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import "./MenuItem.css";

const MenuItem = ({ menu }) => {
  const path = usePathname();
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow((prev) => !prev);
  };

  return (
    <li key={menu.id}>
      {menu.children.length > 0 ? (
        <span>
          <span
            className={`pl-10 pr-3 py-2 flex items-center justify-between border-l-4 duration-500 cursor-pointer select-none ${
              path === menu.link
                ? "border-blue-500 bg-[#FAFAFC]"
                : "border-transparent hover:border-blue-500 hover:bg-[#FAFAFC]"
            }`}
            onClick={handleClick}
          >
            <span className={`flex items-center`}>
              <Image
                src={menu.icon}
                alt="Dashboard Icon"
                className="mr-2 w-[20px]"
              />
              {menu.name}
            </span>

            <FaAngleDown className="cursor-pointer" />
          </span>

          <span className={`children ${show ? "show" : "hide"}`}>
            {menu.children?.map((child) => (
              <Link
                key={child.id}
                href={child.link}
                className={`ml-[4.5rem] py-1 hover:text-blue-600 text-xs duration-500 select-none ${
                  show ? "block" : "hidden"
                }`}
              >
                {child.name}
              </Link>
            ))}
          </span>
        </span>
      ) : (
        <Link
          href={menu.link}
          className={`pl-10 pr-3 py-2 flex items-center border-l-4 duration-500 select-none ${
            path === menu.link
              ? "border-blue-500 bg-[#FAFAFC]"
              : "border-transparent hover:border-blue-500 hover:bg-[#FAFAFC]"
          }`}
        >
          <Image
            src={menu.icon}
            alt="Dashboard Icon"
            className="mr-2 w-[20px]"
          />
          {menu.name}
        </Link>
      )}
    </li>
  );
};

export default MenuItem;
