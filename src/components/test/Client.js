"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const Client = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("javascript");

  const handleClick = () => {
    setKeyword("php");
    router.push(`/playground?keyword=${keyword}`);
  };

  return (
    <button onClick={handleClick} className="rounded px-3 py-2 bg-red-200">
      Click me to change URL
    </button>
  );
};

export default Client;
