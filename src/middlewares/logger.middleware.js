// Middleware de logging: registra cada petición al terminar la respuesta.
export const logger = (req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const ms = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${ms} ms)`
    );
  });
  next();
};
