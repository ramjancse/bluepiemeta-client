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
import { useDispatch } from "react-redux";
import { userLoggedOut } from "@/features/auth/authSlice";

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

const Menu = ({ children, side = "bottom", align = "center" }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    // logout from next-auth
    signOut();

    // clear redux store data
    dispatch(userLoggedOut());
  };

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
                    onClick={handleLogout}
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
