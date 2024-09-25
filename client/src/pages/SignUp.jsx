/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { lazy, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData,setFormData] = useState({});
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e)=>
  {
   setFormData({...formData,[e.target.id]:e.target.value.trim()})
  }
  const handleSubmit = async (e)=>
  {
    e.preventDefault();
    try
    {
    setLoading(true);
    setError(null);
    const res = await fetch('/api/auth/signup',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData),
    })
    const data = await res.json();
    setLoading(false);
    if(data.success===false)
    { 
      setError(data.message);
      return ;
    }
    if(res.ok)
    {
      navigate('/sign-in');
    }
    }
    catch(error)
    {
      setError(error);
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen mt-20">
      <div className="flex gap-5 p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center ">
      {/* left */}
        <div className="flex-1">

       <Link to={'/'} className="text-4xl font-bold dark:text-white">
        <span className="px-2 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
         Kathir's 
        </span>
        Blog
        </Link>
        <p className=" text-sm mt-5">
          This is a demo project. You can sign up with your email and password or with Google.
        </p>
        </div>
      {/* right */}
      <div className="flex-1">
       <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <div>
          <Label value="Your Username"/>
          <TextInput type="text" placeholder="username" id="username" onChange={handleChange}/>
        </div>
        <div>
          <Label value="Your Email"/>
          <TextInput type="email" placeholder="name@company.com" id="email"  onChange={handleChange}/>
        </div>
        <div>
          <Label value="Your Password"/>
          <TextInput type="password" placeholder="password" id="password"   onChange={handleChange}/>
        </div>
        <Button disabled={loading} className="mt-3" gradientDuoTone='purpleToPink' type="submit" outline>
          {loading?(<><Spinner size='sm'/> <span className="pl-3">Loading...</span></>):'Sign Up'}
        </Button>
       </form>
       <div className="flex gap-2 mt-5">
       <span>
         Have an account? 
       </span> 
        <Link to={'/sign-in'} className="text-blue-500">
         Sign In
        </Link>
       </div>
       { 
        error&&<Alert className="mt-3" color='failure'>{error}</Alert>
       }
      </div>
      </div>
    </div>
  )
}
