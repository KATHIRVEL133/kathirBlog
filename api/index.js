import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import postRouter from './routes/post.route.js'
import commentRoute from './routes/comment.route.js'
import cookieParser from 'cookie-parser';
const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();
app.use(express.json());
app.use(cookieParser());
mongoose.connect(process.env.MONGO_DB).then(()=> console.log('Connected to Database')).catch((err)=>console.log(err));
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}!`);
})
app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
app.use('/api/post',postRouter);
app.use('/api/comment',commentRoute);
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode||500;
    const message = err.message||'Internal server error';
    res.status(statusCode).json(
    {
        success:false,
        statusCode,
        message
    }
);
});