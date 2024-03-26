import Header from "@/components/dashboard/Header";
import Layout from "@/components/dashboard/Layout";
import AddLabel from "@/components/label/AddLabel";
import React from "react";

const page = () => {
  return (
    <Layout>
      <Header name="Add Label" />
      <AddLabel />
    </Layout>
  );
};

export default page;
