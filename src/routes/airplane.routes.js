import { Router } from "express";
import { getAll, getById, create, update, remove } from "../controllers/airplane.controller.js";
import { validateId, validateAirplane } from "../middlewares/validators.middleware.js";

const router = Router();

router.get("/", getAll);
router.get("/:id", validateId, getById);
router.post("/", validateAirplane, create);
router.put("/:id", validateId, validateAirplane, update);
router.delete("/:id", validateId, remove);

export default router;
