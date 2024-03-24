import { BASE_URL, axiosPublicInstance } from "@/config/axios";

export const getAllAlbums = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/albums`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error, "error");

    throw new Error("Something went wrong");
  }
};

export const getAlbumById = async ({ token, albumId }) => {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/albums/${albumId}`, {
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

export const getAllLabel = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/labels`, {
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
