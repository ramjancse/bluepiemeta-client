"use client";

import Link from "next/link";
import React from "react";
import { FaAngleRight, FaBars } from "react-icons/fa6";

import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Menu = ({ children, side = "bottom" }) => {
  const menus = [
    {
      id: 1,
      name: "Genre",
      link: "/genre",
      icon: "User",
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
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

        <DropdownMenuContent className="w-80" side={side}>
          <DropdownMenuGroup>
            {menus.map((menuItem) => (
              <span key={menuItem.id}>
                <DropdownMenuItem>
                  {/* <User className="mr-2 h-4 w-4" /> */}
                  <span>{menuItem.name}</span>
                </DropdownMenuItem>
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
