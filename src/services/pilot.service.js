import * as pilotModel from "../models/pilot.model.js";
import * as assignmentModel from "../models/assignment.model.js";
import { BusinessError } from "./errors.js";

export const getPilots = () => pilotModel.findAll();

export const getPilot = async (id) => {
  const pilot = await pilotModel.findById(id);
  if (!pilot) throw new BusinessError("Piloto no encontrado", 404);
  return pilot;
};

const assertLicenseFree = async (licencia, ignoreId) => {
  const same = (await pilotModel.findBy("licencia", licencia)).filter((p) => p.id !== ignoreId);
  if (same.length) throw new BusinessError("Ya existe un piloto con esa licencia", 409);
};

export const registerPilot = async (data) => {
  await assertLicenseFree(data.licencia);
  return pilotModel.save(data);
};

export const updatePilot = async (id, data) => {
  await getPilot(id);
  await assertLicenseFree(data.licencia, id);
  return pilotModel.update(id, data);
};

export const deletePilot = async (id) => {
  await getPilot(id);
  const used = await assignmentModel.findBy("idPiloto", id);
  if (used.length) throw new BusinessError("No se puede eliminar: el piloto tiene asignaciones", 409);
  return pilotModel.remove(id);
};
