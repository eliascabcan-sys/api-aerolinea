import * as assignmentModel from "../models/assignment.model.js";
import * as pilotModel from "../models/pilot.model.js";
import * as airplaneModel from "../models/airplane.model.js";
import { BusinessError } from "./errors.js";

export const getAssignments = () => assignmentModel.findAll();

export const getAssignment = async (id) => {
  const assignment = await assignmentModel.findById(id);
  if (!assignment) throw new BusinessError("Asignación no encontrada", 404);
  return assignment;
};

// Validación relacional: el piloto y el avión deben existir.
const assertRelations = async ({ idPiloto, idAvion }) => {
  const pilot = await pilotModel.findById(idPiloto);
  if (!pilot) throw new BusinessError(`El piloto con id ${idPiloto} no existe`, 404);
  const airplane = await airplaneModel.findById(idAvion);
  if (!airplane) throw new BusinessError(`El avión con id ${idAvion} no existe`, 404);
};

export const createAssignment = async (data) => {
  await assertRelations(data);
  return assignmentModel.save(data);
};

export const updateAssignment = async (id, data) => {
  await getAssignment(id);
  await assertRelations(data);
  return assignmentModel.update(id, data);
};

export const deleteAssignment = async (id) => {
  await getAssignment(id);
  return assignmentModel.remove(id);
};
