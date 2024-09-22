import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();
mongoose.connect(process.env.MONGO_DB).then(()=> console.log('Connected to Database')).catch((err)=>console.log(err));
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}!`);
})