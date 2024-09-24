/* eslint-disable react/no-unescaped-entities */
import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import bcryptjs from 'bcryptjs'


export default function SignUp() {
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
       <form className="flex flex-col gap-2">
        <div>
          <Label value="Your Username"/>
          <TextInput type="text" placeholder="username" id="username" />
        </div>
        <div>
          <Label value="Your Email"/>
          <TextInput type="email" placeholder="name@company.com" id="email" />
        </div>
        <div>
          <Label value="Your Password"/>
          <TextInput type="password" placeholder="password" id="password" />
        </div>
        <Button className="mt-3" gradientDuoTone='purpleToPink' type="submit" outline>
          Sign Up
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
      </div>
      </div>
    </div>
  )
}
