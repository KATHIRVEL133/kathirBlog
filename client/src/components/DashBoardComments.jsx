

/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react"
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux"
export default function DashBoardComments() {
  const {currentUser} = useSelector((state)=>state.user);
  const [comments,setComments] = useState([]);
  const [showMore,setShowMore] = useState(true);
  const [showModal,setShowModal] = useState(false);
  const [commentDeleteId,setCommentDeleteId] = useState('');
  useEffect(()=>{
     const fetchComments = async ()=>{
      try
      {
        const res = await fetch(`/api/comment/getComments`)
        const data = await res.json();
        if(res.ok)
        {
          setComments(data.comments);
          if(data.comments.length<9)
          {
            setShowMore(false);
          }
        }
        console.log(data.message);
      }
      catch(error)
      {
        console.log(error);
      }
     }
     if(currentUser.isAdmin)
     {
      fetchComments();
     }
  },[currentUser._id])
  const handleShowMore = async ()=>
  {
    const startIndex = comments.length;
    try
    {
      const res = await fetch(`/api/comment/getComments?&startIndex=${startIndex}`);
      const data = await res.json();
      if(res.ok)
      {
       setComments((prev)=>[...prev,...data.comments]);
       if(data.comments.length<9)
       {
        setShowMore(false);
       }
      }
    }
    catch(error)
    {
      console.log(error.message);
    }
  }
  const handleDeleteComment = async (e)=>
  {
    // e.preventDefault();
    setShowModal(false);
    try
    {
     const res = await fetch(`/api/comment/deleteComment/${commentDeleteId}/${currentUser._id}`,{
      method:'Delete',
     });
     const data = await res.json();
   
     if(data.success===false)
     {
      console.log(data.message);
      return ;
     }
    setComments((prev)=> prev.filter((comment)=>comment._id!==commentDeleteId));
    }
    catch(error)
    {
      console.log(error);
    }
  }
  return <div className="w-full min-h-screen table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thum-slate-500">
    {
      currentUser.isAdmin&&comments.length>0?<>
      <Table  hoverable className="shadow-md">
        <Table.Head>
          <Table.HeadCell>DATE UPDATED</Table.HeadCell>
          <Table.HeadCell>COMMENT CONTENT</Table.HeadCell>
          <Table.HeadCell>NUMBER OF LIKES</Table.HeadCell>
          <Table.HeadCell>POSTID</Table.HeadCell>
          <Table.HeadCell>USERID</Table.HeadCell>
          <Table.HeadCell >DELETE</Table.HeadCell>
        </Table.Head>
      {
        comments.map((comment,index)=>(
        
          <Table.Body key={index} className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-900">
            <Table.Cell>{new Date(comment.updatedAt).toLocaleDateString()}</Table.Cell>
            <Table.Cell>
              {comment.comment}
            </Table.Cell>
            <Table.Cell>
              {
                comment.numberOfLikes
              }
            </Table.Cell>
            <Table.Cell>
              {comment.postId}
            </Table.Cell>
            <Table.Cell>
               {comment.userId}
            </Table.Cell>
            <Table.Cell>
              <span onClick={()=>{
            setShowModal(true);
            setCommentDeleteId(comment._id);
          }} className="font-medium text-red-500 hover:underline cursor-pointer">
                Delete
              </span>
            </Table.Cell>
            </Table.Row>
          </Table.Body>
       
        )
        )
      }
       
      </Table>
      </>:'You dont have any comment yet'
     
    }
     {
        showMore&&<button onClick={handleShowMore} className="w-full self-center text-teal-500 py-7 text-sm">
          Show More...
        </button>
      }
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
         <Button color='failure' onClick={handleDeleteComment}> 
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
}
