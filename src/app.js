import express from "express";
import { logger } from "./middlewares/logger.middleware.js";
import pilotRouter from "./routes/pilot.routes.js";
import airplaneRouter from "./routes/airplane.routes.js";
import assignmentRouter from "./routes/assignment.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);

app.use("/api/pilotos", pilotRouter);
app.use("/api/aviones", airplaneRouter);
app.use("/api/asignaciones", assignmentRouter);

app.use((req, res) => res.status(404).json({ error: "Ruta no encontrada" }));

// JSON mal formado u otros errores no controlados
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ error: status === 400 ? "JSON inválido" : "Error interno del servidor" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
