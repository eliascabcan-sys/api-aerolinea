import * as service from "../services/pilot.service.js";

const handleError = (res, error) =>
  res.status(error.status || 500).json({ error: error.message });

export const getAll = async (req, res) => {
  try {
    return res.status(200).json(await service.getPilots());
  } catch (error) {
    return handleError(res, error);
  }
};

export const getById = async (req, res) => {
  try {
    return res.status(200).json(await service.getPilot(req.params.id));
  } catch (error) {
    return handleError(res, error);
  }
};

export const create = async (req, res) => {
  try {
    return res.status(201).json(await service.registerPilot(req.body));
  } catch (error) {
    return handleError(res, error);
  }
};

export const update = async (req, res) => {
  try {
    return res.status(200).json(await service.updatePilot(req.params.id, req.body));
  } catch (error) {
    return handleError(res, error);
  }
};

export const remove = async (req, res) => {
  try {
    await service.deletePilot(req.params.id);
    return res.status(200).json({ mensaje: "Registro eliminado correctamente" });
  } catch (error) {
    return handleError(res, error);
  }
};
