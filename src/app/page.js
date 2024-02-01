import Intro from "@/components/home/Intro";
import Songs from "@/components/home/Songs";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

import Sidebar from "@/components/shared/Sidebar";

export default function Home() {
  return (
    <>
      <Header />

      <main class="flex">
        <div class="h-full w-1/6">
          <Sidebar />
        </div>

        <div class="w-5/6 border-l-[1px] border-divideColor">
          <Intro />

          <Songs />

          <Footer />
        </div>
      </main>
    </>
  );
}
