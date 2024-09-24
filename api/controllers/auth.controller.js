import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs'
export const signup  = async (req,res) =>
{
const {username,email,password} = req.body;
if(!username||!email||!password||username===''||email===''||password==='')
{
    res.status(499).json("All fields are required");
}
const hashedPassword = bcryptjs.hashSync(password,10);
const user = new User({username,email,password:hashedPassword});
try
{
    await user.save();
    res.status(200).json("Sign up successfully done");
}
catch(error)
{
    res.status(500).json(error.message);
}
}