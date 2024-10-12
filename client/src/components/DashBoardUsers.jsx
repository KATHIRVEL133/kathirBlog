/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react"
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux"
import { FaCheck, FaTimes } from 'react-icons/fa';
import { Link } from "react-router-dom";
export default function DashBoardPosts() {
  const {currentUser} = useSelector((state)=>state.user);
  const [users,setUser] = useState([]);
  const [showMore,setShowMore] = useState(true);
  const [showModal,setShowModal] = useState(false);
  const [userDeleteId,setUserDeleteId] = useState('');
  console.log(users);
  useEffect(()=>{
     const fetchUsers = async ()=>{
      try
      {
        const res = await fetch(`/api/user/getUsers`)
        const data = await res.json();
        if(res.ok)
        {
          setUser(data.users);
          if(data.users.length<9)
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
      fetchUsers();
     }
  },[currentUser._id])
  const handleShowMore = async ()=>
  {
    const startIndex = users.length;
    try
    {
      const res = await fetch(`/api/user/getUsers?&startIndex=${startIndex}`);
      const data = await res.json();
      if(res.ok)
      {
       setUser((prev)=>[...prev,...data.users]);
       if(data.users.length<9)
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
     const res = await fetch(`/api/post/deletePost/${userDeleteId}/${currentUser._id}`,{
      method:'Delete',
     });
     const data = await res.json();
   
     if(data.success===false)
     {
      console.log(data.message);
      return ;
     }
    setUser((prev)=> prev.filter((user)=>user._id!==userDeleteId));
    }
    catch(error)
    {
      console.log(error);
    }
  }
  return <div className="w-full table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thum-slate-500">
    {
      currentUser.isAdmin&&users.length>0?<>
      <Table  hoverable className="shadow-md">
        <Table.Head>
          <Table.HeadCell>DATE CREATED</Table.HeadCell>
          <Table.HeadCell>USER IMAGE</Table.HeadCell>
          <Table.HeadCell>USERNAME</Table.HeadCell>
          <Table.HeadCell>EMAIL</Table.HeadCell>
          <Table.HeadCell>ADMIN</Table.HeadCell>
          <Table.HeadCell >DELETE</Table.HeadCell>
        </Table.Head>
      {
        users.map((user,index)=>(
        
          <Table.Body key={index} className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-900">
            <Table.Cell>{new Date(user.updatedAt).toLocaleDateString()}</Table.Cell>
            <Table.Cell>
              <img src={user.profilePicture}
               alt={user.username}
               className="w-10 h-10 object-cover bg-gray-500 rounded-full"
              >
              </img>
    
            </Table.Cell>
            <Table.Cell>
              {
                user.username
              }
            </Table.Cell>
            <Table.Cell>
              {user.email}
            </Table.Cell>
            <Table.Cell>
                {user.isAdmin?<FaCheck color="green"/>:<FaTimes color="red"/>}
            </Table.Cell>
            <Table.Cell>
              <span onClick={()=>{
            setShowModal(true);
            setUserDeleteId(user._id);
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
          Are you sure you want to delete this User?
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
