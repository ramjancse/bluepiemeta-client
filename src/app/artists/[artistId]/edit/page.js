import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import EditMain from "@/components/artist/EditMain";
import Footer from "@/components/artist/Footer";
import Header from "@/components/artist/Header";
import { getArtistById } from "@/lib/artist";
import { getServerSession } from "next-auth";

const EditArtistPage = async ({ params: { artistId } }) => {
  const session = await getServerSession(authOptions);
  const artist = await getArtistById({ token: session?.jwt, artistId });

  return (
    <div className="font-ralewayRegular">
      <Header />
      <EditMain artist={artist} />
      <Footer />
    </div>
  );
};

export default EditArtistPage;
