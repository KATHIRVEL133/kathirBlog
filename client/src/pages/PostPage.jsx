import { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom'
import {Button, Spinner} from 'flowbite-react'
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
export default function PostPage() {
  const {postSlug} = useParams();
  const [loading,setLoading] = useState(true);
  const [post,setPost] = useState(null);
  const [error,setError] = useState(false);
  console.log(post);
  useEffect(()=>
  {
  const fetchPost = async ()=>
  {
  try
  {
  setError(null);
  setLoading(true);
  const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
  const data = await res.json();
  if(!res.ok)
  {
    setLoading(false);
    setError(error);
    return ;
  } 
  setLoading(false);
  setPost(data.posts[0]);
  }
  catch(error)
  {
    setError(error);
  }
  }
  fetchPost();
  },[postSlug])
 if(loading) return <div className='flex justify-center items-center min-h-screen'><Spinner size='xl'/></div>
 return <main className='p-3 flex flex-col min-h-screen max-w-6xl mx-auto'>
  <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
    {post&&post.title}
  </h1>
  <Link to={`/search?category=${post&&post.category}`} className='self-center mt-5'>
   <Button  pill size='xs' color='gray'> 
    {post&&post.category}
   </Button>
  </Link>
  <img src={post&&post.image[0]} alt={post&&post.title} className='mt-10 p-3 max-h-[600px] w-full object-cover'>
  </img>
  <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs '>
    <span>
      {post&& new Date(post.createdAt).toLocaleDateString()}
    </span>
    <span className='italic'>
      {post&&(post.content.length/1000).toFixed(0)} mins read
    </span>
  </div>
  <div className='p-3 max-w-2xl mx-auto w-full post-content' dangerouslySetInnerHTML={{__html:post&&post.content}}>

  </div>
  <div className='max-w-4xl mx-auto w-full'>
    <CallToAction/>
  </div>
  <CommentSection postId={post._id}/>
  </main>
}
