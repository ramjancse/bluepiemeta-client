const Intro = () => {
  return (
    <div className="border-divideColo flex w-full border-b-[1px] px-14 py-10 text-xl text-primary">
      <div className="w-1/3 overflow-hidden">
        <div className="h-[280px] overflow-hidden text-center">
          <a href="/">
            <img
              className="h-[calc(100%-2rem)]"
              src="/images/poster/poster-15.jpg"
              alt="Logo Image"
            />
            <p className="mt-[6px] hover:font-medium hover:text-fill">
              Top Chart
            </p>
          </a>
        </div>

        <div className="mt-[12px] h-[280px] overflow-hidden text-center">
          <a href="/">
            <img
              className="h-[calc(100%-2rem)]"
              src="/images/poster/poster-15.jpg"
              alt="Logo Image"
            />
            <p className="mt-[6px] hover:font-medium hover:text-fill">
              Top Chart
            </p>
          </a>
        </div>
      </div>

      <div className="mx-5 w-2/3 overflow-hidden">
        <div className="h-[600px] overflow-hidden text-center">
          <a href="/">
            <img
              className="h-[calc(100%-3.75rem)]"
              src="/images/test/630.png"
              alt="Poster One"
            />
            <p className="mt-[6px] hover:font-medium hover:text-fill">
              Top Chart
            </p>
          </a>
        </div>
      </div>

      <div className="w-1/3 overflow-hidden">
        <div className="h-[280px] overflow-hidden text-center">
          <a href="/">
            <img
              className="h-[calc(100%-2rem)]"
              src="/images/poster/poster-15.jpg"
              alt="Logo Image"
            />
            <p className="mt-[6px] hover:font-medium hover:text-fill">
              Top Chart
            </p>
          </a>
        </div>

        <div className="mt-[12px] h-[280px] overflow-hidden text-center">
          <a href="/">
            <img
              className="h-[calc(100%-2rem)]"
              src="/images/poster/poster-15.jpg"
              alt="Logo Image"
            />
            <p className="mt-[6px] hover:font-medium hover:text-fill">
              Top Chart
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Intro;
