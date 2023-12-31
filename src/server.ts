import express from 'express';
import dotenv from "dotenv";
import connectDB from './config/database.js';
import authRoutes from "./routes/authRoutes.js"

dotenv.config();
const app  = express();
//  database config
connectDB();

app.use(express.json())
// routes
app.use('/api/v1/auth', authRoutes);

// rest API
app.get("/", (req: any, res:any) =>{
    res.send({
        message: "Welcome to e-commerce web appplication",
    });
});

const port = process.env.PORT || 8080;
app.listen(port, ()=>{
    console.log(`Server Running on ${port}`);
})