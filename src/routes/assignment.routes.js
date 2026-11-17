import { Router } from "express";
import { getAll, getById, create, update, remove } from "../controllers/assignment.controller.js";
import { validateId, validateAssignment } from "../middlewares/validators.middleware.js";

const router = Router();

router.get("/", getAll);
router.get("/:id", validateId, getById);
router.post("/", validateAssignment, create);
router.put("/:id", validateId, validateAssignment, update);
router.delete("/:id", validateId, remove);

export default router;
