import { axiosPublicInstance } from "@/config/axios";

export const getAllAlbums = async () => {
  try {
    const { data } = await axiosPublicInstance.get("/albums");
    return data;
  } catch (error) {
    console.log(error, "error");
    throw new Error(error);
  }
};

export const getAlbumById = async (albumId) => {
  try {
    const { data } = await axiosPublicInstance.get(`/albums/${albumId}`);
    return data;
  } catch (error) {
    console.log(error, "error");
    throw new Error(error);
  }
};
