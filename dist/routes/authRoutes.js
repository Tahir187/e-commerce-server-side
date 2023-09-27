import express from "express";
import { loginController, registerController, testController } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
const router = express.Router();
// routing
// Register || Method Post
router.post("/register", registerController);
// login || method post
router.post("/login", loginController);
//test routes
router.get("/test", requireSignIn, isAdmin, testController);
export default router;
