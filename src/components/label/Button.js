"use client";

import { axiosPrivateInstance } from "@/config/axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const Button = ({ labelId }) => {
  const session = useSession();

  const handleDelete = async () => {
    try {
      await axiosPrivateInstance(session?.data?.jwt).delete(
        `/labels/${labelId}`
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
    <button
      type="button"
      className="bg-red-400 px-3 py-1 rounded text-white"
      onClick={handleDelete}
    >
      Delete
    </button>
  );
};

export default Button;
