import Main from "@/components/albums/Main";
import React, { Suspense } from "react";

const page = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Main />
      </Suspense>
    </>
  );
};

export default page;
