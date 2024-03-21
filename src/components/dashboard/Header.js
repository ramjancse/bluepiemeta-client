import mainBanner from "@/assets/images/main_banner.jpg";
import Image from "next/image";
import { FaBars } from "react-icons/fa6";
import Menu from "../shared/Menu";
import { HiBars3BottomLeft } from "react-icons/hi2";
import Link from "next/link";

const Header = ({ name = "Dashboard" }) => {
  return (
    <div className="flex justify-between border-b pr-4 py-6">
      <div className="left">
        <div className="flex items-center">
          <Link href="/">
            <HiBars3BottomLeft className="text-blue-600 text-[40px] -ml-[5px]" />
          </Link>

          <h3 className="font-semibold ml-2">{name}</h3>
        </div>
      </div>

      <div className="right">
        <nav className="menu">
          <ul className="flex items-center justify-end">
            <li className="mx-2">
              <a href="/">
                <Image
                  src={mainBanner}
                  className="w-7 h-7 rounded-full"
                  alt="Profile Image"
                />
              </a>
            </li>

            <li className="">
              <Menu side="left" align="start">
                <button className="outline-none">
                  <FaBars className="text-2xl text-primary" />
                </button>
              </Menu>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
