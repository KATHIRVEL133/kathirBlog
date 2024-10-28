import { Button, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import {  useLocation,useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();
  const [sidebarData,setSidebarData] = useState({searchTerm:'',sort:'desc',category:'uncategorized'});
  const [posts,setPosts] = useState([]);
  const [loading,setLoading] = useState(false);
  const [showMore,setShowMore] = useState(false);
  const location = useLocation();
  console.log(posts);
  useEffect(()=>
  {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');
    if(searchTermFromUrl||sortFromUrl||categoryFromUrl)
    {
      setSidebarData({
        ...sidebarData,
        searchTerm:searchTermFromUrl,
        sort:sortFromUrl,
        category:categoryFromUrl,
      })
    }
    const fetchPosts = async ()=>
    {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}&limit=9`);
      if(!res.ok)
      {
        setLoading(false);
        return ;
      }
      if(res.ok)
      {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if(data.posts.length===9)
        {
          setShowMore(true);
        }
        else
        {
          setShowMore(false);
        }
      }
    }
    fetchPosts();
  },[location.search])
  const handleChange  = (e)=>
  {
  if(e.target.id==='searchTerm'||e.target.id==='category')
  {
   setSidebarData({...sidebarData,[e.target.id]:e.target.value})
  }
  if(e.target.id==='sort')
  {
    if(e.target.value==='Latest'||e.target.id==='Oldest')
    {
      setSidebarData({...sidebarData,[e.target.id]:'desc'});
    }
    else
    {
      setSidebarData({...sidebarData,[e.target.id]:'asc'});
    }
  }
  }
  const handleSubmit = async (e)=>
  {
   e.preventDefault();
   const urlParams = new URLSearchParams(location.search);
   urlParams.set('searchTerm',sidebarData.searchTerm);
   urlParams.set('sort',sidebarData.sort);
   urlParams.set('category',sidebarData.category);
   const searchQuery = urlParams.toString();
   navigate(`/search?${searchQuery}`);
  }
  const handleShowMore = async (e)=>
    {
      e.preventDefault();
      const startIndex = posts.length;
      try
      {
       const res = await fetch(`/api/post/getposts?${startIndex}`);
       const data  = await res.json();
       if(res.ok)
       {
        setPosts((prev)=>[...prev,...data.posts]);
        if(data.posts.length<9)
        {
          setShowMore(false);
        }
       }
       else
       {
        console.log(data.message);
       }
      }
      catch(error)
      {
        console.log(error);
      }
    } 
  return (
    <div className="flex flex-col md:flex-row  min-h-screen">
      <div className="shadow-lg">
        <form  onSubmit={handleSubmit} className="flex flex-col p-3 mx-auto md:min-h-screen gap-4 max-w-sm md:max-w-2xl  border-gray-500 sm:border-r-2 ">
       <div className="flex gap-1 items-center my-7">
        <label>Search Term:</label>
        <TextInput id="searchTerm" placeholder="search..." onChange={handleChange}/>
       </div>
       <div className="flex gap-1 items-center">
      <label >Sort:</label>
      <select id="sort" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option value="Latest">Latest</option>
        <option value="Recent">Most Recent</option>
        <option value="Oldest">Oldest</option>
      </select>
       </div>
       <div className="flex gap-1">
        <label>Category:</label>
       <select id="category" onChange={handleChange}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="React">React Js</option>
            <option value="Nodejs">Node Js</option>
            <option value="javascript">Javascript</option>
      </select>
       </div>
       <Button type="submit" className="w-full" gradientDuoTone='purpleToPink' outline>
        Search
       </Button>
        </form>
      </div>
      {
        loading&&<p className="text-sm text-center mx-auto">
          loading...
        </p>
      }
      {
        !loading&&
      <div className="border-t-2 md:border-none p-3 w-full md:max-w-7xl ">
  
       <p className="font-bold mt-4 text-xl my-3">
       Posts results:
       </p>
        
        <div className="border-t-2 p-3 border-gray-500 flex gap-3 flex-wrap">
          {
            posts.map((post,index)=>
            (
            <PostCard key={index} post={post}/>
            ))
          }
        </div>
        {
        showMore&&
        <Button className="text-blue-400 mx-auto text-sm" onClick={handleShowMore}>
          ShowMore
        </Button>
          }
      </div>
      }
    </div>
  )
}
