"use client";

import { useDeleteArtistMutation } from "@/features/artists/artistAPI";
import { toast } from "react-toastify";

const Button = ({ artistId }) => {
  const [deleteArtist, { isLoading, isSuccess, isError, error }] =
    useDeleteArtistMutation();

  const handleDelete = async () => {
    deleteArtist(artistId)
      .then((res) => {
        // show success message
        toast.success("Artist Deleted successfully");
      })
      .catch((error) => {
        // show error message
        toast.error("Something went wrong");
      });
  };

  return (
    <button
      type="button"
      className="bg-red-400 px-3 py-[5px] rounded text-white ml-2"
      onClick={handleDelete}
      disabled={isLoading}
    >
      Delete
    </button>
  );
};

export default Button;
