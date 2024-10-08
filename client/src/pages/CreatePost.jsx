/* eslint-disable no-unused-vars */
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { app } from "../firebase";
import {useNavigate} from 'react-router-dom'
export default function CreatePost() {
  const [imageFile,setImageFile] = useState([]);
  const [imageFileUrl,setImageFileUrl] = useState([]);
  const [imageUploadError,setImageUploadError] = useState(null);
  const [imageUploadProgress,setImageUplaodProgress] = useState(0);
  const [publishError,setPublishError] = useState(null);
  const navigate = useNavigate();
  const [formData,setFormData] = useState({
    image:[],
  });
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
 setPublishError(null);
 const res = await fetch('/api/post/publish',{
  method:'post',
  headers:{
    'Content-Type':'application/json'
  },
  body:JSON.stringify(formData)
 });
 const data = await res.json();
 if(!res.ok)
 {
  setPublishError(data.message);
  return;
 }
 navigate(`/post/${data.slug}`);
 }
 catch(error)
 {
 setPublishError(error);
 }
 }
  return (
    <div className="min-h-screen max-w-3xl mx-auto p-3">
      <h1 className="text-center text-3xl font-semibold my-7">
        Create a Post
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
       <TextInput type="text" placeholder="Title" required id="title" className="flex-1" onChange={(e)=> setFormData({...formData,title:e.target.value})}>

       </TextInput>
       <Select id="category" onChange={(e)=> setFormData({...formData,category:e.target.value})}>
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
        <ReactQuill theme="snow" placeholder="write something..." className="h-72 mb-12" onChange={(value)=>setFormData({...formData,content:value})}  id="content" required/>
        <Button type="submit" gradientDuoTone='purpleToPink'>
            Publish
        </Button>
        {
          publishError&&<Alert color='failure'>
            {publishError}
          </Alert>
        }
      </form>
    </div>
  )
}
