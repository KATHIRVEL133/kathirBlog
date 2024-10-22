import { useEffect, useState } from "react"
import {useSelector} from 'react-redux'
import {HiOutlineUserGroup} from 'react-icons/hi'
import { FaArrowUp,  FaComments } from 'react-icons/fa';
import { MdPostAdd} from 'react-icons/md';
import {Button, Table} from 'flowbite-react'
import {Link} from 'react-router-dom'
export default function DashBoardComp() {
  const [users,setUsers] = useState([])
  const [comments,setComments] = useState([])
  const [posts,setPosts] = useState([]);
  const [totalUsers,setTotalUsers] = useState(0);
  const [totalPosts,setTotalPosts] = useState(0);
  const [totalComments,setTotalComments] = useState(0);
  const [lastMonthUsers,setLastMonthUsers] = useState(0);
  const [lastMonthPosts,setLastMonthPosts] = useState(0);
  const [lastMonthComments,setLastMonthComments] = useState(0);
  const {currentUser} = useSelector((state)=>state.user);
  
  useEffect(()=>{
    const fetchUsers = async ()=>
    {
      try
      {
        const res = await fetch(`/api/user/getUsers?limit=5`);
        const data = await res.json();
        if(res.ok)
        {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
          return;
        }
        console.log(data.message);
      }
      catch(error)
      {
        console.log(error);
      }
    }
    const fetchComments = async ()=>
    {
      try
      {
        const res = await fetch(`/api/comment/getComments?limit=5`);
        const data = await res.json();
        if(res.ok)
        {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
          return ;
        }
        console.log(data.message);
      }
      catch(error)
      {
        console.log(error);
      }
    }
    const fetchPosts = async ()=>
    {
      try
      {
        const res = await fetch(`/api/post/getposts?limit=5`);
        const data = await res.json();
        if(res.ok)
        {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthsPosts);
          return;
        }
        console.log(data.message);
      }
      catch(error)
      {
        console.log(error);
      }
    }
    if(currentUser)
    {
      fetchUsers();
      fetchComments();
      fetchPosts();
    }
  },[currentUser])
  return (
    <div className="p-3  md:mx-auto">
      <div className="flex md:flex-row flex-col gap-2 sm:max-w-6xl w-full justify-between mb-5">
        <div className="sm:w-72 w-full shadow-md p-3 dark:bg-slate-800">
          <div className="flex  justify-between">
            <div className="">
            <span className="text-gray-400">TOTAL USERS</span>
            <p>{totalUsers}</p>
            </div>
             <HiOutlineUserGroup className="bg-green-600 w-10 h-10 shadow-lg p-3 text-white rounded-full"/>
          </div>
          <div className="text-sm flex gap-2">
            <span className="text-green-500 flex items-center gap-1">
            <FaArrowUp/>
            {lastMonthUsers}
            </span>
            <p>
              Last month
            </p>
          </div>
        </div>
        <div className="sm:w-72 w-full shadow-md p-3  dark:bg-slate-800">
          <div className="flex  justify-between">
            <div className="">
            <span className="text-gray-400">TOTAL COMMENTS</span>
            <p>{totalComments}</p>
            </div>
             <FaComments className="bg-green-600 w-10 h-10 shadow-lg p-3 text-white rounded-full"/>
          </div>
          <div className="text-sm flex gap-2">
            <span className="text-green-500 flex items-center gap-1">
            <FaArrowUp/>
            {lastMonthComments}
            </span>
            <p>
              Last month
            </p>
          </div>
        </div>
        <div className="sm:w-72 w-full shadow-md p-3  dark:bg-slate-800">
          <div className="flex  justify-between">
            <div className="">
            <span className="text-gray-400">TOTAL POSTS</span>
            <p>{totalPosts}</p>
            </div>
             <MdPostAdd className="bg-green-600 w-10 h-10 shadow-lg p-3 text-white rounded-full"/>
          </div>
          <div className="text-sm flex gap-2">
            <span className="text-green-500 flex items-center gap-1">
            <FaArrowUp/>
            {lastMonthPosts}
            </span>
            <p>
              Last month
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <div className="flex flex-col gap-2 w-full sm:max-w-[300px] shadow-md p-3">
         <div className="flex items-center justify-between">
          <p>
            Recent users
          </p>
          <Button type="button" gradientDuoTone='purpleToPink' outline>
            <Link to={'/dashboard/userPage'}>
            See all
            </Link>
          </Button>
         </div>
         <div>
          {
           currentUser.isAdmin&&users.length>0&&
           <Table hoverable>
             <Table.Head>
               <Table.HeadCell>
                USER IMAGE
               </Table.HeadCell>
               <Table.HeadCell>
                USERNAME
               </Table.HeadCell>
             </Table.Head>
             {
              users.map((user,index)=>(

                <Table.Body key={index}>
                   <Table.Cell>
                    <img src={user.profilePicture}
                    alt="profile"
                    className="w-10 h-10 rounded-full"
                    ></img>
                   </Table.Cell>
                   <Table.Cell>
                     {user.username}
                   </Table.Cell>
                </Table.Body>
              ))
              }
           </Table>
          }
         </div>
        </div>
        <div className="w-full md:w-[500px] shadow-md flex flex-col gap-2 p-3">
        <div className="flex items-center justify-between">
          <p>
            Recent comments
          </p>
          <Button gradientDuoTone='purpleToPink' outline>
            <Link to={'/dashboard/commentPage'}>
            See all
            </Link>
          </Button>
         </div>
         <div>
          {
           currentUser.isAdmin&&comments.length>0&&
           <Table hoverable>
             <Table.Head>
               <Table.HeadCell>
                COMMENT CONTENT
               </Table.HeadCell>
               <Table.HeadCell>
                LIKES
               </Table.HeadCell>
             </Table.Head>
             {
              comments.map((comment,index)=>(

                <Table.Body key={index}>
                   <Table.Cell>
                    {comment.comment}
                   </Table.Cell>
                   <Table.Cell>
                     {comment.likes.length}
                   </Table.Cell>
                </Table.Body>
              ))
              }
           </Table>
          }
         </div>
        </div>
      </div>
      <div className="shadow-lg flex flex-col gap-2 p-3">
      <div className="flex items-center justify-between mt-5 ">
          <p>
            Recent posts
          </p>
          <Button gradientDuoTone='purpleToPink' outline>
            <Link to={'/dashboard/postPage'}>
            See all
            </Link>
          </Button>
         </div>
      <div>
          {
           currentUser.isAdmin&&posts.length>0&&
           <Table hoverable>
             <Table.Head>
               <Table.HeadCell>
                POST IMAGE
               </Table.HeadCell>
               <Table.HeadCell>
                TITLE
               </Table.HeadCell>
               <Table.HeadCell>
                CATEGORY
               </Table.HeadCell>
             </Table.Head>
             {
              posts.map((posts,index)=>(

                <Table.Body key={index}>
                   <Table.Cell>
                    <img src={posts.image} alt="post image" className="h-10 w-10 rounded-full">
                    </img>
                   </Table.Cell>
                   <Table.Cell>
                     {posts.title}
                   </Table.Cell>
                   <Table.Cell>
                    {posts.category}
                   </Table.Cell>
                </Table.Body>
              ))
              }
           </Table>
          }
         </div>
      </div>
    </div>
  )
}
