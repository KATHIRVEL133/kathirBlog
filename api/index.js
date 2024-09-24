import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();
app.use(express.json());
mongoose.connect(process.env.MONGO_DB).then(()=> console.log('Connected to Database')).catch((err)=>console.log(err));
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}!`);
})
app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
app.use((req,res,next)=>{
    const statusCode = req.statusCode||500;
    const message = req.message||'Internal server error';
    res.status(statusCode).json(message);
});