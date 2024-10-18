/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import moment from 'moment'
import {FaThumbsUp} from 'react-icons/fa'
import { useSelector } from "react-redux";
import  { Button, Modal, Textarea } from 'flowbite-react'
import { HiOutlineExclamationCircle } from "react-icons/hi";
export default function Comment({comment,onLike,onSave,onDelete}) 
{
  const {currentUser} = useSelector((state)=>state.user)
  const [user,setUser] = useState({});
  const [editing,setEditing] = useState(false);
  const [newComment,setNewComment] = useState('');
  const [showModal,setShowModal] = useState(false);
  useEffect(()=>
  {
  const getUser =  async ()=>
  {
  try
  {
    const res = await fetch(`/api/user/getUser/${comment.userId}`);
    const data = await res.json();
    if(res.ok)
    {
    setUser(data);
    return ;
    }
    console.log(data.message);
  }
  catch(error)
  {
    console.log(error);
  }
  }
  getUser();
  },[comment])
  const handleEdit = ()=>
  {
  setEditing(true);

  }
  const handleCancel = ()=>
  {
    setEditing(false);
  }
 
  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
     <div className="flex-shrink-0 mr-3">
      <img src={user.profilePicture} className="w-10 h-10 rounded-full bg-gray-200"></img>
     </div>
     <div className="flex-1">
      <div className="flex items-center mb-1">
        <span className="font-bold mr-1 text-xs truncate">{user?`@${user.username}`:'anonymous user'}</span>
        <span className="text-gray-400 text-xs">{moment(comment.createdAt).fromNow()}</span>
      </div>
      {
        editing?<div className="flex flex-col gap-2 max-w-xl">
        <Textarea onChange={(e)=> setNewComment(e.target.value)} defaultValue={comment.comment}>
        
        </Textarea>
        <div className="flex gap-1 justify-end">
          <Button gradientDuoTone='purpleToPink' onClick={()=>{setEditing(false),onSave(newComment,comment._id)}}>
            Save
          </Button>
          <Button gradientDuoTone='purpleToPink' onClick={handleCancel} outline>
            Cancel
          </Button>
        </div>
        </div>:<>
      <p className="text-gray-500 pb-2">
        {comment.comment}
      </p>
      <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
        <button  className={`text-sm text-gray-400 hover:text-blue-500 ${currentUser&&comment.likes.includes(currentUser._id)&&'!text-blue-500'}`} onClick={()=>onLike(comment._id)}>
         <FaThumbsUp/>
        </button>
        <p className="text-gray-400">
          {comment.numberOfLikes>0&&comment.numberOfLikes+" "+(comment.numberOfLikes===1?"like":"likes")}
        </p>
        {
          currentUser&&(currentUser._id===comment.userId||currentUser.isAdmin)&&<>
            <button type="button" onClick={handleEdit} className="text-gray-400 hover:text-blue-500">
            Edit
            </button>
            <button onClick={()=>setShowModal(true)} type="button"  className="text-gray-400 hover:text-blue-500">
             Delete
            </button>
          </>
        }
      </div>
        </>
      }
     </div>
     {
        showModal&&
        <Modal show={showModal} popup onClose={()=>setShowModal(false)} size='md'>
        <Modal.Header/>
        <Modal.Body>
         <div className="text-center">
         <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200  mb-4 mx-auto"/>
         <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
          Are you sure you want to delete this Comment?
         </h3>
         <div className="flex justify-between"> 
         <Button color='failure' onClick={()=>{setShowModal(false),onDelete(comment._id)}}> 
          Yes,I'm Sure
         </Button>
         <Button onClick={()=>setShowModal(false)} color='success'>
          No,Cancel
         </Button>
         </div>
         </div>
        </Modal.Body>
        </Modal>
      }
    </div>
  )
}
