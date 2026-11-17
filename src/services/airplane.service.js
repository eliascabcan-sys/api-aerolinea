import * as airplaneModel from "../models/airplane.model.js";
import * as assignmentModel from "../models/assignment.model.js";
import { BusinessError } from "./errors.js";

export const getAirplanes = () => airplaneModel.findAll();

export const getAirplane = async (id) => {
  const airplane = await airplaneModel.findById(id);
  if (!airplane) throw new BusinessError("Avión no encontrado", 404);
  return airplane;
};

const assertPlateFree = async (matricula, ignoreId) => {
  const same = (await airplaneModel.findBy("matricula", matricula)).filter((a) => a.id !== ignoreId);
  if (same.length) throw new BusinessError("Ya existe un avión con esa matrícula", 409);
};

export const registerAirplane = async (data) => {
  await assertPlateFree(data.matricula);
  return airplaneModel.save(data);
};

export const updateAirplane = async (id, data) => {
  await getAirplane(id);
  await assertPlateFree(data.matricula, id);
  return airplaneModel.update(id, data);
};

export const deleteAirplane = async (id) => {
  await getAirplane(id);
  const used = await assignmentModel.findBy("idAvion", id);
  if (used.length) throw new BusinessError("No se puede eliminar: el avión tiene asignaciones", 409);
  return airplaneModel.remove(id);
};
