import Intro from "@/components/home/Intro";
import Songs from "@/components/home/Songs";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

import Sidebar from "@/components/shared/Sidebar";

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex">
        <div className="h-full w-1/6 hidden">
          <Sidebar />
        </div>

        <div className="w-full border-l-[1px] border-divideColor">
          <Intro />

          <Songs />

          <Footer />
        </div>
      </main>
    </>
  );
}
