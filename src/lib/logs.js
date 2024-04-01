import { BASE_URL } from "@/config/axios";

export const getAllLogs = async ({ token, page }) => {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/logs?page=${page}`, {
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
