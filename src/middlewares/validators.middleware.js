// Middlewares de validación: revisan el formato de los datos antes de llegar al controlador.
const isText = (v) => typeof v === "string" && v.trim() !== "";
const isNum = (v) => typeof v === "number" && Number.isFinite(v);

const fail = (res, errors) => res.status(400).json({ error: "Datos inválidos", detalles: errors });

// Convierte :id a número y valida que sea entero positivo.
export const validateId = (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return fail(res, ["El id debe ser un número entero positivo"]);
  }
  req.params.id = id;
  next();
};

export const validatePilot = (req, res, next) => {
  const { nombre, licencia, horasVuelo, estado } = req.body || {};
  const errors = [];
  if (!isText(nombre)) errors.push("nombre es obligatorio (texto)");
  if (!isText(licencia)) errors.push("licencia es obligatoria (texto)");
  if (!isNum(horasVuelo) || horasVuelo < 0) errors.push("horasVuelo debe ser un número mayor o igual a 0");
  if (!isText(estado)) errors.push("estado es obligatorio (ej: activo, inactivo)");
  if (errors.length) return fail(res, errors);
  req.body = { nombre: nombre.trim(), licencia: licencia.trim(), horasVuelo, estado: estado.trim() };
  next();
};

export const validateAirplane = (req, res, next) => {
  const { modelo, matricula, capacidadMaxima, fabricante } = req.body || {};
  const errors = [];
  if (!isText(modelo)) errors.push("modelo es obligatorio (texto)");
  if (!isText(matricula)) errors.push("matricula es obligatoria (texto)");
  if (!isNum(capacidadMaxima) || capacidadMaxima <= 0) errors.push("capacidadMaxima debe ser un número mayor a 0");
  if (!isText(fabricante)) errors.push("fabricante es obligatorio (texto)");
  if (errors.length) return fail(res, errors);
  req.body = { modelo: modelo.trim(), matricula: matricula.trim(), capacidadMaxima, fabricante: fabricante.trim() };
  next();
};

export const validateAssignment = (req, res, next) => {
  const { idPiloto, idAvion, fechaVuelo, rutaAsignada } = req.body || {};
  const errors = [];
  if (!Number.isInteger(idPiloto) || idPiloto <= 0) errors.push("idPiloto debe ser un entero positivo");
  if (!Number.isInteger(idAvion) || idAvion <= 0) errors.push("idAvion debe ser un entero positivo");
  if (!isText(fechaVuelo) || Number.isNaN(Date.parse(fechaVuelo))) errors.push("fechaVuelo debe ser una fecha válida (YYYY-MM-DD)");
  if (!isText(rutaAsignada)) errors.push("rutaAsignada es obligatoria (texto)");
  if (errors.length) return fail(res, errors);
  req.body = { idPiloto, idAvion, fechaVuelo: fechaVuelo.trim(), rutaAsignada: rutaAsignada.trim() };
  next();
};
