import { readAll, writeAll } from "./jsonStore.js";

const FILE = "pilots.json";
const ID = "id";

export const findAll = () => readAll(FILE);

export const findById = async (id) => {
  const items = await readAll(FILE);
  return items.find((i) => i[ID] === id) || null;
};

export const findBy = async (field, value) => {
  const items = await readAll(FILE);
  return items.filter((i) => i[field] === value);
};

export const save = async (data) => {
  const items = await readAll(FILE);
  const nextId = items.length ? Math.max(...items.map((i) => i[ID])) + 1 : 1;
  const created = { [ID]: nextId, ...data };
  items.push(created);
  await writeAll(FILE, items);
  return created;
};

export const update = async (id, data) => {
  const items = await readAll(FILE);
  const index = items.findIndex((i) => i[ID] === id);
  if (index === -1) return null;
  items[index] = { [ID]: id, ...data };
  await writeAll(FILE, items);
  return items[index];
};

export const remove = async (id) => {
  const items = await readAll(FILE);
  const index = items.findIndex((i) => i[ID] === id);
  if (index === -1) return null;
  const [removed] = items.splice(index, 1);
  await writeAll(FILE, items);
  return removed;
};
