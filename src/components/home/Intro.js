import Image from "next/image";

const Intro = () => {
  return (
    <>
      <div className="px-12 py-8 grid grid-cols-2 grid-rows-4 md:grid-rows-2 md:grid-cols-4 gap-x-3 gap-y-0 xl:gap-x-8 xl:gap-y-2">
        <div className="main text-center col-start-1 col-end-3 md:col-start-2 md:col-span-2 row-start-1 row-end-3 overflow-hidden">
          <a href="/">
            <Image
              width={500}
              height={500}
              className="w-full h-[calc(100%-1.6rem)]"
              src="/images/test/630.png"
              alt="Poster One"
            />
            <p className="hover:font-medium hover:text-fill mt-[2px]">
              Top Chart
            </p>
          </a>
        </div>

        <div className="one col-start-1 row-start-3 md:col-start-1 md:row-start-1 text-center">
          <a href="/">
            <Image
              width={500}
              height={500}
              className=""
              src="/images/poster/poster-1.jpg"
              alt="Logo Image"
            />
            <p className="hover:font-medium hover:text-fill mt-[2px]">
              Top Chart
            </p>
          </a>
        </div>

        <div className="two col-start-1 row-start-4 md:col-start-1 md:row-start-2 text-center">
          <a href="/">
            <Image
              width={500}
              height={500}
              className=""
              src="/images/poster/poster-2.jpg"
              alt="Logo Image"
            />
            <p className="hover:font-medium hover:text-fill mt-[2px]">
              Top Chart
            </p>
          </a>
        </div>

        <div className="three col-start-2 row-start-3 md:col-start-4 md:row-start-1 text-center">
          <a href="/">
            <Image
              width={500}
              height={500}
              className=""
              src="/images/poster/poster-3.jpg"
              alt="Logo Image"
            />
            <p className="hover:font-medium hover:text-fill mt-[2px]">
              Top Chart
            </p>
          </a>
        </div>

        <div className="four col-start-2 row-start-4 md:col-start-4 md:row-start-2 text-center">
          <a href="/">
            <Image
              width={500}
              height={500}
              className=""
              src="/images/poster/poster-5.jpg"
              alt="Logo Image"
            />
            <p className="hover:font-medium hover:text-fill mt-[2px]">
              Top Chart
            </p>
          </a>
        </div>
      </div>
    </>
  );
};

export default Intro;
