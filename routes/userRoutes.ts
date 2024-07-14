import { Router } from "express";
import { updateUser, fetchUser } from "../controller/api";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.put('/update-user-data/:userID', authMiddleware, updateUser);
router.get('/fetch-user-data/:userID', authMiddleware, fetchUser);

export default router;