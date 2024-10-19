import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createComment, deleteComment, deleteComment2, editComment, getComments, getPostComments, likeComment } from "../controllers/comment.controller.js";
const router = express.Router();
router.post('/create',verifyToken,createComment);
router.get('/getPostComments/:postId',getPostComments);
router.get('/getComments',verifyToken,getComments);
router.put('/likeComment/:commentId',verifyToken,likeComment);
router.put('/editComment/:commentId',verifyToken,editComment);
router.delete('/deleteComment/:commentId',verifyToken,deleteComment);
router.delete('/deleteComment/:commentId/:userId',verifyToken,deleteComment2);
export default router