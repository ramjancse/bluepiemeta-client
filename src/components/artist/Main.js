import Image from "next/image";
import mainBanner from "@/assets/images/main_banner.jpg";
import ArtistForm from "./ArtistForm";
import AddArtistForm from "./AddArtistForm";

const Main = () => {
  return (
    <main>
      <div className="intro">
        <Image
          className="h-36 w-full object-cover sm:h-52 md:h-64 lg:h-72 xl:h-80 2xl:h-96"
          src={mainBanner}
          alt="Intro Image"
          width={1000}
          height={144}
        />
      </div>

      <div className="info">
        <h3 className="py-2 text-center text-xl font-bold"> Add Artist Info</h3>

        <AddArtistForm />
      </div>
    </main>
  );
};

export default Main;
