import { Router } from "express";
import { getAll, getById, create, update, remove } from "../controllers/pilot.controller.js";
import { validateId, validatePilot } from "../middlewares/validators.middleware.js";

const router = Router();

router.get("/", getAll);
router.get("/:id", validateId, getById);
router.post("/", validatePilot, create);
router.put("/:id", validateId, validatePilot, update);
router.delete("/:id", validateId, remove);

export default router;
