import Header from "@/components/dashboard/Header";
import Layout from "@/components/dashboard/Layout";
import Main from "@/components/logs/Main";
import { Suspense } from "react";

const Logs = () => {
  return (
    <Layout>
      <Header name="Activity Logs" />
      <Suspense>
        <Main />
      </Suspense>
    </Layout>
  );
};

export default Logs;
