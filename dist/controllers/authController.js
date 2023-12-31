import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../utils/authUtils.js";
import JWT from "jsonwebtoken";
export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        if (!(name && email && password && phone && address)) {
            return res.status(400).json({ error: "All fields are required" });
        }
        // check user
        const existingUser = await userModel.findOne({ email });
        //  existing user
        if (existingUser) {
            return res.status(201).send({
                success: true,
                message: "Already registered login please"
            });
        }
        ;
        // register user 
        const hashedPassword = await hashPassword(password);
        const user = await userModel.create({ name, email, phone, address, password: hashedPassword });
        res.status(201).send({
            success: true,
            message: "User registered successfully.",
            user
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Registeration failed!",
            error
        });
    }
};
// Post Login
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        // validation
        if (!(email && password)) {
            return res.status(400).send({
                success: false,
                message: "Invaid email or password",
            });
        }
        // check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered"
            });
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid password"
            });
        }
        // Token
        const jwtSecret = process.env.JWT_SECRET || 'default-secret'; // Provide a default value if it's undefined
        const token = await JWT.sign({ _id: user._id }, jwtSecret, { expiresIn: '7d' });
        res.status(200).send({
            success: true,
            message: "Login successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            },
            token,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Login error",
            error
        });
    }
};
export const testController = (req, res) => {
    res.send("Protected Route");
};
