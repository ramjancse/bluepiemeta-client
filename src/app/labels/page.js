"use client";

import Header from "@/components/dashboard/Header";
import Layout from "@/components/dashboard/Layout";
import AddLabel from "@/components/label/AddLabel";
import { axiosPrivateInstance } from "@/config/axios";
import { getAllLabel } from "@/lib/albums";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Label = () => {
  const [labels, setLabels] = useState([]);
  const session = useSession();

  useEffect(() => {
    if (session?.data?.jwt) {
      loadData(session?.data?.jwt);
    }
  }, [session]);

  const loadData = async (token) => {
    const { data } = await getAllLabel(token);
    setLabels(data);
  };

  const handleDelete = async (deleteId) => {
    try {
      const res = await axiosPrivateInstance(session?.data?.jwt).delete(
        `/labels/${deleteId}`
      );

      // show success message
      toast.success("Label deleted successfully");

      // refresh for show updated list
      window.location.reload();
    } catch (error) {
      console.log(error, "error");
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <Header name="Label" />

      <section className="px-4 py-3 border-l border-b">
        <div className="labels">
          <div className="right">
            <div className="flex justify-between">
              <h1 className="mb-3 text-xl">All Labels</h1>

              <Link
                href="/labels/add"
                className="px-10 py-2 rounded bg-gray-200"
              >
                Add label
              </Link>
            </div>

            <div className="overflow-x-auto mt-5">
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
                  {labels.length ? (
                    labels.map((label, index) => {
                      const { _id, labelName, createdAt } = label;
                      return (
                        <tr className="even:bg-gray-100" key={_id}>
                          <td className="border p-2">{index + 1}</td>
                          <td className="border p-2">{labelName}</td>
                          <td className="border p-2">
                            {format(createdAt, "dd-MMMM-yyyy")}
                          </td>
                          <td className="border p-2">
                            <button
                              type="button"
                              className="bg-red-400 px-3 py-1 rounded text-white"
                              onClick={() => handleDelete(_id)}
                            >
                              Delete
                            </button>
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
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Label;
