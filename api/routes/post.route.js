import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { create, deletePost, getPost, getposts, updatePost } from "../controllers/post.controller.js";
const router = express.Router();
router.post('/publish',verifyToken,create);
router.get('/getposts',getposts);
router.get('/getpost/:postId',getPost);
router.delete('/deletePost/:postId/:userId',verifyToken,deletePost);
router.put('/update/:userId/:postId',verifyToken,updatePost);

export default router;