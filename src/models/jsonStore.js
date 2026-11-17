// Única capa que usa fs. Las demás capas nunca tocan archivos directamente.
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const dataDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "data");

export const readAll = async (file) => {
  const raw = await fs.readFile(path.join(dataDir, file), "utf-8");
  return JSON.parse(raw || "[]");
};

export const writeAll = async (file, data) => {
  await fs.writeFile(path.join(dataDir, file), JSON.stringify(data, null, 2));
};
