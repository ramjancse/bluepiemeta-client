"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

const Menu = ({ children, side = "bottom", align = "center" }) => {
  // const menus = [
  //   {
  //     id: 1,
  //     name: "Genre",
  //     link: "/genre",
  //     icon: "User",
  //   },

  //   {
  //     id: 2,
  //     name: "Mood",
  //     link: "/mood",
  //   },

  //   {
  //     id: 3,
  //     name: "Country",
  //     link: "/country",
  //   },
  //   {
  //     id: 4,
  //     name: "Artist",
  //     link: "/artist",
  //   },
  //   {
  //     id: 5,
  //     name: "Year",
  //     link: "/year",
  //   },
  //   {
  //     id: 6,
  //     name: "Instrumental",
  //     link: "/instrumental",
  //   },
  //   {
  //     id: 7,
  //     name: "Advanced",
  //     link: "/advanced",
  //   },
  // ];

  const menus = [
    {
      id: 1,
      name: "Profile",
      link: "/profile",
      icon: "User",
    },
    {
      id: 2,
      name: "Activity Log",
      link: "/activity",
      icon: "User",
    },
    {
      id: 3,
      name: "Log Out",
      link: "/",
      icon: "User",
    },
  ];
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

        <DropdownMenuContent className="w-80" side={side} align={align}>
          <DropdownMenuGroup>
            {menus.map((menuItem) => (
              <span key={menuItem.id}>
                {menuItem.id === 3 ? (
                  <DropdownMenuItem
                    className="data-[highlighted]:bg-gray-200 data-[highlighted]:text-fill cursor-pointer"
                    onClick={() => signOut()}
                  >
                    <span>{menuItem.name}</span>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem className="data-[highlighted]:bg-gray-200 data-[highlighted]:text-fill cursor-pointer">
                    <span>{menuItem.name}</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
              </span>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Menu;
