"use client";

import { useState } from "react";
import Modal from "./Modal";

const EditButton = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button
        type="button"
        className="bg-red-400 px-3 py-[5px] rounded text-white ml-2"
        onClick={() => setShow((prev) => !prev)}
      >
        Edit
      </button>

      {show && <Modal />}
    </>
  );
};

export default EditButton;
