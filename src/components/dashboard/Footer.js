import Link from "next/link";

const Footer = () => {
  return (
    <div className="py-6">
      <p className="text-xs text-center lg:px-5">
        Copyright &copy;{" "}
        <Link className="text-blue-600 font-medium" href="/">
          Blue Pie Meta
        </Link>
        . All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
