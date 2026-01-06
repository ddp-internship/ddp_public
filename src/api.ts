import axios from "axios";

const ORIGIN = (import.meta.env.VITE_API_URL || "http://localhost:8085").replace(/\/+$/, "");
const BASE_URL = `${ORIGIN}/api`;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { Accept: "application/json" },
});

export const getStorageUrl = (path: any) => {
  if (!path) return "/img/placeholder.png";

  const targetPath = Array.isArray(path) ? path[0] : path;
  if (typeof targetPath !== "string") return "/img/placeholder.png";

  const cleanPath = targetPath.replace(/^public\//, "");
  return `${ORIGIN}/storage/${cleanPath}`;
};
