import { BASE_URL, axiosPublicInstance } from "@/config/axios";

export const getAllAlbums = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/albums`, {
      cache: "no-store",
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error, "error");
    return new Error("Something went wrong");
  }
};

export const getAlbumById = async (albumId) => {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/albums/${albumId}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error, "error");
    return new Error("Something went wrong");
  }
};

export const getAllLabel = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/labels`, {
      cache: "no-store",
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error, "error");
    return new Error("Something went wrong");
  }
};
