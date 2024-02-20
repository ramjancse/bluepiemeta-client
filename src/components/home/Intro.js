import Image from "next/image";
import mainImage from "@/assets/images/test/630.png";
import posterOne from "@/assets/images/poster/poster-1.jpg";
import posterTwo from "@/assets/images/poster/poster-2.jpg";
import posterThree from "@/assets/images/poster/poster-3.jpg";
import posterFive from "@/assets/images/poster/poster-5.jpg";

const Intro = () => {
  return (
    <>
      <div className="px-4 py-3 xs:px-6 xs:py-4 xsm:px-8 xsm:py-5 sm:px-10 sm:py-6 xl:px-12 xl:py-8 grid grid-cols-2 grid-rows-4 md:grid-rows-2 md:grid-cols-4 gap-x-3 gap-y-0 xl:gap-x-8 xl:gap-y-2">
        <div className="main text-center col-start-1 col-end-3 md:col-start-2 md:col-span-2 row-start-1 row-end-3 overflow-hidden">
          <a href="/">
            <Image
              width={500}
              height={500}
              className="w-full h-[calc(100%-1.6rem)]"
              src={mainImage}
              alt="Poster One"
            />
            <p className="hover:text-fill mt-[2px]">Top Chart</p>
          </a>
        </div>

        <div className="one col-start-1 row-start-3 md:col-start-1 md:row-start-1 text-center">
          <a href="/">
            <Image width={500} height={500} src={posterOne} alt="Logo Image" />
            <p className="hover:text-fill mt-[2px]">Top Chart</p>
          </a>
        </div>

        <div className="two col-start-1 row-start-4 md:col-start-1 md:row-start-2 text-center">
          <a href="/">
            <Image width={500} height={500} src={posterTwo} alt="Logo Image" />
            <p className="hover:text-fill mt-[2px]">Top Chart</p>
          </a>
        </div>

        <div className="three col-start-2 row-start-3 md:col-start-4 md:row-start-1 text-center">
          <a href="/">
            <Image
              width={500}
              height={500}
              src={posterThree}
              alt="Logo Image"
            />
            <p className="hover:text-fill mt-[2px]">Top Chart</p>
          </a>
        </div>

        <div className="four col-start-2 row-start-4 md:col-start-4 md:row-start-2 text-center">
          <a href="/">
            <Image width={500} height={500} src={posterFive} alt="Logo Image" />
            <p className="hover:text-fill mt-[2px]">Top Chart</p>
          </a>
        </div>
      </div>
    </>
  );
};

export default Intro;
