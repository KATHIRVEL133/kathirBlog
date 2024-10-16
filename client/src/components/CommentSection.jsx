
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import {Alert, Button, Textarea} from 'flowbite-react'
import { useEffect, useState } from "react";
import Comment from "./Comment.jsx";
export default function CommentSection(post) {
  
    const {currentUser} = useSelector((state)=>state.user);
    const [comment,setComment] = useState('');
    const [comments,setComments] = useState([]);
    console.log(comments);
    const [commentError,setCommentError] = useState(null);
    useEffect(()=>
    {
     const fetchComments = async ()=>
     {
     try
     {
    setCommentError(null);
     const res = await fetch(`/api/comment/getPostComments/${post.postId}`);
     const data = await res.json();
     if(res.ok)
     {
      
      setComments(data);
      setCommentError(null);
      return;
     }
     setCommentError(data.message);
     }
     catch(error)
     {
      console.log(error);
     }
     }
     fetchComments();
    },[post.postId]);
    const handleChange = (e)=>
    {
      setComment(e.target.value);
    }
    const handleSubmit = async (e)=>
    {
     e.preventDefault();
     if(comment.length>200) return ;
     try
     {
      setCommentError(null);
      const res = await fetch('/api/comment/create',{
        method:'post',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({comment,postId:post.postId,userId:currentUser._id})
      })
      const data = await res.json();
      setComment('');
      if(!res.ok)
      {
        setCommentError(data.message);
        return;
      }
      setComments([data,...comments]);
     }
     catch(error)
     {
      setCommentError(error);
     }
    }  
  return (

    <div className="mx-w-2xl mx-auto w-full p-3">
      {
        currentUser?
        (
            <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
                <p>Signed in as:</p>
                <img className="w-5 h-5 object-cover rounded-full" src={currentUser.profilePicture} alt=""></img>
                <Link to={'/dashboard?tab=profile'} className="text-xs text-cyan-600 hover:underline">@{currentUser.username}</Link>
            </div>
        ):(
            <div className="text-sm text-teal-500 my-5 flex gap-1">
                You must be signed in to comment.
            <Link className="text-blue-500 hover:underline" to={'/sign-in'}>
              Sign In
            </Link>
            </div>
        )
      }
      {
        currentUser&&(
          <form onSubmit={handleSubmit} className="border border-teal-500 rounded-md p-3 shadow-md">
            <Textarea
            placeholder="Add a comment"
            rows='3'
            maxLength='200'
            onChange={handleChange}
            />
            <div className="flex justify-between items-center mt-3">
              <p className="text-gray-500 text-xs">
                {200-comment.length} characters remainning
              </p>
              <Button type="submit" gradientDuoTone='purpleToPink'>
                Submit
              </Button>
            </div>
            {
              commentError&&  <Alert color='failure'>
               {commentError}
              </Alert>
            }
          
          </form>
        )
      }
      {
        comments.length==0?(<p className="my-5 text-sm">
         No comments yet!
        </p>):(
          <>
          <div className="text-sm my-5 flex items-center gap-1">
            <p>Comments</p>
            <div className="border border-gray-400 py-1 px-2 rounded-sm">
             <p>{comments.length}</p>
            </div>
        </div>
        {
          comments.map( (comment) =>(
            <Comment
             key={comment._id}
             comment={comment}
            />
          ))
        }
          </>
      )
      }
    
    </div>
  )
}
