import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs"
export const signup  = async (req,res,next) =>
{
const {username,email,password} = req.body;
if(!username||!email||!password||username===''||email===''||password==='')
{
 return next(errorHandler(400,'All fields are required'));
}
const hashedPassword = bcryptjs.hashSync(password,10);
const user = new User({username,email,password:hashedPassword,});
try
{
    await user.save();
    res.status(200).json('Sign up successfully done');
}
catch(error)
{
   next(error);
}
}