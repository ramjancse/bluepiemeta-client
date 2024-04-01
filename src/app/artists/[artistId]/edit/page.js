import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Footer from "@/components/artist/Footer";
import Header from "@/components/artist/Header";
import Main from "@/components/artist/Main";
import { getArtistById } from "@/lib/artist";
import { getServerSession } from "next-auth";

const EditArtistPage = async ({ params: { artistId } }) => {
  const session = await getServerSession(authOptions);
  const artistData = await getArtistById({ token: session?.jwt, artistId });

  return (
    <div className="font-ralewayRegular">
      <Header />
      <Main artistData={artistData} />
      <Footer />
    </div>
  );
};

export default EditArtistPage;
