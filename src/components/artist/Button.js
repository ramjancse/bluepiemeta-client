"use client";

import { axiosPrivateInstance } from "@/config/axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const Button = ({ artistId }) => {
  const session = useSession();

  const handleDelete = async () => {
    try {
      await axiosPrivateInstance(session?.data?.jwt).delete(
        `/artists/${artistId}`
      );

      // show success message
      toast.success("Artist Deleted successfully");
    } catch (error) {
      console.log(error, "error in delete artist req");

      // show error message
      toast.error("Something went wrong");
    }
  };

  return (
    <button
      type="button"
      className="bg-red-400 px-3 py-[5px] rounded text-white ml-2"
      onClick={handleDelete}
    >
      Delete
    </button>
  );
};

export default Button;
