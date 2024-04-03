import { BASE_URL } from "@/config/axios";

export const getAllArtists = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/artists`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error, "error");
    return new Error("Something went wrong");
  }
};

export const getArtistById = async ({ token, artistId }) => {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/artists/${artistId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error, "error");
    return new Error("Something went wrong");
  }
};
