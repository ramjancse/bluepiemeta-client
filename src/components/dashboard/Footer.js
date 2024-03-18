import Link from "next/link";

const Footer = () => {
  return (
    <div className="py-7">
      <p className="text-xs text-center">
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
