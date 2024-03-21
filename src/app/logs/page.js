import Header from "@/components/dashboard/Header";
import Layout from "@/components/dashboard/Layout";
import React from "react";

const Logs = () => {
  const logs = [];
  return (
    <Layout>
      <Header name="Activity Logs" />

      <section className="px-4 py-3 border-l border-b">
        <h1 className="mb-3 text-xl">All Logs</h1>

        <div className="overflow-x-auto mt-5">
          <table className="w-full border-collapse">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="border p-2 text-left">SL</th>
                <th className="border p-2 text-left">Name</th>
                <th className="border p-2 text-left">Created At</th>
                <th className="border p-2 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {logs.length ? (
                logs.map((log, index) => {
                  const { _id, labelName, createdAt } = log;
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
                          //   onClick={() => handleDelete(_id)}
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
                    Logs not found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </Layout>
  );
};

export default Logs;
