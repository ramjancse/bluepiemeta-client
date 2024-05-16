import Layout from "@/components/dashboard/Layout";
import { getAllAlbums } from "@/lib/albums";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import Header from "@/components/dashboard/Header";
import Search from "@/components/albums/Search";
import TableRow from "@/components/albums/TableRow";
import PaginationPage from "@/components/shared/Pagination";

const Home = async ({ searchParams: { keyword = "", page = 1 } }) => {
  const session = await getServerSession(authOptions);
  const {
    data: albums,
    pagination: { totalPages },
  } = await getAllAlbums({
    token: session?.jwt,
    keyword,
    page: page ? Number(page) : 1,
  });

  return (
    <Layout>
      <Header name="Dashboard" />
      <main className="px-4 py-3">
        <Search route="/" />

        <div className="mt-2 overflow-x-auto">
          <table className="w-full mt-2 border-collapse">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="border p-2 text-left">Title</th>
                <th className="border p-2 text-left">UPC</th>
                <th className="border p-2 text-left">Artist Name</th>
                <th className="border p-2 text-left">Genre</th>
                <th className="border p-2 text-left">Type</th>
                <th className="border p-2 text-left">Release Date</th>
                <th className="border p-2 text-left">Total Tracks</th>
                <th className="border p-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {albums.map((album) => (
                <TableRow key={album.id} album={album} />
              ))}
            </tbody>
          </table>
        </div>

        <PaginationPage
          route="/"
          currentPage={page ? Number(page) : 1}
          totalPage={totalPages ? Number(totalPages) : 1}
        />
      </main>
    </Layout>
  );
};

export default Home;
