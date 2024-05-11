import Main from "@/components/albums/Main";
import Loader from "@/components/shared/Loader";
import React, { Suspense } from "react";

const page = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Main />
      </Suspense>
    </>
  );
};

export default page;
