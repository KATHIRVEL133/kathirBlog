import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
export const testController = (req,res)=>
{
    res.json({message:'controller test'});
}
export const updateUser = async (req,res,next)=>
{

    if(req.params.userId!==req.user.id)
    {
        next(errorHandler(403,'You are not allowed to update this user'));
    } 
    if(req.body.password)
        {
            if(req.body.password.length<6)
            {
                return next(errorHandler(400,'password must be at least 6 characters'));
            }
            req.body.password = bcryptjs.hashSync(req.body.password,10);
        } 
        if(req.body.username)
        {
            if(req.body.username.length<7||req.body.username.length>20)
            {
                return next(errorHandler(400,'Username must be between 7 and 20 characters'));
            }
            if(req.body.username.includes(' '))
            {
                return next(errorHandler(400,'Username cannot contain spaces'));
            }
            if(req.body.username!==req.body.username.toLowerCase())
            {
                return next(errorHandler(400,'Username must contain only small case letter'));
            }
            if(!req.body.username.match(/^[a-zA-Z0-9]+$/))
            {
                return next(errorHandler(400,'Username must only contain letters and numbers'));
            }
        }
        try
        {
            const updatedUser = await User.findByIdAndUpdate(req.params.userId,{
                $set:
                {
                    username:req.body.username,
                    email:req.body.email,
                    profilePicture:req.body.profilePicture,
                    password:req.body.password,
                },
            },{new:true});
            const {password:pass,...rest} = updatedUser._doc;
            res.status(200).json(rest);
        }
        catch(error)
        {
            next(error);
        }

}
export const deleteUser = async (req,res,next)=>
{
 if(req.user.id!==req.params.userId)
 {
    return next(errorHandler(403,'You can only delete your own account'));
 }
 try
 {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("user deleted Successfully");
 }
 catch(error)
 {
    next(error);
 }
}
export const signOut = async (req,res,next)=>
{
    try
    { 
     res.clearCookie('access_token').status(200).json('Sign Out Successfull');
    }
    catch(error)
    {
        next(error);
    }
}