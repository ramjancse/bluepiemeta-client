import Header from "@/components/dashboard/Header";
import Layout from "@/components/dashboard/Layout";
import { getAllLogs } from "@/lib/logs";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

const Logs = async () => {
  const session = await getServerSession(authOptions);
  const { data: logs } = await getAllLogs(session?.jwt);

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
                <th className="border p-2 text-left">Email</th>
                <th className="border p-2 text-left">Activity Type</th>
                <th className="border p-2 text-left">IP</th>
                <th className="border p-2 text-left">Details</th>
                <th className="border p-2 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {logs.length ? (
                logs.map((log, index) => {
                  const {
                    _id,
                    email,
                    activityType,
                    ipAddress,
                    actionDetails,
                    success,
                  } = log;
                  return (
                    <tr className="even:bg-gray-100" key={_id}>
                      <td className="border p-2">{index + 1}</td>
                      <td className="border p-2">{email}</td>
                      <td className="border p-2">{activityType}</td>
                      <td className="border p-2">{ipAddress}</td>
                      <td className="border p-2">{actionDetails}</td>
                      <td className="border p-2">
                        {success ? "true" : "false"}
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
