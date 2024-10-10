/* eslint-disable no-unused-vars */
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { app } from "../firebase";
import {useNavigate, useParams} from 'react-router-dom'
import { useSelector } from "react-redux";
export default function UpdatePost() {
  const {currentUser} = useSelector((state)=>state.user)
  const {postId} = useParams();
  const [imageFile,setImageFile] = useState([]);
  const [imageFileUrl,setImageFileUrl] = useState([]);
  const [imageUploadError,setImageUploadError] = useState(null);
  const [imageUploadProgress,setImageUplaodProgress] = useState(0);
  const [updateError,setUpdateError] = useState(null);
  const navigate = useNavigate();
  const [formData,setFormData] = useState({
    image:[],
  });
  useEffect(()=>
   {
   const getPost =async ()=>
   {
   try
   {
   const res = await fetch(`/api/post/getPost/${postId}`);
   const data = await res.json();
   if(!res.ok)
   {
    console.log(data.message);
   }
   setFormData(data);
   setImageFileUrl(data.image);
   }
   catch(error)
   {
    console.log(error);
   }
   }
   getPost();
   },[])
  console.log(formData);
  const handleImageFileChange = (e)=>
  {

   for(let i=0;i<e.target.files.length;i++)
   {
     const file = e.target.files[i];
     if(file)
     {
      
      setImageFile((prevImageFile)=> [...prevImageFile,file]);
    
     }
   }
  }
 
  const handleUploadImage = ()=>
  {
    if(imageFile.length==0)
    {
      setImageUploadError('Please select atleast one file');
    }
    for(let i=0;i<imageFile.length;i++)
    {
     uploadImage(i);
    }
  }
  const uploadImage = async (i)=>
  {
  setImageUploadError(null);
  const storage = getStorage(app);
  const fileName = new Date().getTime() + imageFile[i].name;
  const storageRef = ref(storage,fileName);
  const uploadTask = uploadBytesResumable(storageRef,imageFile[i]);
  uploadTask.on('state_changed',(snapshot)=>
  {
  const progress = (snapshot.bytesTransferred/snapshot.totalBytes);
  setImageUplaodProgress(progress.toFixed(0));
  },(error)=>
  {
    setImageUploadError('Image must be less than (2mb) size');
    setImageUplaodProgress(0);
    setImageFile(null);
    setImageFileUrl(null);
  },()=>
  {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>
    {
      setImageFileUrl((prevImageFileUrl)=> [...prevImageFileUrl,downloadUrl]);
      setFormData({...formData,...formData.image.push(downloadUrl)});
    })
  });
  }
 const handleSubmit = async (e)=>
 {
 e.preventDefault();
 try
 {
 setUpdateError(null);
 const res = await fetch(`/api/post/update/${currentUser._id}/${postId}`,{
  method:'put',
  headers:{
    'Content-Type':'application/json'
  },
  body:JSON.stringify(formData)
 });
 const data = await res.json();
 if(!res.ok)
 {
  setUpdateError(data.message);
  return;
 }
 navigate(`/post/${data.slug}`);
 }
 catch(error)
 {
 setUpdateError(error);
 }
 }
  return (
    <div className="min-h-screen max-w-3xl mx-auto p-3">
      <h1 className="text-center text-3xl font-semibold my-7">
        Update your Post
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
       <TextInput type="text" placeholder="Title" required id="title" className="flex-1" defaultValue={formData.title} onChange={(e)=> setFormData({...formData,title:e.target.value})}>

       </TextInput>
       <Select value={formData.category} id="category" onChange={(e)=> setFormData({...formData,category:e.target.value})}>
        <option value="uncategorized">
          Select a category
        </option>
        <option value="javascript">
          JavaScript
        </option>
        <option value="reactjs">
            ReactJs
        </option>
        <option value="nodejs">
             Node Js
        </option>
       </Select>
        </div>
        <div className="flex p-3 border-4 gap-4 justify-between border-teal-500 border-dotted">
         <FileInput type='file' accept="image/*" onChange={handleImageFileChange} multiple/>
         <Button type="button" gradientDuoTone="purpleToBlue" size='sm' outline onClick={handleUploadImage}>
          Upload Image
          </Button>
      
        </div>
        <div className="grid grid-cols-5 max-w-3xl overflow-hidden gap-4 "> 
         {
         imageFileUrl&&imageFileUrl.map((urls,index)=>
        <img key={index} src={urls} className="flex-1 w-full h-full object-cover shadow-lg">
         
        </img>
        )
         }
        </div>
        {
          imageUploadError&&<Alert color='failure'>
            {imageUploadError}
          </Alert>
        }
        <ReactQuill theme="snow" placeholder="write something..." value={formData.content} className="h-72 mb-12" onChange={(value)=>setFormData({...formData,content:value})}  id="content" required/>
        <Button type="submit" gradientDuoTone='purpleToPink'>
            Update
        </Button>
        {
          updateError&&<Alert color='failure'>
            {updateError}
          </Alert>
        }
      </form>
    </div>
  )
}
