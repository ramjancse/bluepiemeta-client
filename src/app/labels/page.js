import Header from "@/components/dashboard/Header";
import Layout from "@/components/dashboard/Layout";
import { axiosPrivateInstance } from "@/config/axios";
import { format } from "date-fns";
import { getServerSession } from "next-auth";
import { toast } from "react-toastify";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { getAllLabel } from "@/lib/albums";
import PaginationPage from "@/components/shared/Pagination";
import Button from "@/components/label/Button";

const Label = async ({ searchParams: { page } }) => {
  const session = await getServerSession(authOptions);
  const {
    data: labels = [],
    pagination: {
      totalItems: { totalItems = 1, limit = 1 },
    },
  } = await getAllLabel({
    token: session?.jwt,
    page: page ? Number(page) : 1,
  });

  const totalPages = Math.ceil(totalItems / limit);
  return (
    <Layout>
      <Header name="Label" />

      <section className="px-4 py-3 border-l border-b">
        <div className="labels">
          <div className="right">
            {/* Will be search add here */}

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gray-700 text-white">
                  <tr>
                    <th className="border p-2 text-left">SL</th>
                    <th className="border p-2 text-left">Label Name</th>
                    <th className="border p-2 text-left">Created At</th>
                    <th className="border p-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {labels?.length ? (
                    labels.map((label, index) => {
                      const { _id: labelId, labelName, createdAt } = label;
                      return (
                        <tr className="even:bg-gray-100" key={labelId}>
                          <td className="border p-2">{index + 1}</td>
                          <td className="border p-2">{labelName}</td>
                          <td className="border p-2">
                            {format(createdAt, "dd-MMMM-yyyy")}
                          </td>
                          <td className="border p-2">
                            <Button labelId={labelId} />
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr className="even:bg-gray-100">
                      <td className="border p-2 text-center" colSpan={4}>
                        Labels not found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="pagination mt-5 text-center">
              <PaginationPage
                route="/logs"
                currentPage={page ? Number(page) : 1}
                totalPage={totalPages}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Label;
