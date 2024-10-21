/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react"
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
export default function DashBoardPosts() {
  const {currentUser} = useSelector((state)=>state.user);
  const [userposts,setUserPosts] = useState([]);
  const [showMore,setShowMore] = useState(true);
  const [showModal,setShowModal] = useState(false);
  const [postDeleteId,setPostDeleteId] = useState('');
  console.log(userposts);
  useEffect(()=>{
     const fetchposts = async ()=>{
      try
      {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`)
        const data = await res.json();
        if(res.ok)
        {
          setUserPosts(data.posts);
          if(data.posts.length<9)
          {
            setShowMore(false);
          }
        }
      }
      catch(error)
      {
        console.log(error);
      }
     }
     if(currentUser.isAdmin)
     {
      fetchposts();
     }
  },[currentUser._id])
  const handleShowMore = async ()=>
  {
    const startIndex = userposts.length;
    try
    {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if(res.ok)
      {
       setUserPosts((prev)=>[...prev,...data.posts]);
       if(data.posts.length<9)
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
  const handleDeleteUser = async (e)=>
  {
    // e.preventDefault();
    setShowModal(false);
    try
    {
     const res = await fetch(`/api/post/deletePost/${postDeleteId}/${currentUser._id}`,{
      method:'Delete',
     });
     const data = await res.json();
   
     if(data.success===false)
     {
      console.log(data.message);
      return ;
     }
    setUserPosts((prev)=> prev.filter((post)=>post._id!==postDeleteId));
    }
    catch(error)
    {
      console.log(error);
    }
  }
  return <div className="w-full min-h-screen table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thum-slate-500">
    {
      currentUser.isAdmin&&userposts.length>0?<>
      <Table  hoverable className="shadow-md">
        <Table.Head>
          <Table.HeadCell>Date Modified</Table.HeadCell>
          <Table.HeadCell>Post image</Table.HeadCell>
          <Table.HeadCell>Post title</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell >Delete</Table.HeadCell>
          <Table.HeadCell>
            <span>
            Edit
            </span>
            </Table.HeadCell>
        </Table.Head>
      {
        userposts.map((post,index)=>(
        
          <Table.Body key={index} className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-900">
            <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
            <Table.Cell>
              <Link to={`/post/${post.slug}`}>
              <img src={post.image}
               alt={post.title}
               className="w-20 h-10 object-cover bg-gray-500"
              >
              </img>
              </Link>
            </Table.Cell>
            <Table.Cell>
              <Link className="font-medium text-gray-900 dark:text-white" to={`/post/${post.slug}`}>
               {post.title}
              </Link>
            </Table.Cell>
            <Table.Cell>
              {post.category}
            </Table.Cell>
            <Table.Cell>
              <span onClick={()=>{
            setShowModal(true);
            setPostDeleteId(post._id);
          }} className="font-medium text-red-500 hover:underline cursor-pointer">
                Delete
              </span>
            </Table.Cell>
            <Table.Cell>
              <Link  className="text-teal-500 hover:underline cursor-pointer" to={`/update-post/${post._id}`}>
              <span>
                Edit
              </span>
              </Link>
            </Table.Cell>
            </Table.Row>
          </Table.Body>
       
        )
        )
      }
       
      </Table>
      </>:'You dont have an post yet'
     
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
          Are you sure you want to delete this Post?
         </h3>
         <div className="flex justify-between"> 
         <Button color='failure' onClick={handleDeleteUser}> 
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
