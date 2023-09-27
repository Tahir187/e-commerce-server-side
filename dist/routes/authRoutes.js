import express from "express";
import { loginController, registerController, testController } from "../controllers/authController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";
const router = express.Router();
// routing
// Register || Method Post
router.post("/register", registerController);
// login || method post
router.post("/login", loginController);
//test routes
router.get("/test", requireSignIn, testController);
export default router;
