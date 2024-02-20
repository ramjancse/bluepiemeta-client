import { axiosPublicInstance } from "@/config/axios";

export const getAllArtists = async () => {
  try {
    const { data } = await axiosPublicInstance.get("/artists");
    return data;
  } catch (error) {
    console.log(error, "error");
    throw new Error(error);
  }
};

export const getArtistById = async (artistId) => {
  try {
    const { data } = await axiosPublicInstance.get(`/artists/${artistId}`);
    return data;
  } catch (error) {
    return new Error("Something went wrong");
  }
};
