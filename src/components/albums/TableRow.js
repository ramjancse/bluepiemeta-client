import { useDeleteAlbumMutation } from "@/features/albums/albumAPI";
import dateFormatter from "@/utils/dateFormatter";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";

const TableRow = ({ album }) => {
  const {
    _id,
    releaseCover,
    releaseGenre,
    releaseTitle,
    formatType,
    artistId,
    originalReleaseDate,
    releasePrimaryArtist,
    tracks,
    upcean,
  } = album;

  const [
    deleteAlbum,
    {
      isLoading: deleteIsLoading,
      isSuccess: deleteIsSuccess,
      isError: deleteIsError,
      error: deleteError,
    },
  ] = useDeleteAlbumMutation();

  const handleDelete = async (albumId) => {
    try {
      await deleteAlbum(albumId);

      // show success message
      toast.success("Album delete successfully");
    } catch (error) {
      // show error message
      toast.error("Something went wrong");
    }
  };

  return (
    <tr className="even:bg-gray-100" key={_id}>
      <td className="border p-2">
        <Link
          className="flex items-center flex-col xl:flex-row"
          href={`/albums/${_id}`}
        >
          <Image
            src={releaseCover || process.env.NEXT_PUBLIC_DEFAULT_IMAGE}
            alt="Image"
            className="w-[40px] h-[40px]"
            width={40}
            height={40}
          />
          <span className="ml-2 text-blue-600">{releaseTitle || "-"}</span>
        </Link>
      </td>

      <td className="border p-2">{upcean}</td>

      <td className="border p-2">
        <Link className="block text-blue-600" href={`/artists`}>
          {releasePrimaryArtist[0]?.name || "-"}
        </Link>
      </td>

      <td className="border p-2 space-x-1">
        {releaseGenre.length
          ? releaseGenre
              .filter((genre) => genre.status)
              .map((genre, index, array) => (
                <span
                  key={genre._id}
                  className={
                    index !== array.length - 1 ? 'after:content-[","]' : ""
                  }
                >
                  {genre.name}
                </span>
              ))
          : "-"}
      </td>

      <td className="border p-2">{formatType || "-"}</td>

      <td className="border p-2">
        {dateFormatter(originalReleaseDate, "dd-MMM-yyyy")}
      </td>

      <td className="border p-2">{tracks?.length}</td>

      <td className="border p-2 flex">
        <Link
          className="bg-yellow-300 px-3 py-[7px] rounded text-white"
          href={`/albums/${_id}/edit`}
        >
          Edit
        </Link>

        <button
          className="bg-red-400 px-3 py-[5px] rounded text-white ml-1"
          onClick={() => handleDelete(_id)}
          disabled={deleteIsLoading}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
