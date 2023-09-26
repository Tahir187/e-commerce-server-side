import userModel from "../models/userModel.js";
import { hashPassword } from "../utils/authUtils.js";

export const registerController = async (req:any, res:any) =>{
    try {
        const {name, email, password, phone, address} = req.body;

        if(!(name && email && password && phone && address)){
            return res.status(400).json({error: "All fields are required"});
        }

        // check user
        const existingUser = await userModel.findOne({email});
        //  existing user
        if(existingUser){
            return res.status(201).send({
                success: true,
                message: "Already registered login please"
            });
        };

        // register user 
        const hashedPassword = await hashPassword(password);
        const user = await userModel.create({name,email,phone,address, password:hashedPassword});    
        res.status(201).send({
            success: true,
            message: "User registered successfully.",
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Registeration failed!",
            error
        })
    }
}

