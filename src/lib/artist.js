import { BASE_URL } from "@/config/axios";

export const getAllArtists = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/artists`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error, "error");
    return new Error("Something went wrong");
  }
};

export const getArtistById = async (artistId) => {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/artists/${artistId}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return new Error("Something went wrong");
  }
};
