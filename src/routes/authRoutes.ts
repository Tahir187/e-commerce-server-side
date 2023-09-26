import express from "express";
import {loginController, registerController} from "../controllers/authController.js";
const router = express.Router();

// routing
// Register || Method Post
router.post("/register", registerController);
// login || method post
router.post("/login", loginController);
export default router;
